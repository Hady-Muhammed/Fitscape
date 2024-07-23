import React, { FC, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  animationName: keyof typeof animationVariants; // Specify that animationName must be a valid key of animationVariants
}

const animationVariants = {
  fadeInUp: {
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hidden: { opacity: 0, y: 50 },
  },
  slideInLeft: {
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hidden: { opacity: 0, x: -50 },
  },
  jackInTheBox: {
    visible: {
      opacity: 1,
      scale: 1,
      rotate: "0deg",
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hidden: { opacity: 0, scale: 0.1, rotate: "-30deg" },
  },
  fadeIn: {
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hidden: { opacity: 0 },
  },
  flipInX: {
    visible: {
      opacity: 1,
      rotateX: 0,
      transition: { duration: 0.75, ease: "easeOut" },
    },
    hidden: { opacity: 0, rotateX: -90 },
  },
  fadeInRight: {
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hidden: { opacity: 0, x: 50 },
  },
  rollIn: {
    visible: {
      opacity: 1,
      rotate: 0,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    hidden: {
      opacity: 0,
      rotate: -120,
      x: -100,
    },
  },
  bounceInLeft: {
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 120, damping: 10 },
    },
    hidden: {
      opacity: 0,
      x: -300,
    },
  },
  // Add more animation variants as needed
};

const ScrollReveal: FC<ScrollRevealProps> = ({ children, animationName }) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <div ref={ref}>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={animationVariants[animationName]}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollReveal;
