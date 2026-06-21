import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({ isLoading }: { isLoading: boolean }) => (
  <AnimatePresence>
    {isLoading && (
      <motion.div
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.2, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            className="text-5xl font-display font-bold gradient-text mb-4"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Purnova Digital Marketing
          </motion.div>
          <div className="w-48 h-0.5 bg-muted rounded-full overflow-hidden mx-auto">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default LoadingScreen;
