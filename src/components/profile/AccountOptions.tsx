import React from 'react';
import Button from '../Button';
import Modal from '../Modal';
import Paragraph from '../text/Paragraph';
import { useAuthContext } from '@/context/AuthContext';
import useProfileInfo from '@/custom-hooks/useProfileInfo';

const AccountOptions = ({ closeModal }: { closeModal: () => void }) => {
  const { logout, handleAccountDeletion } = useAuthContext();
  const { profileInfo } = useProfileInfo();
  return (
    <Modal closeModal={closeModal}>
      <div className='p-4 w-fit bg-white max-w-xs lg:max-w-sm space-y-6 rounded-xl shadow-2xl shadow-black/50'>
        <Button variant='danger' onClick={logout}>
          Logout
        </Button>
        <Button
          variant='danger'
          className='bg-red text-white'
          onClick={() => handleAccountDeletion(profileInfo)}>
          Delete account
        </Button>
        <Paragraph>
          Note: Deleting your account will permanently erase all associated data
          and cannot be undone. <br /> <br /> For security reasons, account
          deletion requires a recent login. If the deletion fails, please log
          out and log back in before attempting to delete your account again.
        </Paragraph>
      </div>
    </Modal>
  );
};

export default AccountOptions;
