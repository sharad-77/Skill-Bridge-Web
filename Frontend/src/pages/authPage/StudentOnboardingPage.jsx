import { GraduationCap, User, MapPin, Calendar, Tag, Link as LinkIcon, Plus } from "lucide-react";

export default function StudentOnBoarding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-4 shadow-lg">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Student Profile</h1>
          <p className="text-gray-600">Tell us about yourself to get personalized recommendations</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="introduction" className="block text-sm font-semibold text-gray-700">Introduction</label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  id="introduction"
                  name="introduction"
                  rows={4}
                  placeholder="Tell us about yourself, your goals, and what you're passionate about..."
                  className="w-full pl-10 pr-3 py-3 border rounded-lg resize-none transition-all duration-200 focus:outline-none focus:ring-2 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                ></textarea>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="location" className="block text-sm font-semibold text-gray-700">Location</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="City, Country"
                    className="pl-10 w-full h-12 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="instituteName" className="block text-sm font-semibold text-gray-700">Institute Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <GraduationCap className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="instituteName"
                    name="instituteName"
                    type="text"
                    placeholder="Your university or school"
                    className="pl-10 w-full h-12 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="graduatingYear" className="block text-sm font-semibold text-gray-700">Graduating Year</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="graduatingYear"
                  name="graduatingYear"
                  type="number"
                  min="2020"
                  max="2030"
                  placeholder="2025"
                  className="pl-10 w-full h-12 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="interestedSkills" className="block text-sm font-semibold text-gray-700">Interested Skills</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Tag className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="interestedSkills"
                  name="interestedSkills"
                  type="text"
                  placeholder="React, Python, Data Science, UI/UX Design (comma-separated)"
                  className="pl-10 w-full h-12 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-gray-700">Social Media Links</label>
                <button
                  type="button"
                  className="inline-flex items-center text-sm font-medium text-purple-600 border border-purple-200 hover:bg-purple-50 h-9 rounded-md px-3"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add Link
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LinkIcon className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Platform name (e.g., GitHub)"
                    className="pl-10 w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                  />
                </div>
                <input
                  type="url"
                  placeholder="https://..."
                  className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 px-4 py-2 text-white font-semibold rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg"
            >
              Save Student Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
