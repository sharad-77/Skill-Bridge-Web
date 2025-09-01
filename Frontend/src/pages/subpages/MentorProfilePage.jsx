import { Calendar, MapPin, Star, Users } from "lucide-react";
import { useState } from "react";
import DashboardSection from "../../components/mini-sections/OverView";
import SettingsPage from '../../components/mini-sections/SettingsPage';
import { RecentReviewCard, MentorshipState } from '../../components/ui/Card';

export default function MentorProfilePage() {
  const [activeTab, setActiveTab] = useState("OverView");

  const tabs = ["OverView", "Mentees & Reviews", "Account Settings"];

  const reviews = [
    {
      name: "Sarah Johnson",
      position: "Advanced to Senior Developer",
      rating: 4.5,
      time: "2 days ago",
    },
    {
      name: "John Doe",
      position: "Advanced to Senior Developer",
      rating: 4.5,
      time: "2 days ago",
    },
    {
      name: "Emily Smith",
      position: "Advanced to Senior Developer",
      rating: 4.5,
      time: "2 days ago",
    },
    {
      name: "Michael Brown",
      position: "Advanced to Senior Developer",
      rating: 4.5,
      time: "2 days ago",
    },
  ];

  const successStories = [
    {
      name: "Sarah Johnson",
      position: "Advanced to Senior Developer",
      rating: 4.5,
      time: "2 days ago",
    },
  ];

  const mentorshipStats = [
    {
      title: "Response Rate",
      value: "98%"
    },
    {
      title: "Active Mentees",
      value: 8
    },
    {
      title: "Total Reviews",
      value: 38
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Cover with Professional Gradient */}
      <section className="relative h-80 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
        <img
          alt="Cover"
          src="/placeholder.svg?height=400&width=1200"
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
        />
        {/* Professional decorative elements */}
        <div className="absolute top-16 right-16 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-12 left-12 w-28 h-28 bg-indigo-300/20 rounded-full blur-lg"></div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Profile Card for Mentor */}
        <section className="relative -mt-24 mb-8">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200/50 backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row gap-8 p-8">
              {/* Enhanced Profile Image */}
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-3xl blur opacity-75"></div>
                <img
                  alt="John Doe"
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  className="relative w-40 h-40 rounded-3xl object-cover border-4 border-white shadow-2xl"
                />
                {/* Mentor Badge */}
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 w-12 h-12 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-white fill-white" />
                </div>
              </div>

              {/* Enhanced Profile Info */}
              <div className="flex-1 space-y-6">
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      John Doe
                    </h1>
                    <div className="bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-full">
                      <span className="text-purple-700 font-semibold text-sm">MENTOR</span>
                    </div>
                  </div>
                  <p className="text-xl text-gray-600 font-medium mb-4">
                    Senior Software Engineer at Tech Corp
                  </p>
                  <p className="text-gray-700 leading-relaxed max-w-3xl text-lg">
                    Passionate software developer with a love for mentoring and building
                    innovative solutions. Dedicated to helping others grow and achieve their
                    career goals through personalized guidance and support.
                  </p>
                </div>

                {/* Enhanced Info with Experience Focus */}
                <div className="flex flex-wrap items-center gap-6 text-gray-600">
                  <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
                    <MapPin className="h-5 w-5 text-indigo-600" />
                    <span className="font-medium">San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    <span className="font-medium">8 years experience</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-green-100 px-4 py-2 rounded-full">
                    <Users className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-700">38 students mentored</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Navigation */}
        <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200/50 rounded-2xl shadow-lg mb-8">
          <div className="px-8 py-6">
            <div className="flex gap-8">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-2 py-3 font-semibold text-lg transition-all duration-300 ${activeTab === tab
                      ? "text-indigo-600"
                      : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full transition-all duration-300"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Enhanced Content Sections */}
        <section className="pb-12">
          {activeTab === "OverView" && (
            <DashboardSection
              stats={[
                { type: "StudentsGuided", count: 12, label: "Students Guided" },
                { type: "averageRating", count: 4.8, label: "Average Rating" },
                { type: "sessionCompleted", count: 156, label: "Sessions Completed" },
              ]}
              reviews={reviews}
              contactInfo={{
                email: "john.doe@email.com",
                location: "San Francisco, CA",
                phone: "+1 (555) 123-4567",
              }}
              socialLinks={[
                { type: "github", label: "GitHub", url: "https://github.com/johndoe" },
                { type: "linkedin", label: "LinkedIn", url: "https://linkedin.com/in/johndoe" },
                { type: "twitter", label: "Twitter", url: "https://twitter.com/johndoe" },
                { type: "portfolio", label: "Portfolio", url: "https://johndoe.dev" },
              ]}
              skills={[
                "React", "JavaScript", "Python", "UI/UX",
                "Node.js", "SQL", "Docker", "Figma",
              ]}
            />
          )}

          {activeTab === "Mentees & Reviews" && (
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200/50 p-8 lg:p-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center lg:text-left">
                Mentorship Impact
              </h2>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* Success Stories */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <div className="w-2 h-8 bg-gradient-to-b from-green-400 to-emerald-600 rounded-full"></div>
                    Success Stories
                  </h3>
                  <div className="space-y-4">
                    {successStories.map((review, index) => (
                      <RecentReviewCard
                        key={`success-${index}`}
                        variant="Success-Stories"
                        {...review}
                      />
                    ))}
                  </div>
                </div>

                {/* Mentorship Statistics */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <div className="w-2 h-8 bg-gradient-to-b from-indigo-400 to-purple-600 rounded-full"></div>
                    Mentorship Statistics
                  </h3>
                  <div className="space-y-4">
                    {mentorshipStats.map((stat, index) => (
                      <MentorshipState
                        key={`stat-${index}`}
                        {...stat}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Account Settings" && (
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200/50 p-8">
              <SettingsPage />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
