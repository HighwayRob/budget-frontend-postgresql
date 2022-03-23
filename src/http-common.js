import axios from "axios";

export default axios.create({
//baseURL: "http://localhost:8082",
baseURL: "http://rmsystem.ddns.net:8082",
  headers: {
    "Content-type": "application/json",
  },
});
