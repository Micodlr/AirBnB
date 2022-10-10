import "./footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer id="footer-container">
      <Link id="footer" to="/about">
        About
      </Link>
    </footer>
  );
}

export default Footer;
