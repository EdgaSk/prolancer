import { API } from "./APIconst";
import axios from "axios";

export const getUserbyID = async (accessToken, id) => {
  try {
    const response = await axios.get(`${API}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user:", error.message);
    throw new Error("Failed to fetch user");
  }
};
