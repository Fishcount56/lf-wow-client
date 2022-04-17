import axios from "axios"

export const API = axios.create({
  baseURL: "http://localhost:5000/api/v1/" || "https://lf-wow-server.herokuapp.com/api/v1/" || process.env.REACT_APP_SERVER_URL
})

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`
  } else {
    delete API.defaults.headers.common["Authorization"]
  }
}