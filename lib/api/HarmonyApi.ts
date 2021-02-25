import ServiceApi from "./service/spotify/ServiceApi";
import UserApi from "./user/UserApi";

export default class HarmonyApi {
  public userApi: UserApi = new UserApi()
  public serviceApi: ServiceApi = new ServiceApi()
}