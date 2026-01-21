import { SyntheticEvent } from "react";
import { FormGroup, FormControlLabel, Switch, useMediaQuery } from "@mui/material";

export function DebugSwitcher({ active, handleChange }: { active: boolean; handleChange: (e: SyntheticEvent) => void }) {
  const down768 = useMediaQuery("(max-width:768px)");

  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch checked={active} color="warning" size={down768 ? "small" : "medium"} />}
        label=""
        sx={{
          height: "100%",
        }}
        onChange={handleChange}
      />
    </FormGroup>
  );
}

