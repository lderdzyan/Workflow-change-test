import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/function";
import { CompleteMultipartUploadOutput, S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { AWSCredential, S3FileUploadMetadata } from ".";
import { NetworkError, RequestError } from "../../request-error";

const initS3Client = (region: string, credential: AWSCredential) =>
  new S3Client({
    region,
    credentials: {
      accessKeyId: credential.AccessKeyId,
      secretAccessKey: credential.SecretAccessKey,
      sessionToken: credential.SessionToken,
    },
  });

export const uploadToBucket = (file: File, fileId: string, metadata: S3FileUploadMetadata): TE.TaskEither<RequestError, CompleteMultipartUploadOutput> => {
  const upload = new Upload({
    client: initS3Client(metadata.storageInfo.region, metadata.credentials),
    params: {
      Bucket: metadata.storageInfo.bucket,
      Key: `${metadata.storageInfo.path}${fileId}${file.name.substring(file.name.lastIndexOf("."))}`,
      Body: file.stream(),
    },
  });

  return pipe(
    TE.tryCatch(
      async () => upload.done(),
      (error) => new NetworkError((error as Error).message),
    ),
  );
};

