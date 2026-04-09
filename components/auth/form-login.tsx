"use client"

import { useActionState, useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { signInCredentials } from "@/lib/action"
import { LoginButton } from "../button1"

type FormState = {
  error?: {
    email?: string[]
    password?: string[]
  }
}

const getInputClass = (error?: string[]) =>
  `bg-gray-50 border text-gray-900 sm:text-sm rounded-lg w-full p-2.5 transition-all duration-200 ${
    error
      ? "border-red-500 bg-red-50 focus:ring-red-500"
      : "border-gray-300 focus:ring-blue-500"
  }`

const getError = (field?: string[]) => field?.[0]

const FormLogin = () => {
  const [state, formAction] = useActionState<FormState, FormData>(
    signInCredentials,
    { error: {} }
  )

  const [showPassword, setShowPassword] = useState(false)

  return (
    <form action={formAction} autoComplete="off" className="space-y-4 md:space-y-6">
      
      {/* EMAIL */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Email
        </label>
        <input
          suppressHydrationWarning
          type="email"
          name="email"
          placeholder="rehan@gmail.com"
          autoComplete="off"
          className={getInputClass(state?.error?.email)}
        />
        <span className="text-sm text-red-600 mt-2 block">
          {getError(state?.error?.email)}
        </span>
      </div>

      {/* PASSWORD */}
      <div className="relative">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Password
        </label>

        <input
          suppressHydrationWarning
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="*****"
          autoComplete="new-password"
          className={`${getInputClass(state?.error?.password)} pr-10`}
        />

        <button
          type="button"
          onClick={() => setShowPassword(prev => !prev)}
          className="absolute right-3 top-9 text-gray-400 hover:text-blue-600 transition active:scale-75"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>

        <span className="text-sm text-red-600 mt-2 block">
          {getError(state?.error?.password)}
        </span>
      </div>

      {/* BUTTON */}
      <LoginButton />

      {/* LINK */}
      <p className="text-sm text-gray-500">
        Don&apos;t have an account?
        <Link href="/register">
          <span className="pl-1 text-blue-600 hover:text-blue-700 font-medium">
            Sign Up Here
          </span>
        </Link>
      </p>
    </form>
  )
}

export default FormLogin