import SvgIcon from "@mui/material/SvgIcon";

export const makeMuiIcon = (Svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>) => (props: React.ComponentProps<typeof SvgIcon>) => <SvgIcon component={Svg} inheritViewBox {...props} />;

