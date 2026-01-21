import { Grid, useMediaQuery, Skeleton, Divider, Card } from "@mui/material";

export const GuideListItemSkeleton = () => {
  const down768 = useMediaQuery("(max-width:768px)");
  return (
    <Card
      sx={{
        width: "100%",
        background: (theme) => theme.palette.primary.light,
        p: down768 ? "8px" : "12px 16px",
        borderRadius: "2px",
      }}
    >
      <Grid container flexWrap="nowrap" gap={down768 ? "12px" : "16px"} height="100%" alignItems="flex-start" width="100%">
        <Grid item>
          <Skeleton variant="rectangular" sx={{ borderRadius: "4px", width: down768 ? 68 : 104, height: down768 ? 68 : 104 }} />
        </Grid>

        <Divider orientation="vertical" sx={{ borderColor: (theme) => theme.palette.color3[200] }} />
        <Grid item width="80%">
          <Grid container flexDirection={"column"} gap="8px">
            <Grid container flexDirection={"column"}>
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} width="80%" />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} width="70%" />
            </Grid>

            <Grid container gap="8px" alignItems={"center"} mt="20px">
              <Skeleton variant="rectangular" height={26} width={down768 ? "50%" : "93px"} sx={{ borderRadius: "4px" }} />
              <Skeleton variant="rectangular" height={26} width={down768 ? "50%" : "160px"} sx={{ borderRadius: "4px" }} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

