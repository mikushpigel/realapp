import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import buyListServics from "../../services/buyListServices";

const DeleteAllBuyList = ({ redirect }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const deleteAll = async () => {
      await buyListServics.deleteAll();
      toast("Your Shoping List deleted Successfuly!");
      navigate(redirect);
    };

    deleteAll();
  }, []);

  return null;
};

export default DeleteAllBuyList;
