import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { doTaxamoPurchase } from "@/operations/taxamo/taxamoPurchase";
import { getOrderById } from "@repo/gui-sdk";
import { isRight } from "fp-ts/lib/Either";
import { IFrameEventNames, IFrameEventStatuses, dispatchEvent } from "@repo/utilities";
import { CircularProgress, Grid } from "@mui/material";

export default function Home() {
  const [searchParams] = useSearchParams();
  const [loaded, setLoaded] = useState<boolean>(false);
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (loaded) dispatchEvent({ eventName: IFrameEventNames.GLOBAL_MODAL_LOADED, status: IFrameEventStatuses.success });
  }, [loaded]);

  useEffect(() => {
    (async () => {
      if (orderId) {
        const result = await getOrderById(orderId)();
        if (isRight(result)) {
          dispatchEvent({ eventName: IFrameEventNames.GLOBAL_MODAL_LOADED, status: IFrameEventStatuses.success });
          const status = await doTaxamoPurchase(orderId, result.right, setLoaded);
          if (status) {
            dispatchEvent({ eventName: IFrameEventNames.CLOSE_GLOBAL_MODAL, status: status as IFrameEventStatuses, toTop: status === IFrameEventStatuses.success });
          }
        }
      } else {
        dispatchEvent({ eventName: IFrameEventNames.CLOSE_GLOBAL_MODAL, status: IFrameEventStatuses.fail });
      }
    })();
  }, []);

  return !loaded ? (
    <Grid
      container
      sx={{ width: "100vw", height: "100vh", justifyContent: "center", alignItems: "center", position: "fixed", top: "0", left: "0", backgroundColor: "rgba( 255, 255, 254, 0.8 ) !important" }}
    >
      <CircularProgress />
    </Grid>
  ) : null;
}

