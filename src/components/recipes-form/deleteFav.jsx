import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import favServics from "../../services/favServices";

const Deletefav = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const deleteFav = async () => {
      try {
        await favServics.deleteFav(id);
        navigate("/my-favorites");
      } catch (error) {
        console.log(error);
      }
    };

    deleteFav();
  }, []);
};

export default Deletefav;
