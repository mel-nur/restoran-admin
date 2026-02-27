import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL + "/products";

export const getProducts = () => axios.get(API_URL + "/listele");

export const createProduct = (data) => axios.post(API_URL+"/add", data);

export const deleteProduct = (id) => axios.delete(API_URL + "/delete/" + id);

export const updateProduct = (id, data) => axios.put(`${API_URL}/${id}`, data);