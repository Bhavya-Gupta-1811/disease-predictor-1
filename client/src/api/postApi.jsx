import axios from "axios";

const api = axios.create({
  baseURL: "https://disease-predictor-1-2.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const predictDisease = async (symptoms) => {
  try {
    const response = await api.post("/predict", { symptoms }); 
    return response.data;
  } catch (error) {
    console.error("Error predicting disease:", error);
    throw error;
  }
};

export default api;
