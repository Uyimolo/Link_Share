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
import { useLinks } from '@/custom-hooks/useLinks';
import { useAuthContext } from '@/context/AuthContext';

const Dashboard = () => {
  const { links, setLinks, linksFromDb, saveLinks } = useLinks();
  const { user } = useAuthContext();

  const handleAddNewLink = () => {
    const uniqueId = `${Math.floor(Date.now() + Math.random() * 10000)}`;
    const newLink = { id: uniqueId, url: '', title: '' };
    setLinks([...links, newLink]);
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
    const filteredLinks = links.filter((link) => link.url && link.title);
    if (filteredLinks.length === links.length) {
      saveLinks(filteredLinks);
    } else {
      alert('Please fill all fields or remove incomplete links');
    }
  };

  useConfirmPageLeave(links !== linksFromDb);

  if (!user) {
    return (
      <div className='h-[80vh] w-full grid place-content-center'>
        <Loading />;
      </div>
    );
  }

  return (
    <div className='lg:space-y-0 gap-4 lg:grid lg:grid-cols-[40%,1fr]'>
      <div className='bg-white hidden lg:block rounded-t-xl py-10 2xl:py-20'>
        <MockupPreview />
      </div>

      <div className=''>
        <div className='space-y-6 bg-white  p-6 md:p-10 rounded-t-xl'>
          <Heading variant='h1'>Customize your links</Heading>
          <Paragraph>
            Add/edit/remove links below and then share with the world!
          </Paragraph>

          <Button variant='secondary' onClick={handleAddNewLink}>
            + Add new link
          </Button>

          {links.length > 0 ? (
            <div className='space-y-6'>
              {links.map((link, index) => (
                <LinkCard
                  index={index}
                  key={link.id}
                  link={link}
                  updateLink={handleLinkUpdate}
                  deleteLink={() => handleRemoveLink(link.id)}
                />
              ))}
            </div>
          ) : (
            <Intro />
          )}
        </div>
        <div className='p-6 mt-1 flex bg-white w-full sticky bottom-0 rounded-b-xl md:px-10'>
          <Button className='md:w-fit mr-0 ml-auto' onClick={handleSaveLinks}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
