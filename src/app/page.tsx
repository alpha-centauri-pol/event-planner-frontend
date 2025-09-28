"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const RootRedirectInner = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const loginStatus = searchParams.get("login");
    const userId = searchParams.get("user_id");

    if (loginStatus === "success" && userId) {
      try {
        localStorage.setItem("user_id", userId);
      } catch (e) {
        console.warn("Unable to store user_id in localStorage", e);
      }
      router.replace("/home");
    } else {
      router.replace("/login");
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#161616] text-white">
      <p>Redirecting...</p>
    </div>
  );
};

const RootRedirectorPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#161616] text-white">
          <p>Loading...</p>
        </div>
      }
    >
      <RootRedirectInner />
    </Suspense>
  );
};

export default RootRedirectorPage;
