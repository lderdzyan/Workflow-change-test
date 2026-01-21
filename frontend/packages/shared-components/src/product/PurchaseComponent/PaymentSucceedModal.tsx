import { ActionMode, ModalTypes } from "../ModalSample/IframeModal";
import { AppModal } from "../ModalSample/AppModal";

import { Grid, Typography } from "@mui/material";

export function PaymentSucceedModal({ open, handleClose, title, description }: { open: boolean; handleClose: () => void; title: string; description: string }) {
  return (
    <AppModal
      type={ModalTypes.main}
      open={open}
      handleClose={handleClose}
      title={
        <Grid>
          <Typography variant="h1">{title}</Typography>
        </Grid>
      }
      content={<Typography variant="multiLine2">{description}</Typography>}
      actions={[{ title: "Close", variant: "primary", handleClick: handleClose, disabled: false, loading: false, type: "button" }]}
      actionMode={ActionMode.notRequired}
    />
  );
}

