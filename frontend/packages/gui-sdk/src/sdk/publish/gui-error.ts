import { PublishResponse } from "../../dtos";
import APIPaths from "../../api-paths";
import { guiErrorQueue } from "../../init";
import { RequestError, doPost } from "../../request";
import { RequestAccess } from "../../request_jwt_e";

export type GuiError = {
  uri: string;
  error: string;
  stacktrace?: string;
};
export async function reportGuiError(data: GuiError) {
  if (guiErrorQueue == null) throw Error("MOSS SDK not initialized.");
  await guiErrorQueue.add(data);
}
export async function reportRequestError(data: RequestError, uri: string) {
  if (guiErrorQueue == null) throw Error("MOSS SDK not initialized.");
  await guiErrorQueue.add({ uri, error: data.name, stacktrace: data.stack });
}

export const sendGuiErrorTask = (data: GuiError) => doPost<PublishResponse>(APIPaths.GuiError, { e: data }, false, RequestAccess.PUBLIC);
