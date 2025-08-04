import { Plus, Upload, Video, X } from 'lucide-react';
import { useCallback, useState } from 'react';
import { z } from 'zod';
import { useCreateSkill } from '../../api/mutation/SkillMutation';

const skillFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  category: z.string().min(1, 'Category is required'),
  level: z.string().min(1, 'Level is required'),
  description: z.string().min(1, 'Description is required'),
  duration: z.string().min(1, 'Duration is required'),
  image: z.union([z.string().url('Image must be a valid URL'), z.literal('')]),
  video: z.union([z.string().url('Video must be a valid URL'), z.literal('')]),
  introduction: z.string().min(1, 'Introduction is required'),
  highlights: z.array(z.string().min(1)).min(5, 'At least 5 highlights are required'),
  knowledgeRequirement: z.array(z.string().min(1)).min(5, 'At least 5 requirements are required')
});

const defaultSkillValues = {
  title: '',
  category: '',
  level: '',
  description: '',
  duration: '',
  image: '',
  video: '',
  introduction: '',
  highlights: Array(5).fill(''),
  knowledgeRequirement: Array(5).fill('')
};

const InputField = ({ value, onChange, placeholder, error, type = 'text' }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent ${error ? 'border-red-500' : 'border-gray-300'}`}
  />
);

const TextArea = ({ value, onChange, placeholder, error, rows = 3 }) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none ${error ? 'border-red-500' : 'border-gray-300'}`}
  />
);

