import Link from "next/link"
import Image from "next/image"
import { auth, signOut } from "../lib/auth"

const Navbar = async () => {
  const session = await auth()

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        
        {/* LOGO */}
<Link href="/" className="flex items-center gap-3">
  <div className="relative w-12 h-12">
    <Image
      src="/halo.png"
      alt="Logo"
      fill
      priority
      className="rounded-full object-cover"
    />
  </div>

  <span className="font-semibold text-lg">
    PT. JAYA RIZKI ALEXANDRA
  </span>
</Link>
        {/* MENU */}
        <div className="flex items-center gap-6">
          <ul className="hidden md:flex items-center gap-5 font-semibold text-gray-600">
            <li><Link href="/">Home</Link></li>
            {session && (
              <>
               <li><Link href="/product">Product</Link></li>
            <li><Link href="/dashboard">Dashboard</Link></li>
            {session.user.role ==="admin" ?( <li><Link href="/user">Users</Link></li>) : null}
           
              </>
            )}
           
          </ul>

          {/* USER INFO */}
          {session && (
            <div className="flex items-center gap-3">
              
              {/* TEXT */}
              <div className="flex flex-col items-end leading-tight">
                <span className="font-semibold text-gray-700 capitalize">
                  {session.user.name}
                </span>
                <span className="text-xs text-gray-400 capitalize">
                  {session.user.role || "user"}
                </span>
              </div>

              {/* AVATAR */}
              <Image
                src={session.user.image || "/next.svg"}
                alt="Avatar"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>
          )}

       {session ? (
  <form
    action={async () => {
      "use server"
      await signOut()
    }}
  >
    <button
      type="submit"
      className="relative inline-flex items-center gap-2 px-4 py-2 text-sm font-medium 
      text-white bg-gradient-to-r from-red-500 to-red-600 
      rounded-lg shadow-sm transition-all duration-200 
      hover:from-red-600 hover:to-red-700 hover:shadow-md 
      active:scale-95"
    >
      <span>Logout</span>
    </button>
  </form>
) : (
  <Link
    href="/login"
    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium 
    text-white bg-gradient-to-r from-blue-500 to-blue-600 
    rounded-lg shadow-sm transition-all duration-200 
    hover:from-blue-600 hover:to-blue-700 hover:shadow-md 
    active:scale-95"
  >
    Login
  </Link>
)}
        </div>
      </div>
    </nav>
  )
}

export default Navbar