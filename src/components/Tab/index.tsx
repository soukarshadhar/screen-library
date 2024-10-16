import React from "react";

type TabProps = {
  label: string;
  isActive: boolean;
  onClick: (event: React.MouseEvent<HTMLHeadingElement>) => void;
};

const Tab = ({ label, isActive, onClick }: TabProps) => {
  return (
    <h2 className={`tab${isActive ? " active" : ""}`} onClick={onClick}>
      {label}
    </h2>
  );
};

export default Tab;
