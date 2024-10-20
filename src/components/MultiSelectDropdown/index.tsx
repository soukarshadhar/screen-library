import React from "react";
import Dropdown, { DropdownOption } from "../Dropdown";
import SquareCheckIcon from "../SquareCheckIcon";
import SquareIcon from "../SquareIcon";

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
        {isSelected ? (
          <SquareCheckIcon className="checkbox" id={option.value} />
        ) : (
          <SquareIcon className="checkbox" id={option.value} />
        )}
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
