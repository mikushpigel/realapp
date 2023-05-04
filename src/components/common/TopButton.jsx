import ScrollToTop from "../../services/scrollToTop";

const TopButton = () => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div onClick={handleClick} className="arrow-top">
      <i className="bi bi-arrow-up-circle-fill"></i>
    </div>
  );
};

export default TopButton;
