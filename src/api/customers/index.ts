import { peopleService } from "src/services/People.service";
import type {
  Customer,
  CustomerEmail,
  CustomerInvoice,
  CustomerLog,
} from "src/types/customer";
import { applyPagination } from "src/utils/apply-pagination";
import { applySort } from "src/utils/apply-sort";
import { deepCopy } from "src/utils/deep-copy";
import { invoices } from "../invoices/data";
// import { customer, customers, emails, invoices, logs } from './data';

type GetCustomersRequest = {
  filters?: {
    query?: string;
  };
  page?: number;
  rowsPerPage?: number;
  sortBy?: string;
  sortDir?: "asc" | "desc";
};

type GetCustomersResponse = Promise<{
  data: Customer[];
  count: number;
}>;

type GetCustomerRequest = {};

type GetCustomerResponse = Promise<Customer>;

type GetCustomerEmailsRequest = {};

type GetCustomerEmailsResponse = Promise<CustomerEmail[]>;

type GetCustomerInvoicesRequest = {};

type GetCustomerInvoicesResponse = Promise<CustomerInvoice[]>;

type GetCustomerLogsRequest = {};

type GetCustomerLogsResponse = Promise<CustomerLog[]>;

const customerService = new peopleService(
  "https://dn-gov-api-5ywbgrw4ia-uc.a.run.app/"
);

class CustomersApi {
  getCustomers(
    request: GetCustomersRequest = {},
    dataSet: Customer[]
  ): GetCustomersResponse {
    const { filters, page, rowsPerPage, sortBy, sortDir } = request;

    let data = deepCopy(dataSet) as Customer[];
    let count = data.length;

    if (typeof filters !== "undefined") {
      data = Object.values(data).filter((customer) => {
        if (typeof filters.query !== "undefined" && filters.query !== "") {
          let queryMatched = false;
          const properties: ("email" | "name")[] = ["email", "name"];

          properties.forEach((property) => {
            if (
              customer[property]
                .toLowerCase()
                .includes(filters.query!.toLowerCase())
            ) {
              queryMatched = true;
            }
          });

          if (!queryMatched) {
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

  getCustomer(request?: GetCustomerRequest): GetCustomerResponse {
    return Promise.resolve(deepCopy(customerService.getPerson("1")));
  }

  // getEmails(request?: GetCustomerEmailsRequest): GetCustomerEmailsResponse {
  //   return Promise.resolve(deepCopy(emails));
  // }

  getInvoices(
    request?: GetCustomerInvoicesRequest
  ): GetCustomerInvoicesResponse {
    return Promise.resolve(deepCopy(invoices));
  }

  // getLogs(request?: GetCustomerLogsRequest): GetCustomerLogsResponse {
  //   return Promise.resolve(deepCopy(logs));
  // }
}

export const customersApi = new CustomersApi();
