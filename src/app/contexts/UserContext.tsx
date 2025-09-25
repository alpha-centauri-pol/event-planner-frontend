"use client";

import React, { createContext, useState, useEffect, useContext } from 'react';
import { usePathname } from 'next/navigation';
import { fetchProfile } from '../lib/api';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  picture: string;
  interests: { id: string; category: string; child: string; }[];
  custom_interests?: { id: string; name: string; }[];
}

interface UserContextType {
  user: UserProfile | null;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/login') {
      setLoading(false);
      return;
    }
    fetchProfile()
      .then(response => setUser(response.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [pathname]);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};