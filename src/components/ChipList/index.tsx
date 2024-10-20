import React from "react";
import ChipComponent from "../Chip";
import "../../styles/chiplist.scss";

type ChipListProps = {
  chips: { label: string; id: string }[];
  onDelete: (chipId: string) => void;
};

const ChipList = ({ chips, onDelete }: ChipListProps) => {
  if (chips.length === 0) return null;

  return (
    <div className="chips">
      {chips.map((chip) => (
        <ChipComponent
          key={chip.id}
          label={chip.label}
          onClick={() => onDelete(chip.id)}
        />
      ))}
    </div>
  );
};

export default ChipList;
