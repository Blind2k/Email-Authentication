// import React from "react";
// import ReactDOM from "react-dom";
// import "./PopupModal.css";
// import LogoTop from "../../assets/logo.png";

const portalElement = document.getElementById('overlays');

const PopupModal = ({ isShowing, setHide, errorMessage }) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal-overlay" onClick={setHide} />
          <div
            className="modal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
            onClick={setHide}
          >
            <div className="modal">
              <div className="modal-header">
                <img src={LogoTop} className="logo-error" alt="Our logo" />

                <button
                  type="button"
                  className="modal-close-button"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <p className="modal-text">{errorMessage}</p>
            </div>
          </div>
        </React.Fragment>,
        portalElement
      )
    : null;

// export default PopupModal;
