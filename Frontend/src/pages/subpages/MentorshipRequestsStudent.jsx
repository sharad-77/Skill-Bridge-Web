import { useState, useMemo } from 'react';
import { MentorShipRequestStudentCard } from '../../components/ui/Card';
import { useFetchRequestforStudent, useUpdateMentorshipRequest } from '../../api/mutation/MentorMutation';
import { toast } from 'sonner';

const MentorshipRequestsStudent = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { data: MentorReqs, isLoading, isError, error } = useFetchRequestforStudent();
  const updateRequestMutation = useUpdateMentorshipRequest();


  const transformedRequests = useMemo(() => {
    if (!MentorReqs?.requests) return [];

    return MentorReqs.requests.map((request, index) => ({
      id: request._id ,
      mentorName: request.mentorName ,
      mentorProfilePhoto: request.mentorProfilePhoto,
      mentorCurrentPosition: request.mentorCurrentPosition,
      mentorshipType: request.mentorshipType,
      duration: request.duration,
      dateOfReq: request.dateOfReq,
      goalOfReq: request.goalOfReq,
      lastUpdate: request.lastUpdate,
      status: request.status,
      rating: request.rating || null,
      experienceLevel: request.experienceLevel,
      availability: request.availability,
      additionalInfo: request.additionalInfo,
      mentorResponse: request.mentorResponse,
      rejectionReason: request.rejectionReason
    }));
  }, [MentorReqs]);

  const filteredRequests = useMemo(() => {
    let filtered = transformedRequests;

    if (activeTab !== 'all') {
      filtered = filtered.filter(request =>
        request.status.toLowerCase() === activeTab.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(request =>
        request.mentorName.toLowerCase().includes(query) ||
        request.mentorCurrentPosition.toLowerCase().includes(query) ||
        request.mentorshipType.toLowerCase().includes(query) ||
        request.goalOfReq.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [transformedRequests, activeTab, searchQuery]);

  const tabCounts = useMemo(() => {
    const counts = transformedRequests.reduce((acc, request) => {
      const status = request.status.toLowerCase();
      acc[status] = (acc[status] || 0) + 1;
      acc.all = (acc.all || 0) + 1;
      return acc;
    }, {});
    return counts;
  }, [transformedRequests]);

  const tabs = [
    { id: 'all', name: `All Requests (${tabCounts.all || 0})` },
    { id: 'pending', name: `Pending (${tabCounts.pending || 0})` },
    { id: 'accepted', name: `Accepted (${tabCounts.accepted || 0})` },
    { id: 'rejected', name: `Rejected (${tabCounts.rejected || 0})` },
  ];

  const handleCancelRequest = async (requestId, mentorName) => {
    try {
      await updateRequestMutation.mutateAsync({
        requestId,
        status: 'cancelled'
      });
      toast.success(`🗑️ Request Cancelled`, {
        description: `Your mentorship request to ${mentorName} has been cancelled and removed from the system.`,
        duration: 4000,
      });
    } catch (error) {
      toast.error(`Failed to cancel request`, {
        description: error.response?.data?.message || error.message,
        duration: 5000,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <h1 className="text-xl text-gray-600">Loading your mentorship requests...</h1>
        </div>
      </div>
    );
  }

  if (isError) {
    console.error('Error fetching mentorship requests:', error);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-xl text-gray-800 mb-2">Error Loading Requests</h1>
          <p className="text-gray-600">{error?.message || 'Something went wrong while fetching your mentorship requests.'}</p>
        </div>
      </div>
    );
  }

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

      <div className="container mx-auto px-4 py-8 h-full w-full flex justify-center items-center">
        <div className="space-y-6 max-w-5xl flex flex-col justify-center items-center h-full w-full">
          {filteredRequests.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No mentorship requests found</h3>
              <p className="text-gray-500">
                {searchQuery ? 'Try adjusting your search terms.' : 'You haven\'t made any mentorship requests yet.'}
              </p>
            </div>
          ) : (
            filteredRequests.map((request) => (
              <MentorShipRequestStudentCard
                key={request.id}
                mentorName={request.mentorName}
                mentorProfilePhoto={request.mentorProfilePhoto}
                mentorCurrentPosition={request.mentorCurrentPosition}
                mentorshipType={request.mentorshipType}
                duration={request.duration}
                dateOfReq={request.dateOfReq}
                goalOfReq={request.goalOfReq}
                lastUpdate={request.lastUpdate}
                status={request.status}
                rating={request.rating}
                isLoading={updateRequestMutation.isPending}
                onDetails={() => console.log(`View details for ${request.mentorName}`)}
                onCancel={() => handleCancelRequest(request.id, request.mentorName)}
                onChat={() => console.log(`Open chat for ${request.mentorName}`)}
                mentorResponse={request.mentorResponse}
                rejectionReason={request.rejectionReason}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorshipRequestsStudent;
