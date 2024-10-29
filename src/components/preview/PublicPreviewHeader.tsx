import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

const PreviewHeader = () => {
  const router = useRouter();

  return (
    <div className='md:h-[357px] lg:left-1/2 lg:-translate-x-1/2 max-w-[1900px] mx-auto md:absolute md:p-4 md:top-0 md:left-0 w-full md:bg-blue md:rounded-b-[32px] '>
      <div className='flex justify-between md:bg-white md:p-4 md:rounded-xl'>
        <Button
          variant='secondary'
          className='w-fit'
          onClick={() => router.push('/register')}>
          Create account
        </Button>
        <Button className='w-fit' onClick={() => router.push('/login')}>
          Sign in
        </Button>
      </div>
    </div>
  );
};

export default PreviewHeader;
