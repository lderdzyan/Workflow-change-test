import { useEffect, useState } from "react";

import { ModalTypes } from "./IframeModal";

export default function useContentMaxHeight({ type, errors, down768 }: { type: ModalTypes; errors: string[] | undefined; down768: boolean }) {
  const [maxHeight, setMaxHeight] = useState<string>("");

  useEffect(() => {
    const updateHeight = () => {
      const titleBlock = document.getElementById("titleBlock");
      const actionsBlock = document.getElementById("actionsBlock");
      if (titleBlock && actionsBlock) {
        if (down768) {
          setMaxHeight(`${titleBlock.clientHeight + actionsBlock.clientHeight + 24}px`);
        } else {
          setMaxHeight(`${titleBlock.clientHeight + actionsBlock.clientHeight + 80}px`);
        }
      }
    };
    updateHeight();
  }, [type, errors]);

  return { maxHeight };
}

