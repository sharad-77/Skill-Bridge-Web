import { X } from "lucide-react";
import { useState } from "react";
import Button from "../components/ui/Button";
import { ProjectsCard } from "../components/ui/Card";

function Collaboration() {
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
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

        <div className="bg-white h-full w-full gap-3 mx-3 px-3 py-2 rounded-lg font-semibold flex items-center justify-center  max-w-5xl mx-auto">
          <div className="max-w-7xl h-full w-full flex justify-between items-center gap-6">
            <input
              type="text3"
              placeholder="Search projects by name, skills, or keywords"
              className="w-full p-2 lg:p-4 rounded-2xl focus:outline-none border border-gray-300"
            />
            <button className="border border-gray-300 px-2 py-1 lg:px-4 lg:py-2 rounded-lg">
              Filters
            </button>

            <select className="border border-gray-300 px-2 py-1 lg:px-4 lg:py-2 rounded-lg ">
              <option>Sort: Newest</option>
              <option>Sort: Populer</option>
              <option>Sort: Closign Soon</option>
            </select>
          </div>
        </div>

        <div className="h-full w-full px-5  max-w-5xl mx-auto">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-bold text-2xl pt-8 px-5">Featured Projects</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 py-10">
              <ProjectsCard
                category={"Artificial intelligence"}
                title={"AI-Powered Study Assistant"}
                progress={90}
                tags={["AI", "Machine Learning", "Python", "React"]}
                description={
                  "Help students study more effectively using AI and machine learning"
                }
                skills={["AI", "Machine Learning", "Python", "React"]}
                members={3}
              ></ProjectsCard>
              <ProjectsCard
                category={"Artificial intelligence"}
                title={"AI-Powered Study Assistant"}
                progress={90}
                tags={["AI", "Machine Learning", "Python", "React"]}
                description={
                  "Help students study more effectively using AI and machine learning"
                }
                skills={["AI", "Machine Learning", "Python", "React"]}
                members={3}
              ></ProjectsCard>
              <ProjectsCard
                category={"Artificial intelligence"}
                title={"AI-Powered Study Assistant"}
                progress={90}
                tags={["AI", "Machine Learning", "Python", "React"]}
                description={
                  "Help students study more effectively using AI and machine learning"
                }
                skills={["AI", "Machine Learning", "Python", "React"]}
                members={3}
              ></ProjectsCard>
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

function AddProjectModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto md:px-12 md:py-8 px-6 py-4">
        <div className="p-6 border-b sticky top-0 bg-white z-10 flex justify-between items-center">
          <h3 className="text-xl font-semibold">Start a New Project</h3>
          <Button variant="normal" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6">
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Project Title</label>
              <input
                placeholder="Enter a descriptive title for your project"
                className="w-full px-4 py-2 border rounded-lg md:w-1/2"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <select className="w-full px-4 py-2 border rounded-lg md:w-1/2">
                <option value="">Select a category</option>
                <option>Web Development</option>
                <option>Mobile Development</option>
                <option>Artificial Intelligence</option>
                <option>Data Science</option>
                <option>Blockchain</option>
                <option>Environmental Tech</option>
                <option>Healthcare Tech</option>
                <option>Virtual Reality</option>
                <option>Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                className="w-full px-4 py-2 border rounded-lg min-h-[120px] md:w-1/2"
                placeholder="Describe your project, its goals, and what you're looking to achieve"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Required Skills</label>
              <input
                placeholder="e.g., React, Python, UI Design (comma separated)"
                className="w-full px-4 py-2 border rounded-lg md:w-1/2"
              />
              <p className="text-xs text-gray-500">
                Enter skills separated by commas
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Team Size</label>
              <select className="w-full px-4 py-2 border rounded-lg md:w-1/2">
                <option>1-2 members</option>
                <option>3-5 members</option>
                <option>6-10 members</option>
                <option>10+ members</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Project Duration</label>
              <select className="w-full px-4 py-2 border rounded-lg md:w-1/2">
                <option>Less than 1 month</option>
                <option>1-3 months</option>
                <option>3-6 months</option>
                <option>6+ months</option>
              </select>
            </div>

            <div className="pt-4 flex gap-4 justify-end">
              <Button variant="secondry" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="primary" className="gradient-primary text-white">
                Create Project
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Collaboration;
