import React, { ReactNode } from "react";
import ReactModal from "react-modal";

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Modal"
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 p-6 max-w-md mx-auto rounded-md shadow-md"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="mb-5">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
      <div className="text-center">{children}</div>
      <div className="mt-5 text-center">
        <button
          className="px-4 py-2 bg-red-400 text-white rounded-md hover:bg-gray-700 focus:outline-none"
          onClick={onClose}
        >
          Затвори
        </button>
      </div>
    </ReactModal>
  );
};

export default ErrorModal;
