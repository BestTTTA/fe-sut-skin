import React from "react";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div
      className="fixed inset-0 h-full overflow-auto flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 h-[500px] overflow-scroll rounded-lg max-w-4xl w-full relative"
        onClick={(e) => e.stopPropagation()} 
      >
        <button
          onClick={onClose}
          className="text-black font-bold absolute top-4 right-4"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
