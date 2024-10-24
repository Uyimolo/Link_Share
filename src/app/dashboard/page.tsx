'use client';
import Button from '@/components/Button';
import Heading from '@/components/text/Heading';
import Paragraph from '@/components/text/Paragraph';
import React, { useEffect, useState } from 'react';
import Intro from '../../components/dashboard/links/Intro';
import LinkCard from '@/components/dashboard/links/linkcard/LinkCard';
import { LinkType } from '@/types/types';
import { auth, db } from '../../../config/firebase';
import { doc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore';
import useConfirmPageLeave from '@/custom-hooks/useConfirmPageLeave';
import MockupPreview from '@/components/mockup-preview/MockupPreview';

const Dashboard = () => {
  const [links, setLinks] = useState<LinkType[]>([]);
  const [errorSavingLinksToDb, setErrorSavingLinksToDb] = useState('');
  const [linksFromDb, setLinksFromDb] = useState<LinkType[]>([]);

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
            setLinksFromDb(data.links || []); // Update state with the 'links' field
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

  const generateRandomNumber = () => {
    return Math.random() * 10000;
  };

  const handleAddNewLink = () => {
    const uniqueId = `${Math.floor(Date.now() + generateRandomNumber())}`;
    const newLink = {
      id: uniqueId,
      url: '',
      title: '',
    };

    setLinks([...links, newLink]);
  };

  const handleLinkUpdate = (updatedLink: LinkType) => {
    const updatedLinks = links.map((link) =>
      link.id === updatedLink.id ? updatedLink : link
    );

    setLinks(updatedLinks);
  };

  const handleRemoveLink = (updatedLink: LinkType) => {
    const updatedLinks = links.filter((link) => link.id !== updatedLink.id);

    setLinks(updatedLinks);
  };

  const saveToDb = async () => {
    const userId = auth.currentUser?.uid; // Assuming Firebase Auth is used
    if (userId) {
      const userDocRef = doc(db, 'users', userId);

      try {
        await setDoc(
          userDocRef,
          {
            links: links,
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );
        console.log('Links saved successfully');
      } catch (error) {
        console.error('Error saving links:', error);
      }
    } else {
      console.error('No user signed in');
    }
  };

  const areLinksEqual = (arr1: LinkType[], arr2: LinkType[]) => {
    if (arr1.length !== arr2.length) return false;

    // Sort both arrays by id to ensure the order is the same before comparison
    const sortedArr1 = [...arr1].sort((a, b) => a.id.localeCompare(b.id));
    const sortedArr2 = [...arr2].sort((a, b) => a.id.localeCompare(b.id));

    return sortedArr1.every((link1, index) => {
      const link2 = sortedArr2[index];
      return (
        link1.id === link2.id &&
        link1.url === link2.url &&
        link1.title === link2.title
      );
    });
  };

  const validLinks = links.filter((link) => link.url && link.title);

  const handleSaveLinks = () => {
    // Use deep comparison to check if the links have changed
    const isLinksChanged = !areLinksEqual(validLinks, linksFromDb);

    if (validLinks.length === links.length) {
      if (isLinksChanged) {
        saveToDb();
        alert('Saved to db');
      } else {
        alert('No changes detected');
      }
      setErrorSavingLinksToDb('');
    } else {
      console.error('Invalid links detected, please check and try again');
      setErrorSavingLinksToDb(
        'please make sure all links are filled correctly or remove incomplete links.'
      );
      alert(
        'please make sure all links are filled correctly or remove incomplete links.'
      );
    }
  };

  useConfirmPageLeave(!areLinksEqual(validLinks, linksFromDb));

  return (
    <div className='lg:space-y-0 gap-4 lg:grid lg:grid-cols-[40%,1fr]'>
      {/* mockup preview for large screens */}
      <div className='bg-white hidden lg:block rounded-t-xl py-10 2xl:py-20'>
        <MockupPreview />
      </div>

      <div className=''>
        <div className='space-y-6 bg-white  p-6 md:p-10 rounded-t-xl'>
          <div className='space-y-9'>
            <div className='space-y-3'>
              <Heading variant='h1'>Customize your links</Heading>
              <Paragraph>
                Add/edit/remove links below and then share all your profiles
                with the world!
              </Paragraph>
            </div>

            <Button variant='secondary' onClick={handleAddNewLink}>
              + Add new link
            </Button>
          </div>

          {links.length > 0 ? (
            <div className='space-y-6'>
              {links.map((link, index) => (
                <LinkCard
                  key={index}
                  index={index}
                  link={link}
                  updateLink={handleLinkUpdate}
                  deleteLink={handleRemoveLink}
                />
              ))}
            </div>
          ) : (
            <Intro />
          )}
        </div>
        <div className='p-6 mt-1 flex bg-white w-full sticky bottom-0 rounded-b-xl md:px-10'>
          <Button
            className='md:w-fit mr-0 ml-auto'
            // disabled={!areLinksEqual(validLinks, linksFromDb)}
            onClick={handleSaveLinks}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
