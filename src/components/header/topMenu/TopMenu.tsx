import { useActiveSessions } from "@/components/hooks/useActiveSessions";
import { AnimatePresence, motion } from "framer-motion";
import { memo, useMemo } from "react";

export const TopMenu = memo(() => {
  const count = useActiveSessions();

  const animatedCount = useMemo(
    () => (
      <AnimatePresence mode="wait">
        <motion.span
          key={count}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
          transition={{ duration: 0.3, type: "spring" }}
          style={{
            fontWeight: "bold",
            color: count > 0 ? "#28a745" : "#dc3545",
            marginLeft: "5px",
          }}
        >
          {count}
        </motion.span>
      </AnimatePresence>
    ),
    [count]
  );

  return (
    <div>
      <div
        style={{
          cursor: "pointer",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
          borderRadius: "8px",
          display: "flex",
          gap: "20px",
          background: "#ededed",
          border: "solid 1px #000",
          padding: "10px",
        }}
      >
        <span style={{ fontSize: "15px" }}>
          Active sessions:{animatedCount}
        </span>
      </div>
    </div>
  );
});
