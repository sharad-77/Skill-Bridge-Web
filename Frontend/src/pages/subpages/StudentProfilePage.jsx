import React, { useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import DashboardSection from "../../components/mini-sections/OverView";
import { RecentProjectCard } from '../../components/ui/Card';
import SettingsPage from '../../components/mini-sections/SettingsPage';

export default function StudentProfilePage() {
  const [activeTab, setActiveTab] = useState("OverView");

  const tabs = ["OverView", "Projects & Skills", "Account Settings"];

  const projects = [
    {
      title: "AI Study Assistant",
      role: "Frontend Developer",
      members: 4,
      progress: 75,
      status: "In Progress",
      color: "blue",
    },
    {
      title: "E-commerce Platform",
      role: "Full-Stack Developer",
      members: 6,
      progress: 100,
      status: "Completed",
      color: "green",
    },
    {
      title: "Data Visualization Tool",
      role: "Backend Developer",
      members: 5,
      progress: 100,
      status: "Completed",
      color: "purple",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Cover with Gradient Overlay */}
      <section className="relative h-80 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
        <img
          alt="Cover"
          src="/placeholder.svg?height=400&width=1200"
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
        />
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-purple-300/20 rounded-full blur-lg"></div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Profile Card */}
        <section className="relative -mt-24 mb-8">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200/50 backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row gap-8 p-8">
              {/* Profile Image with Enhanced Design */}
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-3xl blur opacity-75"></div>
                <img
                  alt="John Doe"
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  className="relative w-40 h-40 rounded-3xl object-cover border-4 border-white shadow-2xl"
                />
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white shadow-lg"></div>
              </div>

              {/* Profile Info with Better Typography */}
              <div className="flex-1 space-y-6">
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
                    John Doe
                  </h1>
                  <p className="text-xl text-gray-600 font-medium mb-4">
                    3rd Year Computer Science Student at University of Technology
                  </p>
                  <p className="text-gray-700 leading-relaxed max-w-3xl text-lg">
                    Passionate software developer with a love for learning and building
                    innovative solutions. Always eager to take on new challenges and
                    collaborate with others to create meaningful impact.
                  </p>
                </div>

                {/* Enhanced Location & Info */}
                <div className="flex flex-wrap items-center gap-6 text-gray-600">
                  <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
                    <MapPin className="h-5 w-5 text-purple-600" />
                    <span className="font-medium">San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Graduating 2025</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Sticky Navigation */}
        <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200/50 rounded-2xl shadow-lg mb-8">
          <div className="px-8 py-6">
            <div className="flex gap-8">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-2 py-3 font-semibold text-lg transition-all duration-300 ${activeTab === tab
                      ? "text-purple-600"
                      : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full transition-all duration-300"></div>
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
                { type: "projects", count: 12, label: "Projects Joined" },
                { type: "skills", count: 15, label: "Skills Learned" },
                { type: "certifications", count: 3, label: "Certifications" },
              ]}
              projects={projects}
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

          {activeTab === "Projects & Skills" && (
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200/50 p-8 lg:p-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center lg:text-left">
                Projects & Learning Journey
              </h2>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* In Progress Projects */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <div className="w-2 h-8 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full"></div>
                    Projects in Progress
                  </h3>
                  <div className="space-y-4">
                    {projects
                      .filter(project => project.status === "In Progress")
                      .map((project, index) => (
                        <RecentProjectCard
                          key={`progress-${index}`}
                          variant="progress"
                          {...project}
                        />
                      ))}
                  </div>
                </div>

                {/* Completed Projects */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <div className="w-2 h-8 bg-gradient-to-b from-green-400 to-green-600 rounded-full"></div>
                    Completed Projects
                  </h3>
                  <div className="space-y-4">
                    {projects
                      .filter(project => project.status === "Completed")
                      .map((project, index) => (
                        <RecentProjectCard
                          key={`completed-${index}`}
                          variant="simple"
                          {...project}
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
