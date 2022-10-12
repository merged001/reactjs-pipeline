import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ImageVideoPreview from "../components/comman/ImageVideoPreview";
import { get } from "lodash";
import { getNFTDetailsList, getUserDetails, saveUserDetails } from "../api/index";
// import PageLoader from "../components/loader/PageLoader";
import { TailSpin } from  'react-loader-spinner';
import { useAddress } from "@thirdweb-dev/react";

import defaultBanner from "../assets/images/item-background/bg-authors2.jpg";
import defaultProfile from "../assets/images/icon/default-image.png";


const USER_PROFILE_CONSTANTS = {
  MODE: "USER_PROFILE",
};

export const UserProfile = () => {
  const address = useAddress();

  const [userDetails, setUserDetails] = useState({
    userName: "User Name",
    profileImage: defaultProfile,
    bannerImage: defaultBanner,
  });
  const [userNFTs, setUserNFTs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNFTDetails = async () => {
      try {
        const response = await getNFTDetailsList(address);
        if (response.data && response.data["data"]) {
          setUserNFTs(response.data["data"]);
        }
      } catch (err) {
        setUserNFTs([]);
      } finally {
        setLoading(false);
      }
    };

    const getUserInfo = async () => {
      try {
        const response = await getUserDetails(address);
        if (response.data && response.data["data"]) {
          console.log(response.data["data"])
        }
      } catch (err) {
        
      } finally {
        //setLoadingProfile(false);
      }
    };
    if (address) {
      getNFTDetails();
      getUserInfo();
    }
  }, [address]);

  const openFileSelector = (mode) => {
    USER_PROFILE_CONSTANTS.MODE = mode;
    const fileSelector = document.getElementById("UserProfileFileSelector");
    if (fileSelector) {
      fileSelector.click();
    }
  };

  const handleChange = async (e, field) => {
    const imgField = URL.createObjectURL(e.target.files[0]);
    USER_PROFILE_CONSTANTS.MODE === "USER_PROFILE"
      ? setUserDetails({ ...userDetails, profileImage: imgField })
      : setUserDetails({ ...userDetails, bannerImage: imgField });
  };

  const setUserName = (userName) => {
    const userInfo = {...userDetails,userName};
    setUserDetails({ ...userInfo });
    saveUserDetails({walletAddress:address,name:userName}).then((res)=>{
      console.log("Then",res)
    })
  };

  return (
    <div className="item-details">
      {/* {loadingProfile && <FullScreenPageLoader/>} */}
      <Header />
      <input
        type="file"
        name="file"
        id="UserProfileFileSelector"
        className="invisible-input"
        onChange={(e) => {
          handleChange(e, "uploadImage");
        }}
      />
      <section className="flat-title-page inner">
        <div className="themesflat-container" style={{height:"150px",background:'transparent'}}>
          <Profile
            setUserName={setUserName}
            openFileSelector={openFileSelector}
            userDetails={userDetails}
            address={address}
          />
        </div>
      </section>
      <div className="tf-section tf-item-details tf-user-profile-section">
        <div className="themesflat-container">
          <UserNFTSList userNfts={userNFTs} loading={loading} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

const UserNFTSList = ({ userNfts, loading }) => {
  return (
    <section className="tf-section tf-rank tf-user-profile-section mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="table-ranking user-nft-table">
            <div className="flex th-title item nft-list user-nft-list">
              <div className="column">
                <h5>ID</h5>
              </div>
              <div className="column">
                <h5>IMAGE</h5>
              </div>
              <div className="column">
                <h5>NAME</h5>
              </div>
              <div className="column">
                <h5>DESCRIPTION</h5>
              </div>
              <div className="column">
                <h5>PROPERTIES</h5>
              </div>
              <div className="column">
                <h5>COPIES</h5>
              </div>
            </div>
            {loading ? (
               <div className="react-loader">
               <TailSpin color="#4A3CE5" height={80} width={80}/>
              </div>
            ) : userNfts.length > 0 ? (
              userNfts.map((item, index) => (
                <Link
                  to={'#'}
                  key={index}
                  className="flex th-title item nft-list cursor-pointer user-profile-table-item"
                >
                  <div className="column">
                    <p className="overflow-ellipsis text-color-5">
                      {parseInt(get(item, "metadata.id.hex"), 16)}
                    </p>
                  </div>
                  <div className="column">
                    <ImageVideoPreview
                      data={get(item, "metadata", {})}
                      alt="Whitelabel NFT"
                    />
                  </div>
                  <div className="column">
                    <div className="overflow-ellipsis"><span>{get(item, "metadata.name", "")}</span></div>
                  </div>
                  <div className="column">
                    <div className="overflow-ellipsis"><span>{get(item, "metadata.description", "")}</span></div>
                  </div>
                  <div className="column">
                    <div className="overflow-ellipsis"><pre className="properties">
                    {
                              item?.metadata?.properties ? 
                            JSON.stringify(
                              get(item, "metadata.properties", {}),
                              null,
                              4
                            ):
                            JSON.stringify(
                              get(item, "metadata.attributes", {}),
                              null,
                              4
                            )
                            }
                    </pre>
                    </div>
                  </div>
                  <div className="column">
                    <span>{parseInt(get(item, "supply.hex"), 16)}</span>
                  </div>
                </Link>
              ))
            ) : (
              <h5 className="text-center">No NFT found</h5>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Profile = ({ openFileSelector, userDetails, address, setUserName }) => {
  return (
    <>
      <div
        className="col-md-12 profile-banner"
        style={{
          backgroundImage: `url('${userDetails.bannerImage}')`
        }}
      >
        <div className="profile-banner-edit">
          <div onClick={() => openFileSelector("USER_BANNER")}>
            <i className="fa fa-pencil fa-lg"></i>
          </div>
        </div>
      </div>
      <div className="col-md-12">
        <ProfileImage
          setUserName={setUserName}
          openFileSelector={openFileSelector}
          userName={userDetails.userName}
          profileImage={userDetails.profileImage}
          address={address}
        />
      </div>
    </>
  );
};

const ProfileImage = ({
  openFileSelector,
  profileImage,
  address,
  userName,
  setUserName,
}) => {
  // const [userNameEdit, setUserNameEdit] = useState(null);
  // const [copySuccess, setCopySuccess] = useState(false);
  return (
    <div className="user-profile-image">
      <div className="user text-center position-relative">
        <div className="profile-image">
          <img
            src={profileImage}
            className="rounded-circle"
            alt="Profile"
            width="120"
            style={{ minHeight: "120px", maxHeight: "120px" }}
          />
          <div className="profile-edit">
            <div onClick={() => openFileSelector("USER_PROFILE")}>
              <i className="fa fa-pencil fa-lg"></i>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="mt-5 text-center">
        {userNameEdit !== null ? (
          <div>
            <input
              id="name"
              className="user-profile-username-input"
              autoFocus
              name="name"
              tabIndex="1"
              onBlur={() => {
                setUserName(userNameEdit);
                setUserNameEdit(null);
              }}
              value={userNameEdit}
              aria-required="true"
              required
              type="text"
              placeholder="Username"
              onChange={(e) => {
                setUserNameEdit(e.target.value);
              }}
            />
          </div>
        ) : (
          <h4 className="mb-0 text-color-5" onDoubleClick={() => setUserNameEdit(userName)}>
            {userName}
          </h4>
        )}
        <span className="d-block mt-4">
          <div className="btn-rounded text-color-5">
            <i
              className={`fal fa-copy cursor-pointer ${copySuccess ? "copy-success" : ""
                }`}
              onClick={(e) => {
                e.preventDefault();
                navigator.clipboard.writeText(address);
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 1000);
              }}
            ></i>
            <span className="copy-Text m-3">{address || "-"}</span>
          </div>
        </span>
      </div> */}
    </div>
  );
};

export default UserProfile;

