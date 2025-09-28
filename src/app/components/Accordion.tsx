"use client";

import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
// import { clsx } from 'clsx';
import { FiChevronDown } from 'react-icons/fi';

type AccordionProps = {
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
};

const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  className,
  titleClassName,
  contentClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const wrapperClasses = twMerge("border-b border-gray-700", className);
  const titleClasses = twMerge(
    "flex w-full items-center justify-between p-4 cursor-pointer hover:bg-gray-800",
    titleClassName
  );
  const contentClasses = twMerge("p-4 pt-0 text-gray-300", contentClassName);

  return (
    <div className={wrapperClasses}>
      <div
        className={titleClasses}
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        aria-expanded={isOpen}
      >
        <div className="font-medium text-white">{title}</div>
        <FiChevronDown
          className={`
            w-5 h-5 text-gray-400 transition-transform duration-300
            ${isOpen ? 'rotate-180' : ''}
          `}
        />
      </div>
      <div
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? 'max-h-[1000px]' : 'max-h-0'}
        `}
      >
        <div className={contentClasses}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
