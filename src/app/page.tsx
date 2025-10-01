"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import Navbar from "@/app/components/Navbar";
import Galaxy from "./components/Galaxy";

export default function LandingPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const circlesRef = useRef<HTMLDivElement>(null);
  const galaxyRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const userId = localStorage.getItem("user_id");
      if (userId) setIsLoggedIn(true);
    } catch (e) {
      console.warn("Unable to read localStorage", e);
    }
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      circlesRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    );

    tl.fromTo(
      galaxyRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5 },
      "+=0.3"
    );

    tl.fromTo(
      contentRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 0.5 },
      "+=0.2"
    );

  const heading = contentRef.current?.querySelector("h1");
  if (heading) {
    const headingSpans = heading.querySelectorAll("span");
    tl.to(
      headingSpans,
      {
        opacity: 1,
        duration: 0.05,
        stagger: 0.05,
        ease: "power2.out",
      },
      "-=0.1"
    );
  }

  const paragraph = contentRef.current?.querySelector("p");
  if (paragraph) {
    const spans = paragraph.querySelectorAll("span");
    tl.to(spans, {
      opacity: 1,
      duration: 0.05,
      stagger: 0.05,
      ease: "power2.out",
    });
  }

    const buttons = contentRef.current?.querySelectorAll(".animate-buttons > *");
    if (buttons) {
      tl.fromTo(
        buttons,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 },
        "-=0.3"
      );
    }
  }, []);

  const handleClick = () => {
    router.push(isLoggedIn ? "/home" : "/login");
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white bg-black">
      {/* Circles */}
      <div
        ref={circlesRef}
        className="absolute inset-0 flex items-center justify-center z-5 pointer-events-none blur-sm opacity-0"
      >
        <div className="big-circle absolute w-[400px] h-[400px] rounded-full"></div>
        <div className="small-circle absolute w-[250px] h-[250px] rounded-full"></div>
      </div>

      {/* Galaxy */}
      <div ref={galaxyRef} className="absolute inset-0 z-0 opacity-0">
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

      {/* Main content */}
      <div ref={contentRef} className="relative z-10 flex flex-col min-h-screen opacity-0">
        <Navbar />
        <div className="flex flex-col flex-1 items-center justify-center px-6">
          <div className="text-center max-w-4xl">
            {/* Heading with spans for typing animation */}
            <h1 className="text-4xl md:text-7xl font-bold mb-6 break-words">
  {"Intelligent Automation For Your Mail Inbox".split(" ").map((word, i) => (
    <span key={i} className="inline-block opacity-0">
      {word}&nbsp;
    </span>
  ))}
</h1>

<p className="text-lg max-w-xl mx-auto text-gray-300 mb-5 break-words">
  {"We bring AI email automation to your fingertips & streamline planning your events based on your private, personal interests."
    .split(" ")
    .map((word, i) => (
      <span key={i} className="inline-block opacity-0">
        {word}&nbsp;
      </span>
    ))}
</p>

            <div className="animate-buttons flex flex-col md:flex-row justify-center">
              <button
                onClick={handleClick}
                className="px-4 py-2 bg-[#5c58aa] rounded-md text-lg font-semibold transition-colors cursor-pointer mx-2 hover:bg-[#4a4690] mb-2 md:mb-0"
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
      </div>

      {/* Gradient circles */}
      <style jsx>{`
        .big-circle {
          background: linear-gradient(
            229deg,
            #df7afe 13%,
            #c96ef000 35.0236%,
            #a45cdb00 64.1724%,
            #5d59ad 88%
          );
          animation: rotateClockwise 10s linear infinite;
          opacity: 0.7;
        }

        .small-circle {
          background: linear-gradient(
            141deg,
            #df7afe 13%,
            #c96ef000 35.0236%,
            #a45cdb00 64.1724%,
            #5d59ad 88%
          );
          animation: rotateCounterClockwise 10s linear infinite;
          opacity: 0.7;
        }

        @keyframes rotateClockwise {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes rotateCounterClockwise {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
      `}</style>
    </div>
  );
}
