import axios from "axios";

const BASE_URL = "http://localhost:3000"; // Adjust the base URL as needed

// =============== Input FA ===============
// Create FA
export const createFA = async (fa) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/fa`, fa);
    return response.data;
  } catch (error) {
    console.error("Error creating FA:", error);
    throw error;
  }
};
// Get all FAs
export const getAllFAs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/fa`);
    return response.data;
  } catch (error) {
    console.error("Error fetching FAs:", error);
    throw error;
  }
};
// Get FA by ID
export const getFAById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/fa/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching FA by ID:", error);
    throw error;
  }
};
// Delete FA by ID
export const deleteFAById = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/fa/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting FA by ID:", error);
    throw error;
  }
};

// =============== Minimize DFA ===============
// Create Minimized DFA
export const createMinimizedDFA = async (id) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/minimize`, { id });
    return response.data;
  } catch (error) {
    console.error("Error creating minimized DFA:", error);
    throw error;
  }
};

// Get All Minimized DFAs
export const getAllMinimizedDFAs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/minimize`);
    return response.data;
  } catch (error) {
    console.error("Error fetching minimized DFAs:", error);
    throw error;
  }
};
// Get Minimized DFA by ID
export const getMinimizedDFAById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/minimize/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching minimized DFA by ID:", error);
    throw error;
  }
};
// Delete Minimized DFA by ID
export const deleteMinimizedDFAById = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/minimize/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting minimized DFA by ID:", error);
    throw error;
  }
};

// =============== Converted DFA ===============
// Create Converted DFA
export const createConvertedDFA = async (id) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/convert`, { id });
    return response.data;
  } catch (error) {
    console.error("Error creating converted DFA:", error);
    throw error;
  }
};
// Get All Converted DFA
export const getAllConvertedDFAs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/convert`);
    return response.data;
  } catch (error) {
    console.error("Error fetching converted DFAs:", error);
    throw error;
  }
};
// Get Converted DFA by ID
export const getConvertedDFAById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/convert/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching converted DFA by ID:", error);
    throw error;
  }
};
// Delete Converted DFA by ID
export const deleteConvertedDFAById = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/convert/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting converted DFA by ID:", error);
    throw error;
  }
};
// Test String
export const testString = async (id, input) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/fa/test`, { id, input });
    return response.data;
  } catch (error) {
    console.error("Error testing string:", error);
    throw error;
  }
};

// =============== Others ===============
// Fetch All FA
export const getEveryFa = async () => {
  try {
    const [fAs, minimizedDFAs, convertedDFAs] = await Promise.all([
      getAllFAs(),
      getAllMinimizedDFAs(),
      getAllConvertedDFAs(),
    ]);
    return [...fAs, ...minimizedDFAs, ...convertedDFAs];
  } catch (error) {
    console.error("Error fetching all FAs:", error);
    throw error;
  }
};
