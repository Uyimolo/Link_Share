'use client';

import React, { useEffect, useState } from 'react';
import { auth, db } from '../../../config/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { LinkType } from '@/types/types';
import MockPreviewCard from './MockPreviewCard';

const MockupPreview = () => {
  const [links, setLinks] = useState<LinkType[]>([]);

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      console.log('user signed in');
      const userId = user.uid;
      const userDocRef = doc(db, 'users', userId);

      // Set up a Firestore listener
      const unsubscribe = onSnapshot(
        userDocRef,
        (docSnapshot) => {
          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            console.log(data.links);
            setLinks(data.links);
          } else {
            console.log('No such document!');
          }
        },
        (error) => {
          console.error('Error fetching document:', error);
        }
      );

      // Clean up the listener on component unmount
      return () => unsubscribe();
    } else {
      console.log('User not signed in');
    }
  }, []);

  return (
    <div className='aspect-[9/18] max-h-[700px] sticky top-20 h-[80vh] p-2  border rounded-[50px] border-gray mx-auto'>
      {/* Mockup screen */}
      <div className='border rounded-[40px] border-gray p-3 h-full space-y-4'>
        {/* camera notch */}
        <div className='w-4 bg-black aspect-square rounded-full border border-gray mx-auto'></div>

        {/* profile information */}
        <div className='w-3/4 mx-auto space-y-4'>
          {/* profile image */}
          <div className='w-20 aspect-square bg-lighterGray rounded-full mx-auto'></div>

          {/* name and email */}
          <div className='space-y-2'>
            <div className='rounded w-full h-3 bg-lighterGray'></div>
            <div className='rounded w-1/2 h-2 bg-lighterGray mx-auto'></div>
          </div>
        </div>

        {/* links */}
        {links.length > 0 ? (
          <div className='pt-10 space-y-2 '>
            {links.map((link, index) => (
              <MockPreviewCard key={index} link={link} />
            ))}
          </div>
        ) : (
          <div className='space-y-2 pt-10'>
            {[1, 2, 3, 4].map((placeholder, index) => (
              <div key={index} className='w-full p-5 bg-lighterGray'></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MockupPreview;
