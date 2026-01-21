import { Button, Menu } from "@mui/material";
import { UserInfoAndActions } from "../../userinfo-actions";

export function DropdownMenu({ anchorEl, close }: { anchorEl: HTMLElement | null; close: VoidFunction }) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={close}
      onClick={(e) => e.stopPropagation()}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      disableScrollLock={true}
      sx={{
        ".MuiList-root.MuiMenu-list ": {
          padding: "20px",
          backgroundColor: ({ palette }) => palette.color5[100],
        },
      }}
    >
      <UserInfoAndActions close={close} />
    </Menu>
  );
}

