export const slideUpVariants = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export const fadeInVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
}

export const slideDownVariants = {
  hidden: {
    y: -100,
    opacity: 0,
  },

  visible: {
    y: 0,
    opacity: 1,
  },
};

export const slideLeftVariants = {
  hidden: {
    x: 100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
  },
};

export const slideRightVariants = {
  hidden: {
    x: -100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
  },
};

export const scaleUpVariants = {
  hidden: {
    scale: 0.5,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
  },
};

export const rotateVariants = {
  hidden: {
    rotate: 0,
  },
  visible: {
    rotate: 360,
  },
};

export const staggerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.2,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};
