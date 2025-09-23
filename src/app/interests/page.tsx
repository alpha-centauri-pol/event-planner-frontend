"use client";

import React, { useState } from 'react';
import InterestCategory from '../components/InterestCategory';
import PageFooter from '../components/PageFooter';
import Modal from '../components/Modal';
import InterestTag from '../components/InterestTag';
import ProfileSection from '../components/ProfileSection';
import { FiBell, FiUser } from 'react-icons/fi';
import Header from '../components/Header';

const interestData = {
  "Technology": ["AI/ML", "Web Development", "Cybersecurity", "Blockchain", "Cloud Computing", "UI/UX Design"],
  "Creative": ["Graphic Design", "Video Editing", "Music Production", "Photography", "Writing", "Animation"]
};

const InterestsPage = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isCustomInterestModalOpen, setCustomInterestModalOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [customInterestText, setCustomInterestText] = useState('');

  const toggleInterest = (interest: string) => {
    const isAlreadySelected = selectedInterests.includes(interest);

    if (isAlreadySelected) {
      const updatedInterests = selectedInterests.filter(item => item !== interest);
      setSelectedInterests(updatedInterests);
    } else {
      const updatedInterests = [...selectedInterests, interest];
      setSelectedInterests(updatedInterests);
    }
  };

  const handleAddCustomInterest = () => {
    if (customInterestText.trim() && !selectedInterests.includes(customInterestText.trim())) {
      setSelectedInterests([...selectedInterests, customInterestText.trim()]);
    }
    setCustomInterestText('');
    setCustomInterestModalOpen(false);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 font-sans ">
      <div className="w-full max-w-5xl mx-auto">
        <Header 
          leftContent={
            <button className="text-2xl cursor-pointer hover:text-gray-300">←</button>
          }
          title="Select Interests"
          rightContent={
            <div className="flex items-center space-x-4">
              <button className="w-10 h-10 rounded-full border-2 border-[#A6A2FF] bg-[#161616] flex items-center justify-center hover:bg-gray-700">
                <FiBell className="w-5 h-5 text-[#A6A2FF]" />
              </button>
              <button 
                onClick={() => setProfileModalOpen(true)}
                className="w-10 h-10 rounded-full border-2 border-[#A6A2FF] bg-[#161616] flex items-center justify-center hover:bg-gray-700"
              >
                <FiUser className="w-5 h-5 text-[#A6A2FF]" />
              </button>
            </div>
          }
        />
        <div className="mt-8 w-full bg-[#1D1C2C] text-gray-200 rounded-2xl p-6 md:p-8 border-2 border-[#5D59AD]">
          <main>
            <h2 className="text-lg font-semibold text-white mb-5">Explore by Category</h2>
            {Object.entries(interestData).map(([category, interests]) => (
              <InterestCategory
                key={category}
                title={category}
                interests={interests}
                selectedInterests={selectedInterests}
                onInterestClick={toggleInterest}
              />
            ))}
            <div className="flex justify-end">
              <InterestTag
                label="Custom Interest"
                isSelected={false}
                onClick={() => setCustomInterestModalOpen(true)}
              />
            </div>
          </main>
          
          <PageFooter selectedCount={selectedInterests.length} />
        </div>
      </div>

      <Modal isOpen={isCustomInterestModalOpen} onClose={() => setCustomInterestModalOpen(false)}>
        <h3 className="text-lg font-semibold text-white mb-4">Create a Custom Interest</h3>
        <input
          type="text"
          value={customInterestText}
          onChange={(e) => setCustomInterestText(e.target.value)}
          placeholder="e.g., Quantum Computing"
          className="w-full bg-[#101828] border border-slate-600 rounded-lg p-3 text-white placeholder-gray-400"
        />
        <div className='flex flex-col items-end flex-grow'>
          <button
            onClick={handleAddCustomInterest}
            className="mt-4 bg-[#5D59AD] hover:bg-[#5858d6] px-6 py-2 w-fit rounded-lg text-white font-semibold"
          >
            Save
          </button>
        </div>
      </Modal>

      <Modal isOpen={isProfileModalOpen} onClose={() => setProfileModalOpen(false)}>
        <ProfileSection />
      </Modal>
    </div>
  );
};

export default InterestsPage;