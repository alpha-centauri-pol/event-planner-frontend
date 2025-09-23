// src/components/CustomDropdown.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { FiChevronDown } from 'react-icons/fi';

export type DropdownOption = {
  value: string;
  label: string;
};

type CustomDropdownProps = {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

const CustomDropdown: React.FC<CustomDropdownProps> = ({ options, value, onChange, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find(option => option.value === value)?.label;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (newValue: string) => {
    onChange(newValue);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-[#1D1C2C] border-2 border-[#312E72] rounded-lg py-3 px-4 focus:outline-none focus:ring-1 focus:ring-white transition-colors"
      >
        <span>{selectedLabel}</span>
        <FiChevronDown className={`transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 top-full mt-2 w-full bg-[#1D1C2C] border-2 border-[#312E72] rounded-lg shadow-lg">
          <ul>
            {options.map((option, index) => (
              <li
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className={`px-4 py-2 hover:bg-[#5D59AD] cursor-pointer transition-colors ${index === 0 ? 'rounded-t-lg' : ''} ${index === options.length - 1 ? 'rounded-b-lg' : ''}`}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;