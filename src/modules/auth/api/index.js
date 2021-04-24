import axios from "@/plugins/axios";

const login = async payload => {
  const response = await axios.post("/login", payload);
  return response;
};

export default { login };
