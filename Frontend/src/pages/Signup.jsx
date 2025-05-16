import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Eye, Github, Twitter, CircleUser, Lock } from 'lucide-react';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-15 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-purple-600">SkillBridge</h1>
          <p className="my-3 text-xl font-semibold text-gray-900">Create your account</p>
          <p className="text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/Signin" className="text-purple-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4 sm:p-8 border-2 border-gray-300">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <div className="absolute left-3 top-2.5 text-gray-400">
                <CircleUser className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="John"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="relative">
              <div className="absolute left-3 top-2.5 text-gray-400">
                <CircleUser className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Doe"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email address</label>
            <div className="mt-1 relative">
              <div className="absolute left-3 top-2.5 text-gray-400">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1 relative">
              <div className="absolute left-3 top-2.5 text-gray-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="••••••••"
              />
              <Eye
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer ${showPassword ? "text-purple-600" : ""}`}
                onClick={handleShowPassword}
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Password must be at least 8 characters long with a number and a special character.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm password</label>
            <div className="mt-1 relative">
              <div className="absolute left-3 top-2.5 text-gray-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="••••••••"
              />
              <Eye
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer ${showConfirmPassword ? "text-purple-600" : ""}`}
                onClick={handleShowConfirmPassword}
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the{' '}
              <Link to="#" className="text-purple-600 hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="#" className="text-purple-600 hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Create account
          </button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Or sign up with</span>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="flex items-center justify-center w-full border rounded-lg px-4 py-2 text-sm font-medium text-black hover:bg-gray-100">
              <Github className="w-5 h-5 mr-2" /> GitHub
            </button>
            <button className="flex items-center justify-center w-full border rounded-lg px-4 py-2 text-sm font-medium text-black hover:bg-gray-100">
              <Twitter className="w-5 h-5 mr-2" /> Twitter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;