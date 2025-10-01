"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Galaxy from "./components/Galaxy";

export default function LandingPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    try {
      const userId = localStorage.getItem("user_id");
      if (userId) {
        setIsLoggedIn(true);
      }
    } catch (e) {
      console.warn("Unable to read localStorage", e);
    }
  }, []);

  const handleClick = () => {
    if (isLoggedIn) {
      router.push("/home");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white bg-black">
      <div className="absolute inset-0 z-0">
        <Galaxy
          mouseInteraction={false}
          mouseRepulsion={false}
          density={0.3}
          glowIntensity={0.1}
          saturation={0}
          hueShift={140}
          twinkleIntensity={0.1}
          rotationSpeed={0.2}
          repulsionStrength={10}
          autoCenterRepulsion={1}
          starSpeed={0.3}
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center z-5 pointer-events-none blur-sm">
        <div className="big-circle absolute w-[400px] h-[400px] rounded-full"></div>
        <div className="small-circle absolute w-[250px] h-[250px] rounded-full"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-col flex-1 items-center justify-center px-6">
          <div className="text-center max-w-4xl">
            <h1 className="text-4xl md:text-7xl font-bold mb-6">
              Intelligent Automation For Your Mail Inbox
            </h1>
            <p className="text-lg max-w-xl mx-auto text-gray-300 mb-5">
              We bring AI email automation to your fingertips & streamline planning
              your events based on your private, personal interests.
            </p>
            <button
              onClick={handleClick}
              className="px-4 py-2 bg-[#5c58aa] rounded-md text-lg font-semibold transition-colors cursor-pointer mx-2 hover:bg-[#4a4690]"
            >
              Get Started
            </button>
            <a
              href="https://www.dscvit.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-[0.75rem] bg-[#0a0a0a] rounded-md text-lg font-semibold transition-colors mx-2 hover:bg-[#1a1a1a]"
            >
              About GDG
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .big-circle {
          background: linear-gradient( 229deg, #df7afe 13%, #c96ef000 35.0236%, #a45cdb00 64.1724%, #5d59ad 88% );
          animation: rotateClockwise 10s linear infinite;
          opacity: 0.7;
        }

        .small-circle {
          background: linear-gradient( 141deg, #df7afe 13%, #c96ef000 35.0236%, #a45cdb00 64.1724%, #5d59ad 88% );
          animation: rotateCounterClockwise 10s linear infinite;
          opacity: 0.7;
        }

        @keyframes rotateClockwise {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes rotateCounterClockwise {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(-360deg);
          }
        }
      `}</style>
    </div>
  );
}
