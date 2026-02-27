import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL + "/category";

export const getCategory = () => axios.get(API_URL + "/all");

export const createCategory = (data) => axios.post(API_URL + "/add", data);

export const deleteCategory = (id) => axios.delete(API_URL + "/delete/" + id);

