export interface FileData {
  $metadata: {
    httpStatusCode: number;
    requestId: string;
    extendedRequestId: string;
    attempts: number;
    totalRetryDelay: number;
  };
  Contents: [
    {
      Key: string;
      LastModified: string;
      ETag: string;
      Size: number;
      StorageClass: string;
    }
  ];
  IsTruncated: boolean;
  KeyCount: number;
  MaxKeys: number;
  Name: string;
  Prefix: string;
}
