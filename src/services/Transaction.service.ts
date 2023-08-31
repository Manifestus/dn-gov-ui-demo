import { HttpService } from "./Http.service";

export class transactionService extends HttpService {
  private static _instance: transactionService;
  setToken = (token: string) => {
    this._axios.defaults.headers.common["Authorization"] = token;
  };

  static getInstance = (baseURL: string) => {
    if (!transactionService._instance) {
      transactionService._instance = new transactionService(baseURL);
    }

    return transactionService._instance;
  };

  constructor(baseURL?: string) {
    super(`${baseURL}/`);
  }

  /**
   * GET ALL
   * @returns All list of Transactions.
   */
  getTransactions = async () =>
    await this._axios
      .get("transaction")
      .then(this.handleResponse)
      .catch(this.handleError);

  /**
   * GET ONE
   * @returns Only one Transaction
   */
  getTransaction = async (id: string) =>
    await this._axios
      .get(`transaction/${id}`)
      .then(this.handleResponse)
      .catch(this.handleError);
  /**
   * POST
   * @returns post json of Transaction
   */
  postTransaction = async (transactionData: any) => {
    return await this._axios
      .post("transaction", transactionData)
      .then((res) => res.data)
      .catch(this.handleError);
  };
}
