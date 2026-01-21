import { getImageSrc } from "@repo/utilities";
import Image from "next/image";

export function BackgroundBubbles() {
  return <Image src={getImageSrc("product/bubbles-background.svg")} width={820} height={856} alt="backImage" style={{ position: "fixed", left: "-160px", top: "40px", mixBlendMode: "multiply" }} />;
}

