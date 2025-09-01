import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useGetSkills } from "../api/mutation/SkillMutation";
import Button from '../components/ui/Button';
import { CategoryCard, SkillCard } from '../components/ui/Card';
import CreateNewSkill from './formPage/CreateNewSkill';

export default function Skill() {
  const [showForm, setShowForm] = useState(false);
  const { data, isLoading, isError } = useGetSkills();
  const skills = data?.skills || [];
  const [searchText, setSearchText] = useState("");
  const [sortby, setSortBy] = useState("All");
  const [activeSort, setActiveSort] = useState("All");

  const handleClick = () => {
    setShowForm(true);
  };

  // Fixed filtering and sorting logic
  const filteredSkills = useMemo(() => {
    if (!skills || skills.length === 0) return [];

    // First filter by search text
    let filtered = skills.filter((skill) => {
      if (!searchText) return true;
      const title = skill?.title?.toLowerCase() || '';
      const category = skill?.category?.toLowerCase() || '';
      return title.includes(searchText.toLowerCase()) ||
        category.includes(searchText.toLowerCase());
    });

    // Then filter by category
    if (sortby !== "All") {
      filtered = filtered.filter((skill) => skill.category === sortby);
    }

    // Create a copy before sorting to avoid mutation
    let sortedFiltered = [...filtered];

    // Apply sorting
    if (activeSort === "Trending") {
      sortedFiltered = sortedFiltered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (activeSort === "New") {
      sortedFiltered = sortedFiltered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    } else if (activeSort === "Sort") {
      sortedFiltered = sortedFiltered.sort((a, b) => {
        if (a.category === "AI" && b.category !== "AI") return -1;
        if (a.category === "ML" && b.category !== "ML" && b.category !== "AI") return -1;
        if (a.category === "Web3" && !["AI", "ML"].includes(b.category)) return -1;
        if (b.category === "AI" && a.category !== "AI") return 1;
        if (b.category === "ML" && a.category !== "ML" && a.category !== "AI") return 1;
        if (b.category === "Web3" && !["AI", "ML"].includes(a.category)) return 1;
        return 0;
      });
    } else if (activeSort === "Long") {
      sortedFiltered = sortedFiltered.sort((a, b) => (parseFloat(b.duration) || 0) - (parseFloat(a.duration) || 0));
    }

    return sortedFiltered;
  }, [skills, searchText, sortby, activeSort]);

  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
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
                  <input
                    value={searchText}
                    onChange={(event) => setSearchText(event.target.value)}
                    placeholder="Search skills by Names or by Categories"
                    className="pl-10 bg-white h-12 rounded-xl w-full px-3"
                  />
                </div>
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
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 sm:mb-8 text-center sm:text-left">
            Popular Categories
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
            <CategoryCard
              name="Web Development"
              count={150}
              icon="🌐"
              onClick={() => {
                setSortBy("WebDevelopment");
                setActiveSort("All");
              }}
            />
            <CategoryCard
              name="App Development"
              count={89}
              icon="📱"
              onClick={() => {
                setSortBy("AppDevelopment");
                setActiveSort("All");
              }}
            />
            <CategoryCard
              name="Web 3"
              count={76}
              icon="₿"
              onClick={() => {
                setSortBy("Web3");
                setActiveSort("All");
              }}
            />
            <CategoryCard
              name="Data Science"
              count={120}
              icon="📊"
              onClick={() => {
                setSortBy("DataScience");
                setActiveSort("All");
              }}
            />
            <CategoryCard
              name="AI"
              count={95}
              icon="🤖"
              onClick={() => {
                setSortBy("AI");
                setActiveSort("All");
              }}
            />
            <CategoryCard
              name="ML"
              count={67}
              icon="🦾"
              onClick={() => {
                setSortBy("ML");
                setActiveSort("All");
              }}
            />
          </div>
        </div>
      </section>

      {/* Skills Tabs */}
      <section className="py-4 sm:py-6 bg-white sticky top-0 z-10 transition-all duration-300 border-b shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="flex overflow-x-auto scrollbar-hide pb-2 gap-2 sm:gap-3">
            <button
              className={`px-3 sm:px-4 py-2 rounded-full whitespace-nowrap transition-all text-sm sm:text-base flex-shrink-0 ${activeSort === "All"
                  ? "bg-purple-100 text-purple-600 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
                }`}
              onClick={() => setActiveSort("All")}
            >
              All Skills
            </button>
            <button
              className={`px-3 sm:px-4 py-2 rounded-full whitespace-nowrap transition-all text-sm sm:text-base flex-shrink-0 ${activeSort === "Trending"
                  ? "bg-purple-100 text-purple-600 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
                }`}
              onClick={() => setActiveSort("Trending")}
            >
              Trending
            </button>
            <button
              className={`px-3 sm:px-4 py-2 rounded-full whitespace-nowrap transition-all text-sm sm:text-base flex-shrink-0 ${activeSort === "New"
                  ? "bg-purple-100 text-purple-600 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
                }`}
              onClick={() => setActiveSort("New")}
            >
              New
            </button>
            <button
              className={`px-3 sm:px-4 py-2 rounded-full whitespace-nowrap transition-all text-sm sm:text-base flex-shrink-0 ${activeSort === "Sort"
                  ? "bg-purple-100 text-purple-600 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
                }`}
              onClick={() => setActiveSort("Sort")}
            >
              Sort
            </button>
            <button
              className={`px-3 sm:px-4 py-2 rounded-full whitespace-nowrap transition-all text-sm sm:text-base flex-shrink-0 ${activeSort === "Long"
                  ? "bg-purple-100 text-purple-600 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
                }`}
              onClick={() => setActiveSort("Long")}
            >
              Long
            </button>
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">Featured Skills</h2>
          </div>

          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-purple-600"></div>
              <span className="ml-3 text-sm sm:text-base text-gray-600">Loading...</span>
            </div>
          )}

          {isError && (
            <div className="text-center py-12">
              <div className="text-red-500 text-sm sm:text-base">Error fetching skills</div>
            </div>
          )}

          {!isLoading && !isError && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {filteredSkills && filteredSkills.map((skill) => (
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
          )}

          {!isLoading && !isError && filteredSkills.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-sm sm:text-base">
                {searchText ? `No skills found for "${searchText}"` : 'No skills available'}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {showForm && (
        <CreateNewSkill onClose={() => setShowForm(false)} />
      )}
    </div>
  )
}
