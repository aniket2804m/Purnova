import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const TilesComponent = ({
  className = "",
  rows: r = 40,
  cols: c = 10,
}) => {
  const totalTiles = r * c;

  return (
    <div
      className={cn(
        "grid justify-center content-center border-t border-l border-white/[0.15]",
        className
      )}
      style={{
        gridTemplateColumns: `repeat(${c}, 40px)`,
        gridTemplateRows: `repeat(${r}, 40px)`,
      }}
    >
      {Array.from({ length: totalTiles }).map((_, index) => {
        const row = Math.floor(index / c);
        const col = index % c;
        const isEven = (row + col) % 2 === 0;

        return (
          <motion.div
            key={index}
            initial={{ backgroundColor: "transparent" }}
            whileHover={{
              backgroundColor: isEven ? "#C9A84C" : "rgba(201, 168, 76, 0.3)",
              transition: { duration: 0 },
            }}
            transition={{ duration: 0.5 }}
            className="w-10 h-10 border-r border-b border-white/[0.15]"
          />
        );
      })}
    </div>
  );
};

export const Tiles = React.memo(TilesComponent);