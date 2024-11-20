import React, { ReactNode, MouseEvent } from "react";
import { FaTimesCircle } from "react-icons/fa";
import Paragraph from "./text/Paragraph";

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
      className="fixed left-0 py-10 top-0 z-30 grid h-screen w-screen place-content-center bg-lighterGray/40 backdrop-blur-sm"
      onClick={closeModal} // Trigger closeModal when the overlay is clicked
    >
      {/* Close modal button */}
      <div
        className="group absolute z-10 right-6 top-5 flex cursor-pointer items-center gap-2"
        onClick={closeModal}
      >
        <FaTimesCircle className="text-xl group-hover:text-red" />
        <Paragraph className="group-hover:text-red">Close</Paragraph>
      </div>

      {/* Modal content */}
      <div
        className={`relative h-[90vh] overflow-y-scroll overflow-x-hidden ${className}`}
        onClick={handleContentClick} // Prevent closeModal from firing when clicking inside the modal
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
