import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isEmpty, get } from "lodash";
import { connect } from "react-redux";

import { mintNFTRequest } from "../actions";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
// import Countdown from "react-countdown";
import "react-tabs/style/react-tabs.css";
import profile from "../assets/images/avatar/preview_item.png";
import avt from "../assets/images/avatar/avt-9.jpg";
import Popup from "../components/loader/Popup";

const CreateItem = ({ mintNFTRequest }) => {
  const props = { name: "", value: "" };

  const [properties, setProperties] = useState([props]);
  const [showModal, setShowModal] = useState(false);
  const item = {
    uploadImage: "",
    title: "",
    price: "0",
    owner: "Guest User",
    profileIcon: "",
    description: "",
    copies: 1,
    properties: properties,
  };
  const [previewItem, setPreviewItem] = useState(item);

  useEffect(() => {}, []);

  const handleChange = async (e, field) => {
    const updateItem = Object.assign({}, previewItem);
    //const updateItem = previewItem;
    if (field === "abstraction") {
      updateItem[field] = e;
    } else if (field === "uploadImage") {
      updateItem[field] = URL.createObjectURL(e.target.files[0]);
      const file = e.target.files[0];
      updateItem["file"] = file;
    } else {
      updateItem[field] = e.target.value;
    }
    setPreviewItem(updateItem);
  };

  const handleSubmit = async () => {
    setShowModal(true);

    await mintNFTRequest(previewItem);
    setPreviewItem(item);
    setProperties([props]);
  };

  // handle click
  const handleRemoveClick = (index) => {
    const updateItem = Object.assign({}, previewItem);
    const list = [...properties];
    list.splice(index, 1);
    let respone = {};

    list.forEach((item) => {
      respone[item.name] = item.value;
    });
    setProperties(list);
    updateItem.properties = respone;
    setPreviewItem(updateItem);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setProperties([...properties, props]);
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const updateItem = Object.assign({}, previewItem);
    const { name, value } = e.target;
    const list = [...properties];
    list[index][name] = value;
    let respone = {};

    list.forEach((item) => {
      respone[item.name] = item.value;
    });
    setProperties(list);
    updateItem.properties = respone;
    setPreviewItem(updateItem);
  };

  function closeModal() {
    setShowModal(false);
  }

  return (
    <div className="create-item">
      <Header />
      {showModal && <Popup showModal={showModal} closeModal={closeModal} />}
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">Mint NFT</h1>
              </div>
              <div className="breadcrumbs style2">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="#">Pages</Link>
                  </li>
                  <li>Mint NFT</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="tf-create-item tf-section">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-xl-3 col-lg-6 col-md-6 col-12">
              <h4 className="title-create-item">Preview item</h4>
              <div className="sc-card-product">
                <div className="card-media">
                  <Link to="/item-details-01">
                    <img
                      src={
                        !isEmpty(previewItem.uploadImage)
                          ? previewItem.uploadImage
                          : profile
                      }
                      alt="Whitelabel NFT"
                    />
                  </Link>
                  {/* <Link to="/login" className="wishlist-button heart">
                <span className="number-like"> 100</span>
              </Link> */}
                  {/* <div className="featured-countdown">
                <span className="slogan"></span>
                <Countdown date={Date.now() + 500000000}>
                  <span>You are good to go!</span>
                </Countdown>
              </div> */}
                </div>
                <div className="card-title">
                  <h5>
                    <Link to="/item-details-01">{previewItem.title}</Link>
                  </h5>
                  <div className="tags">ETH</div>
                </div>
                <div className="meta-info">
                  <div className="author">
                    <div className="avatar">
                      <img src={avt} alt="Whitelabel NFT" />
                    </div>
                    <div className="info">
                      <span>Owned By</span>
                      <h6>
                        {" "}
                        <Link to="/author-02">{previewItem.owner}</Link>
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="card-bottom justify-content-center">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={
                      !!(
                        previewItem.uploadImage &&
                        previewItem.title &&
                        previewItem.description
                      )
                        ? false
                        : true
                    }
                    className={
                      !!(
                        previewItem.uploadImage &&
                        previewItem.title &&
                        previewItem.description
                      )
                        ? "sc-button  btn-mint-nft style bag fl-button pri-3"
                        : "sc-button btn-mint-nft style bag no-bg"
                    }
                  >
                    <span>Mint NFT</span>
                  </button>
                  {/* <Link to="/activity-01" className="view-history reload">
                    View History
                  </Link> */}
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-6 col-md-12 col-12">
              <div className="form-create-item">
                <form>
                  <h4 className="title-create-item">Upload file *</h4>
                  <label className="uploadFile">
                    <span className="filename">
                      PNG, JPG, GIF, WEBP or MP4. Max 200mb.
                    </span>
                    <input
                      type="file"
                      className="inputfile form-control"
                      name="file"
                      onChange={(e) => {
                        handleChange(e, "uploadImage");
                      }}
                    />
                  </label>
                </form>
                <div className="flat-tabs tab-create-item">
                  <form action="#">
                    <h4 className="title-create-item">Title *</h4>
                    <input
                      type="text"
                      value={get(previewItem, "title", "")}
                      placeholder="Item Name"
                      onChange={(e) => {
                        handleChange(e, "title");
                      }}
                    />

                    <h4 className="title-create-item">Description *</h4>
                    <textarea
                      placeholder="e.g. “This is very limited item”"
                      value={get(previewItem, "description", "")}
                      onChange={(e) => {
                        handleChange(e, "description");
                      }}
                    ></textarea>

                    <div className="row-form style-3">
                      <div className="inner-row-form">
                        <h4 className="title-create-item">Copies</h4>
                        <input
                          type="number"
                          placeholder="Copies"
                          value={get(previewItem, "copies", "")}
                          onChange={(e) => {
                            handleChange(e, "copies");
                          }}
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="mt-4">
                  <h4 className="title-create-item">Properties</h4>
                  {properties.map((x, i) => (
                    <div className="mt-4" key={i}>
                      <form>
                        <div className="row-form style-3 mb-5">
                          <div className="inner-row-form">
                            <input
                              type="text"
                              name="name"
                              value={properties[i].name}
                              placeholder="Key"
                              onChange={(e) => handleInputChange(e, i)}
                            />
                          </div>
                          <div className="inner-row-form">
                            <input
                              type="text"
                              name="value"
                              value={properties[i].value}
                              placeholder="Value"
                              onChange={(e) => handleInputChange(e, i)}
                            />
                          </div>
                          <div className="inner-row-form">
                            {properties.length !== 1 && (
                              <button
                                type="button"
                                className="btn-primary"
                                onClick={() => handleRemoveClick(i)}
                              >
                                Remove
                              </button>
                            )}
                            {properties.length - 1 === i && (
                              <button
                                className="btn-secondary ml-4"
                                type="button"
                                onClick={handleAddClick}
                              >
                                Add
                              </button>
                            )}
                          </div>
                        </div>
                      </form>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default connect(
  ({ data }) => ({
    nftListItems: data.nftListItems,
    error: data.error,
  }),
  {
    mintNFTRequest: (data) => mintNFTRequest(data),
  }
)(CreateItem);
