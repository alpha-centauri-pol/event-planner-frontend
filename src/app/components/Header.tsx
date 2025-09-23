"use client";

import React from 'react';

type HeaderProps = {
  title?: React.ReactNode;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
};

const Header: React.FC<HeaderProps> = ({ title, leftContent, rightContent }) => (
  <header className="flex items-center justify-between w-full h-16">
    <div className="flex items-center gap-4">
      {leftContent}
      {title && <div className="text-3xl text-white font-bold">{title}</div>}
    </div>
    <div className="flex items-center">{rightContent}</div>
  </header>
);

export default Header;
