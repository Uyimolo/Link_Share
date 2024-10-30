import React, { ReactNode } from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import Paragraph from './text/Paragraph';

const Modal = ({
  children,
  closeModal,
}: {
  children: ReactNode;
  closeModal: () => void;
}) => {
  return (
    <div className='h-screen fixed top-0 left-0 w-screen grid place-content-center bg-lighterGray/40 backdrop-blur-sm'>
      {/* close modal */}
      <div
        className='flex gap-2 items-center cursor-pointer absolute top-20 left-1/2 -translate-x-1/2'
        onClick={closeModal}>
        <FaTimesCircle className='text-xl' />
        <Paragraph>Close</Paragraph>
      </div>
      {children}
    </div>
  );
};

export default Modal;
