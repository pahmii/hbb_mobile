import { React, useState } from "react";
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
    formdata.append("nipg_user", payload.nipgUser);

    return await fetch(
      "https://hbb.pgnmas.co.id/hbb-responsive/create-transaction",
      {
        method: "POST",
        body: formdata,
        redirect: "follow",
      }
    )
      .then((response) => response.text())
      .catch((error) => console.log("error", error));
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
    formdata.append("nipg_user", payload.nipgUser);

    return await fetch(
      "https://hbb.pgnmas.co.id/hbb-responsive/create-transaction",
      {
        method: "POST",
        body: formdata,
        redirect: "follow",
      }
    )
      .then((response) => response.text())
      .catch((error) => console.log("error", error));
  };

  deleteInventory = async (payload) => {
    const formdata = new FormData();
    formdata.append("type", payload.type);
    formdata.append("no_hbb", payload.no_hbb);
    formdata.append("reason", payload.values.reason);
    formdata.append("remark", payload.values.remark);
    formdata.append("nipg_user", payload.nipgUser);

    return await fetch(
      "https://hbb.pgnmas.co.id/hbb-responsive/create-transaction",
      {
        method: "POST",
        body: formdata,
        redirect: "follow",
      }
    )
      .then((response) => response.text())
      .catch((error) => console.log("error", error));
  };
}
