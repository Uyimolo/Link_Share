import React, { ReactNode, MouseEvent } from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import Paragraph from './text/Paragraph';

const Modal = ({
  children,
  closeModal,
  className,
}: {
  children: ReactNode;
  closeModal: () => void;
  className?: string;
}) => {
  // Function to stop event propagation when clicking inside the modal content
  const handleContentClick = (event: MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div
      className='h-screen fixed top-0 z-20 left-0 w-screen grid place-content-center bg-lighterGray/40 backdrop-blur-sm'
      onClick={closeModal} // Trigger closeModal when the overlay is clicked
    >
      {/* Close modal button */}
      <div
        className='flex gap-2 items-center cursor-pointer absolute top-20 left-1/2 -translate-x-1/2'
        onClick={closeModal}>
        <FaTimesCircle className='text-xl' />
        <Paragraph>Close</Paragraph>
      </div>

      {/* Modal content */}
      <div
        className={`relative ${className}`}
        onClick={handleContentClick} // Prevent closeModal from firing when clicking inside the modal
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
