import { dispatchEvent, generateIframeSource, IFrameEventStatuses, IFrameEventTypes, logOut } from "@repo/utilities";

import { Grid, Typography } from "@mui/material";

const getActions = (close: VoidFunction) => [
  {
    title: "Account Settings",
    callback: () => {
      dispatchEvent({
        eventName: "open_global_modal",
        status: IFrameEventStatuses.success,
        src: generateIframeSource(IFrameEventTypes.accountSettings, {}),
        name: IFrameEventTypes.accountSettings,
      });
      close();
    },
  },
  {
    title: "Log out",
    callback: () => {
      logOut();
      close();
    },
  },
];

export function Actions({ close }: { close: VoidFunction }) {
  return (
    <Grid container flexDirection={"column"} gap={"4px"}>
      {getActions(close).map((action) => (
        <Typography
          key={action.title}
          variant="link2"
          onClick={action.callback}
          sx={{
            width: "fit-content",
            cursor: "pointer",
            transition: "300ms",
            padding: "8px 12px",
            border: "2px solid transparent",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: ({ palette }) => palette.color7[400],
            },
            "&:active": {
              borderColor: ({ palette }) => palette.color7[700],
            },
          }}
        >
          {action.title}
        </Typography>
      ))}
    </Grid>
  );
}

