import React, { useEffect, useState } from "react";
import pad from "../../Assets/pad.png";
import green_box from "../../Assets/greenBox.png";
import rightIcon from "../../Assets/rightIcon.png";
import lg_pad from "../../Assets/lg-pad.png";
import "./Home.css";
import "../../components/NavBar/Navbar.css";
import { Wrapper } from "../../components/components.styles";
import Button from "../../components/Button/Button";
import Navbar from "../../components/NavBar/Navbar";
import CRYPTO_HOME_DESIGN from "../../Assets/Home/CRYPTO_HOME_DESIGN.svg";
import digital_currency from "../../Assets/Home/digital_currency.svg";
import Bitcoin_Isometric from "../../Assets/Home/Bitcoin _Isometric.svg";
import customer_service from "../../Assets/Home/Customer service.svg";
import crypto_portfolio from "../../Assets/Home/crypto_portfolio.svg";
import Decision from "../../Assets/Home/Decision.svg";
import Report_analysis from "../../Assets/Home/Report_analysis.svg";
import Experience from "../../Assets/Home/Experience.svg";

const ImgAnimationHamdler = (e) => {
  document.getElementById("green1").style.top = e.x / 1000 - 10 + "%";
  document.getElementById("green1").style.left = e.y / 100 - 10 + "%";
  document.getElementById("pad").style.right = e.x / 100 + 20 + "%";
  document.getElementById("pad").style.top = e.y / 100 - 10 + "%";

  document.getElementById("lg-pad1").style.top = e.x / 1000 - 10 + "%";
  document.getElementById("lg-pad1").style.right = e.y / 100 - 10 + "%";
  document.getElementById("lg-pad2").style.left = e.x / 100 - 20 + "%";
  document.getElementById("lg-pad2").style.bottom = e.y / 100 - 10 + "%";

  document.getElementById("pad3").style.top = e.x / 1000 - 10 + "%";
  document.getElementById("pad3").style.right = e.y / 100 - 10 + "%";
};

