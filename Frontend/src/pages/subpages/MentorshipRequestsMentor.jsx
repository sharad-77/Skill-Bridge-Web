import { useState } from 'react';
import { MentorShipRequestMentorCard } from '../../components/ui/Card';

const MentorshipRequestsMentor = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'all', name: 'All Requests (5)' },
    { id: 'pending', name: 'Pending (2)' },
    { id: 'accepted', name: 'Accepted (2)' },
    { id: 'rejected', name: 'Rejected (1)' },
  ];

  const mentorshipRequests = [
    {
      id: 1,
      imageUrl: '/placeholder.svg?height=60&width=60',
      name: 'Sarah Chen',
      university: 'MIT - Computer Science',
      email: 'sarah.chen@mit.edu',
      skills: 'Full Stack Development',
      duration: 'Long-term (3-6 months)',
      goals:
        'I want to transition from academic projects to real-world applications. Looking for guidance on system design, code architecture, and industry best practices for scalable web applications.',
      requestedAt: 'Jan 15, 2024',
      lastUpdatedAt: 'Jan 15, 2024',
      urgency: 'high',
      additionalInfo:
        'Currently working on final year project involving microservices architecture. Has experience with React, Node.js, and PostgreSQL.'
    },
    {
      id: 2,
      imageUrl: '/placeholder.svg?height=60&width=60',
      name: 'Marcus Rodriguez',
      university: 'Stanford University',
      email: 'marcus.rodriguez@stanford.edu',
      skills: 'Machine Learning & AI',
      duration: 'Medium-term (2-4 months)',
      goals:
        'Seeking mentorship to bridge the gap between theoretical ML knowledge and practical industry applications. Interested in computer vision and NLP projects.',
      requestedAt: 'Jan 18, 2024',
      lastUpdatedAt: 'Jan 18, 2024',
      urgency: 'normal',
      additionalInfo:
        'Published 2 research papers on deep learning. Proficient in Python, TensorFlow, and PyTorch. Looking to transition into industry after graduation.'
    },
    {
      id: 3,
      imageUrl: '/placeholder.svg?height=60&width=60',
      name: 'Emma Thompson',
      university: 'UC Berkeley - EECS',
      email: 'emma.thompson@berkeley.edu',
      skills: 'Mobile App Development',
      duration: 'Short-term (1-3 months)',
      goals:
        'I have built several iOS apps as personal projects but want to learn about professional mobile development practices, app store optimization, and monetization strategies.',
      requestedAt: 'Jan 20, 2024',
      lastUpdatedAt: 'Jan 20, 2024',
      urgency: 'normal',
      additionalInfo:
        'Self-taught iOS developer with 3 apps on the App Store. Currently learning React Native for cross-platform development.'
    },
  ];

  // You can add real filter/search handling logic here if you want

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 py-12 max-w-5xl flex">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                My Mentorship Requests
              </h1>
              <p className="text-purple-100 text-lg">
                Track your mentorship requests and connect with your mentors
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b sticky top-0 z-20">
        <div className="container mx-auto px-4 py-6 max-w-5xl">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-all cursor-pointer ${activeTab === tab.id
                      ? 'bg-purple-100 text-purple-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.name}
                </button>
              ))}
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
                  placeholder="Search requests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 mr-2"
                >
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mentorship Requests */}
      <div className="container mx-auto px-4 py-8 h-full w-full flex justify-center items-center ">
        <div className="space-y-6 max-w-5xl flex flex-col justify-center items-center h-full w-full">
          {mentorshipRequests.map((request) => (
            <MentorShipRequestMentorCard
              key={request.id}
              {...request}
              onViewDetails={() => console.log('View details for', request.name)}
              onAccept={() => console.log('Accept for', request.name)}
              onDecline={() => console.log('Decline for', request.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorshipRequestsMentor;
