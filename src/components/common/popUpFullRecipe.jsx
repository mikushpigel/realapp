import { useState } from "react";

const PopUpFullRecipe = ({ recipe, id, closeInfoWindow }) => {
  const {
    title,
    readyInMinutes,
    servings,
    nutrition: { nutrients },
    steps,
    spoonacularSourceUrl: link,
  } = recipe;
  // const [popUp,setPopUp] = useState({id,isOpen:false,isClose:true})
  return (
    <div className="divInfo">
      <div style={{ fontSize: 18, margin: 6 }}>{title}</div>
      <div className="todoInfo">ready In Minutes: {readyInMinutes}</div>
      <button className="btn" onClick={() => closeInfoWindow(id)}>
        Close
      </button>
    </div>
  );
};

export default PopUpFullRecipe;
