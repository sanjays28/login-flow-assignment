import { motion } from 'framer-motion';

interface AuthStepTransitionProps {
  stepKey: number;
  children: React.ReactNode;
}

export function AuthStepTransition({ stepKey, children }: AuthStepTransitionProps) {
  return (
    <motion.div
      key={stepKey}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex min-h-0 flex-1 flex-col"
    >
      {children}
    </motion.div>
  );
}
