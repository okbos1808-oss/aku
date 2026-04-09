

import { signIn } from "@/lib/auth";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const SocialButton = () => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/dashboard" });
        }}
      >
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <FcGoogle size={20} />
          Sign in with Google
        </button>
      </form>

      <form
        action={async () => {
          "use server";
          await signIn("github", { redirectTo: "/dashboard" });
        }}
      >
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <FaGithub size={20} />
          Sign in with GitHub
        </button>
      </form>
    </div>
  );
};

export default SocialButton;