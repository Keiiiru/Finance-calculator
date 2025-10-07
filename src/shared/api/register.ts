import { UserFormDataType } from "../types/user";
import axios from "axios";

export async function registerAPI(formData: UserFormDataType) {
  const response = await axios.post("/auth/api/register/", formData);
  return response;
}
