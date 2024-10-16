import React from "react";
import Dropdown, { DropdownOption } from "../Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";

type MultiSelectDropdownProps = {
  options: DropdownOption[];
  label: string;
  value: string[];
  onSelect: (option: string) => void;
};

const MultiSelectDropdown = ({
  label,
  value,
  options,
  onSelect,
}: MultiSelectDropdownProps) => {
  const renderRow = (option: DropdownOption) => {
    const isSelected = value.includes(option.value);
    return (
      <>
        <FontAwesomeIcon
          className="checkbox"
          icon={isSelected ? faSquareCheck : faSquare}
        />
        {option.label}
      </>
    );
  };

  return (
    <Dropdown
      label={label}
      options={options}
      renderRow={renderRow}
      onSelect={onSelect}
      canCloseDropdown={false}
    />
  );
};

export default MultiSelectDropdown;
