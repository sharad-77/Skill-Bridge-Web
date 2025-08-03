import {
  Target,
  BookOpen,
  Trophy,
  Mail,
  MapPin,
  User,
  Github,
  Linkedin,
  Twitter,
  Users ,
  Globe,
  Star,
  MessageSquare
} from "lucide-react";
import { RecentProjectCard, RecentReviewCard } from '../ui/Card';

// Optional: map keys to Lucide icons and colors
const iconMap = {
  projects: {
    icon: <Target className="h-5 w-5 text-blue-600" />,
    bg: "bg-blue-100",
  },
  skills: {
    icon: <BookOpen className="h-5 w-5 text-green-600" />,
    bg: "bg-green-100",
  },
  certifications: {
    icon: <Trophy className="h-5 w-5 text-purple-600" />,
    bg: "bg-purple-100",
  },
  StudentsGuided: {
    icon: <Users  className="h-7 w-7 text-blue-600" />,
    bg: "bg-blue-100",
  },
  avrageRating: {
    icon: <Star className="h-7 w-7 text-yellow-600" />,
    bg: "bg-yellow-100",
  },
  sessionCompleted: {
    icon: <MessageSquare className="h-7 w-7 text-green-600" />,
    bg: "bg-green-100",
  },
};

const socialIconMap = {
  github: <Github className="h-4 w-4" />,
  linkedin: <Linkedin className="h-4 w-4" />,
  twitter: <Twitter className="h-4 w-4" />,
  portfolio: <Globe className="h-4 w-4" />,
};

export default function DashboardSection({
  stats,
  projects,
  reviews,
  contactInfo,
  socialLinks,
  skills,
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {stats.map(({ type, count, label }) => {
              const { icon, bg } = iconMap[type] || {};
              return (
                <div
                  key={type}
                  className="bg-white rounded-xl p-6 shadow-sm text-center"
                >
                  <div
                    className={`w-12 h-12 ${bg} rounded-lg flex items-center justify-center mx-auto mb-3`}
                  >
                    {icon}
                  </div>
                  <div className="text-[36px] font-bold text-gray-900">
                    {count}
                  </div>
                  <div className="text-[21px] text-gray-600">{label}</div>
                </div>
              );
            })}
          </div>

          {/* Recent Projects */}
          {projects && <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Recent Projects</h3>
            <div className="space-y-4">
              {projects.map((project) => (
                <RecentProjectCard
                  key={project.title}
                  title={project.title}
                  role={project.role}
                  members={project.members.length}
                  progress={project.progress}
                  status={project.status}
                  color={project.color}
                  variant="compact"
                />
              ))}
            </div>
          </div>}

          {reviews && <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Recent Reviews</h3>
            <div className="space-y-4">
              {reviews.map((review) => (
                <RecentReviewCard
                  key={review.name}
                  name={review.name}
                  rating={review.rating}
                  position={review.position}
                  time={review.time}
                  variant="review"
                />
              ))}
            </div>
          </div> }

        </div>

        {/* Right Section */}
        <div className="space-y-6">
          {/* Contact Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-500" />
                {contactInfo.email}
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-gray-500" />
                {contactInfo.location}
              </div>
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-gray-500" />
                {contactInfo.phone}
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Social Links</h3>
            <div className="space-y-3 text-sm">
              {socialLinks.map(({ type, label, url }) => (
                <a
                  key={type}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-purple-600 transition-colors"
                >
                  {socialIconMap[type]}
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
