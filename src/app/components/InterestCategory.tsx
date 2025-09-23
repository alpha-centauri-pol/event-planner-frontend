// src/components/InterestCategory.tsx
import React from 'react';
import InterestTag from './InterestTag';

type InterestCategoryProps = {
  title: string;
  interests: string[];
  selectedInterests: string[];
  onInterestClick: (interest: string) => void;
};

const InterestCategory: React.FC<InterestCategoryProps> = ({ title, interests, selectedInterests, onInterestClick }) => {
  return (
    <section className="bg-[#2c2c44] rounded-xl p-5 mb-6">
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      <div className="flex flex-wrap gap-3">
        {interests.map((interest) => (
          <InterestTag
            key={interest}
            label={interest}
            isSelected={selectedInterests.includes(interest)}
            onClick={() => onInterestClick(interest)}
          />
        ))}
      </div>
    </section>
  );
};

export default InterestCategory;