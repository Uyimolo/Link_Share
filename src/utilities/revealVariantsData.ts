export const slideUpVariants = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "tween",
      ease: [0.4, 0, 0.2, 1],
      duration: 0.6,
    },
  },
};

export const fadeInVariants = {
  hidden: {
    opacity: 0,
    scale: 1,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "tween",
      ease: [0.4, 0, 0.2, 1],
      duration: 0.5,
    },
  },
};

export const slideDownVariants = {
  hidden: {
    y: -40,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "tween",
      ease: [0.4, 0, 0.2, 1],
      duration: 0.6,
    },
  },
};

export const slideLeftVariants = {
  hidden: {
    x: 40,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "tween",
      ease: [0.4, 0, 0.2, 1],
      duration: 0.6,
    },
  },
};

export const slideRightVariants = {
  hidden: {
    x: -40,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "tween",
      ease: [0.4, 0, 0.2, 1],
      duration: 0.6,
    },
  },
};

export const scaleUpVariants = {
  hidden: {
    scale: 0.9,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "tween",
      ease: [0.4, 0, 0.2, 1],
      duration: 0.6,
    },
  },
};

export const rotateVariants = {
  hidden: {
    rotate: -15,
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    rotate: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "tween",
      ease: [0.4, 0, 0.2, 1],
      duration: 0.7,
    },
  },
};

export const staggerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.2,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};
