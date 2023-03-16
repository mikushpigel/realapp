import { useEffect, useState } from "react";
import buyListServics from "../services/buyListServices";

const useItem = (id) => {
  const [item, setItem] = useState(null);

  useEffect(() => {
    const getItem = async () => {
      const { data } = await buyListServics.getItem(id);
      setItem(data);
    };
    getItem();
  }, []);

  return item;
};

export default useItem;
