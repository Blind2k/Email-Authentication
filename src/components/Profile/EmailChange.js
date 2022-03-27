import React, { useRef, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../../store/Auth-context";
// VISUAL HOOKS
import classes from "./ProfileForm.module.css";
import ErrorModal from "../Layout/PopupModal";

const END_URL =
   "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC6dGNwU02TWzTJrXdA14s88P5FqjPH45g";

const EmailChange = () => {
   const history = useHistory();
   // GET USER INPUT
   const emailRef = useRef();
   const authCtx = useContext(AuthContext);
   // ERROR
   const [hasError, setError] = useState(false);
   const [errorMessage, setErrorMessage] = useState();
   const errorHandler = () => {
      setError(prevState => !prevState);
   };
   // VALIDATE
   const submitFormHandler = event => {
      event.preventDefault();
      const emailCurrent = emailRef.current.value;
      if (emailCurrent.trim() === "") {
         return;
      } else {
         fetch(END_URL, {
            method: "POST",
            body: JSON.stringify({
               idToken: authCtx.token,
               email: emailCurrent,
               returnSecureToken: true,
            }),
            headers: {
               "Content-Type": "application/json",
            },
         })
         .then(response => {
            if (response.ok) {
               return response.json();
            } else {
               // ERROR FROM SERVER
               response.json().then(data => {
                  setError(true);
                  setErrorMessage(data.error.message);
               });
            }
         })
         .then(data => {
            authCtx.token = data.idToken;
            history.replace("/");
         })
         .catch(error => {
            console.log(error);
         });
      }
   };
   return (
      <form className={classes.form} onSubmit={submitFormHandler}>
         {hasError && (
            <ErrorModal
               errorMessage={errorMessage}
               setHide={errorHandler}
               isShowing={hasError}
            />
         )}
         <div className={classes.control}>
            <label htmlFor="new-email">New Email address</label>
            <input type="email" id="new-email" ref={emailRef} />
         </div>
         <div className={classes.action}>
            <button>Change email</button>
         </div>
      </form>
   );
};

export default EmailChange;
