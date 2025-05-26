import { motion, AnimatePresence } from "framer-motion";
import React from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    extraClass?: string
}

const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
};

const modal = {
    hidden: { opacity: 0, y: -50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -30, scale: 0.95 }
};

export default function Modal2({ isOpen, onClose, children, extraClass }: ModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-[#000000DF]  flex justify-center items-center z-50"
                    variants={backdrop}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={onClose}
                >
                    <motion.div
                        className={`bg-(--dark-600) rounded-lg shadow-lg p-6 max-w-[80vw] sm:w-[80vw] md:w-[40vw] ${extraClass}`}
                        variants={modal}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={(e) => e.stopPropagation()} // prevent backdrop click from closing modal
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3 text-gray-500 hover:text-black"
                        >
                            ✖
                        </button>
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
