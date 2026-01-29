import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ isOpen, onClose, children, bg="bg-white" }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-sm md:max-w-2xl lg:max-w-5xl xl:max-w-7xl rounded-2xl lg:p-10 md:px-8 lg:px-20 shadow-lg ${bg}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-6 lg:right-3 top-5 md:top-8 lg:top-3 text-white hover:text-gray-800"
        >
          ✕
        </button>

        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;