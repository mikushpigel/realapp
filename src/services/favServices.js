import { useAuth } from "../context/auth.context";
import httpServices from "./httpServices";

export function saveFavorite(fav) {
  return httpServices.post("/myfav", fav);
}

export function getAllFavorites() {
  return httpServices.get("/myfav/all");
}

const favServics = {
  saveFavorite,
  getAllFavorites,
};

export default favServics;
