import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  Globe,
  Play,
  Star,
  Target,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import { SkillCard, FloatingCard, DashboardCard, ProjectCard, MentorReviewCard } from "../components/ui/Card.jsx";

function Home() {
  return (
    <section className="bg-white h-full w-full flex justify-center items-center">
      <div className="flex flex-col justify-center items-center overflow-hidden bg-white h-full w-full">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center max-w-[1352px]">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-[10%] w-72 h-72 bg-purple-200/20 rounded-full blur-3xl animate-pulse-slow" />
            <div
              className="absolute bottom-20 right-[15%] w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse-slow"
              style={{ animationDelay: "2s" }}
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-100/10 to-blue-100/10 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                  <Zap className="w-4 h-4 mr-2" />
                  #1 Platform for Collaborative Learning
                </div>

                <div className="space-y-6 w-full">
                  <h1 className="text-3xl lg:text-5xl font-bold leading-tight text-gray-900 w-full">
                    Transform Your
                    <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      Learning Journey
                    </span>
                    with SkillBridge
                  </h1>

                  <p className="text-md text-gray-500 leading-tight max-w-lg">
                    Connect with mentors, collaborate on projects, and accelerate your career growth. Join thousands of
                    learners building their future together.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="md">
                    <Link to="/signup">
                      Start Learning Free
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="md" variant="outline">
                    <Link to="/demo">
                      <Play className="mr-2 h-5 w-5" />
                      Watch Demo
                    </Link>
                  </Button>
                </div>

              </div>

              {/* Right Content - Dashboard Mockup */}
              <div className="relative">
                <div className="relative z-10">
                  <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                    <DashboardCard
                      activeProjects={3}
                      mentorshipSessions={12}
                      skillsLearned={8}
                    />
                  </div>

                  {/* Floating Cards */}
                  <FloatingCard
                    icon={Check}
                    title="Project Completed!"
                    subtitle="React Dashboard"
                    bgColorClass="bg-green-100"
                    iconColorClass="text-green-600"
                    animationClass="absolute -top-4 -right-4 animate-float"
                  />

                  <FloatingCard
                    icon={Users}
                    title="New Mentor Match"
                    subtitle="Sarah Johnson"
                    bgColorClass="bg-blue-100"
                    iconColorClass="text-blue-600"
                    animationClass="absolute -bottom-4 -left-4 animate-float-slow"
                  />
                </div>

                {/* Background Decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-3xl transform -rotate-6 scale-105 -z-10"></div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="h-6 w-6 text-gray-400" />
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white border-b border-gray-100 max-w-[1352px]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">10,000+</div>
                <div className="text-gray-600">Active Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">500+</div>
                <div className="text-gray-600">Expert Mentors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">1,200+</div>
                <div className="text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">95%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50 max-w-[1352px]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
                Why Choose SkillBridge
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Everything you need to
                <span className="block text-purple-600">accelerate your growth</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From project collaboration to expert mentorship, we provide all the tools and connections you need to
                succeed in your career.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                    <Target className="w-4 h-4 mr-2" />
                    Project Collaboration
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">Build Real Projects with Peers</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Work on meaningful projects with talented peers from around the world. Build your portfolio while
                    learning from others and making lasting connections.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">Real-world project experience</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">Collaborative learning environment</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">Portfolio-worthy projects</span>
                  </div>
                </div>

                <Button asChild>
                  <Link to="/collaboration">
                    Explore Projects <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="relative">
                <ProjectCard
                  title="AI Study Assistant"
                  status="Active"
                  progress={65}
                  members={4}
                  tags={["Python", "ML", "NLP"]}
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1 relative">
                <MentorReviewCard
                  imageUrl="https://via.placeholder.com/50"
                  name="Sarah Johnson"
                  title="Senior Software Engineer"
                  rating="4.9"
                  review="The mentorship program helped me transition from junior to senior developer in just 8 months. The guidance was invaluable."
                  tags={["Career Growth", "Technical Skills"]}
                />
              </div>

              <div className="order-1 lg:order-2 space-y-8">
                <div className="space-y-6">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                    <Users className="w-4 h-4 mr-2" />
                    Expert Mentorship
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">Learn from Industry Experts</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Get personalized guidance from experienced professionals who have walked the path you want to take.
                    Accelerate your learning with one-on-one mentorship.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">1-on-1 mentorship sessions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">Industry expert guidance</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">Career advancement support</span>
                  </div>
                </div>

                <Button asChild>
                  <Link to="/mentor-match">
                    Find a Mentor <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* skill Section */}
        <section className="py-20 bg-white max-w-[1352px]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
                <BookOpen className="w-4 h-4 mr-2" />
                Skill Development
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Master In-Demand Skills</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Access a comprehensive library of courses and learning resources designed by industry experts to help you
                stay ahead of the curve.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <SkillCard
                icon={BookOpen}
                title="Interactive Courses"
                description="Learn through hands-on projects and interactive exercises designed by industry professionals."
                linkText="Browse Courses"
                linkTo="/marketplace"
                bgColorClass="from-purple-50 to-purple-100"
                iconBgColorClass="bg-purple-600"
              />

              <SkillCard
                icon={Trophy}
                title="Certifications"
                description="Earn industry-recognized certifications to validate your skills and boost your career prospects."
                linkText="View Certifications"
                linkTo="/certifications"
                bgColorClass="from-blue-50 to-blue-100"
                iconBgColorClass="bg-blue-600"
              />

              <SkillCard
                icon={Globe}
                title="Global Community"
                description="Connect with learners and professionals from around the world in our vibrant community."
                linkText="Join Community"
                linkTo="/collaboration"
                bgColorClass="from-green-50 to-green-100"
                iconBgColorClass="bg-green-600"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='w-full h-full bg-gradient-to-br from-purple-600 via-purple-700 to-blue-700'>
          <div className="py-20  relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg')] bg-repeat opacity-5" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Transform Your Career?</h2>
                <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                  Join thousands of learners who are already building their future with SkillBridge. Start your journey
                  today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gray-950 border border-white hover:bg-gray-800 transition-colors"
                  >
                    <Link to="/signup">
                      Get Started Free <ArrowUpRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>

                  <Button
                    className="bg-white text-black hover:bg-black hover:text-white border-2 border-black hover:border-white cursor-pointer
                     transition-colors"
                    iconRight={ArrowRight}
                  >
                    Custom
                  </Button>
                </div>
                <p className="text-purple-200 text-sm mt-4">No credit card required • Free forever</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </section>
  );
}

export default Home;
