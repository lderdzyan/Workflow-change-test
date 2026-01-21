import { INavItem } from "@repo/utilities";
import { LogoMSBlack, LogoSize, useDownTablet } from "@repo/shared-components/product";
import { NavItems } from "./NavItems";

import { Grid } from "@mui/material";

export default function LogoNavigation({ navItems }: { navItems: INavItem[] }) {
  const downTablet = useDownTablet();
  return (
    <Grid container gap={"40px"} sx={{ flexWrap: "nowrap" }}>
      <LogoMSBlack size={LogoSize.SMALL} />
      {!downTablet && <NavItems navItems={navItems} />}
    </Grid>
  );
}

