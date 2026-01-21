import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";

import { IResponse, genGroupsWithAnwers } from "./genGroupsWithAnswers";
import { BORDER_RADIUS } from "../borderRadius";
import QAComponent from "./QAComponent";

import { Card, CircularProgress, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";

export function InventoryItemsList({
  questions,
  answers,
  chosen,
  setChosen,
  customStyles,
}: {
  questions: string[];
  answers: string[];
  chosen?: string[];
  setChosen?: Dispatch<SetStateAction<string[]>>;
  customStyles?: { grid: Record<string, string>; card: Record<string, string> };
}) {
  const [responses, setResponses] = useState<IResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const down768 = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    if (setChosen) {
      setResponses(genGroupsWithAnwers(theme, questions, answers));
    } else {
      setResponses(genGroupsWithAnwers(theme, questions, answers, chosen));
    }
    setLoading(false);
  }, [chosen]);

  return (
    <Grid container sx={{ flexDirection: "column", gap: down768 ? "20px" : "12px", ...customStyles?.grid }}>
      {!loading ? (
        responses.map((response, index) => (
          <Card key={index} sx={{ p: "12px 16px", display: "flex", flexDirection: "column", borderRadius: BORDER_RADIUS.medium, ...customStyles?.card }}>
            <Grid container sx={{ justifyContent: "space-between", alignItems: "center", mb: "12px" }}>
              <Typography variant="label2">{response.groupName}</Typography>
              {response.imageSrc ? <Image src={response.imageSrc} width={36} height={36} alt="group_image" /> : null}
            </Grid>
            <Grid container sx={{ flexDirection: "column", gap: "4px" }}>
              {response.qaPairs.map((data, index) => (
                <QAComponent key={index} data={data} color={response.color} maxCount={7} chosen={chosen} setChosen={setChosen} />
              ))}
            </Grid>
          </Card>
        ))
      ) : (
        <Grid container sx={{ width: "100%", justifyContent: "center" }}>
          <CircularProgress />
        </Grid>
      )}
    </Grid>
  );
}

