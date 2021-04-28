import axios from "@/plugins/axios";

const get = async payload => {
  const response = await axios.get(`/users/${payload}`);
  return response;
};
const getAll = async () => {
  const response = await axios.get(`/users`);
  return response;
};

const post = async payload => {
  const response = await axios.put(`/users/${payload}`);
  return response;
};
const put = async payload => {
  const response = await axios.put(`/users/${payload.id}`, { ...payload });
  return response;
};

const patch = async payload => {
  const response = await axios.patch(`/users/${payload.id}`, {
    ...payload
  });
  return response;
};

const deleteRecord = async payload => {
  const response = await axios.delete(`/users/${payload}`);
  return response;
};

export default { get, getAll, post, put, patch, deleteRecord };
