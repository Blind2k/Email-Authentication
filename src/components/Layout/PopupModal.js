import React from "react";
import ReactDOM from "react-dom";
import classes from "./Popup.module.css";
import LogoTop from "../../assets/logo.png";

const portalElement = document.getElementById("overlays");

const PopupModal = ({ isShowing, setHide, errorMessage }) => 
  isShowing ? ReactDOM.createPortal(
    <React.Fragment>
       <div className={classes.overlay} onClick={setHide} />
       <div className={classes.wrapper} aria-modal aria-hidden tabIndex={-1} role="dialog" onClick={setHide}>
          <div className={classes.modal}>
             <header className="modal-header">
                <img src={LogoTop} className="logo-error" alt="Our logo" />
                <button type="button" className={classes.modalclosebutton} data-dismiss="modal" aria-label="Close">
                   <span aria-hidden="true">&times;</span>
                </button>
             </header>
             <p className={classes.p}>{errorMessage}</p>
          </div>
       </div>
    </React.Fragment>, portalElement) : null;
export default PopupModal;