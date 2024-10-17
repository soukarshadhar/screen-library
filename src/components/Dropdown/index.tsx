import React, { useState, useRef, useEffect } from "react";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/dropdown.scss";

export type DropdownOption = {
  value: string;
  label: string;
};

type DropdownProps = {
  options: DropdownOption[];
  label: string;
  value?: string;
  canCloseDropdown?: boolean;
  renderRow?: (option: DropdownOption) => React.ReactNode;
  onSelect: (option: string) => void;
};

const Dropdown = ({
  options,
  label,
  value,
  canCloseDropdown = true,
  renderRow,
  onSelect,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const dropdownWidth = useRef(0);

  const handleOnDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const { width } = (containerRef.current as any).getBoundingClientRect();
    dropdownWidth.current = width;
  }, [isOpen]);

  const handleOnRowClick = (ev: React.MouseEvent<HTMLUListElement>) => {
    onSelect((ev.target as any).id);
    if (canCloseDropdown) handleOnDropdownClick();
  };

  const renderSelectedOption = () => {
    if (value) {
      const selectedOption = options.find(
        (option) => option.value === value
      ) as DropdownOption;

      return <b>{selectedOption.label}</b>;
    }
    return null;
  };

  return (
    <div className="dropdown" ref={containerRef}>
      <div
        className={`text${isOpen ? "" : " border-bottom"}`}
        onClick={handleOnDropdownClick}
      >
        <span>
          {`${label}${value ? " : " : ""}`}
          {renderSelectedOption()}
        </span>
        <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
      </div>
      {isOpen && (
        <ul
          style={{ width: `${dropdownWidth.current}px` }}
          onClick={handleOnRowClick}
        >
          {options.map((option) => (
            <li key={option.value} id={option.value}>
              {renderRow ? renderRow(option) : option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;