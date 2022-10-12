import React, { useEffect } from "react";
import { connect } from "react-redux";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Link } from "react-router-dom";
import LiveAuction from "./LiveAuctionList";

import { getAuctionListRequest } from "../actions";

const LiveAuctions = ({ auctionList, getAuctionListRequest, loading }) => {
  useEffect(() => {
    const getList = async () => {
      await getAuctionListRequest();
    };
    getList();
  }, [getAuctionListRequest]);
  return (
    <div className="auctions">
      <Header />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">Auctions</h1>
              </div>
              <div className="breadcrumbs style2">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>Auctions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <LiveAuction data={auctionList} loading={loading} />
      <Footer />
    </div>
  );
};

export default connect(
  ({ data }) => ({
    auctionList: data.auctionList,
    error: data.error,
    loading: data.loading,
  }),
  {
    getAuctionListRequest,
  }
)(LiveAuctions);
