import React from "react";
import { motion } from "framer-motion";
import { cn } from "./ui/cn";

const TilesComponent = ({
  className = "",
  rows: r = 30,
  cols: c = 20,
}) => {
  const rows = new Array(r).fill(1);
  const cols = new Array(c).fill(1);

  return (
    <div
      className={cn(
        "relative z-0 flex w-full h-full justify-center",
        className
      )}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row-${i}`}
          className="w-10 h-10 border-l border-neutral-200 relative"
        >
          {cols.map((_, j) => (
            <motion.div
              key={`col-${j}`}
              whileHover={{
                backgroundColor: "#f5c400",
                transition: { duration: 0 },
              }}
              className="w-10 h-10 border-r border-t border-neutral-200"
            />
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const Tiles = React.memo(TilesComponent);