import { MutableRefObject, useEffect, useRef, useState } from "react";

export const useHeightChangeObserver = (callback: () => void, allowObserving: boolean = true): [MutableRefObject<HTMLDivElement | null>, number] => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (allowObserving) {
      const element = ref.current;
      if (!element) return;

      const handleHeightChange = () => {
        const newHeight = element.offsetHeight;
        if (newHeight !== height) {
          setHeight(newHeight);
          callback();
        }
      };

      element.addEventListener("transitionend", handleHeightChange);

      const initialHeight = element.offsetHeight;
      setHeight(initialHeight);
      callback();

      return () => {
        element.removeEventListener("transitionend", handleHeightChange);
      };
    }
  }, [callback, height]);

  return [ref, height];
};

