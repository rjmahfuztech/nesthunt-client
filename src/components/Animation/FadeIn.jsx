// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const FadeIn = ({
  children,
  x = 0,
  y = 50,
  scale = 1,
  delay = 0,
  duration = 1.5,
}) => {
  const initial = {
    opacity: 0,
    ...(x !== 0 && { x }),
    ...(y !== 0 && { y }),
    ...(scale !== 1 && scale),
  };
  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ amount: 0.3, once: true }}
      transition={{ delay, duration, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
