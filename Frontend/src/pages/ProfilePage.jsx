import {
  MapPin,
  Calendar,
  PenLine,
  Target,
  BookOpen,
  Trophy,
  Mail,
  User,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Briefcase,
  Star,
  Users,
  CheckCircle,
} from "lucide-react";
import {
  ProjectsCard,
  MentorCard,
  SkillCard,
  CertificateCard,
} from "../components/ui/Card";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* --- Profile Header --- */}
      <div className="relative bg-gradient-to-tr from-purple-600 via-blue-500 to-teal-400 pb-20 pt-10 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <img
              alt="John Doe"
              className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg transition-transform duration-300 hover:scale-105"
              src="https://randomuser.me/api/portraits/men/32.jpg"
            />
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold">John Doe</h1>
              <p className="text-lg text-blue-100">
                3rd Year Computer Science Student
              </p>
              <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-blue-200 md:justify-start">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> San Francisco
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> Graduating 2025
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" /> Open to Internships
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-3 md:ml-auto md:mt-0">
              <button className="flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm transition hover:bg-white/30">
                <PenLine className="h-4 w-4" /> Edit Profile
              </button>
              <button className="flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm transition hover:bg-white/30">
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className="container mx-auto -mt-16 px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* -- Left Column -- */}
          <div className="space-y-8 lg:col-span-2">
            {/* About Me */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-xl font-semibold">About Me</h3>
              <p className="text-gray-600">
                Passionate and driven Computer Science student with a knack for
                creating elegant and efficient solutions. I thrive in
                collaborative environments and I'm always eager to learn new
                technologies and take on challenging projects.
              </p>
            </div>

            {/* Skills */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-xl font-semibold">My Skills</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "React",
                  "JavaScript",
                  "Python",
                  "UI/UX",
                  "Node.js",
                  "SQL",
                  "Docker",
                  "Figma",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700 transition-transform duration-200 hover:scale-105"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Recent Projects */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-xl font-semibold">Recent Projects</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <ProjectsCard
                  title="AI Study Assistant"
                  category="Web Development"
                  description="A web app that uses AI to generate study materials and quizzes."
                  members={4}
                  progress={75}
                  tags={["React", "Node.js", "AI"]}
                />
                <ProjectsCard
                  title="E-commerce Platform"
                  category="Full-Stack"
                  description="A feature-rich e-commerce site with a custom backend."
                  members={6}
                  progress={100}
                  tags={["Next.js", "Stripe", "GraphQL"]}
                />
              </div>
            </div>

            {/* Mentor Connections */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-xl font-semibold">My Mentors</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <MentorCard
                  image="https://randomuser.me/api/portraits/women/68.jpg"
                  name="Jane Smith"
                  title="Senior Software Engineer"
                  company="Google"
                  rating={4.9}
                  reviews={87}
                  expertise={["React", "TypeScript"]}
                />
                <MentorCard
                  image="https://randomuser.me/api/portraits/men/75.jpg"
                  name="Robert Johnson"
                  title="Product Manager"
                  company="Microsoft"
                  rating={4.8}
                  reviews={102}
                  expertise={["Agile", "Product Strategy"]}
                />
              </div>
            </div>
          </div>

          {/* -- Right Column -- */}
          <div className="space-y-8">
            {/* Contact & Socials */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-xl font-semibold">Contact & Socials</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gray-500" />{" "}
                  john.doe@email.com
                </div>
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-gray-500" /> +1 (555) 123-4567
                </div>
                <hr className="my-3" />
                <a
                  className="flex items-center gap-3 transition-colors hover:text-purple-600"
                  href="https://github.com/johndoe"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5" /> GitHub
                </a>
                <a
                  className="flex items-center gap-3 transition-colors hover:text-purple-600"
                  href="https://linkedin.com/in/johndoe"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5" /> LinkedIn
                </a>
                <a
                  className="flex items-center gap-3 transition-colors hover:text-purple-600"
                  href="https://johndoe.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe className="h-5 w-5" /> Portfolio
                </a>
              </div>
            </div>

            {/* Certifications */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-xl font-semibold">Certifications</h3>
              <div className="space-y-4">
                <CertificateCard
                  title="React - The Complete Guide"
                  issuer="Udemy"
                  dateObtained="2023-10-15"
                />
                <CertificateCard
                  title="AWS Certified Cloud Practitioner"
                  issuer="Amazon Web Services"
                  dateObtained="2024-02-20"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}