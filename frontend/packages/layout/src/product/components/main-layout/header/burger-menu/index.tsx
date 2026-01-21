import { useState } from "react";
import { ToggleButtons } from "./ToggleButtons";
import { BurgerMenuBody } from "./BurgerMenuBody";

import { Grid } from "@mui/material";
import { INavItem } from "@repo/utilities";

export function BurgerMenu({ navItems }: { navItems: INavItem[] }) {
  const [opened, setOpened] = useState<boolean>(false);

  return (
    <Grid container justifyContent={"flex-end"} sx={{ position: "relative" }}>
      <ToggleButtons opened={opened} setOpened={setOpened} />
      <BurgerMenuBody opened={opened} setOpened={setOpened} navItems={navItems} />
    </Grid>
  );
}

