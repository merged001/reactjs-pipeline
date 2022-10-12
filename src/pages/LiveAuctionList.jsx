import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { get } from "lodash";
import { useMarketplace } from "@thirdweb-dev/react";

// import PageLoader from "../components/loader/PageLoader";
import { TailSpin } from  'react-loader-spinner';

// import { convertIpfs } from "../utils/ipfstransformer";

import { marketplaceAddress } from "../utils/constant";

import Countdown from "react-countdown";
import PlaceBid from "../components/liveAuction/PlaceBid";
import ImageVideoPreview from "../components/comman/ImageVideoPreview";
import { MESSAGE_EVENTS } from "../components/comman/ErrorPopUp";

const LiveAuction = ({ data, loading }) => {
  const [visible, setVisible] = useState(8);
  const [isPlaceBidModalData, setIsPlaceBidModal] = useState(null);
  const [isPlaceBidLoading, setIsPlaceBidLoading] = useState(false);
  const marketplaceModule = useMarketplace(marketplaceAddress);

  useEffect(() => {
    console.log(get(data, "0"), "✅✔️");
  }, [data])
  


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
        await marketplaceModule.auction.makeBid(formData?.id, formData?.eth);
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
    <section className="tf-section live-auctions">
      <div className="themesflat-container">
        {loading ? (
               <div className="react-loader">
               <TailSpin color="#4A3CE5" height={80} width={80}/>
              </div>
        ) : (
          <div className="row">
            {isPlaceBidModalData && (
              <PlaceBid
                onSubmitPlaceBid={onSubmitPlaceBid}
                data={isPlaceBidModalData}
                closeModal={() => setIsPlaceBidModal(false)}
                loading={isPlaceBidLoading}
              />
            )}
            {data.length > 0 ? data.slice(0, visible).map((item, index) => (
              <LiveAuctionItem
                key={index}
                item={item}
                placeBidClick={placeBidClick}
              />
            )) :
              (
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
  );
};

LiveAuction.propTypes = {
  data: PropTypes.array.isRequired,
};

const LiveAuctionItem = ({ item, placeBidClick }) => {
  const auctionEndTime = new Date(get(item, "endTime", ""));

  return (
    <div className="fl-item col-xl-3 col-lg-6 col-md-6">
      <div className="sc-card-product">
        <div className="card-media">
          <ImageVideoPreview data={get(item, "asset", {})} alt="Whitelabel NFT" />
          <div className="featured-countdown">
            <Countdown date={auctionEndTime}>
              <span>You are good to go!</span>
            </Countdown>
          </div>
          <div className="button-place-bid">
            <button
              onClick={() => placeBidClick(item)}
              className="sc-button style-place-bid fl-button pri-3"
            >
              <span>Place Bid</span>
            </button>
          </div>
        </div>
        <div className="card-title">
          <h5 className="style2">{get(item, "asset.name", "")}</h5>
        </div>
        <div className="meta-info">
          <div className="author">
            <div className="info">
              <span>Creator</span>
              <h6 className="break-word">{get(item, "sellerAddress", "")}</h6>
            </div>
          </div>
          <div className="price">
            <span>Floor Price</span>
            <h5>
              {get(item, "buyoutCurrencyValuePerToken.displayValue", "")} ETH
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveAuction;
