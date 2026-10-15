import { motion } from "motion/react";
import type { ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  return <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}
