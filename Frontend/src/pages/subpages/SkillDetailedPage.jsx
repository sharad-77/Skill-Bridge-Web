import React, { useState } from 'react';
import {
  ChevronLeft,
  Star,
  Clock,
  User,
  CheckCircle,
  ChevronRight,
  BookOpen,
  Download,
  Award,
  MessageSquare,
  Facebook,
  Twitter,
  Linkedin
} from 'lucide-react';

const CoursePage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const learningPoints = [
    "Advanced component patterns and architecture",
    "State management with Redux, Context API, and Recoil",
    "Performance optimization techniques",
    "Server-side rendering and Next.js",
    "Testing React applications",
    "Handling authentication and authorization",
    "Implementing complex UI interactions",
    "Deploying React applications to production"
  ];

  const requirements = [
    "Basic knowledge of React and hooks",
    "Familiarity with JavaScript ES6+ features",
    "Understanding of HTML, CSS, and web development concepts",
    "Node.js and npm installed on your computer"
  ];

  const courseIncludes = [
    { icon: BookOpen, text: "15 lessons (8 weeks)" },
    { icon: Download, text: "Downloadable resources" },
    { icon: Award, text: "Certificate of completion" },
    { icon: MessageSquare, text: "Direct access to instructor" }
  ];

  const socialIcons = [
    { icon: Facebook, color: "text-blue-600" },
    { icon: Twitter, color: "text-blue-400" },
    { icon: Linkedin, color: "text-blue-700" }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'instructor', label: 'Instructor' },
    { id: 'reviews', label: 'Reviews' }
  ];

  return (
    <main className="min-h-screen">
      <div className="min-h-screen bg-gray-50 pb-12">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
          <div className="container mx-auto px-4 py-8 max-w-5xl">
            {/* Back Button */}
            <div className="mb-6">
              <a
                href="/marketplace"
                className="inline-flex items-center text-rose-100 hover:text-white transition-colors"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Skills
              </a>
            </div>

            {/* Course Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-3">
                  Intermediate
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  Advanced React Development
                </h1>
                <p className="text-rose-100 max-w-3xl">
                  Master advanced React concepts and build complex, production-ready
                  applications with modern best practices.
                </p>

                {/* Course Stats */}
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1 font-medium">4.8</span>
                    <span className="ml-1 text-rose-100">(1234 students)</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-rose-100" />
                    <span className="ml-1 text-rose-100">8 weeks</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-rose-100" />
                    <span className="ml-1 text-rose-100">By John Doe</span>
                  </div>
                </div>
              </div>

              {/* Enroll Button */}
              <div>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-white text-rose-500 hover:bg-white/90 transform hover:scale-105 ">
                  Enroll Now - Free
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div className="container mx-auto px-4 mt-8 flex items-center justify-center w-full">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex w-full justify-between max-w-5xl ">
            <div className="flex overflow-x-auto ">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 font-medium text-sm whitespace-nowrap transition-colors ${activeTab === tab.id
                      ? 'text-rose-500 border-b-2 border-rose-500'
                      : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
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
                    This comprehensive course will take your React skills to the next level.
                    You'll learn advanced patterns, state management techniques, performance
                    optimization, and how to build scalable applications that can handle
                    real-world requirements.
                  </p>
                  <p className="mb-4 text-gray-700">
                    By the end of this course, you'll be able to architect and implement
                    complex React applications using the latest tools and best practices
                    in the ecosystem.
                  </p>
                </div>
              </div>

              {/* What You'll Learn */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">What You'll Learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {learningPoints.map((point, index) => (
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
                  {requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-rose-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{requirement}</span>
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
                  {courseIncludes.map((item, index) => {
                    const IconComponent = item.icon;
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
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 h-10 px-4 py-2 w-full text-white transform hover:scale-105 transition-transform">
                    Enroll Now - Free
                  </button>
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
                      <button
                        key={index}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
                      >
                        <IconComponent className={`h-5 w-5 ${social.color}`} />
                      </button>
                    );
                  })}
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 flex-1">
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CoursePage;
