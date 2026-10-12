import React, { createContext, useState } from "react";
import image from "../resources/eel.jpg";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/hot";

const AuthContext = createContext();

async function loadData() {
  try {
    const response = await axios.get(`${BASE_URL}/login/`);
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    alert("No internet connection!");
  }
}

const AuthProvider = ({ children }) => {
  const [currentTable, setCurrentTable] = useState(null);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
export { AuthContext };
