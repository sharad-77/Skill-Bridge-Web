import React, { useEffect } from 'react';
import { Github, Linkedin, Twitter, Globe, Lock, Save, User, Shield, Link } from 'lucide-react';
import Button from '../ui/Button';
import { useNavigate } from 'react-router';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useGetUserProfile } from "../../api/query/UserQuery";
import { useUpdateAccountSettings } from "../../api/mutation/UserMutation";
import useAuthStore from "../../store/useAuthStore";
import { toast } from "sonner";

const accountSettingsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  location: z.string().optional(),
  introduction: z.string().optional(),
  github: z.string().url().optional().or(z.literal('')),
  linkedin: z.string().url().optional().or(z.literal('')),
  twitter: z.string().url().optional().or(z.literal('')),
  portfolio: z.string().url().optional().or(z.literal('')),
});


export default function SettingsPage() {
  const navigate = useNavigate();

  const { userId } = useAuthStore();
  const { data: profile } = useGetUserProfile(userId);
  const updateMutation = useUpdateAccountSettings();
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    resolver: zodResolver(accountSettingsSchema),
  });

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name || '');
      setValue('email', profile.email || '');
      setValue('location', profile.location || '');
      setValue('introduction', profile.introduction || '');
      const github = profile.socialMedia?.find(s => s.Name === 'GitHub')?.URL || '';
      const linkedin = profile.socialMedia?.find(s => s.Name === 'LinkedIn')?.URL || '';
      const twitter = profile.socialMedia?.find(s => s.Name === 'Twitter')?.URL || '';
      const portfolio = profile.socialMedia?.find(s => s.Name === 'Portfolio')?.URL || '';
      setValue('github', github);
      setValue('linkedin', linkedin);
      setValue('twitter', twitter);
      setValue('portfolio', portfolio);
    }
  }, [profile, setValue]);

  const onSubmit = (data) => {
    const socialMedia = [
      { Name: 'GitHub', URL: data.github },
      { Name: 'LinkedIn', URL: data.linkedin },
      { Name: 'Twitter', URL: data.twitter },
      { Name: 'Portfolio', URL: data.portfolio },
    ].filter(item => item.URL);
    updateMutation.mutate({
      name: data.name,
      email: data.email,
      location: data.location,
      introduction: data.introduction,
      socialMedia,
    }, {
      onSuccess: () => toast.success("Settings updated successfully"),
      onError: (err) => toast.error("Failed to update settings"),
    });
  };

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
             {/* Name */}
             <div className="space-y-2">
               <label className="text-sm font-medium text-gray-700">Full Name</label>
               <input
                 type="text"
                 className="w-full h-11 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all duration-200 outline-none"
                 placeholder="Enter your full name"
                 {...register("name")}
               />
               {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
             </div>

             {/* Email */}
             <div className="space-y-2">
               <label className="text-sm font-medium text-gray-700">Email Address</label>
               <input
                 type="email"
                 className="w-full h-11 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all duration-200 outline-none"
                 placeholder="Enter your email address"
                 {...register("email")}
               />
               {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
             </div>

             {/* Location */}
             <div className="space-y-2">
               <label className="text-sm font-medium text-gray-700">Location</label>
               <input
                 type="text"
                 className="w-full h-11 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all duration-200 outline-none"
                 placeholder="Enter your location"
                 {...register("location")}
               />
             </div>

             {/* Bio */}
             <div className="space-y-2">
               <label className="text-sm font-medium text-gray-700">Bio</label>
               <textarea
                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all duration-200 outline-none resize-none"
                 rows="4"
                 placeholder="Tell us about yourself..."
                 {...register("introduction")}
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
                 {...register("github")}
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
                 {...register("linkedin")}
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
                 {...register("twitter")}
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
                 {...register("portfolio")}
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
               navigate("/forget-password")
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
               onClick={reset}
             >
               Cancel
             </Button>
             <Button
               variant="default"
               size="md"
               leftIcon={<Save className="h-4 w-4" />}
               className="shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
               onClick={handleSubmit(onSubmit)}
               disabled={updateMutation.isPending}
             >
               {updateMutation.isPending ? "Saving..." : "Save All Changes"}
             </Button>
           </div>
         </div>
    </div>
  );
}
