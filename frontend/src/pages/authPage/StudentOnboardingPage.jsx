import { zodResolver } from "@hookform/resolvers/zod";
import {
  Calendar,
  GraduationCap,
  Image as ImageIcon,
  Link as LinkIcon,
  MapPin,
  Plus,
  Tag,
  User,
} from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import { z } from "zod";
import { UseStudentOnboard } from "../../api/mutation/AuthMutation";
import Button from '../../components/ui/Button';
import useAuthStore from "../../store/useAuthStore";

const studentSchema = z.object({
  introduction: z.string().min(1, "Introduction is required"),
  location: z.string().min(1, "Location is required"),
  instituteName: z.string().min(1, "Institute name is required"),
  gradYear: z.coerce.number().min(2020, "Invalid graduation year").max(2050, "Invalid graduation year"),
  interestedSkills: z.string()
    .min(1, "At least one skill is required")
    .transform((str) => {
      const skills = str.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0);
      return skills;
    })
    .refine((arr) => arr.length > 0, "At least one skill is required"),
  socialMedia: z.array(z.object({
    name: z.string().min(1, "Platform name is required"),
    url: z.string().url("Invalid URL format"),
  })).optional().default([]),
  profileImage: z.any().optional(),
});

const StudentOnBoarding = () => {
  const navigate = useNavigate();
  const studentOnboard = UseStudentOnboard();
  const { setOnBoardingStatus } = useAuthStore();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(studentSchema),
    mode: "onChange",
    defaultValues: {
      introduction: "",
      location: "",
      instituteName: "",
      gradYear: new Date().getFullYear() + 1,
      interestedSkills: "",
      socialMedia: [],
      profileImage: null,
    },
  });

  const { fields, append, remove } = useFieldArray({
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

      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('introduction', data.introduction.trim());
    formData.append('location', data.location.trim());
    formData.append('instituteName', data.instituteName.trim());
    formData.append('gradYear', String(data.gradYear));
    const interestedSkillsString = Array.isArray(data.interestedSkills)
      ? data.interestedSkills.join(',')
      : data.interestedSkills.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0).join(',');
    formData.append('interestedSkills', interestedSkillsString);
    formData.append('socialMedia', JSON.stringify(data.socialMedia));
    if (imageFile) {
      formData.append('profileImage', imageFile);
    }

    studentOnboard.mutate(formData, {
      onSuccess: (response) => {
        toast.success("Student profile created successfully!");
        setOnBoardingStatus(true);
        navigate("/");
      },
      onError: (error) => {
        console.error("Submission error:", error);
        console.error("Error response:", error.response?.data);

        console.log("Full error details:", error.response?.data);
        const errorMessage = error.response?.data?.message ||
          error.response?.data?.errors?.map(err => `${err.field}: ${err.message}`).join(', ') ||
          "Student profile creation failed";

        toast.error(errorMessage);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-4 shadow-lg">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Complete Your Student Profile
          </h1>
          <p className="text-gray-600">
            Tell us about yourself to get personalized recommendations
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Profile Image */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Profile Image (Optional)
              </label>
              <div className="relative">
                <ImageIcon className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
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
              {errors.profileImage && (
                <span className="text-red-500 text-sm">{errors.profileImage.message}</span>
              )}
            </div>

            {/* Introduction */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Introduction *
              </label>
              <div className="relative">
                <User className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                <textarea
                  rows="4"
                  placeholder="Tell us about yourself, your goals, and what you're passionate about..."
                  className="w-full pl-10 pr-3 py-3 border rounded-lg resize-none transition-all duration-200 focus:outline-none focus:ring-2 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  {...register("introduction")}
                />
              </div>
              {errors.introduction && (
                <span className="text-red-500 text-sm">{errors.introduction.message}</span>
              )}
            </div>

            {/* Location & Institute */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Location */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Location *</label>
                <div className="relative">
                  <MapPin className="absolute top-1/2 transform -translate-y-1/2 left-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="City, Country"
                    className="pl-10 h-12 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200"
                    {...register("location")}
                  />
                </div>
                {errors.location && (
                  <span className="text-red-500 text-sm">{errors.location.message}</span>
                )}
              </div>

              {/* Institute Name */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Institute Name *
                </label>
                <div className="relative">
                  <GraduationCap className="absolute top-1/2 transform -translate-y-1/2 left-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Your university or school"
                    className="pl-10 h-12 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200"
                    {...register("instituteName")}
                  />
                </div>
                {errors.instituteName && (
                  <span className="text-red-500 text-sm">{errors.instituteName.message}</span>
                )}
              </div>
            </div>

            {/* Graduation Year */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Graduating Year *
              </label>
              <div className="relative">
                <Calendar className="absolute top-1/2 transform -translate-y-1/2 left-3 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  placeholder="2025"
                  min="2020"
                  max="2050"
                  className="pl-10 h-12 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200"
                  {...register("gradYear")}
                />
              </div>
              {errors.gradYear && (
                <span className="text-red-500 text-sm">{errors.gradYear.message}</span>
              )}
            </div>

            {/* Interested Skills */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Interested Skills *
              </label>
              <div className="relative">
                <Tag className="absolute top-1/2 transform -translate-y-1/2 left-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="React, Python, Data Science, UI/UX Design (comma-separated)"
                  className="pl-10 h-12 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200"
                  {...register("interestedSkills")}
                />
              </div>
              <p className="text-xs text-gray-500">Separate multiple skills with commas</p>
              {errors.interestedSkills && (
                <span className="text-red-500 text-sm">{errors.interestedSkills.message}</span>
              )}
            </div>

            {/* Social Media Links */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-gray-700">
                  Social Media Links (Optional)
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
                <div key={field.id} className="space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="relative">
                      <LinkIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Platform name (e.g., GitHub)"
                        className="pl-10 h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-purple-500 focus:ring-purple-500"
                        {...register(`socialMedia.${index}.name`)}
                      />
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="https://..."
                        className="flex-1 h-10 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-purple-500 focus:ring-purple-500"
                        {...register(`socialMedia.${index}.url`)}
                      />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="h-10 w-10 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-md border border-red-200 transition"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                  {errors.socialMedia?.[index]?.name && (
                    <span className="text-red-500 text-sm">{errors.socialMedia[index].name.message}</span>
                  )}
                  {errors.socialMedia?.[index]?.url && (
                    <span className="text-red-500 text-sm">{errors.socialMedia[index].url.message}</span>
                  )}
                </div>
              ))}

              {fields.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  No social media links added yet. Click "Add Link" to add your profiles.
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={studentOnboard.isPending}
              className="w-full h-12 px-4 py-2 text-white font-semibold rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {studentOnboard.isPending ? "Creating Profile..." : "Create Student Profile"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentOnBoarding;
