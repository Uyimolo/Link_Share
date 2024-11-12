import React from 'react';

import { useAuthContext } from '@/context/AuthContext';
import useProfileInfo from '@/custom-hooks/useProfileInfo';
import Modal from '@/components/Modal';
import Paragraph from '@/components/text/Paragraph';
import Button from '@/components/Button';

const AccountOptions = ({ closeModal }: { closeModal: () => void }) => {
  const { logout, handleAccountDeletion } = useAuthContext();
  const { profileInfo } = useProfileInfo();

  return (
    <Modal closeModal={closeModal}>
      <div className='p-4 w-fit bg-white max-w-xs lg:max-w-sm space-y-6 rounded-xl shadow-2xl shadow-black/50'>
        <Paragraph className='text-lg font-semibold text-red-600'>
          Account Options
        </Paragraph>

        <Button variant='danger' onClick={logout}>
          Logout
        </Button>

        <Button
          variant='danger'
          className='bg-red text-white'
          onClick={() => handleAccountDeletion(profileInfo)}>
          Delete Account
        </Button>

        <Paragraph className='text-sm text-gray-600'>
          <strong className='text-red'>Warning:</strong> Deleting your
          account will permanently remove all your data, and this action{' '}
          <strong className='text-red'>cannot be undone</strong>.
        </Paragraph>

        <Paragraph className='text-sm text-gray-600'>
          For security reasons, deleting your account requires a recent login.
          If the deletion fails, please log out and log back in, then try again.
        </Paragraph>
      </div>
    </Modal>
  );
};

export default AccountOptions;
