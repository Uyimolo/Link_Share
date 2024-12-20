import React, { ReactNode, useState, MouseEvent, useEffect } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { AnimatePresence, motion } from "motion/react";
import cn from "@/utilities/cn";
import TooltipComponent from "./TooltipComponent";
import { ScrollArea } from "./ui/scroll-area";

const animationVariants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  scale: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
  },
  slideUp: {
    initial: { y: "100vh", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100vh", opacity: 0 },
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
  animationVariant?: "fade" | "scale" | "slideUp";
  closeModal?: () => void;
}) => {
  const [visible, setVisible] = useState(isOpen);

  // Sync internal visibility state with `isOpen` prop
  useEffect(() => {
    setVisible(isOpen);
  }, [isOpen]);

  const handleContentClick = (event: MouseEvent) => {
    event.stopPropagation(); // Prevent closing when clicking inside the modal content
  };

  const selectedVariant = animationVariants[animationVariant];

  const handleCloseModal = () => {
    if (onClose) onClose();
    setVisible(false);
    if (closeModal) closeModal(); //to call the parent's closeModal function if provided
  };

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          className="fixed left-0 top-0 z-20 grid h-screen w-screen place-content-center bg-black/70 py-10 dark:bg-black/80"
          key="modal-container"
          onClick={closeModal && handleCloseModal}
          variants={selectedVariant}
          initial={selectedVariant.initial}
          animate={selectedVariant.animate}
          exit={selectedVariant.exit}
          transition={{ duration: 0.5 }}
        >
          {closeModal && (
            <TooltipComponent
              className="group absolute right-3 top-4 z-40 cursor-pointer dark:hover:bg-lighterGray"
              onClick={closeModal}
              triggerChildren={
                <FaTimesCircle className="text-2xl text-white group-hover:text-black" />
              }
              content="Close modal"
            />
          )}

          <ScrollArea className="">
            <div
              className={cn(
                "relative mx-auto px-4 overflow-x-hidden md:w-full",
                className,
              )}
              onClick={handleContentClick}
            >
              {children}
            </div>
          </ScrollArea>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
