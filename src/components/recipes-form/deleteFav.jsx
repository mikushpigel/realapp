import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import favServics from "../../services/favServices";

const Deletefav = ({ redirect }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    const deleteFav = async () => {
      await favServics.deleteFav(id);
      toast("one favorite deleted successfuly!");
      navigate(redirect);
    };

    deleteFav();
  }, []);
};

export default Deletefav;
