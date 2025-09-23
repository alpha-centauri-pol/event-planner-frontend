"use client";

import React, { useEffect } from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, className }) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/60"
                onClick={onClose}
            ></div>

            <div
                className={`relative w-full max-w-lg rounded-2xl bg-[#1D1C2C] bg-opacity-20 border-2 border-[#5D59AD] p-6 shadow-xl ${className}`}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold cursor-pointer"
                >
                    ×
                </button>

                {children}
            </div>
        </div>
    );
};

export default Modal;
