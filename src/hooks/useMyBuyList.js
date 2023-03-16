import { useEffect, useState } from "react";
import buyListServics from "../services/buyListServices";

const UseMyBuyList = () => {
  const [myBuyList, setBuyList] = useState([]);

  useEffect(() => {
    const getAll = async () => {
      const { data } = await buyListServics.getAllBuyList();

      setBuyList(data);
    };

    getAll();
  }, []);

  return myBuyList;
};

export default UseMyBuyList;
