"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";

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
    <div className="min-h-screen flex flex-col bg-[#161616] text-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="flex flex-col flex-1 items-center justify-center px-6">
        <div className="text-center max-w-4xl">
          <h1 className="text-4xl md:text-7xl font-bold mb-6">
            Intelligent Automation For Your Mail Inbox
          </h1>
          <p className="text-lg max-w-xl mx-auto text-gray-300 mb-5">
            We bring AI email automation to your fingertips & streamline
            planning your events based on your private, personal interests.
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
  );
}
