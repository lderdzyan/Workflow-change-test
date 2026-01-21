export interface S3StorageInfo {
  bucket: string;
  path: string;
  region: string;
}
export interface S3FileUploadMetadata {
  storageInfo: S3StorageInfo;
  credentials: AWSCredential;
}
export interface AWSCredential {
  AccessKeyId: string;
  SecretAccessKey: string;
  SessionToken: string;
  Expiration: string;
}
