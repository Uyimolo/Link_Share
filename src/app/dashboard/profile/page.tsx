'use client';
import MockupPreview from '@/components/mockup-preview/MockupPreview';
import AccountOptions from '@/components/profile/AccountOptions';
import ProfileInfoForm from '@/components/profile/ProfileInfoForm';
import Heading from '@/components/text/Heading';
import Paragraph from '@/components/text/Paragraph';
import useProtectedRoute from '@/custom-hooks/useProtectedRoute';
import React, { useState } from 'react';

/**
 * Component: [Profile]
 * Description: [Handles all tasks associated with setting and updating profile information]
 */

const Profile = () => {
  useProtectedRoute(true);
  const [showAccountOptions, setShowAccountOptions] = useState<boolean>(false);

  return (
    <div className='lg:space-y-0 gap-4 lg:grid lg:grid-cols-[40%,1fr]'>
      {/* mockup preview of links and profile information*/}
      <div className='bg-white hidden lg:block rounded-t-xl py-10 2xl:py-20'>
        <MockupPreview />
      </div>

      {/* Profile information */}
      <div className='space-y-6 bg-white  p-6 md:p-10 rounded-t-xl'>
        <div className='space-y-2'>
          <Heading variant='h1'>Profile Details</Heading>
          <Paragraph>
            Add your details to create a personal touch to your profile
          </Paragraph>
        </div>
        {/* form for setting and viewing user information*/}
        <ProfileInfoForm setShowAccountOptions={setShowAccountOptions} />
      </div>
      {/*  */}
     {showAccountOptions && <AccountOptions closeModal={() => setShowAccountOptions(false)}/>}
    </div>
  );
};

export default Profile;
