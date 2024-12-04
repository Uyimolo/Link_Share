import React, { ReactNode, useState, MouseEvent, useEffect } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { AnimatePresence, motion } from "motion/react";

const animationVariants = {
  "fade": {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
};

const Modal = ({
  children,
  isOpen = false,
  onClose,
  closeModal,
  className,
  animationVariant = "fade",
}: {
  children: ReactNode;
  isOpen?: boolean; // Initial visibility state
  onClose?: () => void; // Optional callback to notify the parent about closure
  className?: string;
  animationVariant?: "fade";
  closeModal?: () => void;
}) => {
  const [visible, setVisible] = useState(isOpen);

  // Sync internal visibility state with `isOpen` prop
  useEffect(() => {
    setVisible(isOpen);
  }, [isOpen]);

  // const closeModal = () => {
  //   setVisible(false); // Trigger exit animation
  //   if (onClose) onClose(); // Notify parent if callback is provided
  // };

  const handleContentClick = (event: MouseEvent) => {
    event.stopPropagation(); // Prevent closing when clicking inside the modal content
  };

  const selectedVariant = animationVariants[animationVariant];

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          className="fixed left-0 top-0 z-50 grid h-screen w-screen place-content-center bg-black/70 py-10"
          key="modal-container"
          onClick={closeModal}
          variants={selectedVariant}
          initial={selectedVariant.initial}
          animate={selectedVariant.animate}
          exit={selectedVariant.exit}
          transition={{ duration: 0.5 }}
        >
          {closeModal && (
            <div
              className="group absolute right-6 top-5 z-10 flex cursor-pointer items-center gap-2"
              onClick={closeModal}
            >
              <FaTimesCircle className="text-2xl text-white group-hover:text-blue" />
            </div>
          )}

          <div
            className={`relative mx-auto w-[90%] overflow-y-auto md:w-full ${className}`}
            onClick={handleContentClick}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
