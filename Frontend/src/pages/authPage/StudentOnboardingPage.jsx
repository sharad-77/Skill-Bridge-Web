import { zodResolver } from "@hookform/resolvers/zod";
import {
  Calendar,
  GraduationCap,
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
import { UseStudentOnboard } from "../../api/mutation/AuthMutation";
import Button from '../../components/ui/Button';
import useAuthStore from "../../store/useAuthStore";

const studentSchema = z.object({
  introduction: z.string(),
  location: z.string(),
  instituteName: z.string(),
  gradYear: z.coerce.number(),
  interestedSkills: z.string()
    .min(1, "At least one skill is required")
    .transform((str) => str.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0))
    .refine((arr) => arr.length > 0, "At least one skill is required"),
  socialMedia: z.array(z.object({
    name: z.string(),
    url: z.string().url(),
  })),
});


const StudentOnBoarding = () => {
  const navigate = useNavigate();
  const studentOnboard = UseStudentOnboard();
  const { setOnBoardingStatus } = useAuthStore(); // Added for consistency

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(studentSchema),
    mode: "onChange",
    defaultValues: {
      introduction: "",
      location: "",
      instituteName: "",
      gradYear: "",
      interestedSkills: "",
      socialMedia: [{ name: "", url: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialMedia",
  });

  const onSubmit = async (data) => {
    console.log("Form data before submission:", data);
    console.log("Social media data:", data.socialMedia);

    studentOnboard.mutate(data, {
      onSuccess: (response) => {
        console.log("Success response:", response);
        toast.success("Student profile created successfully!");
        setOnBoardingStatus(true);
        navigate("/");
      },
      onError: (error) => {
        console.error("Submission error:", error);
        console.error("Error response:", error.response?.data);
        toast.error(error.response?.data?.message || "Student profile creation failed");
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
            {/* Introduction */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Introduction
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
                <span className="text-red-500">{errors.introduction.message}</span>
              )}
            </div>

            {/* Location & Institute */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Location */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Location</label>
                <div className="relative">
                  <MapPin className="absolute inset-y-0 left-0 pl-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="City, Country"
                    className="pl-10 h-12 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200"
                    {...register("location")}
                  />
                </div>
                {errors.location && (
                  <span className="text-red-500">{errors.location.message}</span>
                )}
              </div>

              {/* Institute Name */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Institute Name
                </label>
                <div className="relative">
                  <GraduationCap className="absolute inset-y-0 left-0 pl-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Your university or school"
                    className="pl-10 h-12 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200"
                    {...register("instituteName")}
                  />
                </div>
                {errors.instituteName && (
                  <span className="text-red-500">{errors.instituteName.message}</span>
                )}
              </div>
            </div>

            {/* Graduation Year */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Graduating Year
              </label>
              <div className="relative">
                <Calendar className="absolute inset-y-0 left-0 pl-3 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  placeholder="2025"
                  min="2020"
                  max="2030"
                  className="pl-10 h-12 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200"
                  {...register("gradYear")}
                />
              </div>
              {errors.gradYear && (
                <span className="text-red-500">{errors.gradYear.message}</span>
              )}
            </div>

            {/* Interested Skills */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Interested Skills
              </label>
              <div className="relative">
                <Tag className="absolute inset-y-0 left-0 pl-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="React, Python, Data Science, UI/UX Design..."
                  className="pl-10 h-12 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200"
                  {...register("interestedSkills")}
                />
              </div>
              {errors.interestedSkills && (
                <span className="text-red-500">{errors.interestedSkills.message}</span>
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
                      placeholder="Platform name (e.g., GitHub)"
                      className="pl-10 h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                      {...register(`socialMedia.${index}.name`)}
                    />
                    {errors.socialMedia?.[index]?.name && (
                      <span className="text-red-500">{errors.socialMedia[index].name?.message}</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://..."
                      className="flex-1 h-10 rounded-md border border-gray-300 px-3 py-2 text-sm"
                      {...register(`socialMedia.${index}.url`)}
                    />
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="h-10 w-10 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-md border border-red-200"
                      >
                        ×
                      </button>
                    )}
                  </div>
                  {errors.socialMedia?.[index]?.url && (
                    <span className="text-red-500">{errors.socialMedia[index].url?.message}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={studentOnboard.isPending} // Add disabled state
              onClick={() => console.log("Button clicked")} // Add this for debugging
              className="w-full h-12 px-4 py-2 text-white font-semibold rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg"
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
