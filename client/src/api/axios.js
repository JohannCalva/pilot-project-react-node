import axios from "axios";

//Instancia de axios con la URL base del backend
const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export default instance;
