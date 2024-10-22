import Image from 'next/image';
import introImage from '@/assets/images/finger.png';
import Paragraph from '@/components/text/Paragraph';

const Intro = () => {
  return (
    <div className='bg-lightestGray px-5 py-8 rounded-xl space-y-6'>
      <Image src={introImage} alt='how to use app' className='w-3/5 mx-auto' />
      <Paragraph className='text-center'>{`Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We're here to help you share your profiles with everyone!`}</Paragraph>
    </div>
  );
};

export default Intro;