const SelectField = ({ value, onChange, options, error }) => (
  <select
    value={value}
    onChange={onChange}
    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white ${error ? 'border-red-500' : 'border-gray-300'}`}
  >
    {options.map((option, index) => (
      <option key={index} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

const CreateNewSkill = ({ onClose = () => { } }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(defaultSkillValues);
  const [errors, setErrors] = useState({});

  const createSkillMutation = useCreateSkill();

  const steps = [
    { title: 'Basic Info', key: 'basic' },
    { title: 'Content', key: 'content' },
    { title: 'Details', key: 'details' }
  ];

  const validateWithZod = useCallback((data) => {
    try {
      // Filter out empty strings from arrays before validation
      const cleanedData = {
        ...data,
        highlights: data.highlights.filter(h => h.trim()),
        knowledgeRequirement: data.knowledgeRequirement.filter(r => r.trim())
      };

      skillFormSchema.parse(cleanedData);
      setErrors({});
      return { success: true, data: cleanedData };
    } catch (error) {
      if (error instanceof z.ZodError && error.errors && Array.isArray(error.errors)) {
        const fieldErrors = error.errors.reduce((acc, curr) => {
          const path = curr.path.join('.');
          return { ...acc, [path]: curr.message };
        }, {});
        setErrors(fieldErrors);
        return { success: false, errors: fieldErrors };
      }

      const fallbackError = { general: 'Validation failed' };
      setErrors(fallbackError);
      return { success: false, errors: fallbackError };
    }
  }, []);

  const validateStep = useCallback((step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = 'Title is required';
      if (!formData.category) newErrors.category = 'Category is required';
      if (!formData.level) newErrors.level = 'Level is required';
      if (!formData.description.trim()) newErrors.description = 'Description is required';
      if (!formData.duration) newErrors.duration = 'Duration is required';
    } else if (step === 2) {
      if (!formData.introduction.trim()) newErrors.introduction = 'Introduction is required';
    } else if (step === 3) {
      const validHighlights = formData.highlights.filter(h => h.trim());
      if (validHighlights.length < 5) newErrors.highlights = 'At least 5 highlights are required';

      const validRequirements = formData.knowledgeRequirement.filter(r => r.trim());
      if (validRequirements.length < 5) newErrors.knowledgeRequirement = 'At least 5 requirements are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const nextStep = useCallback(() => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  }, [currentStep, validateStep]);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  }, []);

  const goToStep = useCallback((step) => {
    if (step >= 1 && step <= 3) {
      setCurrentStep(step);
    }
  }, []);

  const updateFormData = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const addHighlight = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      highlights: [...prev.highlights, '']
    }));
  }, []);

  const removeHighlight = useCallback((index) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }));
  }, []);

  const updateHighlight = useCallback((index, value) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.map((item, i) => i === index ? value : item)
    }));
  }, []);

  const addRequirement = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      knowledgeRequirement: [...prev.knowledgeRequirement, '']
    }));
  }, []);

  const removeRequirement = useCallback((index) => {
    setFormData(prev => ({
      ...prev,
      knowledgeRequirement: prev.knowledgeRequirement.filter((_, i) => i !== index)
    }));
  }, []);

  const updateRequirement = useCallback((index, value) => {
    setFormData(prev => ({
      ...prev,
      knowledgeRequirement: prev.knowledgeRequirement.map((item, i) => i === index ? value : item)
    }));
  }, []);

  const onSubmit = useCallback(async () => {
    const validation = validateWithZod(formData);

    if (!validation.success) {
      return;
    }

    try {
      await createSkillMutation.mutateAsync(validation.data);
      onClose();
    } catch (error) {
      console.error('Error creating skill:', error);
    }
  }, [formData, validateWithZod, createSkillMutation, onClose]);

  function BasicInfoContent({ formData, errors, updateFormData }) {
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Skill Title
          </label>
          <InputField
            value={formData.title}
            onChange={(e) => updateFormData('title', e.target.value)}
            placeholder="e.g., Advanced React Development"
            error={errors.title}
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <SelectField
              value={formData.category}
              onChange={(e) => updateFormData('category', e.target.value)}
              options={[
                { label: 'Select a category', value: '' },
                { label: 'Web Development', value: 'web-development' },
                { label: 'Mobile Development', value: 'mobile-development' },
                { label: 'Data Science', value: 'data-science' },
                { label: 'Design', value: 'design' }
              ]}
              error={errors.category}
            />
            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Complexity Level
            </label>
            <SelectField
              value={formData.level}
              onChange={(e) => updateFormData('level', e.target.value)}
              options={[
                { label: 'Select complexity', value: '' },
                { label: 'Beginner', value: 'beginner' },
                { label: 'Intermediate', value: 'intermediate' },
                { label: 'Advanced', value: 'advanced' },
                { label: 'Expert', value: 'expert' }
              ]}
              error={errors.level}
            />
            {errors.level && <p className="mt-1 text-sm text-red-600">{errors.level}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mini Description
          </label>
          <TextArea
            value={formData.description}
            onChange={(e) => updateFormData('description', e.target.value)}
            placeholder="Brief description of what this skill covers (2-3 sentences)"
            error={errors.description}
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Skill Length
          </label>
          <SelectField
            value={formData.duration}
            onChange={(e) => updateFormData('duration', e.target.value)}
            options={[
              { label: 'Select duration', value: '' },
              { label: '1-2 hours', value: '1-2 hours' },
              { label: '3-5 hours', value: '3-5 hours' },
              { label: '6-10 hours', value: '6-10 hours' },
              { label: '10+ hours', value: '10+ hours' }
            ]}
            error={errors.duration}
          />
          {errors.duration && <p className="mt-1 text-sm text-red-600">{errors.duration}</p>}
        </div>
      </div>
    );
  }

  function ContentStepContent({ formData, errors, updateFormData }) {
    return (
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
          <InputField
            type="url"
            value={formData.image}
            onChange={(e) => updateFormData('image', e.target.value)}
            placeholder="Or paste image URL"
            error={errors.image}
          />
          {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
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
          <InputField
            type="url"
            value={formData.video}
            onChange={(e) => updateFormData('video', e.target.value)}
            placeholder="Or paste video URL"
            error={errors.video}
          />
          {errors.video && <p className="mt-1 text-sm text-red-600">{errors.video}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Main Description
          </label>
          <TextArea
            value={formData.introduction}
            onChange={(e) => updateFormData('introduction', e.target.value)}
            placeholder="Detailed description of the skill, what students will learn, and how it will benefit them..."
            rows={6}
            error={errors.introduction}
          />
          {errors.introduction && <p className="mt-1 text-sm text-red-600">{errors.introduction}</p>}
        </div>
      </div>
    );
  }

  function DetailsStepContent({ formData, errors, updateHighlight, updateRequirement, addHighlight, addRequirement, removeHighlight, removeRequirement }) {
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Important Topics/Highlights (At least 5)
          </label>
          <div className="space-y-3">
            {formData.highlights.map((highlight, index) => (
              <div key={index} className="flex gap-2">
                <InputField
                  value={highlight}
                  onChange={(e) => updateHighlight(index, e.target.value)}
                  placeholder={`Highlight ${index + 1}: Key topic or learning outcome`}
                  error={errors.highlights && index === formData.highlights.length - 1 ? errors.highlights : null}
                />
                {formData.highlights.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeHighlight(index)}
                    className="px-3 py-2 text-red-500 hover:text-red-700 transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addHighlight}
            className="mt-3 flex items-center text-sm text-pink-500 hover:text-pink-600 transition-colors"
          >
            <Plus size={16} className="mr-1" />
            Add Another Highlight
          </button>
          {errors.highlights && <p className="mt-1 text-sm text-red-600">{errors.highlights}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Requirements to Learn (At least 5)
          </label>
          <div className="space-y-3">
            {formData.knowledgeRequirement.map((requirement, index) => (
              <div key={index} className="flex gap-2">
                <InputField
                  value={requirement}
                  onChange={(e) => updateRequirement(index, e.target.value)}
                  placeholder={`Requirement ${index + 1}: What students need to know beforehand`}
                  error={errors.knowledgeRequirement && index === formData.knowledgeRequirement.length - 1 ? errors.knowledgeRequirement : null}
                />
                {formData.knowledgeRequirement.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeRequirement(index)}
                    className="px-3 py-2 text-red-500 hover:text-red-700 transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addRequirement}
            className="mt-3 flex items-center text-sm text-pink-500 hover:text-pink-600 transition-colors"
          >
            <Plus size={16} className="mr-1" />
            Add Another Requirement
          </button>
          {errors.knowledgeRequirement && <p className="mt-1 text-sm text-red-600">{errors.knowledgeRequirement}</p>}
        </div>
      </div>
    );
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfoContent formData={formData} errors={errors} updateFormData={updateFormData} />;
      case 2:
        return <ContentStepContent formData={formData} errors={errors} updateFormData={updateFormData} />;
      case 3:
        return (
          <DetailsStepContent
            formData={formData}
            errors={errors}
            updateHighlight={updateHighlight}
            updateRequirement={updateRequirement}
            addHighlight={addHighlight}
            addRequirement={addRequirement}
            removeHighlight={removeHighlight}
            removeRequirement={removeRequirement}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
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
        </div>

        <div className="px-6 pb-6">
          <div className="min-h-[400px]">
            {renderStepContent()}
          </div>
        </div>

        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${currentStep === 1
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
              onClick={currentStep === 3 ? onSubmit : nextStep}
              disabled={createSkillMutation.isPending}
              className="px-4 py-2 text-sm font-medium text-white bg-pink-500 border border-transparent rounded-md hover:bg-pink-600 transition-colors shadow-sm disabled:opacity-50"
            >
              {createSkillMutation.isPending ? 'Creating...' : currentStep === 3 ? 'Create Skill' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewSkill;
