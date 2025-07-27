import React,{useState} from 'react';
import { X, Plus } from 'lucide-react';

function AddProjectModal({ isOpen, onClose }) {

  // const [index, setIndex] = useState(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Start a New Project</h3>
            <p className="text-sm text-gray-500 mt-1">Create a project and find collaborators</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <form className="p-6 space-y-6">
            {/* Project Title */}
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Project Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter a descriptive title for your project"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none hover:border-gray-400"
                maxLength={100}
              />
              <p className="text-xs text-gray-500">0/100 characters</p>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category *
              </label>
              <select
                id="category"
                name="category"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white hover:border-gray-400"
              >
                <option value="">Select a category</option>
                <option value="web-development">Web Development</option>
                <option value="mobile-development">Mobile Development</option>
                <option value="ai-ml">Artificial Intelligence & ML</option>
                <option value="data-science">Data Science & Analytics</option>
                <option value="blockchain">Blockchain & Web3</option>
                <option value="game-development">Game Development</option>
                <option value="devops-cloud">DevOps & Cloud</option>
                <option value="cybersecurity">Cybersecurity</option>
                <option value="iot">Internet of Things</option>
                <option value="ar-vr">AR/VR & Metaverse</option>
                <option value="fintech">Financial Technology</option>
                <option value="healthtech">Healthcare Technology</option>
                <option value="edtech">Educational Technology</option>
                <option value="greentech">Environmental Technology</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/*Brife Introduction*/}
            <div className="space-y-2">
              <label htmlFor="introduction" className="block text-sm font-medium text-gray-700">
                Brief Introduction *
              </label>
              <textarea
                id="introduction"
                name="introduction"
                placeholder="Provide a brief overview of your project in 2-3 sentences"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none hover:border-gray-400"
                maxLength={300}
              />
              <p className="text-xs text-gray-500">0/300 characters</p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Describe your project, its goals, target audience, and what you're looking to achieve. Be specific about the problem you're solving."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none hover:border-gray-400"
                maxLength={1000}
              />
              <p className="text-xs text-gray-500">0/1000 characters</p>
            </div>

            {/* Project Goals */}
            <div className="space-y-2">

              <label htmlFor="goals" className="block text-sm font-medium text-gray-700">
                Project Goals (At least 5)
              </label>

              <input type="text" id="goals" name="goals" placeholder={`Goal  : What do you want to achieve?`} className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none hover:border-gray-400" />
              <input
                type="text"
                id="goals"
                name="goals"
                placeholder={`Goal : What do you want to achieve?`}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none hover:border-gray-400"
              />

            </div>

            {/* Skills */}
            <div className="space-y-2">
              <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                Required Skills *
              </label>
              <div className="flex gap-2">
                <input
                  id="skills"
                  name="skills"
                  type="text"
                  placeholder="e.g., React, Python, UI Design"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none hover:border-gray-400"
                />
                <button
                  type="button"
                  className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add
                </button>
              </div>

              {/* Skills Tags - Example */}
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  React
                  <button
                    type="button"
                    className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  Node.js
                  <button
                    type="button"
                    className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              </div>

              <p className="text-xs text-gray-500">
                Press Enter or comma to add skills. Add 3-8 relevant skills.
              </p>
            </div>

            {/* Team Size and Duration Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Team Size */}
              <div className="space-y-2">
                <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700">
                  Team Size *
                </label>
                <select
                  id="teamSize"
                  name="teamSize"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white hover:border-gray-400"
                >
                  <option value="">Select team size</option>
                  <option value="1-2">1-2 members (Solo/Pair)</option>
                  <option value="3-5">3-5 members (Small team)</option>
                  <option value="6-10">6-10 members (Medium team)</option>
                  <option value="10+">10+ members (Large team)</option>
                </select>
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                  Project Duration *
                </label>
                <select
                  id="duration"
                  name="duration"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white hover:border-gray-400"
                >
                  <option value="">Select duration</option>
                  <option value="less-than-1-month">Less than 1 month</option>
                  <option value="1-3-months">1-3 months</option>
                  <option value="3-6-months">3-6 months</option>
                  <option value="6-months-plus">6+ months</option>
                  <option value="ongoing">Ongoing</option>
                </select>
              </div>
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Project Priority
              </label>
              <div className="flex gap-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="priority"
                    value="low"
                    className="sr-only"
                  />
                  <span className="px-4 py-2 rounded-lg border text-sm font-medium transition-all bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100">
                    Low
                  </span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="priority"
                    value="medium"
                    className="sr-only"
                    defaultChecked
                  />
                  <span className="px-4 py-2 rounded-lg border text-sm font-medium transition-all bg-yellow-100 text-yellow-800 border-yellow-200">
                    Medium
                  </span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="priority"
                    value="high"
                    className="sr-only"
                  />
                  <span className="px-4 py-2 rounded-lg border text-sm font-medium transition-all bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100">
                    High
                  </span>
                </label>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-6 border-t border-gray-200 flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium flex items-center justify-center gap-2 min-w-[140px]"
              >
                Create Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProjectModal;
