// components/Modal.tsx

import React from "react";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose} // คลิกที่พื้นหลังเพื่อปิด Modal
    >
      <div
        className="bg-white p-6 rounded-lg max-w-4xl w-full relative"
        onClick={(e) => e.stopPropagation()} // หยุดการแพร่กระจายของเหตุการณ์คลิก
      >
        <button
          onClick={onClose}
          className="text-red-500 font-bold absolute top-4 right-4"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
