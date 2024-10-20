import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export type ChipProps = {
  label: string;
  onClick: () => void;
};

const Chip = ({ label, onClick }: ChipProps) => {
  return (
    <span className="chip">
      {label}
      <FontAwesomeIcon className="x-mark" icon={faXmark} onClick={onClick} />
    </span>
  );
};

export default Chip;
