import React from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button.jsx';

const ForgetPassword = () => {
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
                Reset Your Password
              </h1>
              <p className="text-sm text-gray-600 font-medium">
                Enter your email address and we'll send you a reset link
              </p>
            </div>

            {/* Form Container */}
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-10 backdrop-blur-sm">
              <form className="space-y-4 flex flex-col justify-center items-center w-full h-full">

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
                      id="email"
                      placeholder="Enter your email address"
                      type="email"
                      name="email"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    We'll send password reset instructions to this email
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="md"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-200 active:scale-[0.98]"
                >
                  Send Reset Link
                </Button>

                {/* Back to Login Link */}
                <div className="text-center pt-2 ">
                  <Button
                    onClick={() => window.location.href = "/signin"}
                    variant="none"
                    className="inline-flex items-center text-sm font-medium  transition-colors duration-200 bg-red-500 text-white"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Login
                  </Button>
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
