import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/function";
import APIPaths from "../api-paths";
import { FileUploadResponse, StorageProvider } from "../dtos/FileUploadResponse";
import { doPost } from "../request";
import { uploadToBucket } from "../providers";
import { RequestError } from "../request-error";

export enum FileType {
  AvatarImg = "avatarImg",
  SpokenNameAudio = "spokenNameAudio",
  WelcomeMessageAudio = "welcomeMessageAudio",
}
export const uploadFile = (file: File, fileType: FileType, duration?: number): TE.TaskEither<RequestError, string> => {
  return pipe(
    doPost<FileUploadResponse>(APIPaths.UploadFile, { file: { name: file.name, type: fileType, ...(duration && { duration: duration }) } }),
    TE.flatMap((response) =>
      pipe(
        doUpload(file, response),
        TE.flatMap((_) => TE.right(response.fileId)),
      ),
    ),
  );
};

const doUpload = (file: File, response: FileUploadResponse): TE.TaskEither<RequestError, boolean> => {
  if (response.provider === StorageProvider.S3) {
    return pipe(
      uploadToBucket(file, response.fileId, response.metadata),
      TE.flatMap((_) => TE.right(true)),
    );
  }

  return TE.left(new Error("Wrong storage provider."));
};

