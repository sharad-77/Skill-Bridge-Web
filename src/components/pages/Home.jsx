import React from "react";
import Button from "../ui/Button";
import { MiniCard, FeaturesCard } from "../ui/Card";
import {
  MoveRight,
  ChevronDown,
  Users,
  BookOpen,
  Trophy,
  Star,
} from "lucide-react";
import PostComponent from "../PostComponent";

function Home() {
  return (
    <section className="bg-gray-20 h-full w-full font-custom">
      {/* Main Section */}
      <div className="flex flex-col justify-center items-center h-full w-full pt-20 box-pattern gradient-container md:px-10 lg:px-10 xl:px-20">
        <div className="mini-Heading text-center md:text-left ">The Future of Learning is Here</div>

        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text max-w-4xl lg:max-w-3xl text-center font-bold leading-none py-4 text-5xl md:text-6xl lg:text-7xl xl:text-[72px]">
          Unlock Your Potential with SkillBridge
        </div>

        <div className="text-[#4b5563] max-w-3xl md:max-w-lg lg:max-w-2xl text-center leading-normal md:py-2 lg:py-5 text-md font-semibold md:text-md lg:text-xl">
          Connect, collaborate, and grow with a community of learners and
          professionals. Transform your skills into success.
        </div>

        <div className="flex gap-4 py-8 items-center md:justify-center md:gap-8 lg:gap-12 xl:gap-16">
          <Button
            Variant="primary"
            size="large"
            className="text-md max-w-[10rem] max-h-[3rem] md:max-w-[14rem] md:text-lg items-center gap-2 sparkle-effect text-black border-2 border-black hover:bg-white md:px-6 py-6"
          >
            Get Started Free
            <MoveRight />
          </Button>

          <Button
            Variant="secondry"
            size="medium"
            className="backdrop-blur-[90%] border-black border-2 text-md lg:text-lg md:px-6 lg:px-8 xl:px-10"
          >
            Watch Demo
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 place-items-center gap-8 py-10 h-full max-w-4xl md:max-w-6xl lg:max-w-full xl:max-w-full">
          <MiniCard>
            <div>10k+</div>
            <div>Active Users</div>
          </MiniCard>

          <MiniCard>
            <div>500+</div>
            <div>Mentors</div>
          </MiniCard>

          <MiniCard>
            <div>1000+</div>
            <div>Projects</div>
          </MiniCard>

          <MiniCard>
            <div>50k+</div>
            <div>Skills Shared</div>
          </MiniCard>
        </div>

        <div className="flex flex-col justify-center items-center bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce ml-20 ">
          <p className="text-lg text-[var(--secoundry-color)]">Scroll Down</p>
          <ChevronDown className="text-[var(--secoundry-color)]" />
        </div>
      </div>

      {/* CTA Section */}
      <div className="flex flex-col justify-center items-center py-10 md:px-10 lg:px-20 xl:px-40">
        <div className="flex flex-col justify-center items-center max-w-7xl">
          <div className="mini-Heading ">Features</div>
          <div className=" text-3xl md:text-4xl text-center lg:text-5xl font-bold py-3">Everything you need to succeed</div>
          <div className="text-[#4b5563] max-w-[23rem] md:max-w-lg p-2 text-center text-md lg:text-lg leading-normal">
            SkillBridge provides all the tools and resources you need to enhance
            your skills and advance your career.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 px-4 py-10 h-full w-full md:max-w-6xl lg:max-w-full xl:max-w-full">
            <FeaturesCard
              svg={<Users color="#9333ea" size={38} />}
              title={"Project Collaboration"}
              description={
                "Work on real projects with peers and build your portfolio"
              }
              className="hover:text-purple-600 hover:bg-pink-50"
            ></FeaturesCard>

            <FeaturesCard
              svg={<BookOpen color="#ff4878" size={38} />}
              title={"Project Collaboration"}
              description={
                "Work on real projects with peers and build your portfolio"
              }
              className="hover:text-[#ff4878] hover:bg-red-50"
            ></FeaturesCard>

            <FeaturesCard
              svg={<Trophy color="#4b86fb" size={38} />}
              title={"Project Collaboration"}
              description={
                "Work on real projects with peers and build your portfolio"
              }
              className="hover:text-[#4b86fb] hover:bg-blue-50"
            ></FeaturesCard>

            <FeaturesCard
              svg={<Star color="#008a30" size={38} />}
              title={"Project Collaboration"}
              description={
                "Work on real projects with peers and build your portfolio"
              }
              className="hover:text-[#008a30] hover:bg-green-50"
            ></FeaturesCard>
          </div>
        </div>
      </div>

      {/* Join Now Section */}
      <div className="flex justify-center items-center w-full h-full gradient-primary md:px-10 lg:px-20 xl:px-40">
        <div className="flex flex-col justify-center items-center max-w-4xl h-[20rem] w-full glass-dark m-20 rounded-3xl text-center md:text-left mx-10">
          <div className="text-white text-4xl font-semibold ">
            Ready to Start Your Journey?
          </div>
          <div className="text-white md:max-w-md text-lg xl:text-xl text-center py-8">
            Join thousands of learners who are already transforming their
            careers with SkillBridge.
          </div>
          <Button Variant="normal" size="large">
            Join Now Skill-Bridge
          </Button>
        </div>
      </div>

      {/* Testimonial */}
      <div className="flex items-center justify-center pt-10 ">
        <div className="flex flex-col justify-center items-center max-w-7xl">
          <p className="mini-Heading">Testimonials</p>
          <div className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-center font-bold pt-2">What Our Users Say</div>
          <div className="max-w-lg md:max-w-md text-center text-gray-600 py-3 ">
            Hear from students and professionals who have transformed their
            careers with SkillBridge.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center  gap-8 py-8 px-4 h-full w-full md:max-w-6xl lg:max-w-full xl:max-w-full">
            <div className="h-full w-full border-t-4 border-[#9333ea]">
              <PostComponent>
                <div>
                  SkillBridge helped me land my dream job through its amazing
                  mentorship program.
                </div>
                <div>Chavda Sharad</div>
                <div>Block-Chain Devloper</div>
              </PostComponent>
            </div>

            <div className="h-full w-full border-t-4 border-red-500">
              <PostComponent>
                <div>
                  The project collaboration feature is fantastic. I've built a
                  strong portfolio here.
                </div>
                <div>Belim Uzer-Khan</div>
                <div>WEB-Developer</div>
              </PostComponent>
            </div>

            <div className="h-full w-full border-t-4 border-blue-500">
              <PostComponent>
                <div>
                  The skill exchange marketplace transformed how I learn new
                  technologies.
                </div>
                <div>Jigar Vadher</div>
                <div>ML-OPS Engineer</div>
              </PostComponent>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;

