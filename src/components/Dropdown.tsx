import React, { useState } from "react";

interface Option {
  id: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  onSelect: (id: string) => void;
  placeholder: string;
  selectedOptionId?: string | null;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, placeholder, selectedOptionId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (id: string) => {
    onSelect(id);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring focus:ring-gray-200 focus:border-gray-300"
          onClick={handleToggle}
        >
          {options.find((option) => option.id === selectedOptionId)?.label || placeholder}
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right z-10 absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options.map((option) => (
              <div
                key={option.id}
                className={`block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100`}
                role="menuitem"
                onClick={() => handleSelect(option.id)}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
