import React from "react";

const SquareCheckIcon = ({
  id,
  className = "",
}: {
  id: string;
  className: string;
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 448 512"
      data-icon="square-check"
      data-id={id}
    >
      <path
        data-id={id}
        fill="currentColor"
        d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
      ></path>
    </svg>
  );
};

export default SquareCheckIcon;