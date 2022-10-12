import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { get } from "lodash";
import { useMarketplace, useAddress } from "@thirdweb-dev/react";

// import PageLoader from "../components/loader/PageLoader";
import { TailSpin } from  'react-loader-spinner';

// import { convertIpfs } from "../utils/ipfstransformer";
import PlaceBid from "../components/liveAuction/PlaceBid";
import ImageVideoPreview from "../components/comman/ImageVideoPreview";

import { marketplaceAddress } from "../utils/constant";
import { MESSAGE_EVENTS } from "../components/comman/ErrorPopUp";

const DirectBuyList = ({ data, loading }) => {
  const [visible, setVisible] = useState(8);
  const [isPlaceBidModalData, setIsPlaceBidModal] = useState(null);
  const [isPlaceBidLoading, setIsPlaceBidLoading] = useState(false);

  const marketplaceModule = useMarketplace(marketplaceAddress);

  const address = useAddress();

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 4);
  };

  const placeBidClick = (info) => {
    setIsPlaceBidModal(info);
  };

  const onSubmitPlaceBid = async (formData) => {
    setIsPlaceBidLoading(true);
    try {
      if (marketplaceModule) {
        await marketplaceModule.direct.buyoutListing(
          formData?.id,
          formData?.quantityInput,
          address
        );
        // setIsPlaceBidModal(false);
      }
    } catch (error) {
      console.log("Error", error);
      MESSAGE_EVENTS.ERROR_MESSAGE.emit(error.message);
    } finally {
      setIsPlaceBidLoading(false);
      setIsPlaceBidModal(false);
    }
  };

  return (
    <Fragment>
      <section className="tf-section sc-explore-1">
        <div className="themesflat-container directBuyList">
          {loading ? (
                 <div className="react-loader">
                 <TailSpin color="#4A3CE5" height={80} width={80}/>
                </div>
          ) : (
            <div className="row">
              {isPlaceBidModalData && (
                <PlaceBid
                  isDirectBuy={true}
                  onSubmitPlaceBid={onSubmitPlaceBid}
                  data={isPlaceBidModalData}
                  closeModal={() => setIsPlaceBidModal(false)}
                  loading={isPlaceBidLoading}
                />
              )}
              {data.length > 0 ? data.slice(0, visible).map((item, index) => (
                <div
                  key={index}
                  className="fl-item col-xl-3 col-lg-4 col-md-6 col-sm-6"
                >
                  <div className={`sc-card-product`}>
                    <div className="card-media">
                      <ImageVideoPreview
                        data={get(item, "asset", {})}
                        alt="Whitelabel NFT"
                      />
                    </div>
                    <div className="card-title">
                      <h5 className="style2">{get(item, "asset.name", "")}</h5>
                    </div>
                    <div className="meta-info">
                      <div className="author">
                        <div className="info">
                          <span>Seller Address</span>
                          <h6 className="break-word">
                            {get(item, "sellerAddress", "")}
                          </h6>
                        </div>
                      </div>
                      <div className="price">
                        <span>Price</span>
                        <h5>
                          {get(
                            item,
                            "buyoutCurrencyValuePerToken.displayValue",
                            {}
                          )}{" "}
                          ETH
                        </h5>
                      </div>
                    </div>
                    <div className="card-bottom">
                      <button
                        className="sc-button fl-button pri-3 no-bg"
                        style={{ zIndex: "0" }}
                        onClick={() => placeBidClick(item)}
                      >
                        <span>Buy</span>
                      </button>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="w-100">
                  <h3 className="text-center">No NFT found</h3>
                </div>
              )}
              {visible < data.length && (
                <div className="col-md-12 wrap-inner load-more text-center">
                  <Link
                    to="#"
                    id="load-more"
                    className="sc-button loadmore fl-button pri-3"
                    onClick={showMoreItems}
                  >
                    <span>Load More</span>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </Fragment>
  );
};

DirectBuyList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default DirectBuyList;
