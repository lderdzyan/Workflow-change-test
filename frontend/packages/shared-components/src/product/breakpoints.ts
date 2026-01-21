import { useMediaQuery } from "@mui/material";

const MOBILE_MAX_WIDTH = 425;
const TABLET_MAX_WIDTH = 768;
const MIRRORS_TABLET_MAX_WIDTH = 1050;
const LARGE_TABLET_MAX_WIDTH = 1024;
const DEFAULT_DESKTOP_MAX_WIDTH = 1439;

const downMobileQuery = `(max-width:${MOBILE_MAX_WIDTH}px)`;
export const downTabletQuery = `(max-width:${TABLET_MAX_WIDTH}px)`;
const downMirrorsTabletQuery = `(max-width:${MIRRORS_TABLET_MAX_WIDTH}px)`;
const downLargeTabletQuery = `(max-width:${LARGE_TABLET_MAX_WIDTH}px)`;
const downDefaultDesktopQuery = `(max-width:${DEFAULT_DESKTOP_MAX_WIDTH}px)`;

export const useDownMobile = () => useMediaQuery(downMobileQuery);
export const useDownTablet = () => useMediaQuery(downTabletQuery);
export const useDownMirrorsTablet = () => useMediaQuery(downMirrorsTabletQuery);
export const useDownLargeTablet = () => useMediaQuery(downLargeTabletQuery);
export const useDownDefaultDesktop = () => useMediaQuery(downDefaultDesktopQuery);
