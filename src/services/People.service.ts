import { HttpService } from "./Http.service";

export class peopleService extends HttpService {
  private static _instance: peopleService;
  setToken = (token: string) => {
    this._axios.defaults.headers.common["Authorization"] = token;
  };

  static getInstance = (baseURL: string) => {
    if (!peopleService._instance) {
      peopleService._instance = new peopleService(baseURL);
    }

    return peopleService._instance;
  };

  constructor(baseURL?: string) {
    super(`${baseURL}/`);
  }

  /**
   * GET ALL
   * @returns All list of People.
   */
  getPeople = async () =>
    await this._axios
      .get("user")
      .then(this.handleResponse)
      .catch(this.handleError);

  /**
   * GET ONE
   * @returns Only one Person
   */
  getPerson = async (id: string) =>
    await this._axios
      .get(`user/${id}`)
      .then(this.handleResponse)
      .catch(this.handleError);
  /**
   * POST
   * @returns post json of Person
   */
  postPerson = async (personData: any) =>
    await this._axios
      .post("user", personData)
      .then(this.handleResponse)
      .catch(this.handleError);

  /**
   * PATCH
   * @returns updated Person
   */
  patchPerson = async (id: string, personData: any) =>
    await this._axios
      .patch(`user/${id}`, personData)
      .then(this.handleResponse)
      .catch(this.handleError);

  /**
   * DELETE
   * @returns deletion of Person
   */
  deletePerson = async (id: string | undefined) =>
    await this._axios
      .delete(`${id}`)
      .then(this.handleResponse)
      .catch(this.handleError);
}
