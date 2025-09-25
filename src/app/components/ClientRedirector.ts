"use client";

import { useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { useRouter, usePathname } from 'next/navigation';

const ClientRedirector = () => {
  const { user, loading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading || !user) {
      return;
    }

    const hasInterests = user.interests && user.interests.length > 0;

    if (hasInterests && pathname === '/interests') {
      router.replace('/home');
    }
    
    if (!hasInterests && pathname === '/home') {
      router.replace('/interests');
    }
  }, [user, loading, router, pathname]);

  return null;
};

export default ClientRedirector;
