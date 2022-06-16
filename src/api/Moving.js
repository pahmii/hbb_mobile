import BaseApi from "./Base";

export default class MovingApi extends BaseApi {
  moveInventory = async () => {
    return await this.unsecureFetch(`hbb-responsive/search-emp`, {
      method: "GET",
    });
  };
}
