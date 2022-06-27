import BaseApi from "./Base";

export default class ActionApi extends BaseApi {
  repairInventory = async (payload) => {
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

  findToInventory = async () => {
    return await this.unsecureFetch(`hbb-responsive/search-emp`, {
      method: "GET",
    });
  };

  movingInventory = async (payload) => {
    const formdata = new FormData();
    formdata.append("type", payload.type);
    formdata.append("no_hbb", payload.no_hbb);
    formdata.append("nipg", payload.values.nipg);
    formdata.append("id_area_name", payload.values.id_area);
    formdata.append("id_satker_name", payload.values.id_satker);
    formdata.append("id_lokasi_name", payload.values.id_lokasi);

    return await fetch(
      "http://103.93.57.36:9000/hbb-responsive/create-transaction",
      {
        method: "POST",
        body: formdata,
        redirect: "follow",
      }
    );
  };

  deleteInventory = async (payload) => {
    const formdata = new FormData();
    formdata.append("type", payload.type);
    formdata.append("no_hbb", payload.no_hbb);
    formdata.append("reason", payload.values.reason);
    formdata.append("remark", payload.values.remar);

    return await fetch(
      "http://103.93.57.36:9000/hbb-responsive/create-transaction",
      {
        method: "POST",
        body: formdata,
        redirect: "follow",
      }
    );
  };
}
