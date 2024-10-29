// UserProfileAndLinks.tsx
'use client';
import MockPreviewCard from '@/components/mockup-preview/MockPreviewCard';
import Heading from '@/components/text/Heading';
import Paragraph from '@/components/text/Paragraph';
import { getUserPublicDetails } from '@/services/firestoreService';
import { LinkType, ProfileDetails } from '@/types/types';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import PublicPreviewHeader from '@/components/preview/PublicPreviewHeader';

interface PublicProfileData {
  profileInfo: ProfileDetails;
  links: LinkType[];
}

const UserProfileAndLinks = () => {
  const [profileData, setProfileData] = useState<PublicProfileData | null>(
    null
  );
  // const [originalUID, setOriginalUID] = useState<string | null>(null);
  const params = useParams();

  const hashedUID = params.id;

  useEffect(() => {
    const fetchProfileAndLinks = async () => {
      if (hashedUID) {
        try {
          const originalUIDData = await getUserPublicDetails(hashedUID);
          if (originalUIDData) {
            const { profileInfo, links } = originalUIDData;

            setProfileData({ links: links, profileInfo: profileInfo });
          }
        } catch (error) {
          console.error('Error fetching profile and links:', error);
        }
      }
    };

    fetchProfileAndLinks();
  }, [hashedUID]);

  // const { profilePicture, email, links } = profileData || {};
  const { profileInfo, links } = profileData || {};
  const { profilePicture, email, firstName, lastName } = profileInfo || {};
  const name = `${firstName ?? ''} ${lastName ?? ''}`;

  if (!profileData) {
    return (
      <div className='h-screen max-w-[1900px] mx-auto w-full grid place-content-center'>
        <PublicPreviewHeader />
        <Loading />
      </div>
    );
  }

  return (
    <div className='p-4 space-y-16 md:pb-80 md:bg-transparent bg-white'>
      {/* Top section */}
      <PublicPreviewHeader />

      {/* Bottom section */}
      <div className='space-y-8 relative md:translate-y-20 md:min-h-[500px] md:p-12 md:shadow-2xl md:bg-white md:rounded-[24px] md:w-fit md:mx-auto'>
        {/* Profile image */}
        <div
          className='w-28 border-4 border-blue aspect-square bg-lighterGray/50 bg-center bg-cover rounded-full mx-auto bg-blend-multiply'
          style={{
            backgroundImage: `url(${profilePicture})`,
          }}></div>

        {/* Name and email */}
        <div className='space-y-4'>
          {name ? (
            <Heading variant='h1' className='text-center text-base lg:text-lg capitalize'>
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

        {/* Links */}
        {links && links.length > 0 ? (
          <div className='space-y-2 w-[237px] mx-auto'>
            {links.map((link, index) => (
              <MockPreviewCard key={index} link={link} />
            ))}
          </div>
        ) : (
          <div className='space-y-2 pt-10'>
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className='w-[237px] p-5 bg-lighterGray'></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfileAndLinks;
