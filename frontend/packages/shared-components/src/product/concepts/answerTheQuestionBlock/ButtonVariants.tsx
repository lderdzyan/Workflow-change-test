import { AnswerBlockVariants } from ".";
import { useDownTablet } from "../../breakpoints";
import { AppButton } from "../../../shared";

interface IProps {
  variant: AnswerBlockVariants;
  handleClick: () => void;
}

export function ButtonVariants({ variant, handleClick }: IProps) {
  const downTablet = useDownTablet();

  let title = "";
  if (variant === AnswerBlockVariants.INITIAL) {
    title = "Answer this question";
  } else if (variant === AnswerBlockVariants.ANSWERED) {
    title = "Edit";
  } else {
    title = "View prompt answers";
  }

  return (
    <AppButton variant="secondary" size={"medium"} onClick={handleClick} sx={{ width: downTablet ? "100%" : "fit-content" }}>
      {title}
    </AppButton>
  );
}

