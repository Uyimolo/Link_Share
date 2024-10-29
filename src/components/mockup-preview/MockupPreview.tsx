import useProfileInfo from '@/custom-hooks/useProfileInfo';
import MockPreviewCard from './MockPreviewCard';
import { useLinks } from '@/custom-hooks/useLinks';
import Paragraph from '../text/Paragraph';

const MockupPreview = () => {
  const { links } = useLinks();
  const { profileInfo } = useProfileInfo();
  const { firstName, lastName, profilePicture, email } = profileInfo;
  const name = `${firstName} ${lastName}`;

  return (
    <div className='aspect-[9/18] max-h-[700px] bg-gradient-to-tr from-black to-black/70 sticky top-20 h-[80vh] p-1 rounded-[30px] mx-auto shadow-xl shadow-black/70'>
      {/* bezels */}
      <>
        <div className='absolute  shadow-lg shadow-black -right-1 rounded-r-md bg-black h-8 w-1 top-20'></div>
        <div className='absolute shadow-lg shadow-black -right-1 rounded-r-md bg-black h-8 w-1 top-[125px]'></div>

        <div className='absolute shadow-lg shadow-black -right-1 rounded-r-md bg-black h-8 w-1 top-[40%] -translate-y-1/2'></div>
      </>

      {/* Mockup screen */}
      <div className='border rounded-[25px] overflow-hidden bg-white border-gray p-3 h-full space-y-4'>
        {/* camera notch */}
        <div className='w-12 h-4 bg-black border-black rounded-full border mx-auto'></div>

        {/* profile information */}
        <div className='w-3/4 mx-auto space-y-4'>
          {/* profile image */}
          <div
            className='w-20 aspect-square bg-lighterGray/50 bg-center bg-cover rounded-full mx-auto bg-blend-multiply'
            style={{
              backgroundImage: `url(${profilePicture})`,
            }}></div>

          {/* name and email */}
          <div className='space-y-'>
            {/*  */}
            {name ? (
              <Paragraph className='text-center capitalize text-darkGray font-semibold'>
                {name}
              </Paragraph>
            ) : (
              <div className='rounded w-full h-3 bg-lighterGray'></div>
            )}
            {email ? (
              <Paragraph className='text-center'>{email}</Paragraph>
            ) : (
              <div className='rounded w-1/2 h-2 bg-lighterGray mx-auto'></div>
            )}
          </div>
        </div>

        {/* links */}
        <div className='pt-10'>
          {links.length > 0 ? (
            <div className='space-y-2 h-[40vh] max-h-[400px] overflow-y-scroll custom-scrollbar'>
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
    </div>
  );
};

export default MockupPreview;
