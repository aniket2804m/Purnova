import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({ isLoading }: { isLoading: boolean }) => (
  <AnimatePresence>
    {isLoading && (
      <motion.div
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 z-[100] bg-white flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.2, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            className="text-xl md:text-3xl lg:text-5xl font-display font-black mb-4 flex gap-2.5 justify-center items-center"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 bg-clip-text text-transparent">
              Purnova
            </span>{" "}
            <span className="text-black">
              Digital Marketing
            </span>
          </motion.div>
          
          {/* Transparent grey progress bar track with yellow-golden fill */}
          <div className="w-48 h-0.5 bg-neutral-800/10 rounded-full overflow-hidden mx-auto">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default LoadingScreen;
