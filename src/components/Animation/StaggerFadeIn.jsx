// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const StaggerFadeIn = ({
  children,
  x,
  y,
  scale = 0.9,
  delay = 0.3,
  duration = 0.7,
  index = 0,
}) => {
  const variants = {
    hidden: { opacity: 0, x, y, scale },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        delay: i * delay, // stagger effect
        duration,
        ease: "easeOut",
      },
    }),
  };
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.3, once: true }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default StaggerFadeIn;
