import React from "react";
import "../../styles/form-input.scss";

type FormInputProps = {
  name: string;
  placeholder: string;
  className?: string;
  value: string;
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (ev: React.FocusEvent<HTMLInputElement>) => void;
};

const FormInput = ({
  name,
  placeholder,
  className,
  value,
  onChange,
  onBlur,
}: FormInputProps) => {
  return (
    <input
      name={name}
      className={`form-input${className ? " " + className : ""}`}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default FormInput;
