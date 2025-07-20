import { Bookmark, Briefcase, Calendar, CheckCircle, ChevronRight, Clock, Eye, Heart, MapPin, MessageSquare, MoveRight, Star, User, Users, X } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router";
import Button from "../ui/Button";
import { useState } from 'react';

const FeaturesCard = ({ children, svg, title, description, className }) => {
  return (
    <div
      className={twMerge(
        "flex flex-col w-full h-full py-4 rounded-2xl border border-gray-100 hover:shadow-lg hover:transition hover:ease-in-out hover:duration-300 hover:-translate-y-2 cursor-pointer ",
        className
      )}
    >
      <div className="p-7">
        <div className="flex items-center justify-center bg-gray-100 h-17 w-17 rounded-2xl p-3 mb-6">
          {svg}
        </div>
        <div className="text-xl font-semibold my-5">{title}</div>
        <div className="text-gray-600">{description}</div>
        <div className="flex items-center gap-2 text-md mt-7">
          Learn more <MoveRight />
        </div>
      </div>
    </div>
  );
};

const ProjectsCard = ({
  title,
  category,
  description,
  members,
  progress,
  tags,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 relative ring-2 ring-purple-500 ring-offset-2 card-hover">
      <div className="absolute -top-3 left-4 px-3 py-1 bg-purple-600 text-white text-xs rounded-full">
        Featured
      </div>
      <div className="text-sm text-purple-600 mb-2">{category}</div>
      <h3 className="text-xl mb-2">{title}</h3>
      <p className="text-gray-600 mb-4 font-normal">{description}</p>
      <div className="flex items-center gap-2 mb-4">
        <Users className="h-5 w-5 text-gray-400" />
        <span className="text-sm text-gray-600 font-normal">{members} members</span>
      </div>
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1 font-normal">
          <span>Project Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className="gradient-primary h-2 rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm hover-scale font-normal"
          >
            {tag}
          </span>
        ))}
      </div>
      <Button
        className="flex items-center gap-2 gradient-primary border-2 border-black text-white w-full font-normal"
      >
        View Project
        <MoveRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

const CertificateCard = ({ title, issuer, dateObtained, expirationDate, certificateLink }) => {

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 h-full w-full">
      <div className="text-2xl font-semibold mb-2">{title}</div>

      <div className="text-gray-600 text-md">Issuer: {issuer}</div>

      <div className="text-lg">Date Obtained: {dateObtained}</div>
      <div className="text-lg">Expiration Date: {expirationDate}</div>
      <Button
        Variant="secondry"
        size="medium"
        className="h-10 mt-2 text-sm"
        onClick={certificateLink}
      >
        View Certificate
      </Button>
    </div>
  );
};

