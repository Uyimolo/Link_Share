import React, { ReactNode, MouseEvent } from "react";
import { FaTimesCircle } from "react-icons/fa";
import Reveal from "./animation/Reveal";
/**
 * A modal component for displaying content in a centered and fixed position on the screen.
 *
 * @param children - The content to be displayed inside the modal.
 * @param closeModal - A function to be called when the modal is to be closed.
 * @param className - An optional CSS class name to be applied to the modal content.
 *
 * @returns A React component representing the modal.
 */
const Modal = ({
  children,
  closeModal,
  className,
  animationVariant = "scale up",
}: {
  children: ReactNode;
  closeModal?: () => void;
  className?: string;
  animationVariant?:
    | "slide left"
    | "slide right"
    | "slide up"
    | "scale up"
    | "rotate"
    | "slide down";
}) => {
  // Function to stop event propagation when clicking inside the modal content
  const handleContentClick = (event: MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div
      className="fixed left-0 top-0 z-50 grid h-screen w-screen place-content-center bg-black/70 py-10"
      onClick={closeModal} // Trigger closeModal when the overlay is clicked
    >
      {/* Close modal button */}
      {closeModal && (
        <div
          className="group absolute right-6 top-5 z-10 flex cursor-pointer items-center gap-2"
          onClick={closeModal}
        >
          <FaTimesCircle className="text-2xl text-white group-hover:text-blue" />
        </div>
      )}

      {/* Modal content */}
      <Reveal variants={animationVariant} className="overflow-y-auto">
        <div
          className={`relative overflow-y-auto overflow-x-hidden ${className}`}
          onClick={handleContentClick} // Prevent closeModal from firing when clicking inside the modal
        >
          {children}
        </div>
      </Reveal>
    </div>
  );
};

export default Modal;
