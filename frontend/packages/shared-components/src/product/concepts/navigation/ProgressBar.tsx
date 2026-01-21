import React from "react";
import { NavigationStepperItem } from "./NavigationStepperItem";
import { ProgressBarContainer } from "./ProgressBarContainer";

export interface SectionItem {
  title: string;
  path: string;
}

function ProgressBar_({ total, completed }: { total: number; completed: number }) {
  const arr = Array(total).fill(0);

  return (
    <ProgressBarContainer container>
      {arr.map((_, index) => {
        const isPrev = index < completed;
        const isSelected = index + 1 === completed;
        return <NavigationStepperItem key={index + "navStep"} keyItem={index + "_progress"} isSelected={isSelected} isPrev={isPrev} />;
      })}
    </ProgressBarContainer>
  );
}

export const ProgressBar = React.memo(ProgressBar_);

