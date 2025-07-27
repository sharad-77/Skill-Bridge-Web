import React from 'react';
import { Github, Linkedin, Twitter, Globe, Lock, Save, User, Shield, Link } from 'lucide-react';
import Button from '../ui/Button';
import { useNavigate } from 'react-router';


export default function SettingsPage() {
  const navigate = useNavigate();
  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      {/* Personal Information */}
      <section className="group">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex flex-col items-center space-x-3 mb-8">
            <div className="p-2 bg-blue-50 rounded-lg">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
              <p className="text-sm text-gray-500">Update your personal details and profile</p>
            </div>
          </div>

          <div className="space-y-6 text-left">
            {/* Name Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  className="w-full h-11 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all duration-200 outline-none"
                  defaultValue="John"
                  placeholder="Enter your first name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  className="w-full h-11 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all duration-200 outline-none"
                  defaultValue="Doe"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                className="w-full h-11 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all duration-200 outline-none"
                defaultValue="john.doe@email.com"
                placeholder="Enter your email address"
              />
            </div>

            {/* Phone & Location Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="text"
                  className="w-full h-11 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all duration-200 outline-none"
                  defaultValue="+1 (555) 123-4567"
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  className="w-full h-11 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all duration-200 outline-none"
                  defaultValue="San Francisco, CA"
                  placeholder="Enter your location"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Bio</label>
              <textarea
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all duration-200 outline-none resize-none"
                rows="4"
                defaultValue="Passionate software developer with a love for learning and building innovative solutions. Always eager to take on new challenges and collaborate with others."
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="group">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex flex-col items-center space-x-3 mb-8">
            <div className="p-2 bg-green-50 rounded-lg">
              <Link className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Social Links</h2>
              <p className="text-sm text-gray-500">Connect your social media profiles</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Github className="h-4 w-4 mr-2 text-gray-900" />
                GitHub
              </label>
              <input
                className="w-full h-11 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all duration-200 outline-none"
                placeholder="https://github.com/username"
                defaultValue="https://github.com/johndoe"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Linkedin className="h-4 w-4 mr-2 text-blue-600" />
                LinkedIn
              </label>
              <input
                className="w-full h-11 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all duration-200 outline-none"
                placeholder="https://linkedin.com/in/username"
                defaultValue="https://linkedin.com/in/johndoe"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Twitter className="h-4 w-4 mr-2 text-sky-500" />
                Twitter
              </label>
              <input
                className="w-full h-11 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all duration-200 outline-none"
                placeholder="https://twitter.com/username"
                defaultValue="https://twitter.com/johndoe"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Globe className="h-4 w-4 mr-2 text-purple-600" />
                Portfolio Website
              </label>
              <input
                className="w-full h-11 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all duration-200 outline-none"
                placeholder="https://yourportfolio.com"
                defaultValue="https://johndoe.dev"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Security Settings */}
      <section className="group">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex flex-col items-center space-x-3 mb-8">
            <div className="p-2 bg-red-50 rounded-lg">
              <Shield className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
              <p className="text-sm text-gray-500">Manage your account security</p>
            </div>
          </div>

          <Button
            variant="outline"
            size="md"
            leftIcon={<Lock className="h-4 w-4" />}
            className="w-full md:w-auto"
            onClick={() => {
              navigate("/ForgetPassword")
            }}
          >
            Change Password
          </Button>
        </div>
      </section>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
        <div className="text-sm text-gray-500">
          Changes will be saved to your account
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            size="md"
          >
            Cancel
          </Button>
          <Button
            variant="default"
            size="md"
            leftIcon={<Save className="h-4 w-4" />}
            className="shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Save All Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
