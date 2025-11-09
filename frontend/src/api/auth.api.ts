import { api } from "./api";
import { SignupPayloadType } from "../types.global/type.signup";
import { LoginPayloadType } from "../types.global/type.login";

export const userLoginAPI = async (payload: LoginPayloadType) => {
  return api.post("/login", payload);
};

export const userRegisterAPI = async (payload: SignupPayloadType) => {
  return api.post("/register", payload);
};
