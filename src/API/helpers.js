import ky from "ky";
import {Auth} from "@aws-amplify/auth";
import {API_BASE_URL, TENANT} from '../config'

export const fetchTenantInformations = () =>
ky.get(`${API_BASE_URL}/tenants-repository/tenants/key/${TENANT}`).json();

export const withAPIClient = async (apiCallFunction) => {
const currentUser = await Auth.currentAuthenticatedUser();
if (currentUser.signInUserSession) {
  const {
    accessToken: { jwtToken }
  } = currentUser.signInUserSession;

  const lsAPI = ky.extend({
    prefixUrl: API_BASE_URL,
    headers: { Authorization: `Bearer ${jwtToken}` }
  });

  return apiCallFunction(lsAPI);
} else {
  throw new Error("no token");
}
};