import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import Credentials from "next-auth/providers/credentials"
import { SignInSchema } from "@/lib/zod"
import { compareSync } from "bcrypt-ts"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"  

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
        GitHub({                                       // ← tambah ini
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log("CREDENTIALS:", credentials)

        const validateFields = SignInSchema.safeParse(credentials)
        if (!validateFields.success) {
          console.log("VALIDATION FAIL")
          return null
        }

        const { email, password } = validateFields.data

        const user = await prisma.user.findUnique({
          where: { email },
        })
        console.log("USER:", user)

        if (!user || !user.password) {
          console.log("USER NOT FOUND")
          return null
        }

        const passwordMatch = compareSync(password, user.password)
        console.log("MATCH:", passwordMatch)

        if (!passwordMatch) return null

        return user
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user
      const protectedRoutes = ["/dashboard", "/user", "/product"]

      if (!isLoggedIn && protectedRoutes.includes(nextUrl.pathname)) {
        return Response.redirect(new URL("/login", nextUrl))
      }

      if (isLoggedIn && nextUrl.pathname.startsWith("/login")) {
        return Response.redirect(new URL("/dashboard", nextUrl))
      }

      return true
    },
    jwt: ({ token, user }) => {  
      if (user) token.role = user.role
      return token
    },                       
    session: ({ session, token }) => {
  session.user.id = token.sub as string
  session.user.role = token.role as string | undefined
  return session
},
  },
})