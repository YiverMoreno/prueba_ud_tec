import api from "./api";

export const getConsumers = () =>
  api.get("/consumers");

export const createConsumer = (data) =>
  api.post("/consumers", data);

export const updateConsumer = (id, data) =>
  api.put(`/consumers/${id}`, data);

export const deleteConsumer = (id) =>
  api.delete(`/consumers/${id}`);