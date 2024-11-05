'use client';
import Loading from '@/components/Loading';
import PreviewHeader from '@/components/preview/PreviewHeader';
import Heading from '@/components/text/Heading';
import Paragraph from '@/components/text/Paragraph';
import { useAuthContext } from '@/context/AuthContext';
import useProtectedRoute from '@/custom-hooks/useProtectedRoute';

const Home = () => {
  const { loading } = useAuthContext();
  useProtectedRoute(false);

  return (
    <div className='grid place-content-center h-screen w-full space-y-4'>
      <PreviewHeader />

      <div className='relative grid place-content-center border'>
        <Heading variant='h1' className='text-white lg:text-8xl text-center'>
          Link Sharer
        </Heading>
        <Paragraph className='text-white text-center w-fit'>
          Create and share your links.
        </Paragraph>
      </div>
    </div>
  );
};

export default Home;
