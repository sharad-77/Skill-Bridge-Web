import { useState } from "react";
import { useGetProjects } from "../api/mutation/ProjectMutation";
import { ProjectsCard } from "../components/ui/Card";
import AddProjectModal from "../pages/formPage/NewProject";

function Collaboration() {
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [ searchText, setSearchText ] = useState("")
  const { data: projects, isLoading, isError } = useGetProjects();
  const [sortby, setSortBy] = useState('');

  const FilteredProjects = projects?.filter((project) => {
    if (!searchText) return true;
    let lowerSearchText = searchText.toLowerCase();
    return (
      project?.title?.toLowerCase().includes(lowerSearchText) ||
      project?.category?.toLowerCase().includes(lowerSearchText)
    );
  }) || [];

  const SearchBySorting = [...FilteredProjects].sort((a, b) => {
    if (sortby === "Newest") {
      const New = new Date(b.createdAt) - new Date(a.createdAt);
      return New;
    } else if (sortby === "Populer") {
      return (b.members?.length) - (a.members?.length);
    } else if (sortby === "Closing Soon") {
      const dateA = new Date(a.projectdeadline);
      const dateB = new Date(b.projectdeadline);

      return dateA - dateB;
    }
  });

  const progress = (project) => {
    const memberCount = project.members.length;
    return Math.min(memberCount * 25, 100);
  }

  return (
    <div>
      {/* Header Section */}
      <div className="text-left shadow-lg  bg-gradient-to-r from-purple-500 to-blue-500 ">
        <header className="text-[#ffffff] font-semibold p-6 lg:p-10 flex flex-col items-left justify-center max-w-5xl mx-auto">
          <div className="inline-block bg-black opacity-80 text-white text-sm px-3 p-3 rounded-full mb-3 h-full w-fit">
            Collaboration Hub
          </div>
          <div className=" text-4xl md:text-5xl lg:text-6xl text-[ffffff] font-bold mb-2">
            Project Collaboration Hub
          </div>
          <div className="text-sm md:text-md lg:text-lg max-w-2xl mb-6">
            Find exciting projects to work on or start your own. Connect with
            talented peers and build something amazing together.
          </div>
          <div className="flex space-x-4">
            <button
              className="bg-white text-purple-600 p-3 rounded-lg hover:bg-gray-100 transition"
              onClick={() => setIsAddProjectModalOpen(true)}
            >
              Start a Project +
            </button>
            <button className="bg-white text-purple-600 p-3 rounded-lg hover:bg-gray-100 transition">
              Explore Projects
            </button>
          </div>
        </header>
      </div>

      <div className='flex flex-col justify-center items-center h-full w-full'>

        <div className="bg-white h-full w-full gap-3 mx-3 px-3 py-2 rounded-lg font-semibold flex items-center justify-center  max-w-5xl ">
          <div className="max-w-7xl h-full w-full flex justify-between items-center gap-6">
            <input
              type="text"
              placeholder="Search projects by name or category"
              className="w-full p-2 lg:p-4 rounded-2xl focus:outline-none border border-gray-300
              focus:border-purple-600 focus:border-2"
              value={searchText}
              onChange={(event) => {
                setSearchText(event.target.value)
              }}
            />
            <select className="border border-gray-300 px-3 py-3 h-full rounded-lg cursor-pointer"
            onChange={(e) => setSortBy(e.target.value)}>
              <option value="Newest">Sort: Newest</option>
              <option value="Populer">Sort: Populer</option>
              <option value="Closing Soon">Sort: Closign Soon</option>
            </select>
          </div>
        </div>

        <div className="h-full w-full px-5  max-w-5xl mx-auto">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-bold text-2xl pt-8 px-5">Featured Projects</h1>

            {isLoading && <div>Loading...</div>}
            {isError && <div>Error fetching projects</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 py-10">
              {SearchBySorting && SearchBySorting.map((project) => (
                <ProjectsCard
                  key={project._id}
                  id={project._id}
                  category={project.category}
                  title={project.title}
                  progress={progress(project)}
                  tags={project.tags}
                  description={project.description}
                  skills={project.requiredSkills}
                  members={project.members?.length || 0}
                />
              ))}
            </div>

          </div>
        </div>
      </div>

      <AddProjectModal
        isOpen={isAddProjectModalOpen}
        onClose={() => setIsAddProjectModalOpen(false)}
      />
    </div>
  );
}

export default Collaboration;
