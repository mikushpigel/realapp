import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import buyListServics from "../../services/buyListServices";

const DeleteProd = ({ redirect }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    const deleteProd = async () => {
      await buyListServics.deleteItem(id);
      toast("The product has been deleted");
      navigate(redirect);
    };

    deleteProd();
  }, []);

  return null;
};

export default DeleteProd;
