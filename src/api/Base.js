// import Constants from "expo-constants";
import {
  ErrorMessages,
  UnauthorizedError,
  BadRequestError,
  ServerError,
  ApiError,
} from "../errors/Error";
// import Config, { Env } from "@config/config";
// const { manifest } = Constants;

const debug = (...params) => {
  console.log(...params);
};

export default class BaseApi {
  host = "https://hbb.pgnmas.co.id";
  // host = "http://103.93.57.36:9000";

  /*Env === "local" ?
     "https://" + manifest.debuggerHost.split(`:`).shift().concat(`:8000`) :
     */
  // Config.server.endpoint;

  /* Similar to Native fetch API with a few additions:
   * - Auto append host to url
   * - Additional option "secure" (true / false) - default to "true"
   * - Default method to "GET"
   * - If there is body then JSON-stringify the body and append the necessary headers
   * - Throwing UnauthorizedError, ServerError when appropriate
   * - Otherwise, throw ApiError
   */
  unsecureFetch = async (
    url,
    { method = "GET", body, headers = {}, params, ...opts } = {}
  ) => {
    opts = {
      ...opts,
      method: method,
      headers: headers,
    };

    if (body) {
      opts.headers["Accept"] = "application/json";
      opts.headers["Content-Type"] = "application/json";
      opts.body = JSON.stringify(body);
    }

    // let builtUrl = new URL(`${this.host}/${url}`);
    const builtUrl = `${this.host}/${url}`;
    debug(`🚀 ~ Making an API call ${builtUrl}`);
    if (params)
      Object.keys(params).forEach((key) =>
        builtUrl.searchParams.append(key, params[key])
      );

    let response;
    try {
      response = await fetch(builtUrl, opts);
    } catch (error) {
      if (
        error.name === "TypeError" &&
        error.message === "Network request failed"
      ) {
        console.warn(error);
        if (e.errors.message) {
          const e = new Error(e.errors.message);
          e.name = e.errors.error_code;
        } else {
          const e = new Error(
            "Either you are not connected to the internet, or the server is down. Please check your connection and try again. "
          );

          e.name = "Network Error";
        }
        // e.name = e.errors;

        throw e;
      } else throw error;
    }
    return await this._process(response);
  };

  _process = async (response) => {
    if (response.status === 200) return this._body(response);
    // else if (true) // refresh token expired
    //   // log the user out
    else throw await this._getError(response);
  };

  _body = async (response) => await response.json();

  _getErrorNumber(correlationId) {
    if (!correlationId) return correlationId;

    const parts = correlationId.split("-");
    if (parts.length > 0) return parts[0];

    return correlationId;
  }

  _getError = async (response) => {
    let error,
      text = await response.text(),
      message,
      name = "Error",
      errorCode,
      correlationId;

    try {
      const json = JSON.parse(text); // Try to parse it as json
      if (json.message) {
        message = json.message;
      } else if (json.errorCode) {
        message = ErrorMessages[json.errorCode] || json.errorCode;
        errorCode = json.errorCode;
      } else {
        message = json?.errors?.message || json?.errors?.error_code;
      }
      if (json.error) name = json.error;
      if (json.correlationId) {
        correlationId = json.correlationId;
        if (response.status === 500)
          message += `\n\nError number: ${this._getErrorNumber(
            correlationId
          )}\n\nPlease screenshot and send to sg.helpdesk@aia.com via email`;
      }
    } catch (err) {
      console.log(text);
      message = `Unknown error: ${text}`;
    }

    switch (response.status) {
      case 400:
        error = new BadRequestError(message);
        break;
      case 401:
        error = new UnauthorizedError(message);
        break;
      case 404:
        // error = new ServerError(
        //   "The server is down or under maintenance, please try again later.",
        // );
        error = new UnauthorizedError(message);

        break;
      case 500:
        error = new ServerError(message);
        break;
      default:
        // error = new ApiError(message);
        error = new ServerError(
          "The server is down or under maintenance, please try again later."
        );
        break;
    }

    error.name = name;
    if (errorCode) error.errorCode = errorCode;
    error.correlationId = correlationId;

    return error;
  };

  _message = async (response) => {
    const text = await response.text(); // Parse it as text
    try {
      const json = JSON.parse(text); // Try to parse it as json
      if (json.message) return json.message;
      else {
        console.log(json);
        return "Unknown error";
      }
    } catch (err) {
      console.log(text);
      return "Unknown error";
    }
  };
}
