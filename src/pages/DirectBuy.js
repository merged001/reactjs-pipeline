import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import DirectBuyList from "./DirectBuyList";

import { getDirectBuyListRequest } from "../actions";

const DirectBuy = ({ directbuyList, getDirectBuyListRequest, loading }) => {
  useEffect(() => {
    const getList = async () => {
      await getDirectBuyListRequest();
    };
    getList();
  }, [getDirectBuyListRequest]);

  return (
    <div>
      <Header />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">Direct Buy</h1>
              </div>
              <div className="breadcrumbs style2">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>Direct Buy</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <DirectBuyList loading={loading} data={directbuyList} />
      <Footer />
    </div>
  );
};

export default connect(
  ({ data }) => ({
    directbuyList: data.directbuyList,
    error: data.error,
    loading: data.loading,
  }),
  {
    getDirectBuyListRequest,
  }
)(DirectBuy);
