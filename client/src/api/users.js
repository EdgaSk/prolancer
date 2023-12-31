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

export const getUsersbyIDpublic = async (id) => {
  try {
    const response = await axios.get(`${API}/userspublic/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user:", error.message);
    throw new Error("Failed to fetch user");
  }
};

export const getAllPublicUsers = async () => {
  try {
    const response = await axios.get(`${API}/userspublic`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user:", error.message);
    throw new Error("Failed to fetch user");
  }
};
