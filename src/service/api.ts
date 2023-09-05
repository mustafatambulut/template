import { get } from "lodash";
import { strapi, pmsApi } from "./axiosInstances";
import {getSessionStorage} from "@/utils/helper";

export const getPage = async (page: string) => {
  const { data } = await strapi.get(`/api/${page}?populate=deep`);
  return get(data, "data");
};

export const getMenu = async () => {
  const { data } = await strapi.get("/api/menus?nested&populate=*");
  return get(data, "data");
};

export const auth = async (payload) => {
  try {
    return await pmsApi.post("/login", payload);
  } catch (err) {
    return get(err, "response.data");
  }
};

export const getLocations = async () => {
  try {
    return await pmsApi.get("/locations");
  } catch (err) {
    return get(err, "response.data");
  }
};

export const getFilters = async () => {
  try {
    return await pmsApi.get("/search/filters");
  } catch (err) {
    return get(err, "response.data");
  }
};

export const getListings = async (params) => {
  try {
    const config = params ? { params: params } : {};
    return await pmsApi.get("/search/results", config);
  } catch (err) {
    return get(err, "response.data");
  }
};

export const getRecentReservations = async (reservationType?: string) => {
  try {
    const param = reservationType ? `/${reservationType}` : "";
    return await pmsApi.get(`/profile/reservations${param}`,{
      headers: {
        Authorization: `Bearer ${getSessionStorage("token")}`
      }
    });
  } catch (err) {
    return get(err, "response.data");
  }
};
export const signUp = async ({ email, password, fullname, phone }) => {
  const payload = {
    email,
    phone,
    fullname,
    password
  };

  try {
    return await pmsApi.post("/signup", payload);
  } catch (err) {
    return get(err, "response.data");
  }
};

export const forgotPassword = async (email) => {
  try {
    return await pmsApi.post("/forgot-password", email);
  } catch (err) {
    return get(err, "response.data");
  }
};

// todo: parola yenileme endpointi tamamlanınca güncellenecek
export const profileEdit = async (payload) => {
  try {
    return await pmsApi.post("/profile/edit", payload);
  } catch (err) {
    return err;
  }
};
