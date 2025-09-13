import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from "zod";
import { UseSignin } from '../../api/mutation/AuthMutation.jsx';
import Button from '../../components/ui/Button.jsx';
import useAuthStore from '../../store/useAuthStore';

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }).min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const Signin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const login = useAuthStore(state => state.login);

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const { mutate: signin, isPending } = UseSignin();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data) => {
    signin(data, {
      onSuccess: async (response) => {
        login(response);
        toast.success('Login successful!');

        try {
          await useAuthStore.getState().initAuth();
          const { isOnBoarded, role } = useAuthStore.getState();

          if (!isOnBoarded) {
            const userRole = role?.toLowerCase();
            if (userRole === 'student') {
              navigate('/onboarding/student');
            } else if (userRole === 'mentor') {
              navigate('/onboarding/mentor');
            } else {
              navigate('/');
            }
          } else {
            navigate('/');
          }
        } catch (error) {
          console.error('Failed to get onboarding status:', error);
          navigate('/');
        }
      },
      onError: (error) => {
        toast.error(error.message || 'Login failed. Please try again.');
      }
    });
  };

  return (
    <main className="min-h-screen">
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl">
          <div className="max-w-md mx-auto my-10">

            {/* Header Section */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl mb-6 shadow-2xl">
                <span className="text-lg font-bold text-white">SB</span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 leading-tight">
                Log In to SkillBridge
              </h1>
              <p className="text-sm text-gray-600 font-medium">
                Welcome back! Continue your journey
              </p>
            </div>

            {/* Form Container */}
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-10 backdrop-blur-sm" >
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

                {/* Email Field */}
                <div className="space-y-1">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-6 w-6 text-gray-400" />
                    </div>
                     <input
                       className="flex w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-4 text-sm font-medium placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300 pl-14 h-12"
                       placeholder="Enter your email"
                       type="email"
                       autoComplete="username"
                       {...register("email")}
                     />
                    {errors.email && <p className='text-red-500 text-sm font-medium'>{errors.email.message}</p>}
                  </div>
                </div>

                {/* Password Field with Toggle */}
                <div className="space-y-1">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-6 w-6 text-gray-400" />
                    </div>
                     <input
                       className="flex w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-4 text-sm font-medium placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300 pl-14 pr-14 h-12"
                       placeholder="Enter your password"
                       type={showPassword ? "text" : "password"}
                       autoComplete="current-password"
                       {...register("password")}
                     />
                    {errors.password && <p className='text-red-500 text-sm font-medium'>{errors.password.message}</p>}
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-gray-100 rounded-r-xl transition-colors duration-200"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-6 w-6 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                      ) : (
                        <Eye className="h-6 w-6 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Forgot Password Link */}
                <div className="text-right">
                  <Link
                    to="/forget-password"
                    className="text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors duration-200"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={!isValid || isPending}
                  className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-base font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-200 active:scale-[0.98]"
                >
                  {isPending ? "Logging In..." : "Log In"}
                </Button>
              </form>
            </div>

            {/* Footer Link */}
            <div className="text-center mt-8">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="font-bold text-purple-600 hover:text-purple-700 transition-colors duration-200 underline decoration-2 underline-offset-4"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default Signin;
