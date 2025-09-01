import { AlertCircle, Bookmark, BookOpen, Briefcase, Calendar, Check, CheckCircle, ChevronRight, Clock, Eye, Heart, MapPin, MessageSquare, MoveRight, Star, Target, User, Users, X, XCircle } from "lucide-react";
import { useState } from 'react';
import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";
import { cn } from "../../lib/utils";
import useAuthStore from '../../store/useAuthStore';
import Button from "../ui/Button";

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
  id,
  title = '',
  category = '',
  description = '',
  members = 0,
  progress = 0,
  tags = [],
}) => {
  const navigate = useNavigate();
  const { isAuthenticated, isOnBoarded } = useAuthStore();

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 relative w-full max-w-sm mx-auto overflow-hidden">
      {/* Content */}
      <div className="pt-2">
        {/* Category */}
        <div className="text-sm font-semibold text-purple-600 mb-2">
          {category}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {description}
        </p>

        {/* Members */}
        <div className="flex items-center gap-2 mb-4">
          <Users className="h-4 w-4 text-gray-400 flex-shrink-0" />
          <span className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{members}</span> members
          </span>
        </div>

        {/* Progress Section */}
        <div className="mb-4">
          <div className="flex justify-between items-center text-sm mb-2">
            <span className="font-medium text-gray-700">Project Progress</span>
            <span className="font-semibold text-gray-900">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-500 to-purple-600 h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Tags */}
        <div className="mb-5">
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 4).map((tag, index) => (
              <span
                key={index}
                className="px-2.5 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium hover:bg-purple-100 transition-colors duration-150 cursor-pointer"
              >
                {tag}
              </span>
            ))}
            {tags.length > 4 && (
              <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                +{tags.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* CTA Button */}
        <Button
          className="w-full h-10 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          onClick={() => navigate(`/collaboration/project/${id}`)}
        >
          View Project
          <MoveRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const SkillCard = ({ id, title, instructor, rating, students, duration, level, price, image }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group w-full max-w-lg mx-auto">
      {/* Image Section */}
      <div className="relative h-48 w-full">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            className={`w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-200 flex items-center justify-center ${isBookmarked ? "text-purple-600" : "text-gray-600"
              }`}
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark className="h-4 w-4" fill={isBookmarked ? "currentColor" : "none"} />
          </button>

          <button
            className={`w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-200 flex items-center justify-center ${isLiked ? "text-rose-500" : "text-gray-600"
              }`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className="h-4 w-4" fill={isLiked ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 w-full">
        {/* Level and Rating */}
        <div className="flex items-center justify-between mb-3 w-full">
          <span className="px-2.5 py-1 bg-purple-50 text-pink-600 rounded-full text-xs font-semibold">
            {level}
          </span>
          <div className="flex items-center gap-1 w-full">
            <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
            <span className="text-sm font-semibold text-gray-900">{rating}</span>
          </div>
        </div>

        {/* Title and Instructor */}
        <div className="mb-4 w-full">
          <h3 className="w-full text-lg font-bold text-gray-900 mb-1 group-hover:text-pink-500 transition-colors duration-200 line-clamp-2">
            {title}
          </h3>
          <p className="text-gray-600 text-sm w-full">
            by <span className="font-medium">{instructor}</span>
          </p>
        </div>

        {/* Duration and Students */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-5 w-full">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 flex-shrink-0" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4 flex-shrink-0" />
            <span>{students} students</span>
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between w-full">
          <span className="font-bold text-xl text-gray-900">{price}</span>
          <Button
            variant="gradient"
            size="sm"
            className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors duration-200 flex items-center gap-1.5 font-medium"
            onClick={() => {
              navigate(`/LearnSkill/DetailedSkill/${id}`);
            }}
          >
            Learn More
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
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
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden w-full max-w-sm mx-auto">
      {/* Image Section */}
      <div className="relative h-48">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <Button
          variant="outline"
          size="small"
          className="absolute top-3 right-3 w-9 h-9 p-0 bg-white/90 backdrop-blur-sm border-white/20 hover:bg-white"
          disabledClassName="opacity-50"
        >
          <Heart className="h-4 w-4 text-gray-600" />
        </Button>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Rating and Price Row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="font-semibold text-sm text-gray-900">{rating}</span>
            <span className="text-gray-500 text-sm">({reviews})</span>
          </div>
        </div>

        {/* Name and Title */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
            {name}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-1">
            {title} at <span className="font-medium">{company}</span>
          </p>
        </div>

        {/* Location */}
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="line-clamp-1">{location}</span>
        </div>

        {/* Experience and Availability */}
        <div className="space-y-2.5 mb-4">
          <div className="flex items-start gap-2.5">
            <Briefcase className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-700 line-clamp-2">{experience}</span>
          </div>
          <div className="flex items-start gap-2.5">
            <Calendar className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-700">
              Available: <span className="font-medium">{availability}</span>
            </span>
          </div>
        </div>

        {/* Expertise Tags */}
        {expertise.length > 0 && (
          <div className="mb-5">
            <div className="text-sm font-semibold text-gray-900 mb-2.5">
              Expertise
            </div>
            <div className="flex flex-wrap gap-1.5">
              {expertise.slice(0, 6).map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium hover:bg-blue-100 transition-colors duration-150 cursor-pointer line-clamp-1"
                >
                  {tag}
                </span>
              ))}
              {expertise.length > 6 && (
                <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                  +{expertise.length - 6}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2.5">
          <Button
            onClick={onRequest}
            variant="primary"
            className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-150"
          >
            Request Mentorship
          </Button>
          <Button
            onClick={onMessage}
            variant="outline"
            className="w-10 h-10 p-0 border-gray-300 hover:border-gray-400 hover:bg-gray-50 rounded-lg transition-all duration-150"
          >
            <MessageSquare className="h-4 w-4 text-gray-600" />
          </Button>
        </div>
      </div>
    </div>
  );
};




const FloatingCard = ({ icon: Icon, title, subtitle, bgColorClass, iconColorClass, animationClass, onClick }) => {
  return (
    <div className={cn(`rounded-[26px] shadow-lg p-6 ${animationClass} border border-gray-100 hover:shadow-xl transition-all duration-300`, bgColorClass)}>
      <div className="flex flex-col gap-4 justify-center items-center">
        <div className={`w-14 h-14 ${bgColorClass} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
          <Icon className={`w-8 h-8 ${iconColorClass}`} />
        </div>
        <div className="flex-1 min-w-0 flex flex-col items-center justify-center">
          <div className="text-base text-center font-semibold text-gray-900 leading-tight mb-1">
            {title}
          </div>
          <div className="text-sm text-center text-gray-600 leading-relaxed">
            {subtitle}
          </div>
          <Button
            className="mt-4 bg-blue-600 border-2 border-blue-700 hover:bg-blue-700 hover:border-blue-800 text-white"
            onClick={onClick}

          >
            Click Me
          </Button>
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

const MentorShipRequestStudentCard = ({
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
  onChat,
  mentorResponse, // For declined requests with mentor feedback
  rejectionReason, // Additional rejection details
}) => {

  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          text: 'text-amber-800',
          badgeBg: 'bg-amber-100',
          badgeText: 'text-amber-700',
          icon: Clock,
          label: 'Pending Review'
        };
      case 'accepted':
        return {
          bg: 'bg-emerald-50',
          border: 'border-emerald-200',
          text: 'text-emerald-800',
          badgeBg: 'bg-emerald-100',
          badgeText: 'text-emerald-700',
          icon: Check,
          label: 'Accepted'
        };
      case 'declined':
      case 'rejected':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-800',
          badgeBg: 'bg-red-100',
          badgeText: 'text-red-700',
          icon: X,
          label: 'Declined'
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          text: 'text-gray-800',
          badgeBg: 'bg-gray-100',
          badgeText: 'text-gray-700',
          icon: AlertCircle,
          label: status || 'Unknown'
        };
    }
  };

  const statusConfig = getStatusConfig(status);
  const StatusIcon = statusConfig.icon;

  const showCancelButton = status?.toLowerCase() === "pending";
  const showChatButton = status?.toLowerCase() === "accepted";
  const isDeclined = status?.toLowerCase() === "declined" || status?.toLowerCase() === "rejected";

  return (
    <div className={`bg-white rounded-xl border ${statusConfig.border} shadow-sm hover:shadow-lg transition-all duration-300 w-full overflow-hidden`}>
      {/* Status indicator bar */}
      <div className={`h-1 ${statusConfig.badgeBg}`}></div>

      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Mentor Avatar with Rating */}
          <div className="relative flex-shrink-0">
            <img
              alt="Mentor"
              className="w-16 h-16 rounded-full object-cover ring-2 ring-gray-100"
              src={imageUrl}
            />
            {rating && (
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md ring-1 ring-gray-100">
                <div className="flex items-center gap-1 text-xs font-medium">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-gray-700">{rating}</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            {/* Header with Name, Title and Status */}
            <div className="flex items-start justify-between mb-3">
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold text-gray-900 truncate">{name}</h3>
                <p className="text-gray-600 text-sm mt-0.5">{title}</p>
              </div>
              <div className="flex-shrink-0 ml-4">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${statusConfig.badgeBg} ${statusConfig.badgeText}`}>
                  <StatusIcon className="h-4 w-4" />
                  {statusConfig.label}
                </span>
              </div>
            </div>

            {/* Tags/Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
              {tags?.[0] && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <BookOpen className="h-4 w-4 text-gray-400" />
                  <span className="truncate">{tags[0]}</span>
                </div>
              )}
              {tags?.[1] && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="truncate">{tags[1]}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="truncate">Requested {requestedAt}</span>
              </div>
            </div>

            {/* Learning Goals */}
            <div className="mb-4">
              <div className="flex items-start gap-2">
                <Target className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 mb-1">Learning Goals:</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{goals}</p>
                </div>
              </div>
            </div>

            {/* Mentor Response for Declined Requests */}
            {isDeclined && (mentorResponse || rejectionReason) && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-red-800 mb-1">Mentor Response:</p>
                    <p className="text-sm text-red-700">
                      {mentorResponse || rejectionReason}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Footer with Last Updated and Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="text-sm text-gray-500">
                Last updated: <span className="font-medium">{lastUpdatedAt}</span>
              </div>

              <div className="flex items-center gap-2">
                {/* View Details Button */}
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Eye className="h-4 w-4" />}
                  onClick={onDetails}
                >
                  Details
                </Button>

                {/* Cancel Button (only for pending) */}
                {showCancelButton && (
                  <Button
                    variant="destructive"
                    size="sm"
                    leftIcon={<X className="h-4 w-4" />}
                    onClick={onCancel}
                  >
                    Cancel Request
                  </Button>
                )}

                {/* Chat Button (only for accepted) */}
                {showChatButton && (
                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={<MessageSquare className="h-4 w-4" />}
                    onClick={onChat}
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

const MentorShipRequestMentorCard = ({
  imageUrl,
  name,
  university,
  email,
  skills,
  duration,
  goals,
  requestedAt,
  lastUpdatedAt,
  onViewDetails,
  onAccept,
  onDecline,
  urgency = 'normal', // low, normal, high
  additionalInfo, // Any extra student information
}) => {

  const getUrgencyConfig = (urgency) => {
    switch (urgency) {
      case 'high':
        return {
          border: 'border-red-200',
          bg: 'bg-red-50',
          indicator: 'bg-red-100 text-red-700'
        };
      case 'low':
        return {
          border: 'border-blue-200',
          bg: 'bg-blue-50',
          indicator: 'bg-blue-100 text-blue-700'
        };
      default:
        return {
          border: 'border-gray-100',
          bg: 'bg-white',
          indicator: 'bg-yellow-100 text-yellow-700'
        };
    }
  };

  const urgencyConfig = getUrgencyConfig(urgency);

  return (
    <div className={`${urgencyConfig.bg} rounded-xl border ${urgencyConfig.border} shadow-sm hover:shadow-md transition-all duration-300 w-full overflow-hidden`}>
      {/* Urgency indicator bar */}
      {urgency === 'high' && (
        <div className="h-1 bg-red-400"></div>
      )}

      <div className="px-6 py-3">
        <div className="flex items-start gap-4">
          {/* Student Avatar */}
          <div className="flex-shrink-0">
            <img
              alt={name}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-gray-100"
              src={imageUrl}
            />
          </div>

          <div className="flex-1 min-w-0">
            {/* Header with Student Info and Status */}
            <div className="flex items-start justify-between mb-2">
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold text-gray-900 truncate">{name}</h3>
                <p className="text-gray-600 text-sm mt-0.5">{university}</p>
                <p className="text-sm text-gray-500 mt-1">{email}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                {urgency === 'high' && (
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Urgent
                  </span>
                )}
                <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${urgencyConfig.indicator}`}>
                  <Clock className="h-4 w-4" />
                  Pending
                </span>
              </div>
            </div>

            {/* Student Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="h-4 w-4 text-gray-400" />
                <span className="truncate">{skills || 'Career Development'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="truncate">{duration || 'Long-term (3-6 months)'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="truncate">Requested {requestedAt}</span>
              </div>
            </div>

            {/* Learning Goals */}
            <div className="mb-4">
              <div className="flex items-start gap-2">
                <Target className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 mb-1">Student Goals:</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{goals}</p>
                </div>
              </div>
            </div>



            {/* Footer with Last Updated and Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="text-sm text-gray-500">
                Last updated: <span className="font-medium">{lastUpdatedAt}</span>
              </div>

              <div className="flex items-center gap-2">
                {/* View Details Button */}
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Eye className="h-4 w-4" />}
                  onClick={onViewDetails}
                >
                  View Details
                </Button>

                {/* Accept Button */}
                <Button
                  variant="success"
                  size="sm"
                  leftIcon={<CheckCircle className="h-4 w-4" />}
                  onClick={onAccept}
                >
                  Accept
                </Button>

                {/* Decline Button */}
                <Button
                  variant="destructive-outline"
                  size="sm"
                  leftIcon={<XCircle className="h-4 w-4" />}
                  onClick={onDecline}
                >
                  Decline
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoryCard = ({ name, count, icon, onClick }) => {
  return (
    <div
      className="bg-white rounded-xl p-6 text-center card-hover border border-gray-100 cursor-pointer transition-transform hover:scale-105"
      onClick={onClick}
    >
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

const RecentProjectCard = ({
  variant = "compact",
  title,
  role,
  members,
  progress,
  status,
  color = "blue",
}) => {
  if (variant === "compact") {
    // Variant 1
    return (
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-300">
        <div className="flex-1">
          <h4 className="font-medium">{title}</h4>
          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
            <span>{role}</span>
            <span>{members} members</span>
            <span
              className={`px-2 py-1 rounded-full text-xs bg-${color}-100 text-${color}-700`}
            >
              {status}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium">{progress}%</div>
          <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
            <div
              className="bg-purple-600 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "progress") {
    // Variant 2
    return (
      <div className="border flex flex-col justify-between border-gray-300 w-full rounded-lg p-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-medium">{title}</h4>
          <span className={`text-sm text-${color}-600`}>{progress}%</span>
        </div>
        <p className="text-sm text-gray-600 mb-2">Role: {role}</p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`bg-${color}-600 h-2 rounded-full`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  }

  if (variant === "simple") {
    // Variant 3
    return (
      <div className="border border-gray-300 rounded-lg p-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-medium">{title}</h4>
          <span
            className={`px-2 py-1 bg-${color}-100 text-${color}-700 text-xs rounded-full`}
          >
            {status}
          </span>
        </div>
        <p className="text-sm text-gray-600">Role: {role}</p>
      </div>
    );
  }

  return null;
};

const RecentReviewCard = ({ name, rating, time, position, variant }) => {

  if (variant === "review") {
    return (
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3">
          <img
            alt="Sarah Johnson"
            className="w-10 h-10 rounded-full object-cover"
            src="/placeholder.svg?height=40&width=40"
          />
          <div>
            <h4 className="font-medium">{name}</h4>
            <p className="text-sm text-gray-600">{position}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end gap-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" fill="currentColor" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
          <div className="text-xs text-gray-500">{time}</div>
        </div>
      </div>
    )
  }

  if (variant === "Success-Stories") {
    return (
      <div className="flex flex-col gap-2 p-4 rounded-lg border border-gray-300">
        <div className="flex items-center gap-3">
          <img
            alt="Sarah Johnson"
            className="w-10 h-10 rounded-full object-cover"
            src="/placeholder.svg?height=40&width=40"
          />
          <div>
            <h4 className="font-medium">{name}</h4>
            <p className="text-sm text-gray-600">{position}</p>
          </div>
        </div>
        <div className="gap-5 items-center flex flex-row">
          <div className="flex gap-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" fill="currentColor" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
          <div className="text-sm text-gray-500">Duration : {time}</div>
        </div>
      </div>
    )
  }

  return null;
};

const MentorshipState = ({ title, value }) => {
  return (
    <div className='flex justify-between items-center py-4 px-5 rounded-lg border-1 border-gray-300'>
      <div className='text-md text-gray-600'>{title}</div>
      <div className='text-sm'>{value}</div>
    </div>
  )
}

const FloatingNotificationCard = ({
  icon: Icon,
  title,
  subtitle,
  bgColorClass,
  iconColorClass,
  animationClass
}) => {
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
};


export { AvailabilityCard, CategoryCard, CertificateCard, DashboardCard, ExpertiseAreasCard, FeaturesCard, FloatingCard, FloatingNotificationCard, MentorCard, MentorInfoCard, MentorReviewCard, MentorShipRequestMentorCard, MentorShipRequestStudentCard, MentorshipState, ProjectCard, ProjectsCard, RecentProjectCard, RecentReviewCard, SkillCard };
