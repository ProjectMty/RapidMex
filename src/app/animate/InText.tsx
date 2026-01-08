import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import type { ReactNode } from "react";


interface InProps {
    lines?: ReactNode[];
    delay?: number;
    lineDelay?: number;
}

export function LeftAnimation({ lines = [], delay = 0 }: InProps) {
    const ref = useRef(null);
    const controls = useAnimation();
    const isInView = useInView(ref, { amount: 0.3 });

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [isInView, controls]);

    const contenedor = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2,
                delayChildren: delay,
            },
        },
    };

    const lineVariant = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { type: "tween" as const, duration: 1.2 }
        },
    };

    return (
        <motion.div
            ref={ref}
            variants={contenedor}
            initial="hidden"
            animate={controls}
            viewport={{ once: false, amount: 0.3 }}
        >
            {lines.map((line, index) => (
                <motion.span
                    key={index}
                    variants={lineVariant}
                    className="block"
                >
                    {line}
                </motion.span>
            ))}

        </motion.div>
    )
}

export function DownAnimation({ lines = [], delay = 0, lineDelay = 0.3 }: InProps) {
    const ref = useRef(null);
    const controls = useAnimation();
    const isInView = useInView(ref, { amount: 0.3 });

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [isInView, controls]);

    const contenedor = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: lineDelay,
                delayChildren: delay,
            },
        },
    };

    const lineVariant = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { type: "tween" as const, duration: 1.2 }
        },
    };

    return (
        <motion.div
            ref={ref}
            variants={contenedor}
            initial="hidden"
            animate={controls}
            viewport={{ once: false, amount: 0.3 }}
        >
            {lines.map((line, index) => (
                <motion.span
                    key={index}
                    variants={lineVariant}
                    className="block"
                >
                    {line}
                </motion.span>
            ))}

        </motion.div>
    )
}