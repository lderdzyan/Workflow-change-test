import { Dispatch, SetStateAction } from "react";
import { QAPair } from "./genGroupsWithAnswers";
import { Checkbox, Grid, Typography } from "@mui/material";

export default function QAComponent({
  data,
  color,
  maxCount,
  chosen,
  setChosen,
}: {
  data: QAPair;
  color: string;
  maxCount: number;
  chosen?: string[];
  setChosen?: Dispatch<SetStateAction<string[]>>;
}) {
  const checked = chosen ? chosen.includes(data.id) : false;
  const limitAchieved = chosen?.length === maxCount;
  return (
    <Grid
      container
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        border: setChosen && checked ? `4px solid ${color}` : "none",
        borderLeft: `4px solid ${color}`,
        borderRadius: "4px",
        p: setChosen && checked ? "4px 8px 4px 8px" : "8px 12px 8px 8px",
        backgroundColor: (theme) => theme.palette.color3[50],
        flexWrap: "nowrap",
      }}
    >
      <Grid container sx={{ width: "fit-content", flexWrap: "nowrap" }}>
        {chosen && setChosen && (
          <Checkbox
            checked={checked}
            onChange={(e) => {
              if (e.target.checked && chosen?.length < maxCount) {
                setChosen((prev) => [...prev, data.id]);
              } else {
                setChosen((prev) => prev.filter((id) => id !== data.id));
              }
            }}
            size="small"
            sx={{
              "& .MuiSvgIcon-root": { fontSize: 21 },
              mr: "8px",
              padding: "0",
              color: limitAchieved && !checked ? (theme) => `${theme.palette.color3[200]} !important` : "unset !important",
              "&.Mui-checked": {
                color: (theme) => `${theme.palette.color3[700]} !important`,
              },
            }}
          />
        )}
        <Typography variant="multiLine3" sx={{ color: limitAchieved && !checked ? (theme) => theme.palette.color3[500] : "unset" }}>
          {data.question}
        </Typography>
      </Grid>
      <Typography variant="label4" sx={{ color: limitAchieved && !checked ? (theme) => theme.palette.color3[500] : "unset", ml: "8px", whiteSpace: "nowrap" }}>
        {data.answer}
      </Typography>
    </Grid>
  );
}

