import { Dispatch, SetStateAction } from "react";
import { FileData } from "src/types/file-data";
import { HttpService } from "./Http.service";

export class uploadBucketService extends HttpService {
  private static _instance: uploadBucketService;
  setToken = (token: string) => {
    this._axios.defaults.headers.common["Authorization"] = token;
  };

  static getInstance = (baseURL: string) => {
    if (!uploadBucketService._instance) {
      uploadBucketService._instance = new uploadBucketService(baseURL);
    }

    return uploadBucketService._instance;
  };

  constructor(baseURL?: string) {
    super(`${baseURL}/`);
  }

  /**
   * GET ALL
   * @returns All list of documents.
   */
  getDocuments = async (id: string) =>
    await this._axios
      .get("upload/propertyfiles/" + id + "/")
      .then(this.handleResponse)
      .catch(this.handleError);

  /**
   * GET ONE
   * @returns Only one Document
   */
  getDocument = async (id: string) =>
    await this._axios
      .get("upload/propertyfiles/" + id + "/")
      .then(this.handleResponse)
      .catch(this.handleError);
  /**
   * POST
   * @returns post json of Document
   */
  postDocument = async (
    documentData: any,
    id: string | undefined,
    headers: any
  ) =>
    await this._axios
      .post(`upload/${id}`, documentData, headers)
      .then(this.handleResponse)
      .catch(this.handleError);

  /**
   * PATCH updated Document
   * @returns
   */
  patchDocument = async (id: string, documentData: any) =>
    await this._axios
      .patch(`${id}`, documentData)
      .then(this.handleResponse)
      .catch(this.handleError);

  /**
   * DELETE deletion of Document
   * @returns
   */
  deleteDocument = async (id: string | undefined) =>
    await this._axios
      .delete(`${id}`)
      .then(this.handleResponse)
      .catch(this.handleError);

  postMultiPartPhoto = async (
    documentData: any,
    options: any,
    bURL: string,
    id?: string,
    state?: Dispatch<SetStateAction<FileData>>
  ) => {
    const formData = new FormData();
    formData.append("file", documentData[0]);
    return await fetch(`${bURL}/upload/uploadphoto/`, {
      method: "POST",
      body: formData,
      headers: options,
    });
  };

  postMultiPartFile = async (
    documentData: any,
    options: any,
    bURL: string,
    id?: string,
    state?: Dispatch<SetStateAction<FileData>>
  ) => {
    const formData = new FormData();
    formData.append("file", documentData[0]);
    return await fetch(`${bURL}/upload/propertyfiles/${id}`, {
      method: "POST",
      body: formData,
      headers: options,
    });
  };
}