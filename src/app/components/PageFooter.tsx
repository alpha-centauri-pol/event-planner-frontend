"use client";
import React from "react";

type PageFooterProps = {
  selectedCount: number;
  onContinue: () => void; 
};

const PageFooter: React.FC<PageFooterProps> = ({ selectedCount, onContinue }) => {
  const remaining = Math.max(0, 3 - selectedCount);
  const isDisabled = selectedCount < 3;

  return (
    <footer className="flex justify-between items-center p-5 bg-[#1D1C2C] rounded-xl mt-4 border-2 border-[#5D59AD] w-full max-w-5xl mx-auto">
      <p className="font-semibold text-white text-[16px]">
        {isDisabled
          ? `Select at least ${remaining} interest${remaining > 1 ? "s" : ""}`
          : "Ready to continue"}
      </p>

      <button
        onClick={onContinue} 
        disabled={isDisabled}
        className={`px-6 py-2 rounded-lg font-semibold text-white ${
          isDisabled
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-[#5D59AD] hover:bg-[#5858d6]"
        }`}
      >
        Continue
      </button>
    </footer>
  );
};

export default PageFooter;