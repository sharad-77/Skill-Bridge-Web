import { Filter, Search } from "lucide-react"
import { useEffect, useState } from "react"
import Button from '../components/ui/Button'
import { MentorCard } from '../components/ui/Card'

export default function CareerMentorMatch() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [scrollY, setScrollY] = useState(0)
  const [showFilters, setShowFilters] = useState(false)

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

  const mentors = [
    {
      id: 1,
      name: "Diana Chen",
      rating: 4.9,
      reviews: 112,
      price: "Free",
      title: "Product Manager",
      company: "InnovateTech",
      location: "Seattle, WA",
      experience: "9 years of experience",
      availability: "Available: Weekday mornings",
      expertise: ["Product Strategy", "Agile Methodologies", "Go-to-Market Planning"],
      categories: ["business"],
    },
    {
      id: 2,
      name: "Alex Rodriguez",
      rating: 4.8,
      reviews: 89,
      price: "$50/hour",
      title: "Senior Software Engineer",
      company: "TechCorp",
      location: "San Francisco, CA",
      experience: "7 years of experience",
      availability: "Available: Weekday evenings",
      expertise: ["React", "Node.js", "System Design"],
      categories: ["tech"],
    },
    {
      id: 3,
      name: "Sarah Kim",
      rating: 4.9,
      reviews: 156,
      price: "$75/hour",
      title: "UX Design Lead",
      company: "DesignStudio",
      location: "New York, NY",
      experience: "8 years of experience",
      availability: "Available: Flexible hours",
      expertise: ["User Research", "Prototyping", "Design Systems"],
      categories: ["design"],
    },
    {
      id: 4,
      name: "Marcus Thompson",
      rating: 4.7,
      reviews: 93,
      price: "$60/hour",
      title: "Digital Marketing Manager",
      company: "MarketPro",
      location: "Austin, TX",
      experience: "6 years of experience",
      availability: "Available: Weekends",
      expertise: ["SEO", "Content Strategy", "PPC Advertising"],
      categories: ["marketing"],
    },
    {
      id: 5,
      name: "Jennifer Wu",
      rating: 4.8,
      reviews: 124,
      price: "$80/hour",
      title: "Investment Advisor",
      company: "WealthBuilder",
      location: "Chicago, IL",
      experience: "12 years of experience",
      availability: "Available: Weekday afternoons",
      expertise: ["Portfolio Management", "Risk Analysis", "Financial Planning"],
      categories: ["finance"],
    },
  ]

  const filteredMentors =
    activeCategory === "all"
      ? mentors
      : mentors.filter((mentor) => mentor.categories.includes(activeCategory))

  const searchedMentors = searchQuery
    ? filteredMentors.filter(
      (mentor) =>
        mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.expertise.some((exp) =>
          exp.toLowerCase().includes(searchQuery.toLowerCase())
        )
    )
    : filteredMentors

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-400 flex justify-center items-center">
        <div className='h-full w-full max-w-5xl'>
        <div className="absolute inset-0 "/>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg')] bg-repeat opacity-5" />
        </div>
        <div className="absolute top-20 left-[10%] w-24 h-24 rounded-full bg-white opacity-10 blur-3xl animate-float" />
        <div className="absolute bottom-10 right-[15%] w-32 h-32 rounded-full bg-white opacity-10 blur-3xl animate-float-slow" />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-1 rounded-full glass-dark mb-6 text-sm font-medium text-white">
              Collaboration Hub
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white text-shadow">
              Project Collaboration Hub
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Find exciting projects to work on or start your own. Connect with talented peers and build something amazing together.
            </p>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search projects"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex w-full border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 bg-white h-12 rounded-xl"
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
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${activeCategory === null
                ? "bg-blue-100 text-blue-600 font-medium"
                : "text-gray-600 hover:bg-gray-100"
                }`}
              onClick={() => setActiveCategory(null)}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${activeCategory === category.id
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
                  }`}
                onClick={() => setActiveCategory(category.id)}
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
          {searchedMentors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No mentors found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {searchedMentors.map((mentor) => (
                <MentorCard
                  key={mentor.id}
                  image="https://picjumbo.com/pic/1/2379.jpg"
                  rating={mentor.rating}
                  reviews={mentor.reviews}
                  price={mentor.price}
                  name={mentor.name}
                  title={mentor.title}
                  company={mentor.company}
                  location={mentor.location}
                  experience={mentor.experience}
                  availability={mentor.availability}
                  expertise={mentor.expertise}
                  onRequest={() => console.log(`Request sent to ${mentor.name}`)}
                  onMessage={() => console.log(`Open chat with ${mentor.name}`)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
