const Footer = () => {
  return (
    <footer className="footer-app border-top pt-3 py-2">
      <span>Yammy recipes</span>
      <span className="mx-2">
        <i className="bi bi-c-circle"></i>
        &nbsp; Rotem Shpigel
      </span>
      <span>{new Date().getFullYear()}</span>
    </footer>
  );
};

export default Footer;
