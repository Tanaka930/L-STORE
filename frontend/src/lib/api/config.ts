import Cookies from "js-cookie"

export const config = {
  headers: {
  "access-token": Cookies.get("_access_token"),
  "client": Cookies.get("_client"),
  "uid": Cookies.get("_uid")
  }
}