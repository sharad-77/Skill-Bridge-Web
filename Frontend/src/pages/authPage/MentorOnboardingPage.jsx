import { zodResolver } from "@hookform/resolvers/zod";
import {
  Award,
  Briefcase,
  Clock,
  Link as LinkIcon,
  MapPin,
  Plus,
  Tag,
  User,
} from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import { z } from "zod";
import { UseMentorOnboard } from "../../api/mutation/AuthMutation";
import useAuthStore from "../../store/useAuthStore";

import Button from '../../components/ui/Button';

const mentorSchema = z.object({
  introduction: z.string(),
  location: z.string(),
  currentPosition: z.string(),
  yearsOfExperience: z.coerce.number(),
  expertise: z.string()
    .min(1, "At least one expertise is required")
    .transform((str) => str.split(',').map(expertise => expertise.trim()).filter(expertise => expertise.length > 0))
    .refine((arr) => arr.length > 0, "At least one expertise is required"),
  socialMedia: z.array(z.object({
    name: z.string(),
    url: z.string().url(),
  })),
  availability: z.string()
});

const MentorOnBoarding = () => {
  const navigate = useNavigate();
  const mentorOnboard = UseMentorOnboard();
  const { setOnBoardingStatus } = useAuthStore();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(mentorSchema),
    defaultValues: {
      introduction: "",
      location: "",
      currentPosition: "",
      yearsOfExperience: "",
      expertise: "",
      availability: "",
      socialMedia: [{ name: "", url: "" }],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "socialMedia",
  });

  const onSubmit = async (data) => {
    mentorOnboard.mutate(data, {
      onSuccess: (response) => {
        toast.success("Mentor profile created successfully!");
        setOnBoardingStatus(true);
        navigate("/");
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || "Mentor profile creation failed");
        console.error(error);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-4 shadow-lg">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Complete Your Mentor Profile
          </h1>
          <p className="text-gray-600">
            Share your expertise to help students grow
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Introduction */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Introduction
              </label>
              <div className="relative">
                <User className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                <textarea
                  rows="4"
                  placeholder="Tell us about your background..."
                  className="w-full pl-10 pr-3 py-3 border rounded-lg resize-none transition-all duration-200 focus:outline-none focus:ring-2 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  {...register("introduction")}
                />
              </div>
              {errors.introduction && (
                <span className="text-red-500">{errors.introduction.message}</span>
              )}
            </div>

            {/* Location & Current Position */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Location */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Location</label>
                <div className="relative">
                  <MapPin className="absolute inset-y-0 left-0 pl-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    className="pl-10 h-12 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200"
                    {...register("location")}
                  />
                </div>
                {errors.location && (
                  <span className="text-red-500">{errors.location.message}</span>
                )}
              </div>

              {/* Position */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Current Position
                </label>
                <div className="relative">
                  <Briefcase className="absolute inset-y-0 left-0 pl-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    className="pl-10 h-12 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200"
                    {...register("currentPosition")}
                  />
                </div>
                {errors.currentPosition && (
                  <span className="text-red-500">{errors.currentPosition.message}</span>
                )}
              </div>
            </div>

            {/* Years of Experience */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Years of Experience
              </label>
              <div className="relative">
                <Award className="absolute inset-y-0 left-0 pl-3 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  min="1"
                  max="50"
                  placeholder="5"
                  className="pl-10 h-12 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200"
                  {...register("yearsOfExperience")}
                />
              </div>
              {errors.yearsOfExperience && (
                <span className="text-red-500">{errors.yearsOfExperience.message}</span>
              )}
            </div>

            {/* Expertise */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Expertise</label>
              <div className="relative">
                <Tag className="absolute inset-y-0 left-0 pl-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="React, Node.js, Leadership..."
                  className="pl-10 h-12 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200"
                  {...register("expertise")}
                />
              </div>
              {errors.expertise && (
                <span className="text-red-500">{errors.expertise.message}</span>
              )}
            </div>

            {/* Availability */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Availability</label>
              <div className="relative">
                <Clock className="absolute inset-y-0 left-0 pl-3 h-5 w-5 text-gray-400" />
                <select
                  className="pl-10 pr-3 py-3 h-12 w-full rounded-lg border border-gray-300 bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:border-purple-500 focus:ring-purple-500"
                  {...register("availability")}
                >
                  <option value="">Select your availability</option>
                  <option value="Weekdays">Weekdays (9 AM - 5 PM)</option>
                  <option value="Evenings">Evenings (6 PM - 9 PM)</option>
                  <option value="Weekends">Weekends</option>
                  <option value="Flexible">Flexible</option>
                  <option value="By appointment">By appointment</option>
                </select>
              </div>
              {errors.availability && (
                <span className="text-red-500">{errors.availability.message}</span>
              )}
            </div>

            {/* Social Media Links */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-gray-700">
                  Social Media Links
                </label>
                <button
                  type="button"
                  onClick={() => append({ name: "", url: "" })}
                  className="inline-flex items-center text-sm px-3 py-1.5 border border-purple-200 rounded-md text-purple-600 hover:bg-purple-50 transition"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Link
                </button>
              </div>

              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="relative">
                    <LinkIcon className="absolute inset-y-0 left-0 pl-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Platform name (e.g., LinkedIn)"
                      className="pl-10 h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                      {...register(`socialMedia.${index}.name`)}
                    />
                    {errors.socialMedia?.[index]?.name && (
                      <span className="text-red-500">{errors.socialMedia[index].name?.message}</span>
                    )}
                  </div>
                  <div>
                    <input
                      type="url"
                      placeholder="https://..."
                      className="h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                      {...register(`socialMedia.${index}.url`)}
                    />
                    {errors.socialMedia?.[index]?.url && (
                      <span className="text-red-500">{errors.socialMedia[index].url?.message}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              isLoading={mentorOnboard.isPending}
              className="w-full h-12 px-4 py-2 text-white font-semibold rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg"
            >
              {mentorOnboard.isPending ? "Creating Profile..." : "Create Mentor Profile"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MentorOnBoarding;
