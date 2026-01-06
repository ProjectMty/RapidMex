import { motion } from "framer-motion";
import React from "react";

interface ZoomProps {
    children?: React.ReactNode;
    scale?: number;
}

const ZoomAnimate: React.FC<ZoomProps> = ({ children, scale }) => {
    return (
        <motion.div
            whileHover={{ scale }}
            transition={{ type: "spring", stiffness: 100, damping: 25 }}>
            {children}
        </motion.div >
    )
}

export default ZoomAnimate;