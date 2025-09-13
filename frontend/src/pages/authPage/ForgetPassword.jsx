import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';
import Button from '../../components/ui/Button.jsx';
import { UseChangePassword } from '../../api/mutation/AuthMutation.jsx';

const forgetPasswordSchema = z.object({
  oldPassword: z.string().min(1, { message: "Current password is required" }),
  newPassword: z.string()
    .min(6, { message: "New password must be at least 6 characters" })
    .max(32, { message: "Password must be less than 32 characters" }),
}).refine((data) => data.oldPassword !== data.newPassword, {
  message: "New password must be different from current password",
  path: ["newPassword"],
});


const ForgetPassword = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    resolver: zodResolver(forgetPasswordSchema),
    mode: "onChange",
  });
  const useChangePassword = UseChangePassword();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const toggleOldPasswordVisibility = () => setShowOldPassword((prev) => !prev);
  const toggleNewPasswordVisibility = () => setShowNewPassword((prev) => !prev);

  const onSubmit = async (data) => {
    useChangePassword.mutate(data, {
      onSuccess: (res) => {
        toast.success("Password changed successfully!");
        navigate("/signin");
      }, onError: (err) => {
        toast.error("Failed to change password");
        console.error(err)
      }
    })
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
                Change Your Password
              </h1>
              <p className="text-sm text-gray-600 font-medium">
                Enter your current password and create a new secure password
              </p>
            </div>

            {/* Form Container */}
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-10 backdrop-blur-sm">
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <input type="text" autoComplete="username" style={{ display: 'none' }} />

                {/* Current Password Field */}
                <div className="space-y-2">
                  <label htmlFor="oldPassword" className="block text-sm font-semibold text-gray-800">
                    Current Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-6 w-6 text-gray-400" />
                    </div>
                     <input
                       className="flex w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-4 text-sm font-medium placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300 pl-14 pr-14 h-12"
                       id="oldPassword"
                       placeholder="Enter your current password"
                       type={showOldPassword ? "text" : "password"}
                       autoComplete="current-password"
                       {...register("oldPassword")}
                     />
                    <button
                      type="button"
                      onClick={toggleOldPasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-gray-100 rounded-r-xl transition-colors duration-200"
                      aria-label={showOldPassword ? "Hide password" : "Show password"}
                    >
                      {showOldPassword ? (
                        <EyeOff className="h-6 w-6 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                      ) : (
                        <Eye className="h-6 w-6 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                      )}
                    </button>
                  </div>
                  {errors.oldPassword && (
                    <p className='text-red-500 text-sm font-medium'>{errors.oldPassword.message}</p>
                  )}
                </div>

                {/* New Password Field */}
                <div className="space-y-2">
                  <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-800">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-6 w-6 text-gray-400" />
                    </div>
                     <input
                       className="flex w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-4 text-sm font-medium placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300 pl-14 pr-14 h-12"
                       id="newPassword"
                       placeholder="Enter your new password"
                       type={showNewPassword ? "text" : "password"}
                       autoComplete="new-password"
                       {...register("newPassword")}
                     />
                    <button
                      type="button"
                      onClick={toggleNewPasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-gray-100 rounded-r-xl transition-colors duration-200"
                      aria-label={showNewPassword ? "Hide password" : "Show password"}
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-6 w-6 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                      ) : (
                        <Eye className="h-6 w-6 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                      )}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className='text-red-500 text-sm font-medium'>{errors.newPassword.message}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    Password must be at least 6 characters and different from current password
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={!isValid}
                  className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-base font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  Change Password
                </Button>

                {/* Back to Login Link */}
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => navigate("/signin")}
                    className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors duration-200 hover:bg-purple-50 px-4 py-2 rounded-lg"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Login
                  </button>
                </div>

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

export default ForgetPassword;
