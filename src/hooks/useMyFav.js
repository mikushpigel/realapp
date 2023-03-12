import { useEffect, useState } from "react";
import favServics from "../services/favServices";

const UseMyFav = () => {
  const [myFavs, setFavs] = useState([]);

  useEffect(() => {
    const getAll = async () => {
      const { data } = await favServics.getAllFavorites();

      setFavs(data);
    };

    getAll();
  }, []);

  return myFavs;
};

export default UseMyFav;
