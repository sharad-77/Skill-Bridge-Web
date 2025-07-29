import { useState } from 'react';
import { MentorShipRequestStudentCard } from '../../components/ui/Card';

const MentorshipRequestsStudent = () => {
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
      imageUrl: '/placeholder.svg?height=60&amp;width=60',
      name: 'Alice Johnson',
      title: 'Senior Software Engineer at Tech Corp',
      rating: 4.9,
      review: 112,
      tags: ['Career Development', 'Long-term (3-6 months)', 'Requested Jan 15, 2024'],
      status: 'pending',
      goals: 'I want to transition from junior to senior developer role and need guidance on technical leadership skills.',
      requestedAt: 'Requested Jan 15, 2024',
      lastUpdatedAt: 'Jan 15, 2024',
    },
    {
      id: 2,
      imageUrl: '/placeholder.svg?height=60&amp;width=60',
      name: 'Bob Smith',
      title: 'Lead Developer at Innovatech',
      rating: 4.8,
      review: 85,
      tags: ['Technical Skills', 'Short-term (1-3 months)', 'Requested Feb 5, 2024'],
      status: 'accepted',
      goals: 'Looking to enhance my coding skills and understand best practices.',
      requestedAt: 'Requested Feb 5, 2024',
      lastUpdatedAt: 'Feb 10, 2024',
    },
    // Add more mentorship requests data here
  ];

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
                  className="lucide lucide-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
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
                  className="lucide lucide-filter h-4 w-4 mr-2"
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
            <MentorShipRequestStudentCard
              key={request.id}
              imageUrl={request.imageUrl}
              name={request.name}
              title={request.title}
              rating={request.rating}
              review={request.review}
              tags={request.tags}
              status={request.status}
              goals={request.goals}
              requestedAt={request.requestedAt}
              lastUpdatedAt={request.lastUpdatedAt}
              onDetails={() => console.log(`View details for ${request.name}`)}
              onCancel={() => console.log(`Cancel request for ${request.name}`)}
              onChat={() => console.log(`Open chat for ${request.name}`)}
              mentorResponse={request.mentorResponse} // Optional: for declined requests
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorshipRequestsStudent;
