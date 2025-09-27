// src/components/InterestCategory.tsx
import React from 'react';
import InterestTag from './InterestTag';
import CustomInterestTag from './CustomInterestTag';

type InterestCategoryProps = {
  title: string;
  interests: string[];
  selectedInterests: string[];
  onInterestClick: (interest: string) => void;
  isCustom: boolean;
};

const InterestCategory: React.FC<InterestCategoryProps> = ({ title, interests, selectedInterests, onInterestClick, isCustom }) => {
  return (
    <section className="bg-[#2c2c44] rounded-xl p-5 mb-6">
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      <div className="flex flex-wrap gap-3">
        {interests.map((interest) => (
          isCustom ? (
            <CustomInterestTag
              key={interest}
              label={interest}
              isSelected={selectedInterests.includes(interest)}
            />
          ) : (
            <InterestTag
              key={interest}
              label={interest}
              isSelected={selectedInterests.includes(interest)}
              onClick={() => onInterestClick(interest)}
            />
          )
        ))}
      </div>
    </section>
  );
};

export default InterestCategory;