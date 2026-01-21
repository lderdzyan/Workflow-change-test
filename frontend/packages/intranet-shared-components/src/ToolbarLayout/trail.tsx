import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import { findLocationBase } from "@repo/utilities";

import { useNavigate } from "react-router-dom";

export default function Trail({ links }: { links: Array<{ title: string; path: string; isExternal?: boolean }> }) {
  const trailTxtStyle = { fontSize: { xs: "12px", sm: "16px" } };
  const navigate = useNavigate();

  const breadcrumbs = [
    <Link underline="none" key="1" href="" color={(theme) => theme.palette.greyscale[800]} onClick={(e) => handleClick(e, "/")} sx={trailTxtStyle}>
      Home
    </Link>,
  ];

  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, path: string, isExternal?: boolean) {
    event.preventDefault();
    if (path) {
      if (isExternal) {
        window.location.href = findLocationBase() + path;
      } else {
        path && navigate(path);
      }
    }
  }

  const dynamicLinks = links.map((item, index) => {
    return (
      <Link
        underline="none"
        href={index === links.length - 1 ? undefined : ""}
        key={index + 2}
        color={(theme) => (index === links.length - 1 ? theme.palette.secondary[500] : theme.palette.greyscale[800])}
        onClick={(e) => handleClick(e, item.path, item.isExternal)}
        sx={trailTxtStyle}
      >
        {item.title}
      </Link>
    );
  });

  return (
    <Stack spacing={2} mt="-2px">
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>{breadcrumbs.concat(dynamicLinks)}</Breadcrumbs>
    </Stack>
  );
}

