import React, { useState } from 'react';
import { X, Upload, Video, Plus } from 'lucide-react';

export const CreateNewSkill = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [highlights, setHighlights] = useState(['', '', '', '', '']);
  const [requirements, setRequirements] = useState(['', '', '', '', '']);

  const steps = [
    { title: 'Basic Info', key: 'basic' },
    { title: 'Content', key: 'content' },
    { title: 'Details', key: 'details' }
  ];

  const nextStep = () => {
    setCurrentStep((prev) => (prev < 3 ? prev + 1 : prev));
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const goToStep = (step) => {
    if (step >= 1 && step <= 3) {
      setCurrentStep(step);
    }
  };

  const addHighlight = () => {
    setHighlights([...highlights, '']);
  };

  const addRequirement = () => {
    setRequirements([...requirements, '']);
  };

  const updateHighlight = (index, value) => {
    const newHighlights = [...highlights];
    newHighlights[index] = value;
    setHighlights(newHighlights);
  };

  const updateRequirement = (index, value) => {
    const newRequirements = [...requirements];
    newRequirements[index] = value;
    setRequirements(newRequirements);
  };

  const StepProgress = () => (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep === stepNumber;
        const isCompleted = currentStep > stepNumber;

        return (
          <div key={stepNumber} className="flex items-center">
            <div className="flex flex-col items-center">
              <button
                onClick={() => goToStep(stepNumber)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${isActive
                    ? 'bg-pink-500 text-white'
                    : isCompleted
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
              >
                {stepNumber}
              </button>
              <span
                className={`mt-2 text-sm font-medium ${isActive ? 'text-pink-500' : 'text-gray-500'
                  }`}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-16 h-0.5 mx-4 ${isCompleted ? 'bg-pink-500' : 'bg-gray-200'
                  }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );

  const BasicInfoContent = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Skill Title
        </label>
        <input
          type="text"
          placeholder="e.g., Advanced React Development"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white">
            <option>Select a category</option>
            <option>Web Development</option>
            <option>Mobile Development</option>
            <option>Data Science</option>
            <option>Design</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Complexity Level
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white">
            <option>Select complexity</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
            <option>Expert</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mini Description
        </label>
        <textarea
          placeholder="Brief description of what this skill covers (2-3 sentences)"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Skill Length
        </label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white">
          <option>Select duration</option>
          <option>1-2 hours</option>
          <option>3-5 hours</option>
          <option>6-10 hours</option>
          <option>10+ hours</option>
        </select>
      </div>
    </div>
  );

  const ContentStepContent = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Skill Thumbnail
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Upload thumbnail image, or <span className="text-pink-500 font-medium">browse</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">Recommended: 800x600px, PNG or JPG</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Skill Videos
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
          <Video className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Upload video files, or <span className="text-pink-500 font-medium">browse</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">Supports MP4, MOV, AVI (max 100MB each)</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Main Description
        </label>
        <textarea
          placeholder="Detailed description of the skill, what students will learn, and how it will benefit them..."
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
        />
      </div>
    </div>
  );

  const DetailsStepContent = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Important Topics/Highlights (At least 5)
        </label>
        <div className="space-y-3">
          {highlights.map((highlight, index) => (
            <input
              key={index}
              type="text"
              value={highlight}
              onChange={(e) => updateHighlight(index, e.target.value)}
              placeholder={`Highlight ${index + 1}: Key topic or learning outcome`}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          ))}
        </div>
        <button
          onClick={addHighlight}
          className="mt-3 flex items-center text-sm text-pink-500 hover:text-pink-600 transition-colors"
        >
          <Plus size={16} className="mr-1" />
          Add Another Highlight
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Requirements to Learn (At least 5)
        </label>
        <div className="space-y-3">
          {requirements.map((requirement, index) => (
            <input
              key={index}
              type="text"
              value={requirement}
              onChange={(e) => updateRequirement(index, e.target.value)}
              placeholder={`Requirement ${index + 1}: What students need to know beforehand`}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          ))}
        </div>
        <button
          onClick={addRequirement}
          className="mt-3 flex items-center text-sm text-pink-500 hover:text-pink-600 transition-colors"
        >
          <Plus size={16} className="mr-1" />
          Add Another Requirement
        </button>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfoContent />;
      case 2:
        return <ContentStepContent />;
      case 3:
        return <DetailsStepContent />;
      default:
        return <BasicInfoContent />;
    }
  };

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === 3;

  return (
    <div className="fixed inset-0 bg-white/20 backdrop-blur-xs flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Create New Skill</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        <div className="px-6 pt-6">
          <StepProgress />
        </div>

        <div className="px-6 pb-6">
          <div className="min-h-[400px]">
            {renderStepContent()}
          </div>
        </div>

        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={prevStep}
            disabled={isFirstStep}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${isFirstStep
                ? 'text-gray-400 cursor-not-allowed bg-gray-100'
                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 shadow-sm'
              }`}
          >
            Previous
          </button>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors shadow-sm"
            >
              Cancel
            </button>
            <button
              onClick={isLastStep ? () => console.log('Create Skill') : nextStep}
              className="px-4 py-2 text-sm font-medium text-white bg-pink-500 border border-transparent rounded-md hover:bg-pink-600 transition-colors shadow-sm"
            >
              {isLastStep ? 'Create Skill' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
