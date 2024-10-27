import { useEffect, useRef } from "react";

const useClickAwayListener = (handleOnClickAwayListener: () => void) => {
  const ref = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleOnClick);

    return () => {
      document.removeEventListener("click", handleOnClick);
    };
  }, []);

  const handleOnClick = (ev: MouseEvent) => {
    if (!ref.current) return;

    const insideContainerRef = ev.composedPath().includes(ref.current);

    if (!insideContainerRef) handleOnClickAwayListener();
  };

  return ref;
};

export default useClickAwayListener;
