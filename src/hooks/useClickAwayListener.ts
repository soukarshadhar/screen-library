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

    if (ref.current === ev.target) {
      return;
    }

    let found = false;
    const nodes = (ref.current as any).childNodes as NodeList;

    const findTargetInNodeList = (nodeList: NodeList) => {
      for (let i = 0; i < nodeList.length; i++) {
        if (nodeList[i] === ev.target) {
          found = true;
          break;
        }
        const childs = nodeList[i].childNodes;
        if (childs.length > 0) findTargetInNodeList(childs);
      }
      return;
    };

    findTargetInNodeList(nodes);

    if (!found) handleOnClickAwayListener();
  };

  return ref;
};

export default useClickAwayListener;
