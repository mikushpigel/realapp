import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UseMyFav from "../../hooks/useMyFav";
import favServics from "../../services/favServices";

const DeleteAll = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const deleteAll = async () => {
      await favServics.deleteAll();
      toast("deleted successfuly!");
      navigate("/my-favorites");
    };

    deleteAll();
  }, []);
};

export default DeleteAll;
