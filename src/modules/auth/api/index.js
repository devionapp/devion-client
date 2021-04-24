import axios from "@/plugins/axios";

const login = async payload => {
  const response = await axios.post("/login", payload);
  return response;
};

const signUp = async payload => {
  const response = await axios.post("/signup", payload);
  return response;
};

const registerCompany = async payload => {
  const response = await axios.post("/tenants", payload);
  return response;
};

export default { login, signUp, registerCompany };
