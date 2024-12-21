import { motion } from "motion/react";
import {
  scaleUpVariants,
  slideLeftVariants,
  slideRightVariants,
  slideUpVariants,
  rotateVariants,
  fadeInVariants,
  slideDownVariants,
} from "@/utilities/revealVariantsData";
import { RevealProps } from "@/types/types";
const StaggeredReveal = ({
  children,
  className,
  variants,
  once = true,
}: RevealProps) => {
  let revealVariants;

  switch (variants) {
    case "slide up":
      revealVariants = slideUpVariants;
      break;
    case "slide right":
      revealVariants = slideRightVariants;
      break;
    case "slide left":
      revealVariants = slideLeftVariants;
      break;
    case "scale up":
      revealVariants = scaleUpVariants;
      break;
    case "rotate":
      revealVariants = rotateVariants;
      break;
    case "slide down":
      revealVariants = slideDownVariants;
    case "fade in":
      revealVariants = fadeInVariants;
      break;
    default:
      revealVariants = slideLeftVariants;
  }

  return (
    <motion.div
      className={className}
      variants={revealVariants}
      transition={{ duration: 0.5 }}
      viewport={{ amount: 0.2, once: once }}
    >
      {children}
    </motion.div>
  );
};

export default StaggeredReveal;
