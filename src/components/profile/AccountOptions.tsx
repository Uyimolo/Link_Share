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
          NOTE: Deleting your account will erase all your data permanently.{' '}
          <br />
          Account deletion requires a recent login. So if it fails logout and
          login again before deleting account.
        </Paragraph>
      </div>
    </Modal>
  );
};

export default AccountOptions;
