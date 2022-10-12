import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useMetamask } from "@thirdweb-dev/react";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

import img1 from "../assets/images/icon/connect-1.png";
import { MESSAGE_EVENTS } from "../components/comman/ErrorPopUp";

const WalletConnect = () => {
  const connectWithMetamask = useMetamask();

  const connectWallet = (type) => {
    if (type === "metamask") {
      try {
        connectWithMetamask();
      } catch (error) {
        MESSAGE_EVENTS.ERROR_MESSAGE.emit(error);
      }
    }
  };

  const [data] = useState([
    {
      img: img1,
      title: "Meta Mask",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
      walletType: "metamask",
    },
  ]);
  return (
    <div>
      <Header />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">Connect Wallet</h1>
              </div>
              <div className="breadcrumbs style2">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="#">Pages</Link>
                  </li>
                  <li>Connect Wallet</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="tf-connect-wallet tf-section">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-12">
              <h2 className="tf-title-heading ct style-2 mg-bt-12">
                Connect Your Wallet
              </h2>
              <h5 className="sub-title ct style-1 pad-400">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Laborum obcaecati dignissimos quae quo ad iste ipsum officiis
                deleniti asperiores sit.
              </h5>
            </div>
            <div className="col-md-12">
              <div className="sc-box-icon-inner style-2">
                {data.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => connectWallet(item?.walletType)}
                    className={`sc-box-icon ${
                      item?.walletType && "cursor-pointer"
                    }`}
                  >
                    <div className="img">
                      <img src={item.img} alt="Whitelabel NFT" />
                    </div>
                    <h4 className="heading">{item.title} </h4>
                    <p className="content">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WalletConnect;
