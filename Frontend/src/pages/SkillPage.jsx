import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetSkills } from "../api/mutation/SkillMutation";
import Button from '../components/ui/Button';
import { CategoryCard, SkillCard } from '../components/ui/Card';
import useAuthRedirect from '../hooks/useAuthRedirect';
import useAuthStore from '../store/useAuthStore';
import CreateNewSkill from './formPage/CreateNewSkill';

export default function Skill() {
  const [scrollY, setScrollY] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const { data, isLoading, isError } = useGetSkills();
  const redirectToProfile  = useAuthRedirect();
  const { isAuthenticated, isOnBoarded } = useAuthStore();

  // Ensure we always have an array to map over
  const skills = Array.isArray(data) ? data : data?.skills ?? [];

  const handleClick = () => {
    if (!isAuthenticated || !isOnBoarded) {
      redirectToProfile();
    } else {
      setShowForm(true)
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showForm]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="relative overflow-hidden h-full w-full">
        <div className="absolute inset-0 gradient-secondary h-full w-full" />
        <div className="container mx-auto px-4 py-20 relative z-10 h-full w-full flex items-center justify-center">
          <div className="max-w-5xl mx-auto ">
            <div className="inline-block px-4 py-1 rounded-full glass-dark mb-6 text-sm font-medium text-white">
              Skill Exchange
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white text-shadow">Skill Exchange Marketplace</h1>
            <p className="text-xl text-rose-100 mb-8 max-w-5xl">
              Learn from experts, share your knowledge, and grow together. Find the perfect skill match for your
              learning journey.
            </p>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input className="pl-10 bg-white h-12 rounded-xl w-full px-3" placeholder="Search skills or topics" />
                </div>
                <Button variant="outline" className="px-4 py-2 rounded-xl font-medium text-white">Search</Button>
                <Button
                  variant="outline"
                  className="px-4 py-2 rounded-xl font-medium ml-2 bg-white"
                  onClick={handleClick}
                >
                  Create New Skill
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">
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

      {/* Skills Tabs - FIXED Z-INDEX */}
      <section className="py-6 bg-white sticky top-0 z-10 transition-all duration-300 border-b flex justify-center items-center">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex overflow-x-auto pb-2 gap-2">
            <button className="px-4 py-2 rounded-full whitespace-nowrap transition-all bg-purple-100 text-purple-600 font-medium">
              All Skills
            </button>
            <button className="px-4 py-2 rounded-full whitespace-nowrap transition-all text-gray-600 hover:bg-gray-100">
              Trending
            </button>
            <button className="px-4 py-2 rounded-full whitespace-nowrap transition-all text-gray-600 hover:bg-gray-100">
              New
            </button>
            <button className="px-4 py-2 rounded-full whitespace-nowrap transition-all text-gray-600 hover:bg-gray-100">
              Free
            </button>
            <button className="px-4 py-2 rounded-full whitespace-nowrap transition-all text-gray-600 hover:bg-gray-100">
              Premium
            </button>
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">
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

          {isLoading && <div>Loading...</div>}
          {isError && <div>Error fetching skills</div>}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills && skills.map((skill) => (
              <SkillCard
                key={skill._id}
                id={skill._id}
                title={skill.title}
                instructor={skill.user?.name || 'Unknown Instructor'}
                rating={skill.rating}
                students={skill.students}
                duration={skill.duration}
                level={skill.level}
                price={skill.price}
                image={skill.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* MODAL - MOVED TO END AND FIXED Z-INDEX */}
      {showForm && (
        <CreateNewSkill onClose={() => setShowForm(false)} />
      )}
    </div>
  )
}
