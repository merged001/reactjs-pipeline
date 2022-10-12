import React from "react";
import Modal from "react-modal";

const Popup = ({ showModal, closeModal }) => {
  const customStyles = {
    content: {
      width: "25%",
      height: "25%",
      borderRadius: "10px",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      background: "#343444",
    },
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={showModal}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div className="modal-content">
        <h5 className="text-center modal-header">
          NFT is minting, check the status of the NFT on the NFT list in 1-2
          mins
        </h5>
        <button className="sc-button fl-button pri-3" onClick={closeModal}>
          <span>Close</span>
        </button>
      </div>
    </Modal>
  );
};

export default Popup;
