import { useAuth } from "../context/auth.context";
import httpServices from "./httpServices";

export function saveFavorite(fav) {
  return httpServices.post("/myfav", fav);
}

export function getAllFavorites() {
  return httpServices.get("/myfav/all");
}

export function deleteFav(id) {
  return httpServices.delete(`/myfav/delete/${id}`);
}

export function deleteAll() {
  return httpServices.delete(`/myfav/deleteAll`);
}
const favServics = {
  saveFavorite,
  getAllFavorites,
  deleteFav,
  deleteAll,
};

export default favServics;
