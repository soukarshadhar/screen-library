import React from "react";
import "../../styles/form-button.scss";

type FormButtonProps = {
  label: string;
  className?: string;
  type: "submit" | "button" | "reset";
};

const FormButton = ({ type, label, className }: FormButtonProps) => {
  return (
    <button
      type={type}
      className={`form-button${className ? " " + className : ""}`}
    >
      {label}
    </button>
  );
};

export default FormButton;
