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