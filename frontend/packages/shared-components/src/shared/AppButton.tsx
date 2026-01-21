import { Button, CircularProgress, ButtonProps } from "@mui/material";

export interface AppButtonProps extends ButtonProps {
  loading?: boolean;
}

export function AppButton({ loading, disabled, children, ...props }: AppButtonProps) {
  const spinner = <CircularProgress />;

  return (
    <Button {...props} disabled={disabled || loading} endIcon={loading ? spinner : props.endIcon}>
      {children}
    </Button>
  );
}

