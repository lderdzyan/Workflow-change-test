import { useLocation } from "react-router-dom";

import { NavigationStepperItem } from "./NavigationStepperItem";
import { ProgressBarContainer } from "./ProgressBarContainer";

export interface SectionItem {
  title: string;
  path: string;
}

export function NavigationStepper({ sections }: { sections: Array<SectionItem> }) {
  const { pathname } = useLocation();

  const checkPrev = (index: number) => {
    const selectedIndex = sections.findIndex((item) => {
      if (item.title === "Summary") {
        return pathname === item.path;
      } else {
        return pathname.includes(item.path);
      }
    });
    return index <= selectedIndex;
  };

  return (
    <ProgressBarContainer container>
      {sections.map((item, index) => {
        const isPrev = checkPrev(index);
        let isSelected = false;
        if (item.title === "Summary") {
          isSelected = pathname === item.path;
        } else {
          isSelected = pathname.includes(item.path);
        }
        return Boolean(item.title !== "Assessment") && <NavigationStepperItem key={index + item.title} keyItem={index + "_main"} isSelected={isSelected} isPrev={isPrev} />;
      })}
    </ProgressBarContainer>
  );
}

