import MockPreviewCard from './MockPreviewCard';
import { useLinks } from '@/custom-hooks/useLinks';

const MockupPreview = () => {
  const { links } = useLinks();

  return (
    <div className='aspect-[9/18] max-h-[700px] sticky top-20 h-[80vh] p-2  border rounded-[50px] border-gray mx-auto'>
      {/* Mockup screen */}
      <div className='border rounded-[40px] overflow-hidden border-gray p-3 h-full space-y-4'>
        {/* camera notch */}
        <div className='w-4 bg-black aspect-square rounded-full border border-gray mx-auto'></div>

        {/* profile information */}
        <div className='w-3/4 mx-auto space-y-4'>
          {/* profile image */}
          <div className='w-20 aspect-square bg-lighterGray rounded-full mx-auto'></div>

          {/* name and email */}
          <div className='space-y-2'>
            <div className='rounded w-full h-3 bg-lighterGray'></div>
            <div className='rounded w-1/2 h-2 bg-lighterGray mx-auto'></div>
          </div>
        </div>

        {/* links */}
        {links.length > 0 ? (
          <div className='pt-10 space-y-2 overflow-y-scroll scrollbar-none'>
            {links.map((link, index) => (
              <MockPreviewCard key={index} link={link} />
            ))}
          </div>
        ) : (
          <div className='space-y-2 pt-10'>
            {[1, 2, 3, 4].map((placeholder, index) => (
              <div key={index} className='w-full p-5 bg-lighterGray'></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MockupPreview;
