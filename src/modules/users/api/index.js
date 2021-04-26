import axios from "@/plugins/axios";

const get = async payload => {
  const response = await axios.get(`/users/${payload}`);
  return response;
};
const getAll = async () => {
  const response = await axios.get(`/users`);
  return response;
};

export default { get, getAll };
