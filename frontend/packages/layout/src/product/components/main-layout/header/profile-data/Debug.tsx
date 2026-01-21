import { SyntheticEvent, useState } from "react";
import { isDebugActive, updateDebugValueInCache } from "@repo/gui-sdk";
import { DebugSwitcher } from "@repo/shared-components/shared";

export default function Debug() {
  const [active, setActive] = useState<boolean>(isDebugActive());

  const handleChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const value = updateDebugValueInCache(target.checked);
    setActive(value);
  };

  return <DebugSwitcher active={active} handleChange={handleChange} />;
}

