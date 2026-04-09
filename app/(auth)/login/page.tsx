import FormLogin from "@/components/auth/form-login";
import SocialButton from "@/components/auth/social-button";

const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
     <div className="w-full max-w-md p-8 pb-8 rounded-xl shadow-md bg-white">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In Your Account</h1>
        
        <FormLogin />

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">Or continue with</span>
          </div>
        </div>

        <SocialButton />
      </div>
    </div>
  );
};

export default Login;