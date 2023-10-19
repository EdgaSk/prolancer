import axios from "axios";
import { API } from "./APIconst";

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API}/login`, userData);

    if (response.status !== 200) {
      throw new Error("Login failed");
    }

    return {
      success: true,
      message: "Login successful",
      userId: response.data.userId,
      roles: response.data.roles,
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
