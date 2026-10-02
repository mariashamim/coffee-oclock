'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

// Honour the OS "reduce motion" setting across every Framer animation.
export default function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
