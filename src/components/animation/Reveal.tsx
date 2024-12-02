import { motion } from "motion/react";
import {
  scaleUpVariants,
  slideLeftVariants,
  slideRightVariants,
  slideUpVariants,
  rotateVariants,
  fadeInVariants,
} from "@/utilities/revealVariantsData";
import { RevealProps } from "@/types/types";
const Reveal = ({
  children,
  className,
  variants,
  delay = 0.2,
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
      initial={"hidden"}
      whileInView="visible"
      transition={{ duration: 0.5, delay }}
      viewport={{ amount: 0.2, once: true }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
