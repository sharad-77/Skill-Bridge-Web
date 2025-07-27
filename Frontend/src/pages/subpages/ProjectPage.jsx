import React from 'react';
import {
  ChevronLeft,
  Bookmark,
  Share2,
  Users,
  Calendar,
  Clock,
  Tag,
  CheckCircle,
  MessageSquare,
  Github,
  FileText,
  Link,
  ExternalLink
} from 'lucide-react';
import Button from '../../components/ui/Button';

const ProjectPage = () => {
  const teamMembers = [
    { name: "Alex Johnson", role: "Project Lead", avatar: "/placeholder.svg?height=40&width=40" },
    { name: "Maria Garcia", role: "ML Engineer", avatar: "/placeholder.svg?height=40&width=40" },
    { name: "David Kim", role: "Backend Developer", avatar: "/placeholder.svg?height=40&width=40" },
    { name: "Sarah Williams", role: "UI/UX Designer", avatar: "/placeholder.svg?height=40&width=40" }
  ];

  const skills = ["Python", "Machine Learning", "NLP", "TensorFlow", "Educational Technology"];

  const projectGoals = [
    "Develop a machine learning model for understanding student questions",
    "Create a knowledge base covering major academic subjects",
    "Build a user-friendly interface for students to interact with the AI",
    "Implement personalized learning recommendations",
    "Test with real students and gather feedback"
  ];

  const milestones = [
    { title: "Project Planning", date: "2023-09-30", completed: true },
    { title: "Data Collection & Processing", date: "2023-11-15", completed: true },
    { title: "ML Model Development", date: "2024-01-20", completed: true },
    { title: "UI/UX Implementation", date: "2024-03-10", completed: false },
    { title: "Testing & Refinement", date: "2024-04-30", completed: false },
    { title: "Launch Beta Version", date: "2024-05-31", completed: false }
  ];

  const resources = [
    {
      icon: Github,
      title: "GitHub Repository",
      url: "https://github.com/example/ai-study-assistant"
    },
    {
      icon: FileText,
      title: "Project Documentation",
      url: "https://docs.example.com/ai-study-assistant"
    },
    {
      icon: Link,
      title: "Research Paper",
      url: "https://papers.example.com/ai-education"
    }
  ];

  return (
    <main className="min-h-screen">
      <div className="min-h-screen bg-gray-50 pb-12">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <div className="container mx-auto py-8 max-w-5xl">
            {/* Back Button */}
            <div className="mb-6">
              <a
                href="/collaboration"
                className="inline-flex items-center text-purple-100 hover:text-white transition-colors"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Projects
              </a>
            </div>

            {/* Project Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                {/* Fetch from Backend */}
                <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-3">
                  Artificial Intelligence
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  AI-Powered Study Assistant
                  {/*Prosp */}
                </h1>
                <p className="text-purple-100 max-w-3xl">
                  Developing an AI assistant to help students with their studies using machine learning
                  and natural language processing. The assistant will be able to answer questions,
                  provide explanations, and help with homework across various subjects.
                  {/*Prosp */}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-white text-purple-600 hover:bg-white/90">
                  Apply to Join
                </button>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background hover:text-accent-foreground h-10 px-4 py-2 text-white border-white hover:bg-white/10">
                  <Bookmark className="h-5 w-5 mr-2" />
                  Save
                </button>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background hover:text-accent-foreground h-10 px-4 py-2 text-white border-white hover:bg-white/10">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white border-b h-full w-full">
          <div className="container mx-auto px-4 py-4 flex justify-center h-full w-full">
            <div className="max-w-5xl flex flex-row items-center h-full justify-between w-full">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Team Size</div>
                  <div className="font-medium">4 Members
                    {/*Prosp */}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Started</div>
                  <div className="font-medium">2023-09-15
                    {/*Prosp */}

                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Duration</div>
                  <div className="font-medium">6 months
                    {/*Prosp */}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Progress</div>
                  <div className="font-medium">65% Complete
                    {/*Prosp */}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 flex justify-center">
          <div className="flex justify-center  gap-8  max-w-5xl">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Section */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">About This Project
                  {/*Prosp */}
                </h2>
                <div className="prose max-w-none">
                  <p className="mb-4 text-gray-700">
                    Our AI-Powered Study Assistant aims to revolutionize how students learn and study.
                    Using advanced machine learning algorithms and natural language processing, we're
                    building a smart assistant that can understand student questions, provide detailed
                    explanations, and offer personalized learning recommendations.
                    {/*Prosp */}
                  </p>
                </div>
              </div>

              {/* Project Goals */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">Project Goals</h2>
                <ul className="space-y-3">
                  {projectGoals.map((goal, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{goal}</span>
                      {/*Prosp */}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Milestones */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">Milestones</h2>
                <div className="space-y-4">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${milestone.completed
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-100 text-gray-400'
                        }`}>
                        {milestone.completed ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <span className="text-sm font-medium">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{milestone.title}
                            {/*Prosp */}
                          </span>
                          <span className="text-sm text-gray-500">{milestone.date}
                            {/*Prosp */}
                          </span>
                        </div>
                        <div className={`h-1 w-full mt-2 rounded-full ${milestone.completed ? 'bg-green-500' : 'bg-gray-200'
                          }`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Required Skills */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold mb-4">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm hover:scale-105 transition-transform cursor-pointer"
                    >
                      {skill}
                      {/*Prosp */}
                    </span>
                  ))}
                </div>
              </div>

              {/* Team Members */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold mb-4">Team Members</h2>
                <div className="space-y-4">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <img
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover"
                        src={member.avatar}
                      /> {/*Prosp */}
                      <div>
                        <div className="font-medium">{member.name} {/*Prosp */} </div>
                        <div className="text-sm text-gray-500">{member.role} {/*Prosp */} </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Resources */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold mb-4">Project Resources</h2>
                <div className="space-y-3">
                  {resources.map((resource, index) => {
                    const IconComponent = resource.icon;
                    return (
                      <a
                        key={index}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <IconComponent className="h-5 w-5 text-gray-700" />
                        <span className="flex-1">{resource.title}</span>
                        <ExternalLink className="h-4 w-4 text-gray-400" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* How to Apply */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold mb-4">How to Apply</h2>
                <p className="text-gray-600 mb-4">
                  Interested in joining this project? Apply now to connect with the team and start collaborating.
                </p>
                <Button className="w-full h-10 bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700">
                  Apply to Join
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProjectPage;
