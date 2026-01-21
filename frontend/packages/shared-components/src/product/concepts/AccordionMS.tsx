import { ReactElement } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import { ArrowDownRoundedIcon } from "@repo/assets";

interface IProps {
  title: string;
  children: ReactElement;
  gap: string;
}

export function AccordionMS({ title, children }: IProps) {
  return (
    <Accordion
      defaultExpanded
      sx={{
        margin: 0,
        borderRadius: "4px 4px 0px 0px",
        boxShadow: "none",
        "&.Mui-expanded": {
          margin: "0",
        },
        "&::before": {
          display: "none",
        },
      }}
    >
      <AccordionSummary
        expandIcon={
          <ArrowDownRoundedIcon
            sx={{
              height: 32,
              width: 32,
              color: "#FFF",
            }}
          />
        }
        sx={{
          minHeight: "36px",
          padding: "0px 4px 0px 12px",
          color: (theme) => theme.palette.color1[100],
          borderRadius: "4px 4px 0px 0px",
          border: (theme) => `1px solid ${theme.palette.color1[700]}`,
          background: (theme) => theme.palette.color1[600],
          "&.Mui-expanded": {
            minHeight: "36px",
            margin: 0,
            border: (theme) => `1px solid ${theme.palette.color1[700]}`,
          },
          "& .MuiAccordionSummary-content": {
            margin: 0,
          },
          "& .MuiAccordionSummary-content.Mui-expanded": {
            margin: 0,
          },
        }}
      >
        <Typography variant="label3" sx={{ color: (theme) => theme.palette.color1[100] }}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          padding: "12px",
          border: (theme) => `1px solid ${theme.palette.color1[300]}`,
        }}
      >
        {children}
      </AccordionDetails>
    </Accordion>
  );
}

