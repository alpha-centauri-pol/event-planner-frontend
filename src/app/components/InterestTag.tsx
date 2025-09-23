// src/components/InterestTag.tsx
import React from 'react';
import { FiPlus } from 'react-icons/fi';

type InterestTagProps = {
  label: string;
  isSelected: boolean;
  onClick: () => void;
};

const InterestTag: React.FC<InterestTagProps> = ({ label, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-between min-w-[160px] text-left
        border-2 rounded-lg px-4 py-2.5 text-sm transition-all duration-200
        ${isSelected
          ? 'bg-[#3E3C61] border-[#5D59AD] text-white'
          : 'bg-[#000000] border-[#5D59AD] hover:text-[#ffffff] hover:border-[#8a8ac7] text-[#C3BFFF]'
        }
      `}
    >
      {label}
      <span className={`
        ml-3 font-bold text-xl transition-transform duration-200
        ${isSelected ? 'transform rotate-45' : ''}
      `}>
        <FiPlus></FiPlus>
      </span>
    </button>
  );
};

export default InterestTag;