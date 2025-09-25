"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import InterestCategory from '../components/InterestCategory';
import PageFooter from '../components/PageFooter';
import Modal from '../components/Modal';
import InterestTag from '../components/InterestTag';
import ProfileSection from '../components/ProfileSection';
import Header from '../components/Header';
import { fetchAllInterests, saveUserInterests, createCustomInterest, syncInterests } from '../lib/api'; 
import { FiBell, FiUser } from 'react-icons/fi';

const InterestsPage = () => {
  const router = useRouter();
  const [interestData, setInterestData] = useState<Record<string, string[]>>({});
  const [interestMap, setInterestMap] = useState<Record<string, string>>({});
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isCustomInterestModalOpen, setCustomInterestModalOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [customInterestText, setCustomInterestText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInterests = async () => {
      try {
        const response = await fetchAllInterests();
        const allInterests = response.data; // Correctly access the data array

        const grouped: Record<string, string[]> = {};
        const iMap: Record<string, string> = {};

        allInterests.forEach((interest: { id: string, category: string, child: string }) => {
          if (!grouped[interest.category]) {
            grouped[interest.category] = [];
          }
          grouped[interest.category].push(interest.child);
          iMap[interest.child] = interest.id;
        });

        setInterestData(grouped);
        setInterestMap(iMap);
      } catch (error) {
        console.error("Failed to load interests:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInterests();
  }, []);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(item => item !== interest) 
        : [...prev, interest]
    );
  };

  const handleAddCustomInterest = async () => {
    if (!customInterestText.trim()) return;
    try {
      const response = await createCustomInterest(customInterestText.trim());
      const newInterest = response.data;
      
      setSelectedInterests([...selectedInterests, newInterest.name]);
      setInterestMap(prevMap => ({ ...prevMap, [newInterest.name]: newInterest.id }));
      
      setInterestData(prevData => ({
        ...prevData,
        Custom: [...(prevData.Custom || []), newInterest.name],
      }));
    } catch (error) {
      console.error("Failed to create custom interest:", error);
    } finally {
      setCustomInterestText('');
      setCustomInterestModalOpen(false);
    }
  };

  const handleSaveAndContinue = async () => {
    const selectedIds = selectedInterests.map(name => interestMap[name]).filter(Boolean);
    try {
      await saveUserInterests(selectedIds);
      await syncInterests();
      router.push('/home');
    } catch (error) {
      console.error("Failed to save interests:", error);
      alert("Could not save your interests. Please try again.");
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 font-sans">
      <div className="w-full max-w-5xl mx-auto">
        <Header 
          leftContent={<button className="text-2xl cursor-pointer hover:text-gray-300">←</button>}
          title="Select Interests"
          rightContent={
            <div className="flex items-center space-x-4">
              <button className="w-10 h-10 rounded-full border-2 border-[#A6A2FF] bg-[#161616] flex items-center justify-center hover:bg-gray-700">
                <FiBell className="w-5 h-5 text-[#A6A2FF]" />
              </button>
              <button onClick={() => setProfileModalOpen(true)} className="w-10 h-10 rounded-full border-2 border-[#A6A2FF] bg-[#161616] flex items-center justify-center hover:bg-gray-700">
                <FiUser className="w-5 h-5 text-[#A6A2FF]" />
              </button>
            </div>
          }
        />
        <div className="mt-8 w-full bg-[#1D1C2C] text-gray-200 rounded-2xl p-6 md:p-8 border-2 border-[#5D59AD]">
          <main>
            <h2 className="text-lg font-semibold text-white mb-5">Explore by Category</h2>
            {isLoading ? (
              <p className="text-gray-400">Loading interests...</p>
            ) : (
              Object.entries(interestData).map(([category, interests]) => (
                <InterestCategory key={category} title={category} interests={interests} selectedInterests={selectedInterests} onInterestClick={toggleInterest} />
              ))
            )}
            <div className="flex justify-end">
              <InterestTag label="Custom Interest" isSelected={false} onClick={() => setCustomInterestModalOpen(true)} />
            </div>
          </main>
          
          <PageFooter selectedCount={selectedInterests.length} onContinue={handleSaveAndContinue} />
        </div>
      </div>

      <Modal isOpen={isCustomInterestModalOpen} onClose={() => setCustomInterestModalOpen(false)}>
        <h3 className="text-lg font-semibold text-white mb-4">Create a Custom Interest</h3>
        <input type="text" value={customInterestText} onChange={(e) => setCustomInterestText(e.target.value)} placeholder="e.g., Quantum Computing" className="w-full bg-[#101828] border border-slate-600 rounded-lg p-3 text-white placeholder-gray-400" />
        <div className='flex flex-col items-end flex-grow'>
          <button onClick={handleAddCustomInterest} className="mt-4 bg-[#5D59AD] hover:bg-[#5858d6] px-6 py-2 w-fit rounded-lg text-white font-semibold">
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

