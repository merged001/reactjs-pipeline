import React, { useEffect, useState } from 'react';
import Modal from "react-modal";
import EventEmitter from 'eventemitter3';

export const MESSAGE_EVENTS = {
   ERROR_MESSAGE: new EventEmitter(),
   ERROR_EVENT:"ERROR_EVENT"
}

const ErrorPopUp=()=>{
    const customStyles = {
        content: {
            width: "25%",
            minWidth: '450px',
            minHeight: '300px',
            height: "25%",
            borderRadius: "10px",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            // background: "#343444",
            zIndex: '10'
        },
    };

    const [error,setError] = useState(null);

    useEffect(()=>{
        MESSAGE_EVENTS.ERROR_MESSAGE.on(MESSAGE_EVENTS.ERROR_EVENT,setError);
    },[]);

    return (
        <Modal
            ariaHideApp={false}
            isOpen={!!error}
            style={customStyles}
        >
            <div className="modal-content">
                <h5 className="text-center modal-header">{error}</h5>
                <div className="d-flex">
                <button className="sc-button fl-button pri-3 m-3" onClick={()=>setError(null)}>
                    <span>Close</span>
                </button>
                </div>
            </div>
        </Modal>
    );
};


export default ErrorPopUp;