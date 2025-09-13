import { useState, useMemo } from 'react';
import { useFetchRequestforStudent, useUpdateMentorshipRequest } from '../../api/mutation/MentorMutation';
import { MentorShipRequestMentorCard } from '../../components/ui/Card';
import { toast } from 'sonner';

const MentorshipRequestsMentor = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading, error } = useFetchRequestforStudent();
  const updateRequestMutation = useUpdateMentorshipRequest();
  const requests = data?.requests || [];

  const filteredRequests = useMemo(() => {
    let filtered = requests;
    if (activeTab !== 'all') {
      filtered = filtered.filter(req => req.status.toLowerCase() === activeTab);
    }
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(req =>
        (req.userName || '').toLowerCase().includes(lowerQuery) ||
        (req.email || '').toLowerCase().includes(lowerQuery) ||
        (req.instituteName || '').toLowerCase().includes(lowerQuery)
      );
    }
    return filtered;
  }, [requests, activeTab, searchQuery]);

  const tabCounts = useMemo(() => {
    const counts = {
      all: requests.length,
      pending: requests.filter(req => req.status.toLowerCase() === 'pending').length,
      accepted: requests.filter(req => req.status.toLowerCase() === 'accepted').length,
      rejected: requests.filter(req => req.status.toLowerCase() === 'rejected').length,
    };
    return counts;
  }, [requests]);

  const handleAcceptRequest = async (requestId, studentName) => {
    try {
      await updateRequestMutation.mutateAsync({
        requestId,
        status: 'accepted'
      });
      toast.success(`✅ Request Accepted!`, {
        description: `Mentorship request from ${studentName} has been accepted. The student will be notified and can now start chatting with you.`,
        duration: 5000,
      });
    } catch (error) {
      toast.error(`Failed to accept request`, {
        description: error.response?.data?.message || error.message,
        duration: 5000,
      });
    }
  };

  const handleRejectRequest = async (requestId, studentName) => {
    try {
      await updateRequestMutation.mutateAsync({
        requestId,
        status: 'rejected'
      });
      toast(`❌ Request Rejected`, {
        description: `Mentorship request from ${studentName} has been rejected. The student will be notified of your decision.`,
        duration: 5000,
      });
    } catch (error) {
      toast.error(`Failed to reject request`, {
        description: error.response?.data?.message || error.message,
        duration: 5000,
      });
    }
  };

  const tabs = [
    { id: 'all', name: `All Requests (${tabCounts.all})` },
    { id: 'pending', name: `Pending (${tabCounts.pending})` },
    { id: 'accepted', name: `Accepted (${tabCounts.accepted})` },
    { id: 'rejected', name: `Rejected (${tabCounts.rejected})` },
  ];

  if (isLoading) return <div className="container mx-auto px-4 py-8 text-center">Loading mentorship requests...</div>;
  if (error) return <div className="container mx-auto px-4 py-8 text-center text-red-600">Error fetching requests: {error.message}</div>;

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

      <div className="container mx-auto px-4 py-8 h-full w-full flex justify-center items-center">
        <div className="space-y-6 max-w-5xl flex flex-col justify-center items-center h-full w-full">
          {filteredRequests.length === 0 ? (
            <p className="text-gray-500 text-center">No requests found for the current filters.</p>
          ) : (
            filteredRequests.map((request) => (
              <MentorShipRequestMentorCard
                key={request._id}
                userName={request.userName || 'Unknown Student'}
                studentProfilePhoto={request.studentProfilePhoto || '/default-avatar.png'}
                instituteName={request.instituteName || 'Institute not specified'}
                email={request.email || ''}
                mentorshipType={request.mentorshipType || 'Not specified'}
                preferredMeetingFormat={request.preferredMeetingFormat || 'Not specified'}
                duration={request.duration || 'Not specified'}
                dateOfReq={request.dateOfReq || ''}
                goalOfReq={request.goalOfReq || 'No goals specified'}
                goals={request.goals || ''}
                lastUpdate={request.lastUpdate || ''}
                experienceLevel={request.experienceLevel || ''}
                availability={request.availability || ''}
                additionalInfo={request.additionalInfo || ''}
                status={request.status || 'pending'}
                isLoading={updateRequestMutation.isPending}
                onViewDetails={() => console.log('View details for', request.userName || 'Unknown Student')}
                onAccept={() => handleAcceptRequest(request._id, request.userName || 'Unknown Student')}
                onDecline={() => handleRejectRequest(request._id, request.userName || 'Unknown Student')}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorshipRequestsMentor;
