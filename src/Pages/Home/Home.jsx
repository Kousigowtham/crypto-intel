import React, { useEffect, useState } from "react";
import pad from "../../Assets/pad.png";
import green_box from "../../Assets/greenBox.png";
import lg_pad from "../../Assets/lg-pad.png";
import "./Home.css";
import "../../components/NavBar/Navbar.css";
import { Wrapper } from "../../components/components.styles";
import Button from "../../components/Button/Button";
import Navbar from "../../components/NavBar/Navbar";
import digital_currency from "../../Assets/Home/digital_currency.svg";
import Bitcoin_Isometric from "../../Assets/Home/Bitcoin _Isometric.svg";
import customer_service from "../../Assets/Home/Customer service.svg";
import crypto_portfolio from "../../Assets/Home/crypto_portfolio.svg";
import Report_analysis from "../../Assets/Home/Report_analysis.svg";
import Experience from "../../Assets/Home/Experience.svg";
import business_decisions from "../../Assets/Home/business_decisions.svg";
import Svg from "./Component/Svg/Svg";
import { motion } from "framer-motion";
import { HOME_LABELS } from "../../strings";
import Features from "./Component/Features/Features";
import Footer from "./Component/Footer/Footer";

// const ImgAnimationHamdler = (e) => {
//   document.getElementById("green1").style.top = e.x / 1000 - 10 + "%";
//   document.getElementById("green1").style.left = e.y / 100 - 10 + "%";
//   document.getElementById("pad").style.right = e.x / 100 - 10 + "%";
//   document.getElementById("pad").style.top = e.y / 100 - 10 + "%";

//   document.getElementById("lg-pad1").style.top = e.x / 1000 - 10 + "%";
//   document.getElementById("lg-pad1").style.right = e.y / 100 - 10 + "%";
//   document.getElementById("lg-pad2").style.left = e.x / 100 - 20 + "%";
//   document.getElementById("lg-pad2").style.bottom = e.y / 100 - 10 + "%";

//   document.getElementById("pad3").style.top = e.x / 1000 - 10 + "%";
//   document.getElementById("pad3").style.right = e.y / 100 - 10 + "%";
// };

const featuresList = [
  {
    imageList: [
      {
        src: digital_currency,
        name: "digital_currency",
        className: "digital_currency",
      },
      {
        src: green_box,
        name: "green_box",
        className: "green_box",
      },
      {
        src: pad,
        name: "pad",
        className: "pad",
      },
    ],
    header: "SMART Bots The perfect Bots to trade Smart for successful trading",
    description:
      "Let The SMART Bot do the Smart work for you. We take care of the heavy lifting, so you can enjoy the profits.",
    featuresList: [
      "Trade on BTC, ETH & LINK",
      "Works on Binance",
      "Fully Automated",
    ],
    columnReverse: false,
    isDividerPresent: true,
  },
  {
    imageList: [
      {
        src: Bitcoin_Isometric,
        name: "Bitcoin_Isometric",
        className: "Bitcoin_Isometric",
      },
      {
        src: lg_pad,
        name: "lg_pad1",
        className: "lg_pad1",
      },
      {
        src: lg_pad,
        name: "lg_pad2",
        className: "lg_pad2",
      },
    ],
    header: "Trade with our professional traders",
    description:
      "Enjoy a share and care trading community with 4Cs professional traders. The Trade Room aims to provide a relaxed, friendly environment with like-minded traders to discuss, learn and grow together.",
    featuresList: [
      "Daily BTC Update",
      "Channel and Community Chat",
      "On Demand Analysis",
    ],
    columnReverse: true,
    isDividerPresent: true,
  },
  {
    imageList: [
      {
        src: crypto_portfolio,
        name: "crypto_portfolio",
        className: "crypto_portfolio",
      },
      {
        src: pad,
        name: "pad3",
        className: "pad",
      },
    ],
    header: "Features that you will love",
    description:
      "Let The SMART Bot do the Smart work for you. We take care of the heavy lifting, so you can enjoy the profits.",
    featuresList: [
      "The perfect Bitcoin, Ethereum & LINK Algorithmic bots to grow your capital",
      "The most accurate and precise margin signals on the market",
      "A professional dashboard to manage all your trades and investments",
    ],
    columnReverse: false,
    isDividerPresent: false,
  },
];

const Home = () => {
  // eslint-disable-next-line
  const [scrollPosition, setScrollPosition] = useState(true);
  useEffect(() => {
    // window.addEventListener("mousemove", ImgAnimationHamdler);
    window.addEventListener("scroll", () => {
      setScrollPosition(
        window.document.body.clientHeight - window.scrollY > window.innerHeight
      );
    });

    // return () => {
    //   window.removeEventListener("mousemove", ImgAnimationHamdler);
    // };
  }, []);

  const ScrollDownHandler = () => {
    window.scrollTo(0, window.scrollY + 500);
  };

  return (
    <>
      <Navbar />
      <main className="home-container">
        <SectionOne />
        <SectionTwo />
        {featuresList.map((features, index) => (
          <>
            <Features {...features} />
            {features.isDividerPresent && <div className="divider light" />}
          </>
        ))}
        <SubsSection />
      </main>
      <Footer />
      <div className="scroll-container" onClick={ScrollDownHandler}>
        <i className="bi bi-arrow-down"></i>
      </div>
    </>
  );
};

export default Home;

export const SectionOne = () => {
  return (
    <Wrapper className="home-section-1" id="home-container-section-1">
      <div className="section-1-content-container">
        <motion.h1
          initial={{ x: "-100vw" }}
          transition={{ duration: 1, type: "spring", stiffness: 200 }}
          animate={{ x: 0 }}
        >
          {HOME_LABELS.section1.header}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {HOME_LABELS.section1.description}
        </motion.p>
        <Button classes="button" Content={HOME_LABELS.section1.button} />
      </div>
      <div className="section-1-img">
        <Svg />
      </div>
    </Wrapper>
  );
};

export const SectionTwo = () => {
  return (
    <Wrapper className="home-section-2">
      <h2>{HOME_LABELS.section2.header}</h2>
      <div className="section-2-content-container">
        <div>
          <img src={customer_service} alt="support" width="200px" />
          <p>{HOME_LABELS.section2.support}</p>
        </div>
        <div>
          <img
            src={business_decisions}
            alt="Decision"
            width="200px"
            height="150px"
          />
          <p>{HOME_LABELS.section2.decisions}</p>
        </div>
        <div>
          <img src={Report_analysis} alt="Report_analysis" width="200px" />
          <p>{HOME_LABELS.section2.analysis}</p>
        </div>
        <div>
          <img src={Experience} alt="Experience" width="200px" />
          <p>{HOME_LABELS.section2.experience}</p>
        </div>
      </div>
    </Wrapper>
  );
};
export const SubsSection = () => {
  return (
    <div className="subscribe-container">
      <div className="sub-div">
        <h2>{HOME_LABELS.subscribe.header}</h2>
        <p>
          {HOME_LABELS.subscribe.text}
          <span>{HOME_LABELS.subscribe.email}</span>
        </p>
        <div className="newsletter-sub">
          <p>{HOME_LABELS.subscribe.newsletter}</p>
          <p>{HOME_LABELS.subscribe.subtext}</p>
        </div>
        <input type="email" />
        <Button classes="btn-subs" Content={HOME_LABELS.subscribe.button} />
      </div>
    </div>
  );
};
