import { motion } from "motion/react";
import { ReactNode } from "react";
import { staggerVariants } from "@/utilities/revealVariantsData";
import cn from "@/utilities/cn";
const StaggeredRevealContainer = ({
  children,
  className,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  once?: boolean;
}) => {
  return (
    <motion.div
      variants={staggerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: once, amount: 0.2 }}
      className={cn("w-full", className)}
    >
      {children}
    </motion.div>
  );
};

export default StaggeredRevealContainer;
