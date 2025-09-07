import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail, User, UserCheck } from 'lucide-react';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from "zod";
import { UseSignup } from '../../api/mutation/AuthMutation.jsx';
import Button from '../../components/ui/Button';

const signupSchema = z.object({
  name: z.string().max(50),
  password: z.string().min(6).max(32),
  email: z.string().max(100).email(),
  role: z.enum(["student", "mentor"])
});

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm(
    { resolver: zodResolver(signupSchema) }
  );
  const signup = UseSignup();

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data) => {
    signup.mutate(data, {
      onSuccess: (res) => {
        toast.success('Signup successful!');
        navigate("/signin")
      },
      onError: (err) => {
        toast.error(err.response?.data?.message || "Signup Failed");
        console.error(err);
      }
    })
  }

  return (
    <main className="min-h-screen">
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl my-10">
          <div className="max-w-md mx-auto">
            {/* Header Section */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl mb-6 shadow-2xl">
                <span className="text-lg font-bold text-white">SB</span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 leading-tight">
                Create Your SkillBridge Account
              </h1>
              <p className="text-sm text-gray-600 font-medium">
                Join thousands of learners and mentors
              </p>
            </div>

            {/* Form Container */}
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-10 backdrop-blur-sm">
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

                {/* Full Name Field */}
                <div className="">
                  <label htmlFor="fullName" className="block text-sm font-semibold text-gray-800">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      className="flex w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4  text-sm font-medium placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300 pl-14 h-12"
                      type="text"
                      placeholder='FullName'
                      {...register("name", { required: true })}
                    />
                    {errors.name && <p className='text-md font-medium text-red-500'>{errors.name.message}</p>}
                  </div>
                </div>

                {/* Email Field */}
                <div className="">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      className="flex w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4  text-sm font-medium placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300 pl-14 h-12"
                      placeholder="Enter your email"
                      type="text"
                      {...register("email", { required: true })}
                    />
                    {errors.email && <p className='text-md font-medium text-red-500'>{errors.email.message}</p>}
                  </div>
                </div>

                {/* Password Field with Toggle */}
                <div className="">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      className="flex w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4  text-sm font-medium placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300 pl-14 pr-14 h-12"
                      placeholder="Create a strong password"
                      type={showPassword ? "text" : "password"} // Dynamic type based on state
                      {...register("password", { required: true })}
                    />
                    {errors.password && <p className='text-md font-medium text-red-500'>{errors.password?.message}</p>}
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-gray-100 rounded-r-xl transition-colors duration-200"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Role Selection Field */}
                <div className="">
                  <label htmlFor="role" className="block text-sm font-semibold text-gray-800">
                    Select Role
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <UserCheck className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      className="w-full pl-14 pr-4 h-12 border-2 border-gray-200 rounded-xl bg-gray-50 text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500"
                      {...register("role", { required: true })}
                    >
                      <option value="">Choose your role</option>
                      <option value="student">Student - I want to learn</option>
                      <option value="mentor">Mentor - I want to teach</option>
                    </select>
                  </div>
                  {errors.role && <p className='text-red-500 text-md font-medium'>{errors.role.message}</p>}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={signup.isPending}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-200 active:scale-[0.98]"
                >
                  {signup.isPending ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </div>

            {/* Footer Link */}
            <div className="text-center mt-8">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link
                  to="/signin"
                  className="font-bold text-purple-600 hover:text-purple-700 transition-colors duration-200 underline decoration-2 underline-offset-4"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
