import { Link } from "react-router-dom";
import { QuestionFillIcon } from "@repo/assets";

import { IconButton } from "@mui/material";

const elementSize = { width: "29px", height: "29px" };

export function SupportLink() {
  return (
    <Link to="https://support.meaningsphere.com/hc/en-us" target="_blank" style={{ ...elementSize }}>
      <IconButton
        sx={{
          ...elementSize,
          lineHeight: "24px",
          border: "2px solid transparent",
          color: ({ palette }) => palette.color3[900],
          "&:hover": { color: ({ palette }) => palette.color7[600], backgroundColor: "transparent" },
          transition: "300ms",
          "&:active": {
            backgroundColor: "transparent",
            color: ({ palette }) => palette.color3[900],
            borderColor: ({ palette }) => palette.color7[600],
          },
        }}
      >
        <QuestionFillIcon sx={{ ...elementSize }} />
      </IconButton>
    </Link>
  );
}