const Home = () => {
  // eslint-disable-next-line
  const [scrollPosition, setScrollPosition] = useState(true);
  useEffect(() => {
    window.addEventListener("mousemove", ImgAnimationHamdler);
    window.addEventListener("scroll", () => {
      setScrollPosition(
        window.document.body.clientHeight - window.scrollY > window.innerHeight
      );
    });

    return () => {
      window.removeEventListener("mousemove", ImgAnimationHamdler);
    };
  }, []);

  const ScrollDownHandler = () => {
    window.scrollTo(0, window.scrollY + 500);
  };

  return (
    <>
      <Navbar />
      <main className="home-container">
        <Wrapper className="home-section-1" id="home-container-section-1">
          <div className="section-1-container">
            <h1>Lift up with Signals, Worry Free!</h1>
            <p>
              The signals will be always analysed before we getting into the
              stage and we have experienced professionals for that from around
              the world! Our group gives you access that will forever change
              your definition of the crypto signals service.
            </p>
            <Button
              classes="button"
              Content="GET SIGNALS WITH LIFETIME ACCESS!"
            />
          </div>
          <div className="section-1-img">
            <img
              src={CRYPTO_HOME_DESIGN}
              alt="CRYPTO_HOME_DESIGN"
              className="crypto-bg crypto-bg-image-hidden"
            />
          </div>
        </Wrapper>
        <Wrapper className="home-section-2">
          <div style={{ position: "relative", marginBottom: "2rem" }}>
            <h2>Packet full of Features</h2>
          </div>
          <div className="sec-2-features">
            <div>
              <img src={customer_service} alt="support" width="130px" />
              <p>Money never sleeps, neither do our signals</p>
            </div>
            <div>
              <img src={Decision} alt="Decision" width="200px" height="100px" />
              <p>Make calculated decisions</p>
            </div>
            <div>
              <img src={Report_analysis} alt="Report_analysis" width="130px" />
              <p>Proven track record</p>
            </div>
            <div>
              <img src={Experience} alt="Experience" width="130px" />
              <p>No experience needed</p>
            </div>
          </div>
        </Wrapper>
        <Wrapper>
          <div className="features-container">
            <div className="features-img-container">
              <img
                className="digital_currency"
                src={digital_currency}
                alt="digital_currency"
                width="500px"
              />
              <img className="pad" id="pad" src={pad} alt="pad" />
              <img
                className="greenbox"
                id="green1"
                src={green_box}
                alt="greenbox"
              />
            </div>
            <div className="features-content-container">
              <h3>
                SMART Bots The perfect Bots to trade Smart for successful
                trading
              </h3>
              <p>
                Let The SMART Bot do the Smart work for you. We take care of the
                heavy lifting, so you can enjoy the profits.
              </p>
              <div style={{ marginTop: "5rem" }}>
                <div style={{ display: "flex", margin: "2rem 0" }}>
                  <img
                    src={rightIcon}
                    height="40px"
                    width="40px"
                    alt="rightIcon"
                  />
                  <p style={{ margin: "0 0 0 1rem" }}>
                    Trade on BTC, ETH & LINK
                  </p>
                </div>
                <div style={{ display: "flex", margin: "2rem 0" }}>
                  <img
                    src={rightIcon}
                    height="40px"
                    width="40px"
                    alt="rightIcon"
                  />
                  <p style={{ margin: "0 0 0 1rem" }}>Works on Binance</p>
                </div>
                <div style={{ display: "flex", margin: "2rem 0" }}>
                  <img
                    src={rightIcon}
                    height="40px"
                    width="40px"
                    alt="rightIcon"
                  />
                  <p style={{ margin: "0 0 0 1rem" }}>Fully Automated</p>
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
        <Wrapper>
          <div className="features-container col-reverse">
            <div className="features-content-container">
              <h3>Trade with our professional traders</h3>
              <p>
                Enjoy a share and care trading community with 4Cs professional
                traders. The Trade Room aims to provide a relaxed, friendly
                environment with like-minded traders to discuss, learn and grow
                together.
              </p>
              <div style={{ marginTop: "5rem" }}>
                <div style={{ display: "flex", margin: "2rem 0" }}>
                  <img
                    src={rightIcon}
                    height="40px"
                    width="40px"
                    alt="rightIcon"
                  />
                  <p style={{ margin: "0 0 0 1rem" }}>Daily BTC Update</p>
                </div>
                <div style={{ display: "flex", margin: "2rem 0" }}>
                  <img
                    src={rightIcon}
                    height="40px"
                    width="40px"
                    alt="rightIcon"
                  />
                  <p style={{ margin: "0 0 0 1rem" }}>
                    Channel and Community Chat
                  </p>
                </div>
                <div style={{ display: "flex", margin: "2rem 0" }}>
                  <img
                    src={rightIcon}
                    height="40px"
                    width="40px"
                    alt="rightIcon"
                  />
                  <p style={{ margin: "0 0 0 1rem" }}>On Demand Analysis</p>
                </div>
              </div>
            </div>
            <div className="features-img-container">
              <img
                src={Bitcoin_Isometric}
                className="Bitcoin_Isometric"
                alt="Bitcoin_Isometric"
              />
              <img
                src={lg_pad}
                className="lg-pad1"
                id="lg-pad1"
                alt="lg-pad1"
              />
              <img
                src={lg_pad}
                className="lg-pad2"
                id="lg-pad2"
                alt="lg-pad2"
              />
            </div>
          </div>
        </Wrapper>
        <Wrapper>
          <div className="features-container">
            <div className="features-img-container">
              <img
                className="crypto_portfolio"
                src={crypto_portfolio}
                alt="crypto_portfolio"
                width="400px"
              />
              <img className="pad" id="pad3" src={pad} alt="pad3" />
            </div>
            <div className="features-content-container">
              <h3>Features that you will love</h3>
              <p>
                Let The SMART Bot do the Smart work for you. We take care of the
                heavy lifting, so you can enjoy the profits.
              </p>
              <div style={{ marginTop: "5rem" }}>
                <div style={{ display: "flex", margin: "2rem 0" }}>
                  <img
                    src={rightIcon}
                    height="40px"
                    width="40px"
                    alt="rightIcon"
                  />
                  <p style={{ margin: "0 0 0 1rem" }}>
                    The perfect Bitcoin, Ethereum & LINK Algorithmic bots to
                    grow your capital
                  </p>
                </div>
                <div style={{ display: "flex", margin: "2rem 0" }}>
                  <img
                    src={rightIcon}
                    height="40px"
                    width="40px"
                    alt="rightIcon"
                  />
                  <p style={{ margin: "0 0 0 1rem" }}>
                    The most accurate and precise margin signals on the market
                  </p>
                </div>
                <div style={{ display: "flex", margin: "2rem 0" }}>
                  <img
                    src={rightIcon}
                    height="40px"
                    width="40px"
                    alt="rightIcon"
                  />
                  <p style={{ margin: "0 0 0 1rem" }}>
                    A professional dashboard to manage all your trades and
                    investments
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
        <Wrapper className="xtra-section">
          <div className="xtra-section-container">
            <h3>Let's Start Earning</h3>
            <p>
              Take your trades to the next level by optimizing your portfolio to
              achieve maximum profit.
            </p>
            <Button classes="btn-free" Content="Get started for Free!" />
          </div>
        </Wrapper>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100">
          <path
            fill="#5C7AFF"
            fill-opacity="1"
            d="M0,64L1440,96L1440,0L0,0Z"
          ></path>
        </svg>

        {/* <Wrapper className="home-goal-container">
          <p>
            Our goal is to create the best trading experience for you. We make
            use of our experience in the crypto world and strong ties with many
            traders to offer you top-notch services such as automatic trades,
            market analysis and monitoring of your account, price alerts,
            investor visibility tools, training support and much more… The
            Crypto Intel SMART Bots package offers a complete line of quality
            services for investors. At the same time it gives you a small edge
            on the market through automatic trading bots or professional
            assistance with the settings of your Bots Dashboard. Perfecting an
            optimal strategy is at all times the objective when dealing with
            cryptocurrency trading. Crypto Intel’s SMART Bots do just that!
          </p>
        </Wrapper> */}
        <Wrapper>
          <div className="subscribe-container">
            <div className="sub-div">
              <h2>Do you want to know more or need help?</h2>
              <p>
                Feel free to contact us via e-mail:{" "}
                <span>support@cryptointel.com</span>
              </p>
              <div className="newsletter-sub">
                <p>Join our exclusive newsletter</p>
                <p>Subscribe to get our latest content by email.</p>
              </div>
              <input type="email" />
              <Button classes="btn-subs" Content="subscribe" />
            </div>
          </div>
        </Wrapper>
      </main>
      <footer>
        <Wrapper className="grid">
          <div className="grid-col-1">
            <h3>CRYTPTO_INTEL</h3>
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
              Please seek a duly licensed professional for the investment
              advice. Crypto-Intel won’t be liable for any losses you may incur
              following our opinion.
            </p>
          </div>
        </Wrapper>
        <div className="divider" />
        <div className="copyrights">
          copyrights &copy; 2021 ALL RIGHTS RESERVED
        </div>
      </footer>
      <div className="scroll-container" onClick={ScrollDownHandler}>
        <i className="bi bi-arrow-down"></i>
      </div>
    </>
  );
};

export default Home;
