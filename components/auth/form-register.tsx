"use client"
import { useActionState } from "react"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { signUpCredentials } from "@/lib/action"
import { RegisterButton } from "../button"

const getInputClass = (error?: string[]) =>
  `bg-gray-50 border text-gray-900 sm:text-sm rounded-lg w-full p-2.5 transition-all duration-200 ${
    error
      ? "border-red-500 bg-red-50 focus:ring-red-500"
      : "border-gray-300 focus:ring-blue-500"
  }`

const getError = (field?: string[]) => field?.[0]

const FormRegister = () => {
  const [state, formAction] = useActionState(signUpCredentials, null)

  // ✅ pindahin ke dalam component
  const [show, setShow] = useState({
    password: false,
    confirm: false,
  })

  const toggle = (field: "password" | "confirm") => {
    setShow((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  return (
    <form action={formAction} className="space-y-4 md:space-y-6">

      {/* MESSAGE */}
      {state?.message && (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100">
          {state.message}
        </div>
      )}

      {/* NAME */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">Name</label>
        <input
          type="text"
          name="name"
          placeholder="rehan"
          className={getInputClass(state?.error?.name)}
        />
        <span className="text-sm text-red-600 mt-2 block">
          {getError(state?.error?.name)}
        </span>
      </div>

      {/* EMAIL */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
        <input
          type="email"
          name="email"
          placeholder="rehan@gmail.com"
          className={getInputClass(state?.error?.email)}
        />
        <span className="text-sm text-red-600 mt-2 block">
          {getError(state?.error?.email)}
        </span>
      </div>

    {/* PASSWORD */}
<div className="relative">
  <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
  <input
    type={show.password ? "text" : "password"}
    name="password"
    placeholder="*****"
    className={getInputClass(state?.error?.password) + " pr-10"}
  />

  <button
    type="button"
    onClick={() => toggle("password")}
    className="absolute right-3 top-9 text-gray-400 hover:text-blue-600 transition active:scale-75"
  >
    <span
      className={`inline-block transition-transform duration-200 ${
        show.password ? "rotate-180 scale-110" : "rotate-0"
      }`}
    >
      {show.password ? <EyeOff size={18} /> : <Eye size={18} />}
    </span>
  </button>

  <span className="text-sm text-red-600 mt-2 block">
    {getError(state?.error?.password)}
  </span>
</div>

{/* CONFIRM PASSWORD */}
<div className="relative">
  <label className="block mb-2 text-sm font-medium text-gray-900">
    Confirm Password
  </label>
  <input
    type={show.confirm ? "text" : "password"}
    name="confirmPassword"
    placeholder="*****"
    className={getInputClass(state?.error?.confirmPassword) + " pr-10"}
  />

  <button
    type="button"
    onClick={() => toggle("confirm")}
    className="absolute right-3 top-9 text-gray-400 hover:text-blue-600 transition active:scale-75"
  >
    <span
      className={`inline-block transition-transform duration-200 ${
        show.confirm ? "rotate-180 scale-110" : "rotate-0"
      }`}
    >
      {show.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
    </span>
  </button>

  <span className="text-sm text-red-600 mt-2 block">
    {getError(state?.error?.confirmPassword)}
  </span>
</div>
<RegisterButton/>

      {/* LINK */}
      <p className="text-sm text-gray-500">
        Already have any account?
        <Link href="/login">
          <span className="pl-1 text-blue-600 hover:text-blue-700 font-medium">
            Sign In
          </span>
        </Link>
      </p>
    </form>
  )
}

export default FormRegister