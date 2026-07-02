import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({ isLoading }: { isLoading: boolean }) => (
  <AnimatePresence>
    {isLoading && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[99999] bg-[#0A0A0A] flex items-center justify-center font-montserrat"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.05, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center"
        >
          <motion.div
            className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-cinzel font-bold mb-6 flex flex-col md:flex-row gap-2 md:gap-3.5 justify-center items-center select-none px-4"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-[#C9A84C] tracking-wider uppercase">
              Purnova
            </span>
            <span className="hidden md:inline text-[#C9A84C]/50 font-light">|</span>
            <span className="text-[#F5F0E8] tracking-widest font-light text-xs sm:text-sm md:text-lg lg:text-xl uppercase">
              Luxury Digital Marketing Agency
            </span>
          </motion.div>
          
          {/* Sharp Gold progress track */}
          <div className="w-56 h-[1.5px] bg-[#1A1A1A] rounded-none overflow-hidden mx-auto">
            <motion.div
              className="h-full bg-[#C9A84C] rounded-none"
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
