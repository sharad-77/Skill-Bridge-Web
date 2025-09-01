import { Filter, Search } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import { MentorCard } from '../components/ui/Card'
import { useGetMentors } from "../api/mutation/MentorMutation";

export default function CareerMentorMatch() {
  const [scrollY, setScrollY] = useState(0)
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState("") // Keep state but no logic
  const { data: mentors, isLoading, isError } = useGetMentors();

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const categories = [
    { id: "all", name: "All Mentors" },
    { id: "tech", name: "Technology" },
    { id: "business", name: "Business" },
    { id: "design", name: "Design" },
    { id: "marketing", name: "Marketing" },
    { id: "finance", name: "Finance" },
  ]

  const displayMentors = mentors && Array.isArray(mentors) ? mentors : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-400 flex justify-center items-center">
        <div className='h-full w-full max-w-5xl'>
          <div className="absolute inset-0 " />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg')] bg-repeat opacity-5" />
          </div>
          <div className="absolute top-20 left-[10%] w-24 h-24 rounded-full bg-white opacity-10 blur-3xl animate-float" />
          <div className="absolute bottom-10 right-[15%] w-32 h-32 rounded-full bg-white opacity-10 blur-3xl animate-float-slow" />
          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-block px-4 py-1 rounded-full glass-dark mb-6 text-sm font-medium text-white">
                Find Your Guide
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white text-shadow">
                Career Mentor Match
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Connect with experienced professionals who can guide you through your career journey. Get personalized advice, industry insights, and valuable connections.
              </p>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search mentors by name, title, or expertise"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex w-full px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 bg-white h-12 rounded-xl"
                    />
                  </div>
                  <Button
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-white text-blue-600 hover:bg-white/90 btn-shine"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-5 w-5 mr-2" /> Filters
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="#f9fafb" preserveAspectRatio="none" className="w-full h-[60px]">
              <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
            </svg>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 bg-white sticky top-0 z-20 transition-all duration-300 border-b flex justify-center items-center">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex overflow-x-auto pb-2 gap-2">
            <button
              className="px-4 py-2 rounded-full whitespace-nowrap transition-all bg-blue-100 text-blue-600 font-medium"
              onClick={() => {/* Add your logic here */ }}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                className="px-4 py-2 rounded-full whitespace-nowrap transition-all text-gray-600 hover:bg-gray-100"
                onClick={() => {/* Add your filtering logic here */ }}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Mentors Grid */}
      <section className="py-12 flex justify-center items-center h-full w-full">
        <div className="container mx-auto px-4 flex justify-center items-center max-w-5xl">
          {isLoading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading mentors...</p>
            </div>
          )}

          {isError && (
            <div className="text-center py-12">
              <p className="text-red-600 text-lg">Error fetching mentors</p>
            </div>
          )}

          {!isLoading && !isError && (
            <>
              {displayMentors.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No mentors found.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {displayMentors.map((mentor) => (
                    <MentorCard
                      key={mentor._id}
                      image="https://ui-avatars.com/api/?name=Mentor&background=0D8ABC&color=fff&size=300"
                      rating={mentor.averageRating || 0}
                      reviews={mentor.reviews || 0}
                      price={mentor.price || 0}
                      name={mentor.user?.name || 'Unknown'}
                      title={mentor.currentPosition || 'Professional'}
                      company={mentor.company || 'Company'}
                      location={mentor.location || 'Location'}
                      experience={mentor.yearsOfExperience || 0}
                      availability={mentor.availability || 'Available'}
                      expertise={mentor.expertise || []}
                      onRequest={() => {
                        navigate("/Mentor-request")
                      }}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
