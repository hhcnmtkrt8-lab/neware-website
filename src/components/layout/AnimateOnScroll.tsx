"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  initial?: Parameters<typeof motion.div>[0]["initial"];
  animate?: Parameters<typeof motion.div>[0]["animate"];
  transition?: object;
  delay?: number;
}

export function AnimateOnScroll({
  children,
  className,
  initial,
  animate,
  transition = { duration: 0.6 },
  delay = 0,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={initial ?? { opacity: 0, y: 20 }}
      animate={animate ?? (isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 })}
      transition={{ ...transition, delay } as Parameters<typeof motion.div>[0]["transition"]}
      className={className}
    >
      {children}
    </motion.div>
  );
}
