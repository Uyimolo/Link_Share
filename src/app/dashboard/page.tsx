'use client';
import Button from '@/components/Button';
import Heading from '@/components/text/Heading';
import Paragraph from '@/components/text/Paragraph';
import { LinkType } from '@/types/types';
import useConfirmPageLeave from '@/custom-hooks/useConfirmPageLeave';
import MockupPreview from '@/components/mockup-preview/MockupPreview';
import Intro from '@/components/dashboard/links/Intro';
import Loading from '@/components/Loading';
import LinkCard from '@/components/dashboard/links/linkcard/LinkCard';
import { areLinksEqual, useLinks } from '@/custom-hooks/useLinks';
import { useAuthContext } from '@/context/AuthContext';
import { toast } from 'sonner';
import { useRef } from 'react';

/**
 * Component: [Dashboard]
 * Description: [This component handles all links related processes (addition, updating, deleting and saving to db)]
 */

const Dashboard = () => {
  const { links, setLinks, linksFromDb, saveLinks, loading } = useLinks();
  const { user } = useAuthContext();
  const containerRef = useRef<HTMLDivElement>(null);

  // Ask for user confirmation before reloading or leaving page if there are unsaved changes.
  useConfirmPageLeave(links !== linksFromDb);

  const handleAddNewLink = () => {
    const uniqueId = `${Math.floor(Date.now() + Math.random() * 10000)}`;
    const newLink = { id: uniqueId, url: '', title: '' };
    setLinks([...links, newLink]);

    // scroll down to the new link added
    setTimeout(() => {
      if (containerRef.current) {
        window.scrollTo({
          top: containerRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }, 100);
  };

  const handleLinkUpdate = (updatedLink: LinkType) => {
    const updatedLinks = links.map((link) =>
      link.id === updatedLink.id ? updatedLink : link
    );
    setLinks(updatedLinks);
  };

  const handleRemoveLink = (linkId: string) => {
    const updatedLinks = links.filter((link) => link.id !== linkId);
    setLinks(updatedLinks);
  };

  const handleSaveLinks = () => {
    const validLinks = links.filter((link) => link.url && link.title);
    if (validLinks.length === links.length) {
      saveLinks(validLinks);
    } else {
      toast.warning('Please fill in all fields or remove incomplete links');
    }
  };

  if (!user || loading) {
    return (
      <div className='h-[80vh] w-full grid lg:space-y-0 gap-4 lg:grid lg:grid-cols-[40%,1fr] '>
        <div className='bg-white hidden lg:block rounded-t-xl py-10 2xl:py-20'>
          <MockupPreview />
        </div>
        <div className='grid bg-white rounded-t-xl place-content-center'>
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div
      className='lg:space-y-0 gap-4 lg:grid lg:grid-cols-[40%,1fr]'
      ref={containerRef}>
      <div className='bg-white hidden lg:block rounded-t-xl py-10 2xl:py-20'>
        <MockupPreview />
      </div>

      <div className=''>
        <div className=' bg-white  p-6 md:p-10 rounded-t-xl'>
          <div className='space-y-2'>
            <Heading variant='h1'>Customize your links</Heading>
            <Paragraph>
              Add/edit/remove links below and then share with the world!
            </Paragraph>
          </div>

          <div className='py-6 bg-white sticky top-0 z-20'>
            <Button variant='secondary' className='' onClick={handleAddNewLink}>
              + Add new link
            </Button>
          </div>

          {/* links */}
          {links.length > 0 ? (
            <div className='space-y-6'>
              {links.map((link, index) => (
                <LinkCard
                  index={index}
                  key={link.id}
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

        {/* save button */}
        <div className='p-6 mt-1 flex bg-white w-full sticky bottom-0 rounded-b-xl md:px-10'>
          <Button
            className='md:w-fit mr-0 ml-auto'
            disabled={areLinksEqual(links, linksFromDb)}
            onClick={handleSaveLinks}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
