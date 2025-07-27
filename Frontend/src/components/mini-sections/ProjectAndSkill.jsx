import React from "react";
import { RecentProjectCard } from "../ui/Card";

function ProjectAndSkill({ recentProjects }) {
  const activeProjects = recentProjects.filter(
    (project) => project.status === "In Progress"
  );
  const completedProjects = recentProjects.filter(
    (project) => project.status === "Completed"
  );

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">


        <div className="grid md:grid-cols-2 gap-8">
          {/* Active Projects */}
          <div>
            {activeProjects.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium mb-4">Active Projects</h3>
                <div className="space-y-4">
                  {activeProjects.map((project, index) => (
                    <RecentProjectCard
                      key={index}
                      variant="progress"
                      {...project}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Completed Projects */}
          <div>
            {completedProjects.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium mb-4">Completed Projects</h3>
                <div className="space-y-4">
                  {completedProjects.map((project, index) => (
                    <RecentProjectCard
                      key={index}
                      variant="simple"
                      {...project}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectAndSkill;
