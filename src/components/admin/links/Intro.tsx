import Image from 'next/image';
import introImage from '@/assets/images/finger.png';
import Paragraph from '@/components/text/Paragraph';
import Heading from '@/components/text/Heading';

// Component contains instructions on how to create, reorder, delete and edit links
const Intro = () => {
  return (
    <div className='bg-lightestGray dark:bg-darkGray px-5 py-8 rounded-xl space-y-6'>
      <Image
        priority
        src={introImage}
        width='200'
        alt='how to use app'
        className='w-3/5 mx-auto lg:w-2/5'
      />
      <Heading variant='h2' className='text-center'>{`Let's get you started`}</Heading>
      <Paragraph className='text-center max-w-lg mx-auto'>{`Use the “Add new link” button to get started. Once you have more than one link, you can drag to reorder and edit them. We're here to help you share your profiles with everyone!`}</Paragraph>
    </div>
  );
};

export default Intro;
