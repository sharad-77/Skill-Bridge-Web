import { Calendar, MapPin } from "lucide-react";
import { useState } from "react";
import { useGetUserProfile } from '../../api/query/UserQuery';
import DashboardSection from "../../components/mini-sections/OverView";
import SettingsPage from '../../components/mini-sections/SettingsPage';
import { RecentProjectCard } from '../../components/ui/Card';
import useAuthStore from '../../store/useAuthStore';

export default function StudentProfilePage() {
  const [activeTab, setActiveTab] = useState("OverView");
  const { userId } = useAuthStore();
  const { data: profile, isLoading, isError } = useGetUserProfile(userId);

  const tabs = ["OverView", "Projects & Skills", "Account Settings"];

  const userName = profile?.name || "Unknown User";
  const introduction = profile?.introduction || "No introduction provided";
  const location = profile?.location || "Location not specified";
  const instituteName = profile?.instituteName || "Institute not specified";
  const gradYear = profile?.gradYear || "N/A";
  const joinedProjects = profile?.joinedProjects?.filter(project => project !== null) || [];
  const joinedSkills = profile?.joinedSkills?.filter(skill => skill !== null) || [];
  const interestedSkills = profile?.interestedSkills || [];
  const socialMedia = profile?.socialMedia || [];
  const profileImage = profile?.profileImage || "/default-profile.png";

  const projects = joinedProjects.map((project, index) => ({
    id: project._id,
    title: project.title || `Project ${index + 1}`,
    role: project.members?.find(member => member.userId?.toString() === userId)?.position || "Contributor",
    members: project.members?.length || 0,
    progress: project.progress || 0,
    status: project.status || "In Progress",
    color: project.status === "Completed" ? "green" : "blue",
  }));

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Profile</h2>
          <p className="text-gray-600">Failed to load profile data. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Cover Header */}
      <section className="relative h-60 bg-gray-700">
        <img
          alt="Cover"
          src={profile?.coverImage || "/default-cover.png"}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </section>

      {/* Profile Card */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="relative -mt-20 mb-8">
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-shrink-0">
                <img
                  alt={userName}
                  src={profileImage}
                  className="w-36 h-36 rounded-xl object-cover border-4 border-white shadow-md"
                />
              </div>
              <div className="flex-1 space-y-4">
                <h1 className="text-3xl font-bold text-gray-900">{userName}</h1>
                <p className="text-lg text-gray-600">Student at {instituteName}</p>
                <p className="text-gray-700 max-w-2xl">{introduction}</p>
                <div className="flex flex-wrap items-center gap-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <span>{location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <span>Graduating {gradYear}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <nav className="sticky top-0 z-20 bg-white border-b border-gray-200 rounded-md shadow-sm mb-8">
          <div className="px-6 py-4 flex gap-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 font-medium transition-colors ${activeTab === tab
                  ? "text-gray-900 border-b-2 border-gray-900"
                  : "text-gray-500 hover:text-gray-800"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </nav>

        {/* Sections */}
        <section className="pb-12">
          {activeTab === "OverView" && (
            <DashboardSection
              stats={[
                { type: "projects", count: joinedProjects.length, label: "Projects Joined" },
                { type: "skills", count: joinedSkills.length, label: "Skills Learned" },
                { type: "certifications", count: profile?.certificates?.length || 0, label: "Certifications" },
              ]}
              projects={projects}
              contactInfo={{
                email: profile?.email || "No email provided",
                location: location,
                phone: profile?.phone || "Phone not provided",
              }}
              socialLinks={socialMedia.map(media => ({
                type: media.name.toLowerCase(),
                label: media.name,
                url: media.url,
              }))}
              skills={interestedSkills}
            />
          )}

          {activeTab === "Projects & Skills" && (
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Projects & Learning Journey</h2>
              <div className="grid lg:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">My Projects</h3>
                  {projects.length > 0 ? (
                    projects.map((project) => (
                      <RecentProjectCard
                        key={project.id}
                        variant={project.status === "Completed" ? "simple" : "progress"}
                        {...project}
                      />
                    ))
                  ) : (
                    <p className="text-gray-600">No projects joined yet.</p>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">My Skills</h3>
                  {joinedSkills.length > 0 ? (
                    joinedSkills.map((skill) => (
                      <div
                        key={skill._id}
                        className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <h4 className="text-lg font-semibold text-gray-900">{skill.title}</h4>
                        <p className="text-gray-600">Category: {skill.category}</p>
                        <p className="text-gray-600">Level: {skill.level}</p>
                        <p className="text-gray-600">Duration: {skill.duration}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">No skills learned yet.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "Account Settings" && (
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
              <SettingsPage />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
