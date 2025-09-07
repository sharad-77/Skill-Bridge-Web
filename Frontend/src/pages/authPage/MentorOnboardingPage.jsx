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
  Image as ImageIcon,
} from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import { z } from "zod";
import { UseMentorOnboard } from "../../api/mutation/AuthMutation";
import useAuthStore from "../../store/useAuthStore";
import { useState } from "react";
import Button from '../../components/ui/Button';

const mentorSchema = z.object({
  introduction: z.string().min(1, "Introduction is required"),
  location: z.string().min(1, "Location is required"),
  currentPosition: z.string().min(1, "Current position is required"),
  yearsOfExperience: z.coerce.number().min(1, "Years of experience is required"),
  expertise: z
    .string()
    .min(1, "At least one expertise is required")
    .transform((str) => str.split(',').map(expertise => expertise.trim()).filter(expertise => expertise.length > 0))
    .refine((arr) => arr.length > 0, "At least one expertise is required"),
  socialMedia: z.array(
    z.object({
      name: z.string().min(1, "Platform name is required"),
      url: z.string().url("Invalid URL"),
    })
  ).min(1, "At least one social media link is required"),
  availability: z.string().min(1, "Availability is required"),
});

const MentorOnBoarding = () => {
  const navigate = useNavigate();
  const mentorOnboard = UseMentorOnboard();
  const { setOnBoardingStatus } = useAuthStore();
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(mentorSchema),
    mode: "onChange",
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error("Please select an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }

      setSelectedFile(file); // Store raw file
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result); // For preview only
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setImagePreview(null);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('introduction', data.introduction);
    formData.append('location', data.location);
    formData.append('currentPosition', data.currentPosition);
    formData.append('yearsOfExperience', data.yearsOfExperience.toString());
    formData.append('expertise', JSON.stringify(data.expertise));
    formData.append('socialMedia', JSON.stringify(data.socialMedia));
    formData.append('availability', data.availability);
    if (selectedFile) {
      formData.append('profileImage', selectedFile);
    } else {
      console.log('No file selected');
    }

    mentorOnboard.mutate(formData, {
      onSuccess: (response) => {
        toast.success("Mentor profile created successfully!");
        setOnBoardingStatus(true);
        navigate("/");
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || "Mentor profile creation failed");
        console.error('Mutation Error:', error);
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
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            {/* Profile Image */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Profile Image
              </label>
              <div className="relative">
                <ImageIcon className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  name="profileImage" // Added name attribute
                  className="pl-10 w-full border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 border-gray-300 focus:border-purple-500 focus:ring-purple-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                />
              </div>
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Profile preview"
                    className="w-32 h-32 object-cover rounded-full border border-gray-200"
                  />
                </div>
              )}
            </div>

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
