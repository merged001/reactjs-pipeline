import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { connect } from 'react-redux';
import { useMetamask, useNetworkMismatch } from '@thirdweb-dev/react';
import img1 from "../assets/images/icon/connect-1.png";
import { MESSAGE_EVENTS } from '../components/comman/ErrorPopUp';

const customStyles = {
    error: { color: "red", fontSize: "14px", paddingBottom: '10px' }
}

const Login = (props) => {
    const navigate = useNavigate();
    const [error] = useState(null);
    const connectWithMetamask = useMetamask();
    const isMismatched = useNetworkMismatch();

    const [data] = useState([
        {
            img: img1,
            title: "Meta Mask",
            description:
                "-",
            walletType: "metamask",
        },
    ]);

    const connectWallet = async (type) => {
        try {
            if (type === "metamask") {
                console.log('isMismatched', isMismatched)
                if (isMismatched) {
                    alert('Kindly connect to Rinkeby network');
                }
                await connectWithMetamask();
            }
        } catch (error) {
            MESSAGE_EVENTS.ERROR_MESSAGE.emit(error);
        }finally{
            navigate('/user')
        }
    };

    return (
        <div>
            <Header />
            <section className="flat-title-page inner">
                <div className="overlay"></div>
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title-heading mg-bt-12">
                                <h3 className="heading text-center">Connect your wallet</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="tf-login tf-section tf-login-section">
                <div className="themesflat-container login-container">
                    <div className="row">
                        <div className="col-12">
                            {/* <h4 className="tf-title-heading ct style-1">
                                Login To NFTs
                            </h4> */}
                            <div className="flat-form box-login-email">
                                <div className="form-inner">
                                    <form >
                                        {/* <input id="name" name="name" tabIndex="1" value={userName} aria-required="true" required type="text" placeholder="Username" onChange={(e) => {
                                            setUserName(e.target.value);
                                            onInputChange();
                                        }} /> */}
                                        {error && (
                                            <div className="form-item" style={customStyles.error}>
                                                <span> Error : </span>
                                                {error}
                                            </div>
                                        )}
                                        {data.map((item, index) => (
                                            <div className="form-item d-flex" key={index}>
                                                <button type='button' className="submit" onClick={() => connectWallet(item.walletType)}>
                                                    <span className='cursor-pointer'>  <img src={item.img} alt="Whitelabel NFT" /></span>
                                                    <span>Connect to {item.title}</span>
                                                </button>
                                            </div>
                                        ))}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default connect(
    ({ auth }) => ({ auth: auth })
)(Login);
