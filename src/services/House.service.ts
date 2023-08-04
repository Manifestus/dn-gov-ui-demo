import { HttpService } from "./Http.service";

export class houseService extends HttpService {
  private static _instance: houseService;
  setToken = (token: string) => {
    this._axios.defaults.headers.common["Authorization"] = token;
  };

  static getInstance = (baseURL: string) => {
    if (!houseService._instance) {
      houseService._instance = new houseService(baseURL);
    }

    return houseService._instance;
  };

  constructor(baseURL?: string) {
    super(`${baseURL}/`);
  }

  /**
   * GET ALL
   * @returns All list of Houses.
   */
  getHouses = async () =>
    await this._axios
      .get("property")
      .then(this.handleResponse)
      .catch(this.handleError);

  /**
   * GET ONE
   * @returns Only one House
   */
  getHouse = async (id: string) =>
    await this._axios
      .get(`property/${id}`)
      .then(this.handleResponse)
      .catch(this.handleError);
  /**
   * POST
   * @returns post json of House
   */
  postHouse = async (houseData: any) =>
    await this._axios
      .post("property", houseData)
      .then(this.handleResponse)
      .catch(this.handleError);

  /**
   * PATCH
   * @returns updated House
   */
  patchHouse = async (id: string, visitData: any) =>
    await this._axios
      .patch(`property/${id}`, visitData)
      .then(this.handleResponse)
      .catch(this.handleError);

  /**
   * DELETE
   * @returns deletion of House
   */
  deleteHouse = async (id: string | undefined) =>
    await this._axios
      .patch(`property/${id}`)
      .then(this.handleResponse)
      .catch(this.handleError);
}
