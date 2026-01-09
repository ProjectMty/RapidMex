import { motion } from "framer-motion";
import React from "react";

interface ZoomProps {
    children?: React.ReactNode;
    scale?: number;
}

interface MoveProps {
    children?: React.ReactNode;
    move?: number;
}
export const ZoomAnimate: React.FC<ZoomProps> = ({ children, scale }) => {
    return (
        <motion.div
            whileHover={{ scale }}
            transition={{ type: "spring", stiffness: 100, damping: 25 }}>
            {children}
        </motion.div >
    )
}

export const UpAnimate: React.FC<MoveProps> = ({ children, move }) => {
    return (
        <motion.div
            whileHover={{ y: move }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}>
            {children}
        </motion.div>
    )


 }