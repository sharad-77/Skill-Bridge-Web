import { Plus, X } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateProject } from '../../api/mutation/ProjectMutation';

function AddProjectModal({ isOpen, onClose }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { mutate: createProject, isPending } = useCreateProject();
  const [requiredSkills, setRequiredSkills] = useState(['']);
  const [projectGoals, setProjectGoals] = useState(['']);

  const addSkill = () => setRequiredSkills([...requiredSkills, '']);
  const removeSkill = (index) => {
    const newSkills = [...requiredSkills];
    newSkills.splice(index, 1);
    setRequiredSkills(newSkills);
  };

  const addGoal = () => setProjectGoals([...projectGoals, '']);
  const removeGoal = (index) => {
    const newGoals = [...projectGoals];
    newGoals.splice(index, 1);
    setProjectGoals(newGoals);
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...requiredSkills];
    newSkills[index] = value;
    setRequiredSkills(newSkills);
  };

  const handleGoalChange = (index, value) => {
    const newGoals = [...projectGoals];
    newGoals[index] = value;
    setProjectGoals(newGoals);
  };

  const onSubmit = (data) => {
    // Filter out empty skills and goals
    const skills = requiredSkills.filter(skill => skill.trim() !== '');
    const goals = projectGoals.filter(goal => goal.trim() !== '');

    const projectData = {
      ...data,
      requiredSkill: skills,
      projectGoal: goals,
      teamSize: parseInt(data.teamSize, 10)
    };

    createProject(projectData, {
      onSuccess: () => {
        reset();
        setRequiredSkills(['']);
        setProjectGoals(['']);
        onClose();
      }
    });
  };

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
            disabled={isPending}
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Project Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Project Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                {...register('title', { required: 'Project title is required' })}
                className={`w-full px-3 py-2 border rounded-md ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter project title"
                disabled={isPending}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                {...register('category', { required: 'Category is required' })}
                className={`w-full px-3 py-2 border rounded-md ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
                disabled={isPending}
              >
                <option value="">Select a category</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="Data Science">Data Science</option>
                <option value="AI/ML">AI/ML</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Other">Other</option>
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                {...register('description', { required: 'Description is required' })}
                rows={3}
                className={`w-full px-3 py-2 border rounded-md ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Describe your project in detail..."
                disabled={isPending}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            {/* Introduction */}
            <div>
              <label htmlFor="introduction" className="block text-sm font-medium text-gray-700 mb-1">
                Introduction <span className="text-red-500">*</span>
              </label>
              <textarea
                id="introduction"
                {...register('introduction', { required: 'Introduction is required' })}
                rows={2}
                className={`w-full px-3 py-2 border rounded-md ${errors.introduction ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="A brief introduction to your project..."
                disabled={isPending}
              />
              {errors.introduction && (
                <p className="mt-1 text-sm text-red-600">{errors.introduction.message}</p>
              )}
            </div>

            {/* Project Goals */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Goals <span className="text-red-500">*</span>
              </label>
              {projectGoals.map((goal, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={goal}
                    onChange={(e) => handleGoalChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                    placeholder={`Goal ${index + 1}`}
                    disabled={isPending}
                  />
                  {projectGoals.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeGoal(index)}
                      className="p-2 text-red-500 hover:text-red-700"
                      disabled={isPending}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addGoal}
                className="mt-2 flex items-center text-sm text-blue-600 hover:text-blue-800"
                disabled={isPending}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Goal
              </button>
            </div>

            {/* Required Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Required Skills <span className="text-red-500">*</span>
              </label>
              {requiredSkills.map((skill, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => handleSkillChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                    placeholder={`Skill ${index + 1}`}
                    disabled={isPending}
                  />
                  {requiredSkills.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="p-2 text-red-500 hover:text-red-700"
                      disabled={isPending}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addSkill}
                className="mt-2 flex items-center text-sm text-blue-600 hover:text-blue-800"
                disabled={isPending}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Skill
              </button>
            </div>

            {/* Team Size */}
            <div>
              <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700 mb-1">
                Team Size <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="teamSize"
                min="1"
                {...register('teamSize', {
                  required: 'Team size is required',
                  min: { value: 1, message: 'Team size must be at least 1' }
                })}
                className={`w-full px-3 py-2 border rounded-md ${errors.teamSize ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter team size"
                disabled={isPending}
              />
              {errors.teamSize && (
                <p className="mt-1 text-sm text-red-600">{errors.teamSize.message}</p>
              )}
            </div>

            {/* Project Deadline */}
            <div>
              <label htmlFor="projectdeadline" className="block text-sm font-medium text-gray-700 mb-1">
                Project Deadline <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="projectdeadline"
                {...register('projectdeadline', { required: 'Project deadline is required' })}
                className={`w-full px-3 py-2 border rounded-md ${errors.projectdeadline ? 'border-red-500' : 'border-gray-300'}`}
                disabled={isPending}
              />
              {errors.projectdeadline && (
                <p className="mt-1 text-sm text-red-600">{errors.projectdeadline.message}</p>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={isPending}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isPending}
              >
                {isPending ? 'Creating...' : 'Create Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProjectModal;
