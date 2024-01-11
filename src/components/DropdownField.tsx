import React from "react";
import { useField } from "formik";
import Dropdown from "./Dropdown";

interface DropdownFieldProps {
  name: string;
  options: { id: string; label: string }[];
  placeholder: string;
}

const DropdownField: React.FC<DropdownFieldProps> = ({ name, options, placeholder }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <div>
      <Dropdown
        options={options}
        onSelect={(id) => helpers.setValue(id)}
        placeholder={placeholder}
        selectedOptionId={field.value}
      />
      {meta.touched && meta.error ? <div className="text-red-500 text-sm">{meta.error}</div> : null}
    </div>
  );
};

export default DropdownField;
