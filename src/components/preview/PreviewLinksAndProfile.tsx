import MockPreviewCard from '../mockup-preview/MockPreviewCard';
import PreviewHeader from './PreviewHeader';
import Loading from '../Loading';
import Heading from '@/components/text/Heading';
import Paragraph from '@/components/text/Paragraph';
import { LinkType, ProfileDetails } from '@/types/types';
import { RxAvatar } from 'react-icons/rx';
import cn from '@/utilities/cn';

type PreviewLinksAndProfileProps = {
  links: LinkType[] | undefined;
  loading: boolean;
  profileInfo: ProfileDetails | undefined;
};

const PreviewLinksAndProfile = ({
  links,
  loading,
  profileInfo,
}: PreviewLinksAndProfileProps) => {
  const { firstName, lastName, profilePicture, email } = profileInfo || {};
  const fullName = `${firstName || ''} ${lastName || ''}`;

  if (loading) {
    return (
      <div className='h-screen max-w-[1900px] mx-auto w-full p-4'>
        <PreviewHeader />
        <div className='self-center left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 justify-self-center z-60 absolute'>
          <Loading />
        </div>
      </div>
    );
  }
  return (
    <div className='p-4 space-y-16 md:pb-80 md:bg-transparent h-screen md:h-auto bg-white'>
      {/* top section */}

      <PreviewHeader />

      {/*  bottom section */}
      <div className='space-y-8 relative md:translate-y-40 md:min-h-[500px] md:p-12 md:shadow-2xl md:bg-white md:rounded-[24px] md:w-fit md:mx-auto'>
        {/* profile image */}
        <div
          className={cn(
            ' mx-auto w-28 aspect-square',
            profilePicture
              ? 'border-4 border-blue bg-center bg-cover  rounded-full'
              : 'grid place-content-center'
          )}
          style={{
            backgroundImage: profilePicture ? `url(${profilePicture})` : 'none',
          }}>
          {!profilePicture && (
            <RxAvatar className='text-gray rounded-full bg-lightestGray text-[110px]' />
          )}
        </div>

        {/* name and email */}
        <div className='space-y-4'>
          {/*  */}
          {fullName ? (
            <Heading
              variant='h1'
              className='text-center lg:text-2xl  capitalize'>
              {fullName}
            </Heading>
          ) : (
            <div className='rounded w-full h-3 bg-lighterGray'></div>
          )}
          {email ? (
            <Paragraph className='text-center'>{email}</Paragraph>
          ) : (
            <div className='rounded w-1/2 h-2 bg-lighterGray mx-auto'></div>
          )}
        </div>

        {/* links */}
        {links && links.length > 0 ? (
          <div className='space-y-2 w-[237px] mx-auto'>
            {links?.map((link, index) => (
              <MockPreviewCard key={index} link={link} />
            ))}
          </div>
        ) : (
          <div className='space-y-2 pt-10 w-[237px] mx-auto'>
            {[1, 2, 3, 4].map((placeholder, index) => (
              <div key={index} className='w-[237px] p-5 bg-lighterGray'></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewLinksAndProfile;
