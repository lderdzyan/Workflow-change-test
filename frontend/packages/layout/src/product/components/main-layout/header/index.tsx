import { INavItem } from "@repo/utilities";
import { useDownTablet } from "@repo/shared-components/product";
import InsightsConfirmationModal from "./insights-confirmation-modal/InsightsConfirmationModal";
import LogoNavigation from "./logo-navigation";
import { ProfileData } from "./profile-data";
import { BurgerMenu } from "./burger-menu";

import { AppBar, Grid } from "@mui/material";

export interface IGlobalModalDetail {
  open: boolean;
  query: Array<string>;
}
export interface IGlobalModal {
  taxamoPayment: IGlobalModalDetail;
  accountSettings: IGlobalModalDetail;
  reportVideo: IGlobalModalDetail;
  calendlySheduling: IGlobalModalDetail;
}

export function Header({ navItems }: { navItems: INavItem[] }) {
  const downTablet = useDownTablet();

  return (
    <Grid sx={{ px: downTablet ? "0" : "24px", pt: downTablet ? "0" : "16px", backgroundColor: downTablet ? ({ palette }) => palette.color5[100] : "transparent" }}>
      <AppBar
        position="static"
        sx={{
          color: ({ palette }) => palette.text.primary,
          backgroundColor: (theme) => theme.palette.color5[200],
          padding: downTablet ? "8px 12px" : "18px 24px",
          boxShadow: "unset",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          borderRadius: "12px",
          borderTopRightRadius: downTablet ? "0" : "auto",
          borderTopLeftRadius: downTablet ? "0" : "auto",
          gap: "40px",
        }}
      >
        <LogoNavigation navItems={navItems} />
        {downTablet ? <BurgerMenu navItems={navItems}/> : <ProfileData />}
        <InsightsConfirmationModal />
      </AppBar>
    </Grid>
  );
}

