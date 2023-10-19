import axios from "axios";
import { API } from "./APIconst";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API}/register`, userData);

    if (response.status !== 200) {
      throw new Error("Registration failed");
    }

    return { success: true, message: "Registration successful" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
