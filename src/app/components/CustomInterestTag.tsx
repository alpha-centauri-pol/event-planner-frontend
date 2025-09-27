import React from 'react';
import { FiPlus } from 'react-icons/fi';

type InterestTagProps = {
  label: string;
  isSelected: boolean;
};

const CustomInterestTag: React.FC<InterestTagProps> = ({ label, isSelected, }) => {
  return (
    <div
      className="flex items-center justify-between min-w-[160px] text-left
        border-2 rounded-lg px-4 py-2.5 text-sm transition-all duration-200 bg-[#3E3C61] border-[#5D59AD] text-white"
    >
      {label}
    </div>
  );
};

export default CustomInterestTag;