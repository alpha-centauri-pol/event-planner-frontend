"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import InterestCategory from '../components/InterestCategory';
import PageFooter from '../components/PageFooter';
import Modal from '../components/Modal';
import InterestTag from '../components/InterestTag';
import ProfileSection from '../components/ProfileSection';
import Header from '../components/Header';
import { fetchAllInterests, fetchUserInterests, createCustomInterest, syncInterests, saveUserInterests } from '../lib/api'; 
import { FiBell, FiUser } from 'react-icons/fi';
import RootLayout from '../layout';

const InterestsPage = () => {
  const router = useRouter();
  const [interestData, setInterestData] = useState<Record<string, string[]>>({});
  const [interestMap, setInterestMap] = useState<Record<string, string>>({});
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isCustomInterestModalOpen, setCustomInterestModalOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [customInterestText, setCustomInterestText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [allInterestsResponse, myInterestsResponse] = await Promise.all([
          fetchAllInterests(),
          fetchUserInterests()
        ]);

        
        const allInterests = allInterestsResponse
        const myInterests = myInterestsResponse

        if (!Array.isArray(allInterests) || !Array.isArray(myInterests)) {
          throw new Error("Invalid data format received from the server.");
        }

        const previouslySelectedNames = myInterests.map((interest: { child: string }) => interest.child);

        const grouped: Record<string, string[]> = {};
        const iMap: Record<string, string> = {};

        allInterests.forEach((interest: { id: string, category: string, child: string }) => {
          if (!grouped[interest.category]) {
            grouped[interest.category] = [];
          }
          grouped[interest.category].push(interest.child);
          iMap[interest.child] = interest.id;
        });
        
        setSelectedInterests(previouslySelectedNames);
        setInterestData(grouped);
        setInterestMap(iMap);

      } catch (err) {
        console.error("Failed to load initial data:", err);
        setError("Could not load your interests. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const handleToggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(item => item !== interest) 
        : [...prev, interest]
    );
  };

  const handleAddCustomInterest = async () => {
    if (!customInterestText.trim()) return;
    try {
      const newInterest = await createCustomInterest(customInterestText.trim());
      
      setSelectedInterests(prev => [...prev, newInterest.name]);
      setInterestMap(prevMap => ({ ...prevMap, [newInterest.name]: newInterest.id }));
      setInterestData(prevData => ({
        ...prevData,
        Custom: [...(prevData.Custom || []), newInterest.name],
      }));
    } catch (err) {
      console.error("Failed to create custom interest:", err);
      alert("Could not add custom interest.");
    } finally {
      setCustomInterestText('');
      setCustomInterestModalOpen(false);
    }
  };

  const handleSaveAndContinue = async () => {
    const selectedIds = selectedInterests.map(name => interestMap[name]).filter(Boolean);
    if (selectedIds.length === 0) {
      alert("Please select at least one interest.");
      return;
    }
    try {
      await saveUserInterests(selectedIds);
      await syncInterests();
      router.push('/home');
    } catch (err) {
      console.error("Failed to save interests:", err);
      alert("Could not save your interests. Please try again.");
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 font-sans">
      <div className="w-full max-w-5xl mx-auto">
        <Header 
          leftContent={<button  onClick={() => router.push('/home')} aria-label="Go back" className="text-2xl cursor-pointer hover:text-gray-300">←</button>}
          title="Select Interests"
          rightContent={
            <div className="flex items-center space-x-4">
            </div>
          }
        />
        <div className="mt-8 w-full bg-[#1D1C2C] text-gray-200 rounded-2xl p-6 md:p-8 border-2 border-[#5D59AD] max-h-[65vh] overflow-auto">
          <main>
            <h2 className="text-lg font-semibold text-white mb-5">Explore by Category</h2>
            {isLoading && <p className="text-gray-400">Loading interests...</p>}
            {error && <p className="text-red-400">{error}</p>}
            {!isLoading && !error && Object.entries(interestData).map(([category, interests]) => (
              <InterestCategory key={category} title={category} interests={interests} selectedInterests={selectedInterests} onInterestClick={handleToggleInterest} />
            ))}
            <div className="flex justify-end mt-4">
              <InterestTag label="Custom Interest" isSelected={false} onClick={() => setCustomInterestModalOpen(true)} />
            </div>
          </main>
          
          
        </div>
      </div>
      <PageFooter selectedCount={selectedInterests.length} onContinue={handleSaveAndContinue} />

      <Modal isOpen={isCustomInterestModalOpen} onClose={() => setCustomInterestModalOpen(false)}>
        <h3 className="text-lg font-semibold text-white mb-4">Create a Custom Interest</h3>
        <input 
          type="text" 
          value={customInterestText} 
          onChange={(e) => setCustomInterestText(e.target.value)} 
          placeholder="e.g., Quantum Computing" 
          className="w-full bg-[#101828] border border-slate-600 rounded-lg p-3 text-white placeholder-gray-400" 
        />
        <div className='flex justify-end mt-4'>
          <button onClick={handleAddCustomInterest} className="bg-[#5D59AD] hover:bg-[#4844A2] px-6 py-2 rounded-lg text-white font-semibold transition-colors">
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