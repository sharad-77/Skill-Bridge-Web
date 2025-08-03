import { Calendar, MapPin } from "lucide-react";
import { useState } from "react";
import DashboardSection from "../../components/mini-sections/OverView";
import SettingsPage from '../../components/mini-sections/SettingsPage';
import { RecentReviewCard, MentorshipState } from '../../components/ui/Card';

export default function MentorProfilePage() {
  const [activeTab, setActiveTab] = useState("OverView");

  const tags = ["OverView", "Mentees & Reviews", "Account Settings"];

  const Reviews = [
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

  const MentorReviews = [
    {
      name: "Sarah Johnson",
      position: "Advanced to Senior Developer",
      rating: 4.5,
      time: "2 days ago",
    },
  ]

  const States = [
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
  ]

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
                      Senior Software Engineer at Tech Corp
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
                        <Calendar className="h-4 w-4 mr-1" /> 8 years experience
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
          <div className="container mx-auto px-4 py-5 w-full">
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
              { type: "StudentsGuided", count: 12, label: "Students Guided" },
              { type: "avrageRating", count: 15, label: "Average Rating" },
              { type: "sessionCompleted", count: 3, label: "Sessions Completed" },
            ]}

            reviews={Reviews}

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

        {activeTab === "Mentees & Reviews" && (
          <div className='flex flex-col gap-10 justify-center w-full h-full p-10 text-left rounded-2xl border border-gray-200 mt-5'>
            <h1 className='text-[30px] font-semibold'>Mentorship Impact</h1>
            <div className='flex justify-center gap-5 h-full w-full text-left'>
              <div className='flex flex-col justify-center gap-2 w-full h-full'>
                <h3 className="text-[27px] font-medium mb-4">Success Stories</h3>
                {MentorReviews.map((Review, index) => (
                  <RecentReviewCard
                    key={index}
                    variant="Success-Stories"
                    {...Review}
                  />
                ))}
              </div>
              <div className='flex flex-col justify-center gap-2 w-full h-full'>
                <h3 className="text-[27px] font-medium mb-4">Mentorship Stats</h3>
                {States.map((state, index) => (
                  <MentorshipState
                    key={index}
                  {...state}
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
