import React from "react";
import { connect } from "react-redux";
import { get, startCase } from "lodash";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

export const NftDetailsPage = ({ nftDetails }) => {
  return (
    <div className="item-details">
      <Header />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">NFT Details</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="tf-section tf-item-details">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-xl-6 col-md-12">
              <div className="content-left">
                <div className="media">
                  <img
                    src={get(nftDetails, "metadata.image", "")}
                    alt="Whitelabel NFT"
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-md-12">
              <div className="content-right">
                <div className="sc-item-details">
                  <h2 className="style2">
                    {startCase(get(nftDetails, "metadata.name", ""))}
                  </h2>
                  <div className="client-infor sc-card-product">
                    <div className="meta-info">
                      <div className="author">
                        <div className="info overflow-ellipsis">
                          <span>Owned By</span>
                          <h6 className="break-word">
                            {get(nftDetails, "creator", "")}
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="meta-info">
                      <div className="author">
                        <div className="info">
                          <span>Create By</span>
                          <h6>Guest User</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="client-infor sc-card-product">
                    <div className="meta-info">
                      <div className="author">
                        <div className="info">
                          <span>Properties</span>
                          <h6 className="break-word">
                            {JSON.stringify(
                              get(nftDetails, "metadata.properties", {})
                            ).replace(/"/g, "")}
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="meta-info">
                      <div className="author">
                        <div className="info">
                          <span>Copies</span>
                          <h6>
                            {parseInt(get(nftDetails, "supply.hex", "0"), 16)}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h6>Description</h6>
                  <p>
                    {startCase(get(nftDetails, "metadata.description", ""))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default connect(
  ({ data }) => ({
    nftDetails: data.nftDetails,
  }),
  {}
)(NftDetailsPage);
