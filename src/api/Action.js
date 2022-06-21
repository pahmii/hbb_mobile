import BaseApi from "./Base";

export default class ActionApi extends BaseApi {
  repairInventory = async (payload) => {
    // const accessToken = await SecureStore.getItemAsync("accessToken");
    const formdata = new FormData();
    formdata.append(
      "attachment_file",
      {
        name: payload.attachment_file.uri.substr(
          payload.attachment_file.uri.lastIndexOf("/") + 1
        ),
        type: `image/jpeg`,
        uri: payload.attachment_file.uri,
      },
      "[PROXY]"
    );
    formdata.append("type", payload.type);
    formdata.append("no_hbb", payload.no_hbb);
    formdata.append("remark", payload.remark);

    return await fetch(
      "http://103.93.57.36:9000/hbb-responsive/create-transaction",
      {
        method: "POST",
        body: formdata,
        redirect: "follow",
      }
    );
  };

  moveInventory = async () => {
    return await this.unsecureFetch(`hbb-responsive/search-emp`, {
      method: "GET",
    });
  };
}
