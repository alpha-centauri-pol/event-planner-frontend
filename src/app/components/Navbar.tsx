"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

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
  const handlePrivacyPolicy= () => {
      router.push("/privacy");
  };

  return (
    <nav className="max-w-7xl w-full mx-auto flex items-center justify-between px-6 py-4 text-white shadow-md">
      <div
        className="text-2xl font-bold cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image src="/logo.svg" alt="Logo" width={140} height={140} />
      </div>
      <div className="flex">
      <button
        onClick={handlePrivacyPolicy}
        className="px-4 py-[0.75rem] rounded-md text-lg font-semibold transition-colors mx-2 hover:text-[#e3e3e3]"
      >
        Privacy Policy
      </button>

      <button
        onClick={handleGetStarted}
        className="px-4 py-2 hidden md:block bg-[#5c58aa] rounded-md text-md font-semibold transition-colors hover:bg-[#4a4690]"
      >
        Get Started
      </button>
      </div>

    </nav>
  );
}
