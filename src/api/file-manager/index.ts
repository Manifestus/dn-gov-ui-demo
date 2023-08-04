import { deepCopy } from "src/utils/deep-copy";
import { applyPagination } from "src/utils/apply-pagination";
import { applySort } from "src/utils/apply-sort";
import type { Item } from "src/types/file-manager";
import { uploadBucketService } from "src/services/UploadBucket.s3";

type GetItemsRequest = {
  filters?: {
    query?: string;
  };
  page?: number;
  rowsPerPage?: number;
  sortBy?: string;
  sortDir?: "asc" | "desc";
};

type GetItemsResponse = Promise<{
  data: Item[];
  count: number;
}>;

const uploadService = new uploadBucketService(
  "https://dn-gov-api-5ywbgrw4ia-uc.a.run.app/"
);

class FileManagerApi {
  getItems(request: GetItemsRequest = {}, dataset: any): GetItemsResponse {
    const { filters, page, rowsPerPage, sortBy, sortDir } = request;
    let data = deepCopy(dataset) as Item[];
    let count = data.length;

    if (typeof filters !== "undefined") {
      data = data.filter((file) => {
        if (typeof filters.query !== "undefined" && filters.query !== "") {
          const matched = file.name
            .toLowerCase()
            .includes(filters.query.toLowerCase());

          if (!matched) {
            return false;
          }
        }

        return true;
      });
      count = data.length;
    }

    if (typeof sortBy !== "undefined" && typeof sortDir !== "undefined") {
      data = applySort(data, sortBy, sortDir);
    }

    if (typeof page !== "undefined" && typeof rowsPerPage !== "undefined") {
      data = applyPagination(data, page, rowsPerPage);
    }

    return Promise.resolve({
      data,
      count,
    });
  }
}

export const fileManagerApi = new FileManagerApi();
