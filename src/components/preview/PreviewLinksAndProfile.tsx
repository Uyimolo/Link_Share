'use client';
import { useAuthContext } from '@/context/AuthContext';
import { useLinks } from '@/custom-hooks/useLinks';
import useProfileInfo from '@/custom-hooks/useProfileInfo';
import React from 'react';
import MockPreviewCard from '../mockup-preview/MockPreviewCard';
import PreviewHeader from './PreviewHeader';
import Loading from '../Loading';
import Heading from '@/components/text/Heading';
import Paragraph from '@/components/text/Paragraph';

const PreviewLinksAndProfile = () => {
  const { profileInfo } = useProfileInfo();
  const { loading } = useAuthContext();
  const { links } = useLinks();
  const { firstName, lastName, profilePicture, email } = profileInfo;
  const name = `${firstName} ${lastName}`;

  if (loading) {
    return (
      <div className='h-screen  w-full grid place-content-center'>
        <PreviewHeader />
        <Loading />
      </div>
    );
  }
  return (
    <div className='p-4 space-y-16 md:pb-80 md:bg-transparent bg-white'>
      {/* top section */}

      <PreviewHeader />

      {/*  bottom section */}
      <div className='space-y-8 relative md:translate-y-40 md:min-h-[500px] md:p-12 md:shadow-2xl md:bg-white md:rounded-[24px] md:w-fit md:mx-auto'>
        {/* profile image */}
        <div
          className='w-28 border-4 border-blue aspect-square bg-lighterGray/50 bg-center bg-cover rounded-full mx-auto bg-blend-multiply'
          style={{
            backgroundImage: `url(${profilePicture})`,
          }}></div>

        {/* name and email */}
        <div className='space-y-4'>
          {/*  */}
          {name ? (
            <Heading
              variant='h1'
              className='text-center lg:text-2xl  capitalize'>
              {name}
            </Heading>
          ) : (
            <div className='rounded w-full h-3 bg-lighterGray'></div>
          )}
          {email ? (
            <Paragraph className='text-center'>{email}</Paragraph>
          ) : (
            <div className='rounded w-1/2 h-2 bg-lighterGray mx-auto'></div>
          )}
        </div>

        {/* links */}
        {links.length > 0 ? (
          <div className='space-y-2 w-[237px] mx-auto'>
            {links.map((link, index) => (
              <MockPreviewCard key={index} link={link} />
            ))}
          </div>
        ) : (
          <div className='space-y-2 pt-10 w-[237px] mx-auto'>
            {[1, 2, 3, 4].map((placeholder, index) => (
              <div key={index} className='w-[237px] p-5 bg-lighterGray'></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewLinksAndProfile;
