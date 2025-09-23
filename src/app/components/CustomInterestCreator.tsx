import React from 'react';
import Accordion from './Accordion';

const CustomInterestCreator = () => {
  const customTagTitle = (
    <div className="h-14 w-full text-left px-4 py-2.5 rounded-[10px] border-2 bg-black border-slate-500 hover:border-slate-400 text-white flex justify-between items-center transition-colors">
      <span className="font-medium">Custom Interest</span>
      <span className="font-bold text-xl">+</span>
    </div>
  );

  return (
    <Accordion
      title={customTagTitle}
      className="border-none"
      titleClassName="p-0 hover:bg-transparent"
      contentClassName="p-0"
    >
      <div className="bg-gray-800 p-6 rounded-2xl mt-4 border border-slate-600">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Interest Title (e.g., Astrophotography)"
            className="w-full bg-gray-900 border border-slate-500 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <textarea
            placeholder="Add a short description..."
            rows={3}
            className="w-full bg-gray-900 border border-slate-500 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <div className="flex justify-end">
            <button className="bg-violet-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-violet-500 transition-colors">
              Save Interest
            </button>
          </div>
        </div>
      </div>
    </Accordion>
  );
};

export default CustomInterestCreator;