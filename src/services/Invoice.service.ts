import { HttpService } from "./Http.service";

export class invoiceService extends HttpService {
  private static _instance: invoiceService;
  setToken = (token: string) => {
    this._axios.defaults.headers.common["Authorization"] = token;
  };

  static getInstance = (baseURL: string) => {
    if (!invoiceService._instance) {
      invoiceService._instance = new invoiceService(baseURL);
    }

    return invoiceService._instance;
  };

  constructor(baseURL?: string) {
    super(`${baseURL}/`);
  }

  /**
   * GET ALL
   * @returns All list of Invoices.
   */
  getInvoices = async () =>
    await this._axios
      .get("invoice")
      .then(this.handleResponse)
      .catch(this.handleError);

  /**
   * GET ONE
   * @returns Only one Invoice
   */
  getInvoice = async (id: string) =>
    await this._axios
      .get(`invoice/${id}`)
      .then(this.handleResponse)
      .catch(this.handleError);
  /**
   * POST
   * @returns post json of Invoice
   */
  postInvoice = async (invoiceData: any) =>
    await this._axios
      .post("invoice", invoiceData)
      .then(this.handleResponse)
      .catch(this.handleError);

  /**
   * PATCH
   * @returns updated Invoice
   */
  patchInvoice = async (id: string, invoiceData: any) =>
    await this._axios
      .patch(`${id}`, invoiceData)
      .then(this.handleResponse)
      .catch(this.handleError);

  /**
   * DELETE
   * @returns deletion of Invoice
   */
  deleteInvoice = async (id: string | undefined) =>
    await this._axios
      .delete(`${id}`)
      .then(this.handleResponse)
      .catch(this.handleError);
}
