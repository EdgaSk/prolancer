import { API } from "./APIconst";
import axios from "axios";

export const postServices = async (accessToken, data) => {
  try {
    const response = await axios.post(`${API}/services`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: data,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user:", error.message);
    throw new Error("Failed to fetch user");
  }
};

export const getAllServicesPublic = async (data) => {
  try {
    const response = await axios.get(`${API}/servicespublic`, data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user:", error.message);
    throw new Error("Failed to fetch user");
  }
};

export const getAllServicesWithUsers = async () => {
  try {
    const response = await axios.get(
      `${API}/servicespublic/services-with-users`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user:", error.message);
    throw new Error("Failed to fetch user");
  }
};

export const getAllServicesWithUsersByID = async (id) => {
  try {
    const response = await axios.get(
      `${API}/servicespublic/services-with-users/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user:", error.message);
    throw new Error("Failed to fetch user");
  }
};
