import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { ICustomEvent, IFrameEventNames, IFrameEventTypes } from "@repo/utilities";

import GlobalModal from ".";

export default function IFrameWrapper({ setCurrentModalName }: { setCurrentModalName: Dispatch<SetStateAction<string>> }) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [iframeSrc, setIframeSrc] = useState<string>("");
  const [iframeName, setIframeName] = useState<IFrameEventTypes | "">("");

  function handleOpenModal(e: ICustomEvent<{}>) {
    if (e.detail && e.detail.src && e.detail.name) {
      setOpenModal(true);
      setIframeSrc(e.detail.src);
      setIframeName(e.detail.name);
    }
  }

  useEffect(() => {
    window.document.addEventListener(IFrameEventNames.OPEN_GLOBAL_MODAL, handleOpenModal);
    return () => {
      window.document.removeEventListener(IFrameEventNames.OPEN_GLOBAL_MODAL, handleOpenModal);
    };
  }, []);

  return openModal ? <GlobalModal iframeSrc={iframeSrc} iframeName={iframeName as IFrameEventTypes} setOpenModal={setOpenModal} setCurrentModalName={setCurrentModalName} /> : null;
}
