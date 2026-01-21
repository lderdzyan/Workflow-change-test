import Home from "@/views/home-page";
import { PATHS } from "@repo/utilities";

interface IRoute {
  path: string;
  element: JSX.Element;
}

export const routes: IRoute[] = [{ path: PATHS.PAYMENT_TAXAMO.HOME, element: <Home /> }];
