import { Skeleton } from "@mui/material";

export default function PurchaseButtonsLoading() {
  return Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} variant="rectangular" height={48} width="100%" sx={{ borderRadius: 1 }} />);
}

