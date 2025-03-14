import React from "react";
import Button from "../ui/Button";
import MiniCard from "../ui/miniCard";
import { MoveRight, ChevronDown } from "lucide-react";

function Home() {
  return (
    <section className="bg-[#f9fafb] h-full w-full font-custom pb-20">
      {/* Main Section */}
      <div className="flex flex-col justify-center items-center h-full w-full pt-20 box-pattern">
        <p className="text-[#9333ea] text-[15px] font-semibold bg-[#f3e8ff] rounded-full p-3 ">
          The Future of Learning is Here
        </p>

        <p className="bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text text-[72px] max-w-4xl text-center font-bold leading-none py-4">
          Unlock Your Potential with SkillBridge
        </p>

        <p className="text-[#4b5563] max-w-3xl text-center text-xl leading-normal py-5">
          Connect, collaborate, and grow with a community of learners and
          professionals. Transform your skills into success.
        </p>

        <p></p>

        <div className="flex gap-4 py-2 items-center">
          <Button
            Variant="primary"
            size="large"
            className="text-xl items-center gap-2"
          >
            Get Started Free
            <MoveRight />
          </Button>

          <Button Variant="secondry" size="medium">
            Watch Demo
          </Button>
        </div>

        <div className="grid grid-cols-4 place-items-center gap-8 py-10 h-full max-w-4xl">
          <MiniCard>
            <p>10k+</p>
            <p>Active Users</p>
          </MiniCard>

          <MiniCard>
            <p>500+</p>
            <p>Mentors</p>
          </MiniCard>

          <MiniCard>
            <p>1000+</p>
            <p>Projects</p>
          </MiniCard>

          <MiniCard>
            <p>50k+</p>
            <p>Skills Shared</p>
          </MiniCard>
        </div>

        <div className="flex flex-col justify-center items-center bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce ml-20 py-10">
          <p className="text-lg text-[var(--secoundry-color)]">Scroll Down</p>
          <ChevronDown className="text-[var(--secoundry-color)]" />
        </div>
      </div>

      {/* CTA Section */}
    <div className="flex flex-col w-full h-full justify-center items-center">
      <div>sdfasdfgsdfg</div>
      <div>sdfgsdfgsdfgsdf</div>
    </div>

    </section>
  );
}

export default Home;
