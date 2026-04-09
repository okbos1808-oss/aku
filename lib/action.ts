"use server"

import { registerSchema, SignInSchema } from "@/lib/zod"
import { hashSync } from "bcrypt-ts"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { signIn } from "@/lib/auth"

type FormState = {
  message?: string
  error?: {
    name?: string[]
    email?: string[]
    password?: string[]
    confirmPassword?: string[]
    general?: string[]
  }
}

// REGISTER
export const signUpCredentials = async (
  prevState: FormState | null,
  formData: FormData
): Promise<FormState> => {
  const validatedData = registerSchema.safeParse(
    Object.fromEntries(formData.entries())
  )

  if (!validatedData.success) {
    return { error: validatedData.error.flatten().fieldErrors }
  }

  const { name, email, password } = validatedData.data

  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    return { error: { email: ["Email sudah digunakan"] } }
  }

  const hashedPassword = hashSync(password, 10)

  try {
    await prisma.user.create({
      data: { name, email, password: hashedPassword },
    })
  } catch (error) {
    console.error("DB ERROR:", error)
    return { error: { general: ["Terjadi kesalahan pada server"] } }
  }

  redirect("/login")
}

// LOGIN
export const signInCredentials = async (
  prevState: FormState | null,
  formData: FormData
): Promise<FormState> => {
  const validatedFields = SignInSchema.safeParse(
    Object.fromEntries(formData.entries())
  )

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors }
  }

  const { email, password } = validatedFields.data

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    })
    return {}
  } catch (error) {
    // ✅ Re-throw jika ini redirect dari Next.js (bukan error login)
    if (
      typeof error === "object" &&
      error !== null &&
      "digest" in error &&
      typeof (error as { digest: string }).digest === "string" &&
      (error as { digest: string }).digest.startsWith("NEXT_REDIRECT")
    ) {
      throw error
    }

    console.log("LOGIN ERROR:", error)
    return { error: { general: ["Email atau password salah"] } }
  }
}