import { MsoData } from ".";
import { S3FileUploadMetadata } from "../providers/aws";

export enum StorageProvider {
  S3 = "s3"
}
export interface FileUploadResponse extends MsoData {
  fileId: string;
  provider: StorageProvider;
  metadata: S3FileUploadMetadata;
}
