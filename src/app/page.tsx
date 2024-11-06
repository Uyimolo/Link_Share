'use client';
import Button from '@/components/Button';
import Heading from '@/components/text/Heading';
import Paragraph from '@/components/text/Paragraph';
import useProtectedRoute from '@/custom-hooks/useProtectedRoute';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import previewScreenshot from '@/assets/images/preview-screenshot.png';
import logo from '@/assets/images/logo.svg';
import Logo from '@/components/brand/Logo';

const Home = () => {
  useProtectedRoute(false);
  const router = useRouter();

  return (
    <div className='w-full'>
      <div className='flex justify-between bg-white fixed left-1/2 -translate-x-1/2 w-[calc(100%-32px)] items-center top-4 z-10 p-4 rounded-xl'>
        <div className='hidden md:block'>
          <Logo showFullLogo />
        </div>

        <div className='md:hidden'>
          <Logo />
        </div>

        <div className='flex space-x-4'>
          <Button
            variant='secondary'
            className='w-fit'
            onClick={() => router.push('/login')}>
            Login
          </Button>
          <Button
            variant='primary'
            className='w-fit hidden md:block'
            onClick={() => router.push('/register')}>
            Get started
          </Button>
        </div>
      </div>

      <div className='space-y-10 bg-blue p-4 md:px-12 lg:px-[5vw] py-32 lg:py-40 lg:space-y-0 md:grid md:items-center md:grid-cols-2'>
        <div className='space-y-4'>
          <Heading
            variant='h1'
            className='text-4xl text-white leading-none max-w-md md:max-w-none lg:text-6xl xl:text-7xl'>
            Effortlessly Share Your Story with One Link.
          </Heading>
          <Paragraph className='text-lightestGray w-fit max-w-sm md:max-w-xl lg:max-w-none  lg:text-lg xl:text-2xl leading-none'>
            {`Whether you're a content creator, business owner, or just someone who
          loves organization, easily manage and share all your important links
          from one place.`}
          </Paragraph>

          <Button
            variant='secondary'
            className='w-fit lg:translate-y-6'
            onClick={() => router.push('/login')}>
            Get started for free
          </Button>
        </div>

        <div className=''>
          <div className='w-40 mx-auto lg:mr-[5vw] ml-auto md:w-[50%] lg:max-w-[500px] relative'>
            <div className='border-4 backdrop-blur-sm w-[180%] left-1/2 -translate-x-1/2 grid items-center aspect-square rounded-full absolute top-1/2 -translate-y-1/2'></div>

            <div className='bg-lightBlue/50 backdrop-blur-[1px] w-[170%] left-1/2 -translate-x-1/2  aspect-square rounded-full absolute top-1/2 -translate-y-1/2'></div>

            <Image
              alt='Mockup of preview page'
              src={previewScreenshot}
              className='shadow-xl shadow-black/50 relative border rounded-xl'
            />

            <Image
              src={logo}
              alt='logo'
              className='w-16 opacity-60 lg:w-28 -left-6 -translate-y-1/2 absolute top-1/2 lg:-left-16'
            />
          </div>
        </div>
      </div>
      {/*  */}
    </div>
  );
};

export default Home;
