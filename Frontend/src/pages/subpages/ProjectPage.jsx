import {
  CalendarRange,
  CheckCircle,
  ChevronLeft,
  Clock,
  Share2,
  Tag,
  Users
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProjectById, useJoinProject } from '../../api/mutation/ProjectMutation';
import Button from '../../components/ui/Button';
import useUserStore  from '../../store/useUserStore';
import { useEffect } from 'react';


const ProjectPage =  () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { data, isLoading, isError, error } = useGetProjectById(projectId);
  const { mutate: joinProjectMutate } = useJoinProject();
  const userId = useUserStore((state) => state.userId);
  const userInfo = useUserStore((state) => state.userInfo);

  useEffect(() => {
    userInfo();
  }, [userInfo]);


  const joinProject = () => {
    joinProjectMutate(projectId, {
    });

  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading project details...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-red-600 mb-4">Error loading project</div>
          <p className="text-gray-600 mb-4">{error?.message}</p>
          <Button onClick={() => navigate('/collaboration')}>
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg mb-4">Project not found</div>
          <Button onClick={() => navigate('/collaboration')}>
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  const projectData = data.Project || data;

  const project = {
    title: projectData.title || 'Untitled Project',
    category: projectData.category || 'General',
    description: projectData.description || 'No description available.',
    introduction: projectData.introduction || 'No detailed description available.',
    projectGoal: projectData.projectGoal && projectData.projectGoal.length > 0 ? projectData.projectGoal : [],
    requiredSkill: projectData.requiredSkill && projectData.requiredSkill.length > 0 ? projectData.requiredSkill : [],
    teamSize: projectData.teamSize || 0,
    projectDeadline: projectData.projectdeadline || 'No deadline set',
    members: projectData.members && projectData.members.length > 0 ? projectData.members : [],
    createdBy: projectData.createdBy,
    createdAt: projectData.createdAt
  };

  const AllReadyJoined = project.members.some(
    (m) => m.userId === userId
  )


  let createdAt = new Date(project.createdAt).toISOString().split('T')[0];
  let progress = 60;

  return (
    <main className="min-h-screen">
      <div className="min-h-screen bg-gray-50 pb-12">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <div className="container mx-auto py-8 max-w-5xl">
            <div className="mb-6">
              <button
                onClick={() => navigate('/collaboration')}
                className="inline-flex items-center text-purple-100 hover:text-white transition-colors"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Projects
              </button>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-3">
                  {project.category}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {project.title}
                </h1>
                <p className="text-purple-100 max-w-3xl">
                  {project.description}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={joinProject}
                  className="h-10 px-4 py-2 bg-white text-purple-600 hover:bg-white/90 rounded-md">
                  {AllReadyJoined ? "Joined" : "Apply to Join"}
                </button>
                <button className="h-10 px-4 py-2 border border-white text-white hover:bg-white/10 rounded-md">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4 flex justify-center">
            <div className="max-w-4xl gap-2 flex flex-row items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Team Size</div>
                  <div className="font-medium">{project.teamSize} Members</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CalendarRange className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Started</div>
                  <div className="font-medium">{createdAt}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Deadline</div>
                  <div className="font-medium">{project.projectDeadline}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Progress</div>
                  <div className="font-medium">{progress}%</div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8 flex justify-center">
          <div className="flex justify-center gap-8 max-w-5xl">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8 w-[70%]">
              {/* About */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">About This Project</h2>
                <p className="text-gray-700">{project.introduction}</p>
              </div>

              {/* Goals */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">Project Goals</h2>
                {project.projectGoal.length > 0 ? (
                  <ul className="space-y-3">
                    {project.projectGoal.map((goal, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <span className="text-gray-700">{goal}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-gray-500 italic">No goals have been set for this project yet.</div>
                )}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6 w-[30%]">
              {/* Skills */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold mb-4">Required Skills</h2>
                {project.requiredSkill.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {project.requiredSkill.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500 italic">No specific skills required.</div>
                )}
              </div>

              {/* Team Members */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold mb-4">Team Members</h2>
                {project.members.length > 0 ? (
                  <div className="space-y-4">
                    {project.members.map((member, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <img
                          alt={member.name}
                          className="w-10 h-10 rounded-full object-cover bg-gray-200"
                          src={member.avatar || "/placeholder.svg?height=40&width=40"}
                        />
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-gray-500">{member.position}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <div className="text-gray-500 mb-2">No team members yet</div>
                    <div className="text-sm text-gray-400">Looking for {project.teamSize} member{project.teamSize !== 1 ? 's' : ''} to join this project</div>
                  </div>
                )}
              </div>

              {/* Apply CTA */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold mb-4">How to Apply</h2>
                <p className="text-gray-600 mb-4">
                  Interested in joining this project? Apply now to connect with the team and start collaborating.
                </p>
                <Button
                  onClick={joinProject}
                  className="w-full h-10 bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700">
                  {AllReadyJoined ? "Joined" : "Apply to Join"}
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
