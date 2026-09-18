import { motion } from 'framer-motion';

export default function Screen({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.04, y: -12 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`min-h-full w-full pb-28 ${className}`}
    >
      {children}
    </motion.div>
  );
}
