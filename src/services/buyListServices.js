import httpServices from "./httpServices";

export function saveItem(list) {
  return httpServices.post("/mybuylist", list);
}

export function getAllBuyList() {
  return httpServices.get("/mybuylist/all");
}

export function deleteItem(id) {
  return httpServices.delete(`/mybuylist/delete/${id}`);
}

export function deleteAll() {
  return httpServices.delete(`/mybuylist/deleteAll`);
}

export function getItem(id) {
  return httpServices.get(`/mybuylist/${id}`);
}

export function updateItem(id, item) {
  return httpServices.patch(`/mybuylist/edit/${id}`, item);
}
const buyListServics = {
  saveItem,
  getAllBuyList,
  deleteItem,
  getItem,
  updateItem,
  deleteAll,
};

export default buyListServics;
