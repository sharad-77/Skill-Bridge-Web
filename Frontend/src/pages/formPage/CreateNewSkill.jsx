import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Upload, Video, X } from 'lucide-react';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useCreateSkill } from '../../api/mutation/SkillMutation';

const skillFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  category: z.string().min(1, 'Category is required'),
  level: z.string().min(1, 'Level is required'),
  description: z.string().min(1, 'Description is required'),
  duration: z.string().min(1, 'Duration is required'),
  image: z.string().url('Image must be a valid URL').optional().or(z.literal('')),
  video: z.string().url('Video must be a valid URL').optional().or(z.literal('')),
  introduction: z.string().min(1, 'Introduction is required'),
  highlights: z.array(z.string()).min(1, 'At least 1 highlight is required'),
  knowledgeRequirement: z.array(z.string()).min(1, 'At least 1 knowledge requirement is required'),
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
  highlights: [''],
  knowledgeRequirement: [''],
};

const InputField = ({ error, ...props }) => (
  <input
    {...props}
    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent ${error ? 'border-red-500' : 'border-gray-300'
      }`}
  />
);

const TextArea = ({ error, ...props }) => (
  <textarea
    {...props}
    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none ${error ? 'border-red-500' : 'border-gray-300'
      }`}
  />
);

const SelectField = ({ error, children, ...props }) => (
  <select
    {...props}
    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white ${error ? 'border-red-500' : 'border-gray-300'
      }`}
  >
    {children}
  </select>
);

function BasicInfoContent({ register, errors }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Skill Title</label>
        <InputField {...register('title')} placeholder="e.g., Advanced React Development" error={errors.title} />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <SelectField {...register('category')} error={errors.category}>
            <option value="">Select a category</option>
            <option value="WebDevelopment">Web Development</option>
            <option value="AppDevelopment">App Development</option>
            <option value="Web3">Web3</option>
            <option value="DataScience">Data Science</option>
            <option value="AI">AI</option>
            <option value="ML">ML</option>
          </SelectField>
          {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Complexity Level</label>
          <SelectField {...register('level')} error={errors.level}>
            <option value="">Select complexity</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="expert">Expert</option>
          </SelectField>
          {errors.level && <p className="mt-1 text-sm text-red-600">{errors.level.message}</p>}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Mini Description</label>
        <TextArea {...register('description')} placeholder="Brief description..." error={errors.description} />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Skill Length</label>
        <SelectField {...register('duration')} error={errors.duration}>
          <option value="">Select duration</option>
          <option value="1-2 hours">1-2 hours</option>
          <option value="3-5 hours">3-5 hours</option>
          <option value="6-10 hours">6-10 hours</option>
          <option value="10+ hours">10+ hours</option>
        </SelectField>
        {errors.duration && <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>}
      </div>
    </div>
  );
}

function ContentStepContent({ register, errors }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Skill Thumbnail</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Upload thumbnail image, or <span className="text-pink-500 font-medium">browse</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">Recommended: 800x600px, PNG or JPG</p>
        </div>
        <InputField type="url" {...register('image')} placeholder="Or paste image URL" error={errors.image} />
        {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Skill Videos</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
          <Video className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Upload video files, or <span className="text-pink-500 font-medium">browse</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">Supports MP4, MOV, AVI (max 100MB each)</p>
        </div>
        <InputField type="url" {...register('video')} placeholder="Or paste video URL" error={errors.video} />
        {errors.video && <p className="mt-1 text-sm text-red-600">{errors.video.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Main Description</label>
        <TextArea {...register('introduction')} placeholder="Detailed description..." rows={6} error={errors.introduction} />
        {errors.introduction && <p className="mt-1 text-sm text-red-600">{errors.introduction.message}</p>}
      </div>
    </div>
  );
}

function DetailsStepContent({ fields, append, remove, register, errors, name, label, minItems }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-4">{label} (At least {minItems})</label>
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <InputField
              {...register(`${name}.${index}`)}
              placeholder={`${label.slice(0, -1)} ${index + 1}`}
              error={errors[name] && errors[name][index]}
            />
            {fields.length > minItems && (
              <button
                type="button"
                onClick={() => remove(index)}
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
        onClick={() => append('')}
        className="mt-3 flex items-center text-sm text-pink-500 hover:text-pink-600 transition-colors"
      >
        <Plus size={16} className="mr-1" />
        Add Another {label.slice(0, -1)}
      </button>
      {errors[name] && typeof errors[name].message === 'string' && (
        <p className="mt-1 text-sm text-red-600">{errors[name].message}</p>
      )}
    </div>
  );
}

const CreateNewSkill = ({ onClose = () => { } }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const createSkillMutation = useCreateSkill();

  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: defaultSkillValues,
    resolver: zodResolver(skillFormSchema),
    mode: 'onTouched',
  });

  const {
    fields: highlightFields,
    append: appendHighlight,
    remove: removeHighlight,
  } = useFieldArray({ control, name: 'highlights' });

  const {
    fields: requirementFields,
    append: appendRequirement,
    remove: removeRequirement,
  } = useFieldArray({ control, name: 'knowledgeRequirement' });

  const steps = [
    { title: 'Basic Info', key: 'basic' },
    { title: 'Content', key: 'content' },
    { title: 'Details', key: 'details' },
  ];

  const nextStep = async () => {
    let valid = false;
    if (currentStep === 1) valid = await trigger(['title', 'category', 'level', 'description', 'duration']);
    if (currentStep === 2) valid = await trigger(['image', 'video', 'introduction']);
    if (valid && currentStep < 3) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const goToStep = (step) => setCurrentStep(step);

  const onSubmit = async (data) => {
    try {
      const cleanedData = {
        ...data,
        highlights: data.highlights.filter((h) => h.trim() !== ""),
        knowledgeRequirement: data.knowledgeRequirement.filter((r) => r.trim() !== ""),
      };

      await createSkillMutation.mutateAsync(cleanedData);
      onClose();
    } catch (error) {
      console.error("Error creating skill:", error);
    }
  };


  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Create New Skill</h2>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
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
                      type="button"
                      onClick={() => goToStep(stepNumber)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${isActive ? 'bg-pink-500 text-white' : isCompleted ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-500'
                        }`}
                    >
                      {stepNumber}
                    </button>
                    <span className={`mt-2 text-sm font-medium ${isActive ? 'text-pink-500' : 'text-gray-500'}`}>
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${isCompleted ? 'bg-pink-500' : 'bg-gray-200'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="px-6 pb-6 min-h-[400px]">
          {currentStep === 1 && <BasicInfoContent register={register} errors={errors} />}
          {currentStep === 2 && <ContentStepContent register={register} errors={errors} />}
          {currentStep === 3 && (
            <>
              <DetailsStepContent
                fields={highlightFields}
                append={appendHighlight}
                remove={removeHighlight}
                register={register}
                errors={errors}
                name="highlights"
                label="Highlights"
                minItems={1}
              />
              <div className="mt-8" />
              <DetailsStepContent
                fields={requirementFields}
                append={appendRequirement}
                remove={removeRequirement}
                register={register}
                errors={errors}
                name="knowledgeRequirement"
                label="Requirements to Learn"
                minItems={1}
              />
            </>
          )}
        </div>

        {/* Footer buttons */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <button
            type="button"
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
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors shadow-sm">
              Cancel
            </button>

            {currentStep < 3 && (
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 text-sm font-medium text-white bg-pink-500 border border-transparent rounded-md hover:bg-pink-600 transition-colors shadow-sm"
              >
                Next
              </button>
            )}

            {currentStep === 3 && (
              <button
                type="submit"
                disabled={createSkillMutation.isPending}
                className="px-4 py-2 text-sm font-medium text-white bg-pink-500 border border-transparent rounded-md hover:bg-pink-600 transition-colors shadow-sm disabled:opacity-50"
              >
                {createSkillMutation.isPending ? 'Creating...' : 'Create Skill'}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateNewSkill;
