import { motion } from "motion/react";

interface CountUpProps {
  className?: string;
  value: number;
}

export function CountUp({ className, value }: CountUpProps) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
    >
      {value}
    </motion.span>
  );
}
