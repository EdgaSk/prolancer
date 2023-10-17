import axios from "axios";
import { API } from "./APIconst";

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API}/login`, userData);

    if (response.status !== 200) {
      throw new Error("Login failed");
    }

    // Prisijungimas sėkmingas, grąžiname sėkmės pranešimą
    return { success: true, message: "Login successful" };
  } catch (error) {
    // Prisijungimas nesėkmingas, grąžiname klaidos pranešimą
    return { success: false, message: error.message };
  }
};
