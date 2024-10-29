'use client';
import PreviewLinksAndProfile from '@/components/preview/PreviewLinksAndProfile';
import useProtectedRoute from '@/custom-hooks/useProtectedRoute';
import React from 'react';

const Preview = () => {
  useProtectedRoute(true);
  return (
    <>
      <PreviewLinksAndProfile />
    </>
  );
};

export default Preview;
