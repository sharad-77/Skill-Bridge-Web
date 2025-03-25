import React,{ useState, useEffect } from "react"
import { Search, Star, Clock, Users, Bookmark, Heart, ChevronRight } from "lucide-react"

export default function Skill() {
  const [activeTab, setActiveTab] = useState("all")
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-secondary" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg')] bg-repeat opacity-5" />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 right-[10%] w-24 h-24 rounded-full bg-white opacity-10 blur-3xl animate-float" />
        <div className="absolute bottom-10 left-[15%] w-32 h-32 rounded-full bg-white opacity-10 blur-3xl animate-float-slow" />

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-1 rounded-full glass-dark mb-6 text-sm font-medium text-white">
              Skill Exchange
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white text-shadow">Skill Exchange Marketplace</h1>
            <p className="text-xl text-rose-100 mb-8">
              Learn from experts, share your knowledge, and grow together. Find the perfect skill match for your
              learning journey.
            </p>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input className="pl-10 bg-white h-12 rounded-xl w-full px-3" placeholder="Search skills or topics" />
                </div>
                <button className="bg-white text-rose-500 hover:bg-white/90 btn-shine px-4 py-2 rounded-xl font-medium">Search</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <CategoryCard name="Programming" count={150} icon="💻" />
            <CategoryCard name="Design" count={89} icon="🎨" />
            <CategoryCard name="Marketing" count={76} icon="📈" />
            <CategoryCard name="Data Science" count={120} icon="📊" />
            <CategoryCard name="Languages" count={95} icon="🌍" />
            <CategoryCard name="Business" count={67} icon="💼" />
          </div>
        </div>
      </section>

      {/* Skills Tabs */}
      <section className="py-6 bg-white sticky top-0 z-20 transition-all duration-300 border-b">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto pb-2 gap-2">
            <TabButton active={activeTab === "all"} onClick={() => setActiveTab("all")}>
              All Skills
            </TabButton>
            <TabButton active={activeTab === "trending"} onClick={() => setActiveTab("trending")}>
              Trending
            </TabButton>
            <TabButton active={activeTab === "new"} onClick={() => setActiveTab("new")}>
              New
            </TabButton>
            <TabButton active={activeTab === "free"} onClick={() => setActiveTab("free")}>
              Free
            </TabButton>
            <TabButton active={activeTab === "premium"} onClick={() => setActiveTab("premium")}>
              Premium
            </TabButton>
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Skills</h2>
            <div className="flex gap-4">
              <select className="px-4 py-2 border rounded-lg">
                <option>Most Popular</option>
                <option>Newest</option>
                <option>Top Rated</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SkillCard
              title="Advanced React Development"
              instructor="John Doe"
              rating={4.8}
              students={1234}
              duration="8 weeks"
              level="Intermediate"
              price="Free"
              image="/placeholder.svg?height=200&width=400"
            />
            <SkillCard
              title="UI/UX Design Fundamentals"
              instructor="Sarah Smith"
              rating={4.9}
              students={856}
              duration="6 weeks"
              level="Beginner"
              price="Free"
              image="/placeholder.svg?height=200&width=400"
            />
            <SkillCard
              title="Data Analysis with Python"
              instructor="Mike Johnson"
              rating={4.7}
              students={2156}
              duration="10 weeks"
              level="Advanced"
              price="Free"
              image="/placeholder.svg?height=200&width=400"
            />
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Popular This Week</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <SkillCard
                title="Mobile App Development with Flutter"
                instructor="Alex Chen"
                rating={4.6}
                students={987}
                duration="8 weeks"
                level="Intermediate"
                price="Free"
                image="/placeholder.svg?height=200&width=400"
              />
              <SkillCard
                title="Digital Marketing Essentials"
                instructor="Emma Wilson"
                rating={4.8}
                students={1543}
                duration="4 weeks"
                level="Beginner"
                price="Free"
                image="/placeholder.svg?height=200&width=400"
              />
              <SkillCard
                title="Full-Stack Web Development"
                instructor="David Brown"
                rating={4.9}
                students={2345}
                duration="12 weeks"
                level="Advanced"
                price="Free"
                image="/placeholder.svg?height=200&width=400"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function CategoryCard({ name, count, icon }) {
  return (
    <div className="bg-white rounded-xl p-6 text-center card-hover border border-gray-100">
      <div className="text-4xl mb-3 animate-pulse-slow">{icon}</div>
      <h3 className="font-semibold mb-1">{name}</h3>
      <p className="text-sm text-gray-600">{count} skills</p>
    </div>
  )
}

function TabButton({ children, active, onClick }) {
  return (
    <button
      className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
        active ? "bg-purple-100 text-purple-600 font-medium" : "text-gray-600 hover:bg-gray-100"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

function SkillCard({ title, instructor, rating, students, duration, level, price, image }) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  return (
    <div className="bg-white rounded-xl overflow-hidden card-hover border border-gray-100 group">
      <div className="relative">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-4 right-4 flex gap-2">
          <button
            className={`p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white ${isBookmarked ? "text-purple-600" : "text-gray-600"}`}
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark className="h-5 w-5" fill={isBookmarked ? "currentColor" : "none"} />
          </button>

          <button
            className={`p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white ${isLiked ? "text-rose-500" : "text-gray-600"}`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className="h-5 w-5" fill={isLiked ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full">{level}</span>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
            <span className="ml-1">{rating}</span>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-600 transition-colors">{title}</h3>
        <p className="text-gray-600 mb-4">by {instructor}</p>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {duration}
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {students} students
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-semibold text-xl">{price}</span>
          <button className="gradient-secondary text-white px-4 py-2 rounded-lg flex items-center">
            Learn More <ChevronRight className="ml-1 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}