import React from "react";
import { Wrapper } from "../../../../components/components.styles";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <Wrapper className="grid">
        <div className="grid-col-1">
          <h3>CRYPTO-INTEL</h3>
        </div>
        <div className="grid-col-2">
          <li>Home</li>
          <li>Signals</li>
          <li>Signal Analysis</li>
          <li>About us</li>
        </div>
        <div className="grid-col-3">
          <h4>CONTACT</h4>
          <p>support@cryptointel.com</p>
        </div>
        <div className="grid-col-4">
          <h4>Legal Disclaimer</h4>
          <p>
            The above references are just an opinion meant for information
            purposes only. They are not intended to be an investment advice.
            Please seek a duly licensed professional for the investment advice.
            Crypto-Intel won’t be liable for any losses you may incur following
            our opinion.
          </p>
        </div>
      </Wrapper>
      <div className="divider" />
      <div className="copyrights">
        copyrights &copy; 2021 ALL RIGHTS RESERVED
      </div>
    </footer>
  );
};

export default Footer;
