import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { getHashedUID } from '@/services/firestoreService';
import { useAuthContext } from '@/context/AuthContext';

const PreviewHeader = () => {
  const router = useRouter();
  const { user } = useAuthContext();

  const handleShareLink = async () => {
    if (!user) {
      toast.error('You need to be logged in to share your profile.');
      return;
    }

    const hashedUID = await getHashedUID(user!.uid);

    // Define the user’s public profile URL based on hashed UID
    const shareUrl = `https://linksharer.vercel.app/u/${hashedUID}`;

    // Check if navigator.share is supported
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Check out my Profile!`,
          text: `Here's a link to my link collection.`,
          url: shareUrl,
        });
        toast.success('Profile shared successfully!');
      } catch (error) {
        console.error('Error sharing profile:', error);
        toast.error('Failed to share profile.');
      }
    } else {
      // Fallback in case Web Share API is unsupported
      toast.info(
        'Sharing is not supported on this browser. Copy the link below:'
      );
      navigator.clipboard.writeText(shareUrl);
      toast.success('Profile link copied to clipboard!');
    }
  };

  return (
    <div className='md:h-[357px] lg:left-1/2 lg:-translate-x-1/2 max-w-[1900px] mx-auto md:absolute md:p-4 md:top-0 md:left-0 w-full md:bg-blue md:rounded-b-[32px] '>
      {user ? (
        <div className='flex gap-4 justify-between md:bg-white md:p-4 md:rounded-xl'>
          <Button
            variant='secondary'
            className='md:w-fit max-w-48 md:max-w-none'
            onClick={() => router.push('/dashboard')}>
            Back to editor
          </Button>
          <Button className='md:w-fit max-w-48 md:max-w-none' onClick={handleShareLink}>
            Share link
          </Button>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default PreviewHeader;
