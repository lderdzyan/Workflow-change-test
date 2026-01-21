import React, { MutableRefObject, useEffect, useRef, useState } from "react";

import { Grid, useMediaQuery } from "@mui/material";
import TabItem from "./TabItem";

interface IProps<T extends React.ReactNode> {
  tabs: Array<ITabItem<T>>;
  activeTab: string;
}

export interface ITabItem<T extends React.ReactNode> {
  title: T;
  icon: JSX.Element | null;
  handleClick: (name: T) => void;
}

export const Toolbar = <T extends React.ReactNode>(props: IProps<T>) => {
  const { tabs, activeTab } = props;

  const down900 = useMediaQuery("(max-width: 900px)");
  const wrapperRef = useRef(null);

  const [showContent, setShowContent] = useState(down900);
  const [top, setTop] = useState(70);

  function useOutsideAlerter(ref: MutableRefObject<null>) {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        const rightPart = document.querySelector(".rightPartContainer");
        const backdropContainer = document.querySelector(".MuiBackdrop-root");
        if (ref.current && rightPart?.contains(event.target as Node) && !backdropContainer?.contains(event.target as Node)) {
          setShowContent(down900);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref, down900]);
  }

  useOutsideAlerter(wrapperRef);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > +70) {
        setTop(0);
      } else {
        setTop(70);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return (
    <Grid
      container
      ref={wrapperRef}
      sx={{
        maxWidth: "240px",
        minWidth: { xs: "unset", md: "240px" },
        backgroundColor: "#fff",
        borderRight: (theme) => `1px solid ${theme.palette.greyscale[100]}`,
        minHeight: "inherit",
        flexWrap: "nowrap",
        position: "fixed",
        top: `${top}px`,
        boxShadow: {
          xs: showContent ? "unset" : "10px 6px 16px 0px rgba(0, 0, 0, 0.16)",
          md: "unset",
        },
        zIndex: 2,
        width: { xs: showContent ? "min-content" : "100%", md: "100%" },
        p: down900 ? "16px 8px 8px 8px" : "16px",
        boxSizing: "content-box",
      }}
    >
      <Grid item width="100%">
        <Grid container direction="column" rowGap="10px">
          {tabs.map((item, index) => {
            return (
              <TabItem isActive={activeTab === item.title} title={item.title} handleClick={item.handleClick} showContent={showContent} setShowContent={setShowContent} icon={item.icon} key={index} />
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Toolbar;

