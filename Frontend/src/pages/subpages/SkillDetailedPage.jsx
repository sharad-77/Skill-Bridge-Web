import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Facebook,
  Linkedin,
  Star,
  Twitter,
  User,
  Video,
  FileText,
  Award
} from 'lucide-react';

import { useParams } from 'react-router-dom';
import { useGetSkillById } from '../../api/query/SkillQuery';
import Button from '../../components/ui/Button';
import { useJoinSkill } from '../../api/mutation/SkillMutation';
import useAuthStore from '../../store/useAuthStore';

const SkillDetailedPage = () => {
  const { id } = useParams();
  const { data: skillData, isLoading, isError, error } = useGetSkillById(id);
  const joinSkill = useJoinSkill(id);

  const { user } = useAuthStore();
  const userId = user?._id;

  const skill = skillData?.Skill || skillData;

  if (!id || id === 'undefined' || id === 'null') {
    return <div>Invalid skill ID</div>;
  }

  // Check if user already joined
  const alreadyJoined = skill?.enrolledStudentsIds?.includes(userId);

  const defaultSocialIcons = [
    { icon: Facebook, color: "text-blue-600" },
    { icon: Twitter, color: "text-blue-400" },
    { icon: Linkedin, color: "text-blue-700" }
  ];

  const iconMap = { Clock, Video, FileText, Award, User, Star, CheckCircle, ChevronRight };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading skill details...</div>;

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg max-w-md">
          <h2 className="text-xl font-bold mb-2">Error Loading Skill</h2>
          <p>{error?.message || 'Failed to load skill details. Please try again later.'}</p>
        </div>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Skill Not Found</h2>
          <p>The requested skill could not be found.</p>
        </div>
      </div>
    );
  }

  const socialIcons = skill.socialIcons || defaultSocialIcons;

  return (
    <main className="min-h-screen">
      <div className="min-h-screen bg-gray-50 pb-12">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
          <div className="container mx-auto px-4 py-8 max-w-5xl">
            {/* Back Button */}
            <div className="mb-6">
              <Button
                variant="outline"
                className="text-rose-100 hover:text-white transition-colors"
                startIcon={<ChevronLeft className="h-4 w-4 mr-1" />}
                onClick={() => window.history.back()}
              >
                Back to Skills
              </Button>
            </div>

            {/* Course Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-3">
                  {skill.level}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {skill.title}
                </h1>
                <p className="text-rose-100 max-w-3xl">
                  {skill.description}
                </p>

                {/* Course Stats */}
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1 font-medium">{skill.rating || 'N/A'}</span>
                    <span className="ml-1 text-rose-100">({skill.enrollStudents || 0} students)</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-rose-100" />
                    <span className="ml-1 text-rose-100">{skill.duration || 'N/A'} hours</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-rose-100" />
                    <span className="ml-1 text-rose-100">By {skill.user?.name || 'Unknown Instructor'}</span>
                  </div>
                </div>
              </div>

              {/* Enroll Button */}
              <Button
                className={`h-10 px-4 py-2 transform hover:scale-105 ${alreadyJoined
                  ? "bg-green-500 text-white cursor-default"
                  : "bg-white text-rose-500 hover:bg-white/90"
                  }`}
                disabled={alreadyJoined || joinSkill.isLoading}
                onClick={() => {
                  if (!alreadyJoined) joinSkill.mutate();
                }}
              >
                {alreadyJoined ? "Joined" : joinSkill.isLoading ? "Joining..." : "Enroll Now - Free"}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 flex justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Section */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">About This Course</h2>
                <div className="prose max-w-none">
                  <p className="mb-4 text-gray-700">
                    {skill.description}
                  </p>
                </div>
              </div>

              {/* What You'll Learn */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">What You'll Learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {skill.learningPoints?.map((point, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                <ul className="space-y-2">
                  {skill.knowledgeRequirement?.map((knowledgeRequirement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-rose-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{knowledgeRequirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Course Includes */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold mb-4">This course includes:</h2>
                <ul className="space-y-3">
                  {skill.courseIncludes?.map((item, index) => {
                    const IconComponent = iconMap[item.icon] || FileText;
                    return (
                      <li key={index} className="flex items-center gap-3">
                        <IconComponent className="h-5 w-5 text-gray-500" />
                        <span>{item.text}</span>
                      </li>
                    );
                  })}
                </ul>

                {/* Enroll Section */}
                <div className="mt-6">
                  <Button
                    className={`h-10 px-4 py-2 transform hover:scale-105 ${alreadyJoined
                      ? "bg-green-500 text-white cursor-default"
                      : "bg-white text-rose-500 hover:bg-white/90"
                      }`}
                    disabled={alreadyJoined || joinSkill.isLoading}
                    onClick={() => {
                      if (!alreadyJoined) joinSkill.mutate();
                    }}
                  >
                    {alreadyJoined ? "Joined" : joinSkill.isLoading ? "Joining..." : "Enroll Now - Free"}
                  </Button>
                  <p className="text-center text-sm text-gray-500 mt-2">
                    30-day money-back guarantee
                  </p>
                </div>
              </div>

              {/* Share Course */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold mb-4">Share this course</h2>
                <div className="flex gap-2">
                  {socialIcons.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <Button
                        key={index}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-full w-full"
                      >
                        <IconComponent className={`h-5 w-5 ${social.color || 'text-gray-600'}`} />
                      </Button>
                    );
                  })}
                  <Button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 flex-1">
                    Copy Link
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SkillDetailedPage;
