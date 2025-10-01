"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleGetStarted = () => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      router.push("/home");
    } else {
      router.push("/login");
    }
  };

  return (
    <nav className="max-w-7xl w-full mx-auto flex items-center justify-between px-6 py-4 bg-[#161616] text-white shadow-md">
      <div
        className="text-2xl font-bold cursor-pointer"
        onClick={() => router.push("/")}
      >
        SynCal
      </div>

      <button
        onClick={handleGetStarted}
        className="px-4 py-2 hidden md:block bg-[#5c58aa] rounded-md text-md font-semibold transition-colors hover:bg-[#4a4690]"
      >
        Get Started
      </button>
    </nav>
  );
}
