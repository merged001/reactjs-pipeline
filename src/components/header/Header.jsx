import React, { useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAddress } from "@thirdweb-dev/react";
import defaultProfile from "../../assets/images/icon/default-image.png";
import menus from "../../pages/menu";
import DarkMode from "./DarkMode";
import logoheader from "../../assets/images/logo/logo.png";
import logoheader2x from "../../assets/images/logo/logo.png";
import logodark from "../../assets/images/logo/logo.png";
import logodark2x from "../../assets/images/logo/logo.png";
import imgsun from "../../assets/images/icon/sun.png";
import {formatWalletHash} from "../../utils/transformers";
const Header = () => {
  const { pathname } = useLocation();
  const address = useAddress();

  const headerRef = useRef(null);
  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  });
  const isSticky = (e) => {
    const header = document.querySelector(".js-header");
    const scrollTop = window.scrollY;
    scrollTop >= 300
      ? header.classList.add("is-fixed")
      : header.classList.remove("is-fixed");
    scrollTop >= 400
      ? header.classList.add("is-small")
      : header.classList.remove("is-small");
  };

  const menuLeft = useRef(null);
  const btnToggle = useRef(null);

  const menuToggle = () => {
    menuLeft.current.classList.toggle("active");
    btnToggle.current.classList.toggle("active");
  };

  const [activeIndex, setActiveIndex] = useState(null);
  const handleOnClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <header id="header_main" className="header_1 js-header" ref={headerRef}>
      <div className="themesflat-container">
        <div className="row">
          <div className="col-md-12">
            <div id="site-header-inner">
              <div className="wrap-box flex">
                <div id="site-logo" className="clearfix">
                  <div id="site-logo-inner">
                  <div>
                      <Link to="/" rel="home" className="main-logo">
                        <img
                          className="logo-dark"
                          id="logo_header"
                          src={logodark}
                          srcSet={`${logodark2x}`}
                          alt="nft-gaming"
                        />
                        <img
                          className="logo-light"
                          id="logo_header"
                          src={logoheader}
                          srcSet={`${logoheader2x}`}
                          alt="nft-gaming"
                        />
                              <span>
                          Whitelabel
                          <br />
                          Marketplace
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div
                  className="mobile-button"
                  ref={btnToggle}
                  onClick={menuToggle}
                >
                  <span></span>
                </div>
                <nav id="main-nav" className="main-nav" ref={menuLeft}>
                  <ul id="menu-primary-menu" className="menu">
                    {address && menus.map((data, index) => (
                      <li
                        key={index}
                        onClick={() => handleOnClick(index)}
                        className={`menu-item ${data.namesub ? "menu-item-has-children" : ""
                          } ${activeIndex === index ? "active" : ""} `}
                      >
                        <Link to={data.links}>{data.name}</Link>
                        {data.namesub && (
                          <ul className="sub-menu">
                            {data.namesub.map((submenu) => (
                              <li
                                key={submenu.id}
                                className={
                                  pathname === submenu.links
                                    ? "menu-item current-item"
                                    : "menu-item"
                                }
                              >
                                <Link to={submenu.links}>{submenu.sub}</Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="flat-search-btn flex">
                  <div className="sc-btn-top mg-r-12" id="site-header">
                    {address ? (
                      <h6 className="mt-2 text-color-7">{formatWalletHash(address)}</h6>
                    ) : (
                      <Link
                        to="/wallet-connect"
                        className="sc-button header-slider style style-1 wallet fl-button pri-1"
                      >
                        <span>Wallet connect</span>
                      </Link>
                    )}
                  </div>
                  {
                    address && <div className="m-1 ml-3"><Link to="/user"><img alt="profile-page" src={defaultProfile} className="rounded-circle" style={{ minHeight: "30px", maxHeight: "30px" }} /></Link></div>
                  }
                  <div className="admin_active" id="header_admin">
                    <div className="header_avatar">
                      <div className="price">
                        <span>
                          2.45 <strong>ETH</strong>{" "}
                        </span>
                      </div>
                      <div className="avatar_popup mt-20">
                        <div className="d-flex align-items-center copy-text justify-content-between">
                          <span> 13b9ebda035r178... </span>
                          <Link to="/" className="ml-2">
                            <i className="fal fa-copy"></i>
                          </Link>
                        </div>
                        <div className="d-flex align-items-center mt-10">
                          <img className="coin" src={imgsun} alt="/" />
                          <div className="info ml-10">
                            <p className="text-sm font-book text-gray-400">
                              Balance
                            </p>
                            <p className="w-full text-sm font-bold text-green-500">
                              16.58 ETH
                            </p>
                          </div>
                        </div>
                        <div className="hr"></div>
                        <div className="links mt-20">
                          <Link to="#">
                            <i className="fab fa-accusoft"></i>{" "}
                            <span> My items</span>
                          </Link>
                          <a className="mt-10" href="/edit-profile">
                            <i className="fas fa-pencil-alt"></i>{" "}
                            <span> Edit Profile</span>
                          </a>
                          <a className="mt-10" href="/login" id="logout">
                            <i className="fal fa-sign-out"></i>{" "}
                            <span> Logout</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DarkMode />
    </header>
  );
};

export default Header;
