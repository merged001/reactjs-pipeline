import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { get } from "lodash";
import { ButtonLoader } from "../loader/PageLoader";

const customStyles = {
  content: {
    width: "25%",
    minWidth: "500px",
    minHeight: "500px",
    height: "25%",
    borderRadius: "10px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    background: "#343444",
    overflow: "unset",
  },
  closeButton: {
    position: "absolute",
    top: "-15px",
    right: "-15px",
    width: "0px",
    padding: "19px",
    height: "20px",
    background: "#000",
    border: "0px",
    color: "#fff",
  },
  closeIcon: {
    position: "absolute",
    top: "11px",
    right: "13px",
    fontSize: "18px",
  },
  submitButton: {
    width: "100%",
    padding: "5px",
  },
  error: {
    color: "red",
  },
};
const PlaceBid = ({
  closeModal,
  onSubmitPlaceBid,
  data,
  isDirectBuy,
  loading,
}) => {
  const [eth, setEth] = useState();
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isDirectBuy) {
      setEth(get(data, "buyoutCurrencyValuePerToken.displayValue"));
    }
  }, [data, isDirectBuy]);

  const onSubmit = () => {
    if (
      !eth ||
      parseFloat(get(data, "buyoutCurrencyValuePerToken.displayValue"), 16) >
        parseFloat(eth, 16)
    ) {
      setError(
        "Availalbe Bid Amount " +
          parseFloat(get(data, "buyoutCurrencyValuePerToken.displayValue"), 16)
      );
      return false;
    }
    if (parseInt(get(data, "quantity.hex"), 16) < parseInt(quantity, 16)) {
      setError("Availalbe Quantity " + parseInt(get(data, "quantity.hex"), 16));
      return false;
    }

    onSubmitPlaceBid({ eth, quantityInput: quantity, ...data });
  };
  const onInputChange = () => {
    if (error) {
      setError(null);
    }
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={true}
      shouldCloseOnOverlayClick={false}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <button
        className="sc-button fl-button pri-3"
        style={customStyles.closeButton}
        onClick={closeModal}
        disabled={loading}
      >
        <i className="fal fa-times" style={customStyles.closeIcon}></i>
      </button>
      <div className="modal-content placebid">
        <div className="placebidform">
          <div className="form-item" style={{ textAlign: "center" }}>
            <h4>{isDirectBuy ? "Buy" : "Place a Bid"}</h4>{" "}
          </div>
          {!isDirectBuy && (
            <div className="form-item">
              {" "}
              Minimum Bid Amount{" "}
              <strong>
                {get(data, "buyoutCurrencyValuePerToken.displayValue")}{" "}
                {get(data, "buyoutCurrencyValuePerToken.name")}
              </strong>
            </div>
          )}
          <div>
            <input
              type="number"
              value={eth}
              disabled={isDirectBuy}
              placeholder={`00.00 ${get(
                data,
                "buyoutCurrencyValuePerToken.name"
              )}`}
              onChange={(e) => {
                setEth(e.target.value);
                onInputChange();
              }}
            />
          </div>
          {isDirectBuy ? (
            <div className="form-item">
              Minimum quantity. &nbsp;&nbsp;&nbsp;&nbsp;{" "}
              {parseInt(get(data, "quantity.hex"), 16)} available
            </div>
          ) : (
            <span className="form-item mb-4">Quantity</span>
          )}
          <div className="mt-4">
            <input
              type="number"
              disabled={!isDirectBuy}
              value={
                isDirectBuy ? quantity : parseInt(get(data, "quantity.hex"), 16)
              }
              placeholder="Quantity"
              onChange={(e) => {
                setQuantity(e.target.value);
                onInputChange();
              }}
            />
          </div>
          <div className="form-item">
            <span> Total amount:</span>
            <span className="form-item-number">
              <strong>{eth ? (parseFloat(eth * quantity)).toFixed(5) : "0"}</strong>
            </span>
          </div>

          {error && (
            <div className="form-item" style={customStyles.error}>
              <span> Error : </span>
              {error}
            </div>
          )}

          <button
            className="sc-button fl-button pri-3"
            onClick={onSubmit}
            disabled={loading}
            style={customStyles.submitButton}
          >
            <div className="placebid-button">
              {loading && (
                <span>
                  <ButtonLoader />
                </span>
              )}
              <span>{isDirectBuy ? "Buy" : "Place a bid"}</span>
            </div>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PlaceBid;
