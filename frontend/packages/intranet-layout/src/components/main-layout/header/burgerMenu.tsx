import { Dispatch, SetStateAction } from "react";
import { Grid, Typography, Divider } from "@mui/material";
import styles from "../../../styles/page.module.css";
import { INavItem, getNavigationList } from "./navList";
import { redirectToExternalLink, logOut, getPersonName, getPersonIdentity } from "@repo/utilities";
import { getCurrentPerson } from "@repo/gui-sdk";
import { useRouter } from "next/router";

interface IProps {
  isOpened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}

export const handleClickNav = (path: string) => redirectToExternalLink(path);

export default function BurgerMenu({ isOpened, setOpened, showAccountSettings }: { isOpened: boolean; setOpened: Dispatch<SetStateAction<boolean>>; showAccountSettings?: boolean }) {
  return (
    <Grid display="flex" alignItems="center">
      <BurgerIcon isOpened={isOpened} setOpened={setOpened} />
      <Grid
        container
        sx={{
          position: "absolute",
          width: "100%",
          height: isOpened ? "calc(100vh - 78px)" : "0",
          backgroundColor: "#F6F6F6",
          left: "0",
          top: "70px",
          zIndex: "999",
          transition: "all 500ms",
          opacity: isOpened ? "1" : "0",
          flexDirection: "column",
          flexWrap: "nowrap",
          overflow: "auto",
        }}
      >
        <Grid container flexDirection="column" sx={{ p: "24px", borderBottom: "1px solid #E6E3E0" }}>
          <Typography sx={{ fontSize: "30px", lineHeight: "32px", fontWeight: "600", color: (theme) => theme.palette.greyscale[800] }}>{getPersonName(getCurrentPerson)}</Typography>
          <Typography sx={{ fontSize: "18px", lineHeight: "32px", color: (theme) => theme.palette.greyscale[800], overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", width: "100%" }}>
            {getPersonIdentity(getCurrentPerson)}
          </Typography>
        </Grid>
        <Grid container flexDirection="column" sx={{ color: (theme) => theme.palette.greyscale[800], padding: "40px", pb: "0" }}>
          {getNavigationList().map((nav) => {
            if (nav.collapse) {
              return <CollapsableNavItem key={nav.title} nav={nav} handleClickNav={handleClickNav} />;
            }
            return <SingleNavItem key={nav.title} nav={nav} handleClickNav={handleClickNav} />;
          })}
        </Grid>
        <Divider sx={{ width: "100vw" }} />
        <Grid container sx={{ p: "40px" }}>
          <Typography sx={{ fontSize: "24px", lineHeight: "32px", color: (theme) => theme.palette.greyscale[800] }} onClick={logOut}>
            Log out
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export interface INavItemProps {
  nav: INavItem;
  handleClickNav: (path: string) => void;
}

const SingleNavItem = ({ nav, handleClickNav }: INavItemProps) => {
  const router = useRouter();
  const needToHighlight = nav.hightlightedPaths?.includes(router.basePath);
  return (
    <Typography
      sx={{
        fontSize: "24px",
        lineHeight: "32px",
        pb: "16px",
        mb: "24px",
        color: needToHighlight ? (theme) => theme.palette.secondary[500] : (theme) => theme.palette.greyscale[800],
        textDecoration: needToHighlight ? "underline" : "unset",
      }}
      key={nav.title}
      onClick={() => handleClickNav(nav.link)}
    >
      {nav.title}
    </Typography>
  );
};

const CollapsableNavItem = ({ nav, handleClickNav }: INavItemProps) => {
  const router = useRouter();
  const needToHighlight = nav.hightlightedPaths?.includes(router.basePath);
  return (
    <Grid container flexDirection="column" key={nav.title} sx={{ pb: "10px", mb: "20px" }}>
      <Typography sx={{ fontSize: "24px", lineHeight: "32px", mb: "20px" }}>{nav.title}</Typography>
      {nav.collapse?.map((nav) => (
        <Typography
          key={nav.title}
          sx={{
            fontSize: "24px",
            lineHeight: "32px",
            py: "10px",
            pl: "24px",
            color: needToHighlight ? (theme) => theme.palette.secondary[500] : (theme) => theme.palette.greyscale[800],
            textDecoration: needToHighlight ? "underline" : "unset",
          }}
          onClick={() => handleClickNav(nav.link)}
        >
          {nav.title}
        </Typography>
      ))}
    </Grid>
  );
};

const BurgerIcon = ({ isOpened, setOpened }: IProps) => {
  return (
    <Grid item sx={{ display: "flex", flexDirection: "column" }} className={styles.burger_container} onClick={() => setOpened((prev) => !prev)}>
      <i className={isOpened ? styles.opened : styles.closed}></i>
      <i className={isOpened ? styles.opened : styles.closed}></i>
      <i className={isOpened ? styles.opened : styles.closed}></i>
    </Grid>
  );
};

