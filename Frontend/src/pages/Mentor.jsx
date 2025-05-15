import React from "react";
import { MentorCard } from "../components/ui/Card";

export default function MentorshipRequestForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Mentorship form submitted");
  };

  return (
    <div className="grid grid-cols-1 py-10 px-3 gap-4 md:grid-cols-2 ">
      <div>
        <div className="h-full w-full ">
          <div className="text-4xl font-semibold p-2">Your Certifications</div>

          <div className="px-3">
            <MentorCard
              name={"Certification Name"}
              Menotrpost={"Senior Developer"}
              Expertise1={"Career Guidance"}
              Expertise2={"Technical Interview Prep"}
              Expertise3={"Software Architecture"}
            />
          </div>
        </div>
      </div>

      <div className="p-5 rounded-lg border border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Request Mentorship</h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Your Field of Interest"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <textarea
                placeholder="What kind of mentorship are you looking for?"
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <button
                type="submit"
                className="px-6 py-3 bg-[var(--primary-color)] text-white font-medium rounded-lg hover:bg-purple-700 transition-colors duration-300"
              >
                Find Mentor
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