const MentorCard = ({
  image,
  rating,
  reviews,
  price = "Free",
  name,
  title,
  company,
  location,
  experience,
  availability,
  expertise = [],
  onRequest,
  onMessage,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 relative ring-2 ring-blue-500 ring-offset-2">
      <div className="absolute -top-3 left-4 px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full z-10 ">
        Featured Mentor
      </div>
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <Button
          variant="outline"
          size="small"
          className="absolute top-4 right-4"
          disabledClassName="opacity-50"
        >
          <Heart className="h-5 w-5" />
        </Button>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 font-medium text-sm">{rating}</span>
            <span className="ml-1 text-gray-500 text-sm">({reviews} reviews)</span>
          </div>
          <span className="text-blue-600 font-medium text-sm">{price}</span>
        </div>
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <p className="text-gray-600 text-sm mb-3">
          {title} at {company}
        </p>
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          {location}
        </div>
        <div className="space-y-3 mb-4">
          <div className="flex items-start gap-2">
            <Briefcase className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
            <span className="text-sm">{experience}</span>
          </div>
          <div className="flex items-start gap-2">
            <Calendar className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
            <span className="text-sm">Available: {availability}</span>
          </div>
        </div>
        <div className="mb-4">
          <div className="text-sm font-medium mb-2">Expertise:</div>
          <div className="flex flex-row justify-center items-baseline gap-2 h-full w-full">
            {expertise.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-blue-50 text-blue-600 flex flex-row items-center justify-center rounded-full text-sm hover-scale w-fit h-fit cursor-pointer hover:scale-125 hover:bg-blue-100"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onRequest}
            className="h-10 px-4 py-2 flex-1 bg-blue-600 text-white rounded-md text-sm font-medium"
          >
            Request Mentorship
          </button>
          <button
            onClick={onMessage}
            className="h-10 px-4 py-2 flex items-center border border-gray-300 rounded-md text-sm font-medium"
          >
            <MessageSquare className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const SkillCard = ({ title, instructor, rating, students, duration, level, price, image }) => {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  return (
    <div className="bg-white rounded-xl overflow-hidden card-hover border border-gray-100 group">
      <div className="relative">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-4 right-4 flex gap-2">
          <button
            className={`p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white ${isBookmarked ? "text-purple-600" : "text-gray-600"}`}
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark className="h-5 w-5" fill={isBookmarked ? "currentColor" : "none"} />
          </button>

          <button
            className={`p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white ${isLiked ? "text-rose-500" : "text-gray-600"}`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className="h-5 w-5" fill={isLiked ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full">{level}</span>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
            <span className="ml-1">{rating}</span>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-600 transition-colors">{title}</h3>
        <p className="text-gray-600 mb-4">by {instructor}</p>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {duration}
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {students} students
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-semibold text-xl">{price}</span>
          <button className="gradient-secondary text-white px-4 py-2 rounded-lg flex items-center">
            Learn More <ChevronRight className="ml-1 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

const FloatingCard = ({ icon: Icon, title, subtitle, bgColorClass, iconColorClass, animationClass }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-4 ${animationClass}`}>
      <div className="flex items-center gap-2">
        <div className={`w-8 h-8 ${bgColorClass} rounded-full flex items-center justify-center`}>
          <Icon className={`w-4 h-4 ${iconColorClass}`} />
        </div>
        <div>
          <div className="text-sm font-medium">{title}</div>
          <div className="text-xs text-gray-500">{subtitle}</div>
        </div>
      </div>
    </div>
  );
}

const DashboardCard = ({ activeProjects, mentorshipSessions, skillsLearned }) => {
  return (
    <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Your Dashboard</h3>
        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
      </div>
      <div className="space-y-3">
        <div className="bg-white/20 rounded-lg p-3">
          <div className="text-sm opacity-90">Active Projects</div>
          <div className="text-2xl font-bold">{activeProjects}</div>
        </div>
        <div className="bg-white/20 rounded-lg p-3">
          <div className="text-sm opacity-90">Mentorship Sessions</div>
          <div className="text-2xl font-bold">{mentorshipSessions}</div>
        </div>
        <div className="bg-white/20 rounded-lg p-3">
          <div className="text-sm opacity-90">Skills Learned</div>
          <div className="text-2xl font-bold">{skillsLearned}</div>
        </div>
      </div>
    </div>
  );
}

const ProjectCard = ({ title, status, progress, members, tags }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-900">{title}</h4>
          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">{status}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>{members} members</span>
          <span>{progress}% complete</span>
        </div>
        <div className="flex gap-2">
          {tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const MentorReviewCard = ({ imageUrl, name, title, rating, review, tags }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={imageUrl}
          alt={name}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h4 className="font-semibold text-gray-900">{name}</h4>
          <p className="text-sm text-gray-600">{title}</p>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium">{rating}</span>
        </div>
      </div>
      <p className="text-gray-700 text-sm mb-4">
        "{review}"
      </p>
      <div className="flex gap-2">
        {tags.map((tag, index) => (
          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

const MentorShipRequestCard = ({
  imageUrl,
  name,
  title,
  rating,
  review,
  tags,
  status,
  goals,
  requestedAt,
  lastUpdatedAt,
  onDetails,
  onCancel,
  onChat, // Add this prop for chat functionality
}) => {
  const showCancelButton = status === "pending";
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow w-full">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <img
            alt="Mentor"
            className="w-16 h-16 rounded-full object-cover"
            src={imageUrl}
          />
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-lg font-semibold">{name}</h3>
                <p className="text-gray-600">{title}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                  <Clock className="h-4 w-4" />
                  {status}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>{tags[0]}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>{tags[1]}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{requestedAt}</span>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-gray-700 text-sm">
                <strong>Goals:</strong> {goals}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Last updated: {lastUpdatedAt}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="success"
                  leftIcon={<Eye className="h-4 w-4 mr-1" />}
                  onClick={onDetails}
                >
                  View Details
                </Button>

                {showCancelButton ? (
                  <Button
                    variant="danger"
                    leftIcon={<X className="h-4 w-4 mr-1" />}
                    onClick={onCancel}
                  >
                    Cancel Request
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    leftIcon={<MessageSquare className="h-4 w-4 mr-1" />}
                    onClick={navigate('/Chat')} // Use the onChat prop here
                  >
                    Open Chat
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoryCard = ({ name, count, icon }) => {
  return (
    <div className="bg-white rounded-xl p-6 text-center card-hover border border-gray-100">
      <div className="text-4xl mb-3 animate-pulse-slow">{icon}</div>
      <h3 className="font-semibold mb-1">{name}</h3>
      <p className="text-sm text-gray-600">{count} skills</p>
    </div>
  )
}

const MentorInfoCard = ({ name, title, company, location, experience, responseTime }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="text-center mb-4">
        <img
          src="/placeholder.svg"
          alt={name}
          className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
        />
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600">{title}</p>
        <p className="text-sm text-gray-500">{company}</p>
      </div>
      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-gray-500" />
          <span>{experience}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-500" />
          <span>{responseTime}</span>
        </div>
      </div>
    </div>
  );
};

const ExpertiseAreasCard = ({ title = "Expertise Areas", areas = [] }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="space-y-2">
        {areas.map((area, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm">{area}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const AvailabilityCard = ({ availability }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-4">Availability</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Weekdays:</span>
          <span>{availability.weekdays}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Weekends:</span>
          <span>{availability.weekends}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Timezone:</span>
          <span>{availability.timezone}</span>
        </div>
      </div>
    </div>
  );
};

export {
  CertificateCard, DashboardCard, FeaturesCard, FloatingCard, MentorCard, MentorReviewCard, MentorShipRequestCard, ProjectCard, ProjectsCard, SkillCard,
  CategoryCard, MentorInfoCard, ExpertiseAreasCard, AvailabilityCard
};
