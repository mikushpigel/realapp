import background from "../images/vegbig.jpg";
import Home from "./Home";

const Index = () => {
  const bg = {
    background: `linear-gradient(to right bottom, rgba(205, 169, 157, 0.7), rgba(205, 169, 157, 0.7)),
  url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "top",
    position: "relative",
    clipPath: "polygon(0 0,100% 0,100% 75vh, 0 100%)",
  };
  return (
    <>
      <div className="container-index">
        <header style={bg} className="header">
          <div className="text-box">
            <div className="heading-primary-main">
              Yammy<span className="span-main-title">recipes</span>
              <div className="heading-primary-sub">Add flavor to your life</div>
            </div>
          </div>
        </header>
        <Home />
      </div>
    </>
  );
};

export default Index;
