'use client';
import Button from '@/components/Button';
import Heading from '@/components/text/Heading';
import Paragraph from '@/components/text/Paragraph';
import React, { useEffect, useState } from 'react';
import Intro from '../../components/dashboard/links/Intro';
import LinkCard from '@/components/dashboard/links/linkcard/LinkCard';
import { LinkType } from '@/types/types';


const dashboard = () => {
  const [links, setLinks] = useState<LinkType[]>([]);

  console.log(links.length);

  const generateRandomNumber = () => {
    return Math.random() * 10000;
  };

  useEffect(() => {
    console.log(links);
  }, [links]);

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

  return (
    <div className='bg-white p-6 pb-20 space-y-6'>
      <div className='space-y-9'>
        <div className='space-y-3'>
          <Heading variant='h1'>Customize your links</Heading>
          <Paragraph>
            Add/edit/remove links below and then share all your profiles with
            the world!
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
  );
};

export default dashboard;
