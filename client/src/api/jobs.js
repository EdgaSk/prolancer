import axios from "axios";
import { API } from "./APIconst";

const getAllJobs = async (accessToken) => {
  try {
    const response = await axios.get(`${API}/jobs`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch jobs:", error.message);
    throw new Error("Failed to fetch jobs");
  }
};

export default getAllJobs;
