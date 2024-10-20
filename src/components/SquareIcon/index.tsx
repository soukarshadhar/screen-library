import React from "react";

const SquareIcon = ({
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
      data-icon="square"
      data-id={id}
    >
      <path
        data-id={id}
        fill="currentColor"
        d="M384 80c8.8 0 16 7.2 16 16l0 320c0 8.8-7.2 16-16 16L64 432c-8.8 0-16-7.2-16-16L48 96c0-8.8 7.2-16 16-16l320 0zM64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32z"
      ></path>
    </svg>
  );
};

export default SquareIcon;
