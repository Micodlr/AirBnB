import "./footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div id="footer-container">
      <Link id="footer" to="/about">
        About
      </Link>
    </div>
  );
}

export default Footer;
