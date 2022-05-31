import BaseApi from "./Base";

export default class ScanCam extends BaseApi {
  scanInventaris = async (idInventory) => {
    return await this.unsecureFetch(
      `hbb-responsive/scan-barcode/${idInventory}`,
      {
        method: "PUT",
      }
    );
  };
}
