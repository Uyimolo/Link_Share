'use client';
import Button from '@/components/Button';
import { useAuthContext } from '@/context/AuthContext';
import useProtectedRoute from '@/custom-hooks/useProtectedRoute';
import React from 'react';

const Profile = () => {
  useProtectedRoute(true);
  const { logout } = useAuthContext();
  return (
    <div>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default Profile;
