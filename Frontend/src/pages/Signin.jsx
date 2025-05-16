import React,{ useState } from 'react';
import { Mail, Eye, Github, Twitter } from 'lucide-react';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-[#7c3aed]">SkillBridge</h1>
          <p className="my-3 text-xl font-semibold text-gray-900">Sign in to your account</p>
          <p className="text-md text-gray-500">
            Or{' '}
            <Link to="/signup" className="text-[#7c3aed] hover:underline">
              create a new account
            </Link>
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4 sm:p-8 border-2 border-gray-300">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email address</label>
            <div className="mt-1 relative">
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gradient-primary"
              />
              <Mail className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1 relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gradient-primary"
                placeholder="********"
              />
              <Eye
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer ${showPassword ? "text-purple-600" : ""}`}
                onClick={handleShowPassword}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox" />
              <span>Remember me</span>
            </label>
            <Link to="/Forgot-Password" className="text-[#7c3aed] hover:underline">
              Forgot your password?
            </Link>
          </div>

          <Button
            Variant="primary"
            size="small"
            className="w-full bg-gradient-primary text-white items-center"
          >
            Sign in
          </Button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
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

        <p className="mt-6 text-center text-sm text-gray-500">
          By signing in, you agree to our{' '}
          <Link to="#" className="text-[#7c3aed] hover:underline">
            Terms of Service
          </Link>
          and
          <Link to="#" className="text-[#7c3aed] hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Signin;

