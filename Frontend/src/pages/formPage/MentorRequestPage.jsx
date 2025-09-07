import { ArrowLeft, Star } from 'lucide-react';
import { AvailabilityCard, ExpertiseAreasCard, MentorInfoCard } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useDetailsMentor } from '../../api/mutation/MentorMutation';

const MentorRequest = () => {
  const { mentorId } = useParams();
  const navigate = useNavigate();
  const {
    data,
    isLoading,
    isError,
    error
  } = useDetailsMentor(mentorId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading mentor details...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Mentor</h2>
          <p className="text-gray-600 mb-4">{error?.message || 'Something went wrong'}</p>
        </div>
      </div>
    );
  }

  const { mentorDetails } = data;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-400 text-white">
        <div className="container mx-auto px-4 py-8 w-full max-w-5xl">
          {/* Back Link */}
          <div className="mb-6">
            <Button
              onClick={() => navigate("/mentor")}
            className="bg-indigo-600 hover:bg-white hover:text-black"
            >
             <ArrowLeft></ArrowLeft> Back To Mentor Page
            </Button>
          </div>

          {/* Mentor Info Section */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <img
              src={mentorDetails.image}
              alt="Alice Johnson"
              className="w-32 h-32 rounded-2xl object-cover border-4 border-white/20"
            />
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Request Mentorship</h1>
              <p className="text-white text-lg mb-4">
                Send a mentorship request to {mentorDetails?.name} and start your learning journey
              </p>

              <div className="flex items-center gap-4">
                {/* Rating Section */}
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium">{mentorDetails.reting}</span>
                  <span className="ml-1 text-blue-100">{mentorDetails.Student}</span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 w-full h-full flex justify-center">
        <div className="flex flex-col sm:flex-row justify-center gap-5 max-w-5xl w-full h-full">
          {/* Main Form */}
          <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 sm:w-[70%] w-full max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-gray-800">Mentorship Request Form</h2>

            <form className="space-y-6">
              {/* Type of Mentorship */}
              <div className="space-y-1.5">
                <label htmlFor="mentorshipType" className="block text-sm font-semibold text-gray-700">
                  Type of Mentorship
                </label>
                <select
                  id="mentorshipType"
                  name="mentorshipType"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  <option value="">Select mentorship type</option>
                  <option value="career">Career Development</option>
                  <option value="technical">Technical Skills</option>
                  <option value="interview">Interview Preparation</option>
                  <option value="leadership">Leadership & Management</option>
                  <option value="general">General Guidance</option>
                </select>
              </div>

              {/* Preferred Duration */}
              <div className="space-y-1.5">
                <label htmlFor="duration" className="block text-sm font-semibold text-gray-700">
                  Preferred Duration
                </label>
                <select
                  id="duration"
                  name="duration"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  <option value="">Select duration</option>
                  <option value="one-time">One-time session (1–2 hours)</option>
                  <option value="short-term">Short-term (1–3 months)</option>
                  <option value="long-term">Long-term (3–6 months)</option>
                  <option value="ongoing">Ongoing relationship</option>
                </select>
              </div>

              {/* Your Goals */}
              <div className="space-y-1.5">
                <label htmlFor="goals" className="block text-sm font-semibold text-gray-700">
                  Your Goals
                </label>
                <textarea
                  id="goals"
                  name="goals"
                  required
                  placeholder="What do you hope to achieve through this mentorship? Be specific about your goals and expectations."
                  className="w-full min-h-[100px] rounded-lg border border-gray-300 px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-y"
                ></textarea>
              </div>

              {/* Experience Level */}
              <div className="space-y-1.5">
                <label htmlFor="experience" className="block text-sm font-semibold text-gray-700">
                  Your Current Experience Level
                </label>
                <textarea
                  id="experience"
                  name="experience"
                  required
                  placeholder="Tell us about your current experience, skills, and background relevant to the mentorship area."
                  className="w-full min-h-[80px] rounded-lg border border-gray-300 px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-y"
                ></textarea>
              </div>

              {/* Availability */}
              <div className="space-y-1.5">
                <label htmlFor="availability" className="block text-sm font-semibold text-gray-700">
                  Your Availability
                </label>
                <select
                  id="availability"
                  name="availability"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  <option value="">Select your availability</option>
                  <option value="weekday-morning">Weekday mornings</option>
                  <option value="weekday-afternoon">Weekday afternoons</option>
                  <option value="weekday-evening">Weekday evenings</option>
                  <option value="weekend-morning">Weekend mornings</option>
                  <option value="weekend-afternoon">Weekend afternoons</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>

              {/* Meeting Format */}
              <div className="space-y-1.5">
                <label htmlFor="preferredMeeting" className="block text-sm font-semibold text-gray-700">
                  Preferred Meeting Format
                </label>
                <select
                  id="preferredMeeting"
                  name="preferredMeeting"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  <option value="">Select meeting format</option>
                  <option value="video-call">Video call</option>
                  <option value="phone-call">Phone call</option>
                  <option value="in-person">In-person (if location permits)</option>
                  <option value="messaging">Text/messaging</option>
                  <option value="mixed">Mixed approach</option>
                </select>
              </div>

              {/* Specific Questions */}
              <div className="space-y-1.5">
                <label htmlFor="specificQuestions" className="block text-sm font-semibold text-gray-700">
                  Specific Questions or Topics
                </label>
                <textarea
                  id="specificQuestions"
                  name="specificQuestions"
                  placeholder="Are there specific questions, challenges, or topics you'd like to discuss?"
                  className="w-full min-h-[100px] rounded-lg border border-gray-300 px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-y"
                ></textarea>
              </div>

              {/* Additional Info */}
              <div className="space-y-1.5">
                <label htmlFor="additionalInfo" className="block text-sm font-semibold text-gray-700">
                  Additional Information
                </label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  placeholder="Any additional information you'd like to share with the mentor?"
                  className="w-full min-h-[80px] rounded-lg border border-gray-300 px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-y"
                ></textarea>
              </div>

              {/* Submit */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold py-3 rounded-lg shadow transition"
                >
                  Send Mentorship Request
                </button>
                <p className="text-sm text-gray-500 mt-3 text-center">
                  You'll be redirected to track your request status after submission.
                </p>
              </div>
            </form>
          </div>


          {/* Mentor Info Sidebar */}
          <div className="space-y-6 sm:w-[30%] w-full">
            {/* Mentor Summary */}
            <MentorInfoCard
              image={mentorDetails.image}
              name={mentorDetails.name}
              title={mentorDetails.position}
              location={mentorDetails.location}
              experience={mentorDetails.experience}
            />

            <ExpertiseAreasCard
              areas={mentorDetails.expertise}
            />

            <AvailabilityCard
              availability={mentorDetails.availability}
            />


          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorRequest;
