import { motion } from "motion/react";
import {
  scaleUpVariants,
  slideLeftVariants,
  slideRightVariants,
  slideUpVariants,
  rotateVariants,
  slideDownVariants,
} from "@/utilities/revealVariantsData";
import { RevealProps } from "@/types/types";
const StaggeredReveal = ({ children, className, variants }: RevealProps) => {
  let revealVariants;

  switch (variants) {
    case "slide up":
      revealVariants = slideUpVariants;
      break;
    case "slide down":
      revealVariants = slideDownVariants;
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
    default:
      revealVariants = slideLeftVariants;
  }

  return (
    <motion.div
      className={className}
      variants={revealVariants}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default StaggeredReveal;
