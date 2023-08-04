import { deepCopy } from "src/utils/deep-copy";
import { applyPagination } from "src/utils/apply-pagination";
import { applySort } from "src/utils/apply-sort";
import { Houses } from "src/types/house";

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
  data: Houses[];
  count: number;
}>;

class FileManagerApi {
  getItems(request: GetItemsRequest = {}, dataset: any): GetItemsResponse {
    const { filters, page, rowsPerPage, sortBy, sortDir } = request;

    let data = deepCopy(dataset) as Houses[];
    let count = data.length;
    return Promise.resolve({
      data,
      count,
    });
  }
}

export const fileManagerApi = new FileManagerApi();
