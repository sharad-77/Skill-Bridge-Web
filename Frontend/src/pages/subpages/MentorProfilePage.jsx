import { Calendar, MapPin, Star, Users } from "lucide-react";
import { useState } from "react";
import DashboardSection from "../../components/mini-sections/OverView";
import SettingsPage from "../../components/mini-sections/SettingsPage";
import { RecentReviewCard } from "../../components/ui/Card";
import { useGetUserProfile } from "../../api/query/UserQuery";
import useAuthStore from "../../store/useAuthStore";

export default function MentorProfilePage() {
  const [activeTab, setActiveTab] = useState("OverView");
  const { userId } = useAuthStore();
  const { data: profile, isLoading, isError } = useGetUserProfile(userId);

  const tabs = ["OverView", "Mentees & Reviews", "Account Settings"];

  const userName = profile?.name || "Unknown Mentor";
  const introduction = profile?.introduction || "No introduction provided";
  const location = profile?.location || "Location not specified";
  const currentPosition = profile?.currentPosition || "Position not specified";
  const yearsOfExperience = profile?.yearsOfExperience || 0;
  const studentsGuided = profile?.studentsGuided || 0;
  const averageRating = profile?.averageRating || 0;
  const completedSessions = profile?.completedSessions || 0;
  const expertise = profile?.expertise || [];
  const socialMedia = profile?.socialMedia || [];
  const reviews =
    profile?.allReviews?.map((review) => ({
      name: review.name || "Anonymous",
      position: "Student",
      rating: review.star || 0,
      comment: review.comment || "No comment provided",
    })) || [];

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
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Error Loading Profile
          </h2>
          <p className="text-gray-600">
            Failed to load profile data. Please try again.
          </p>
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
              <div className="flex-shrink-0 relative">
                <img
                  alt={userName}
                  src={
                    profile?.profileImage ||
                    "https://randomuser.me/api/portraits/men/32.jpg"
                  }
                  className="w-36 h-36 rounded-xl object-cover border-4 border-white shadow-md"
                />
                <div className="absolute bottom-0 right-0 bg-yellow-400 w-10 h-10 rounded-full border-4 border-white shadow-md flex items-center justify-center">
                  <Star className="w-5 h-5 text-white fill-white" />
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {userName}
                  </h1>
                  <span className="px-3 py-1 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-full">
                    MENTOR
                  </span>
                </div>
                <p className="text-lg text-gray-600">{currentPosition}</p>
                <p className="text-gray-700 max-w-2xl">{introduction}</p>
                <div className="flex flex-wrap items-center gap-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <span>{location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <span>{yearsOfExperience} years experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-gray-500" />
                    <span>{studentsGuided} students mentored</span>
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
                { type: "StudentsGuided", count: studentsGuided, label: "Students Guided" },
                { type: "averageRating", count: averageRating, label: "Average Rating" },
                { type: "sessionCompleted", count: completedSessions, label: "Sessions Completed" },
              ]}
              reviews={reviews}
              contactInfo={{
                email: profile?.email || "No email provided",
                location: location,
                phone: profile?.phone || "No phone provided",
              }}
              socialLinks={socialMedia.map((media) => ({
                type: media.name.toLowerCase(),
                label: media.name,
                url: media.url,
              }))}
              skills={expertise.map((skill) => skill.title)}
            />
          )}

          {activeTab === "Mentees & Reviews" && (
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Mentorship Impact
              </h2>
              <div className="grid lg:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Success Stories
                  </h3>
                  {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                      <RecentReviewCard
                        key={`review-${index}`}
                        variant="Success-Stories"
                        name={review.name}
                        position={review.position}
                        rating={review.rating}
                        comment={review.comment}
                      />
                    ))
                  ) : (
                    <p className="text-gray-600">No success stories yet.</p>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Expertise
                  </h3>
                  {expertise.length > 0 ? (
                    expertise.map((skill) => (
                      <div
                        key={skill._id}
                        className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <h4 className="text-lg font-semibold text-gray-900">
                          {skill.title}
                        </h4>
                        <p className="text-gray-600">Category: {skill.category}</p>
                        <p className="text-gray-600">Level: {skill.level}</p>
                        <p className="text-gray-600">Duration: {skill.duration}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">No expertise listed yet.</p>
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
