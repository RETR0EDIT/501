import React from "react";
import { Link } from "react-router-dom";
import "./styles/footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer-ctn">
      <div className="footer-title">
        <h1>NOUS CONTACTER</h1>
      </div>
      <div className="footer-div">
        <div className="footer-content">
          <div className="footer-flex">
            <div className="footer-info">
              <div className="footer-address">
                <p>IUT GUSTAVE EIFFEL - MEAUX</p>
                <p>7 Rue Jablinot</p>
                <p>77123 Meaux, France</p>
              </div>
              <div className="footer-contact">
                <div>
                  <span id="tel">Tel: </span>
                  <span>01 21 51 64 15</span>
                </div>
                <div>
                  <span id="email">E-mail : </span>
                  <span>IutMeaux@gmail.com</span>
                </div>
              </div>
            </div>
            <div className="footer-links">
              <Link to="/mentions-legales" className="footer-link">
                Mentions légales
              </Link>
              <Link to="/politique-confidentialite" className="footer-link">
                Politique de confidentialité
              </Link>
            </div>
            <div className="footer-logo">
              <img src="/logo_jpo.svg" alt="Logo JPO" />
              <div className="social-icons">
                <img src="/facebook.svg" alt="Facebook" />
                <img src="/youtube.svg" alt="YouTube" />
                <img src="/linkedin.svg" alt="LinkedIn" />
              </div>
            </div>
          </div>
        </div>

        <div className="footer-social">
          <p>IUT Meaux. Dev MMI © 2024</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
