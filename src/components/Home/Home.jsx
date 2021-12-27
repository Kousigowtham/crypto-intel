import React from "react";
import business_man from "../../Assets/business-man.png";
import crypto_bg from "../../Assets/crypto-bg.png";
import support from "../../Assets/7.png";
import decision from "../../Assets/decision.png";
import noexp from "../../Assets/noexp.png";
import record from "../../Assets/record.png";
import "./Home.css";
import "../NavBar/Navbar.css";

const Home = () => {
  return (
    <>
      <main className="home-container">
        <section className="home-main">
          <div className="section-1-container">
            <h1 id="home-container-section-1">
              SIGNALS THAT HIT THE BULLS EYE
            </h1>

            <div className="businessman-container">
              <p>
                The signals will be always analysed before we getting into the
                stage and we have experienced professionals for that from around
                the world! What’s more, a lifetime access for subscribed
                signals. Our group gives you access that will forever change
                your definition of the crypto signals service.
              </p>
              <img
                src={business_man}
                alt={"business_man"}
                className="business-man"
              />
            </div>
            <button>GET SIGNALS WITH LIFETIME ACCESS!</button>
          </div>
          <img
            src={crypto_bg}
            alt={"home_1_bg_crypto"}
            className="crypto-bg-image-hidden"
          />
        </section>
        <section className="home-section-2">
          <h2>Packet full of Features</h2>
          <div className="sec-2-features">
            <div>
              <img src={support} alt="support" />
              <p>Money never sleeps, neither do our signals</p>
            </div>
            <div>
              <img src={decision} alt="support" />
              <p>Make calculated decisions</p>
            </div>
            <div>
              <img src={record} alt="support" />
              <p>Proven track record</p>
            </div>
            <div>
              <img src={noexp} alt="support" />
              <p>No experience needed</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
