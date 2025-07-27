import React, { useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import DashboardSection from "../../components/mini-sections/OverView";
import { RecentProjectCard } from '../../components/ui/Card';
import SettingsPage from '../../components/mini-sections/SettingsPage';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("OverView");

  const tags = ["OverView", "Projects & Skills", "Account Settings"];

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
    <main className="min-h-screen bg-gray-50 flex flex-col justify-center w-full">
      {/* Cover with Overlay Image */}
      <div className="relative h-64 bg-gradient-to-r from-purple-600 to-blue-600">
        <img
          alt="Cover"
          src="/placeholder.svg?height=300&width=800"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
      </div>

      <div className="mx-auto px-4 py-8 max-w-5xl flex flex-col items-center justify-center">
        {/* Profile Card */}
        <div className="container mx-auto px-4">
          <div className="relative -mt-20 pb-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="relative">
                <img
                  alt="John Doe"
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg"
                />
              </div>
              <div className="flex-1 bg-white rounded-xl p-6 shadow-lg">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">John Doe</h1>
                    <p className="text-gray-600 text-lg mb-2">
                      3rd Year Computer Science Student at University of Technology
                    </p>
                    <p className="text-gray-700 mb-4 w-[70%]">
                      Passionate software developer with a love for learning and building
                      innovative solutions. Always eager to take on new challenges and
                      collaborate with others.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" /> San Francisco, CA
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" /> Graduating 2025
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Tabs */}
        <div className="bg-white sticky top-0 z-20 w-full">
          <div className="container mx-auto px-4 w-full">
            <div className="flex w-full gap-5">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTab(tag)}
                  className={`pb-2 font-medium text-[21px] cursor-pointer ${activeTab === tag
                    ? "text-purple-600 border-b-2 border-purple-600"
                    : "text-gray-500"
                    }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
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
              "React",
              "JavaScript",
              "Python",
              "UI/UX",
              "Node.js",
              "SQL",
              "Docker",
              "Figma",
            ]}
          />
        )}

        {activeTab === "Projects & Skills" && (
          <div className='flex flex-col gap-10 justify-center w-full h-full p-10 text-left rounded-2xl border border-gray-200 mt-5'>
            <h1 className='text-[30px] font-semibold'>Projects & Learning Journey</h1>
            <div className='flex justify-center gap-5 h-full w-full text-left'>
            <div className='flex flex-col justify-center gap-2 w-full h-full'>
              <h3 className="text-[27px] font-medium mb-4">Progress Projects</h3>
              {projects.filter(project => project.status === "In Progress").map((project, index) => (
                <RecentProjectCard
                  key={index}
                  variant="progress"
                  {...project}
                />
              ))}
            </div>
            <div className='flex flex-col justify-center gap-2 w-full h-full'>
              <h3 className="text-[27px] font-medium mb-4">Completed Projects</h3>
              {projects.filter(project => project.status === "Completed").map((project, index) => (
                <RecentProjectCard
                  key={index}
                  variant="simple"
                  {...project}
                />
              ))}
              </div>
            </div>

          </div>
        )}

        {activeTab === "Account Settings" && (
          <div className="bg-white rounded-xl p-6 shadow-md w-full text-center">
            <SettingsPage />
          </div>
        )}
      </div>
    </main>
  );
}
