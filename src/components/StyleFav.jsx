const StyleFav = () => {
  const str = "FAVORITES";

  return (
    <div className="favorite__container">
      <div className="box__image__1">
        <img
          src={require("../images/Shpigelyoel_big_tempting_hamburger_with_fries_and_ketchup_real__14b6af38-1cc4-4a33-9af0-3ff135b067db.png")}
          alt="chiken salad"
          className="image__1"
        />
      </div>
      <div className=" popup-h1 box__text">
        <span className="text__my">
          m y <br />
          f a <br />
          v o <br />
          r i <br />
          t e s <br />
        </span>
      </div>
      <div className="box__image__2">
        <img
          src={require("../images/Shpigelyoel_a_close_up_of_a_single_french_fry_getting_put_in_ke_11c886a1-67e3-4786-8093-b4165c10c928.png")}
          alt=""
        />
      </div>
      <div className="box__footer"></div>
    </div>
  );
};

export default StyleFav;
