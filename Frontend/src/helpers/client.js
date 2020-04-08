import Axios from "axios";

const Client = Axios.create({
  baseURL: process.env.REACT_APP_API,
});

export default Client;
