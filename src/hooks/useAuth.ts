'use client';

import { useState, useEffect } from 'react';
import { getCurrentUser, isAuthenticated, signOut } from '@/lib/auth';
import { useRouter } from 'next/navigation';

/**
 * Hook to protect admin routes
 */
export function useAuthGuard() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        // Check Supabase Auth first
        const authenticated = await isAuthenticated();
        
        if (authenticated) {
          setIsAuthorized(true);
          setIsLoading(false);
          return;
        }

        // Fallback: Check demo token
        const demoToken = localStorage.getItem('adminToken');
        if (demoToken === 'demo-token') {
          setIsAuthorized(true);
          setIsLoading(false);
          return;
        }

        // Not authenticated
        router.replace('/admin');
      } catch (error) {
        console.error('Auth check failed:', error);
        
        // Fallback: Check demo token on error
        const demoToken = localStorage.getItem('adminToken');
        if (demoToken === 'demo-token') {
          setIsAuthorized(true);
          setIsLoading(false);
          return;
        }
        
        router.replace('/admin');
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();
  }, [router]);

  return { isLoading, isAuthorized };
}

/**
 * Hook to handle logout
 */
export function useLogout() {
  const router = useRouter();

  const logout = async () => {
    try {
      await signOut();
      router.push('/admin');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return logout;
}
