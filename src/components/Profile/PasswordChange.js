import React, { useRef, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/Auth-context";
// VISUAL HOOKS
import classes from "./ProfileForm.module.css";
import PopupModal from "../Layout/PopupModal";

const END_URL =
   "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC6dGNwU02TWzTJrXdA14s88P5FqjPH45g";

const PasswordChange = () => {
   const history = useHistory();
   // GET USER INPUT
   const passwordRef = useRef();
   const authCtx = useContext(AuthContext);
   // GOOD CHANGE
   const [didGood, setGood] = useState(false);
   // ERROR
   const [hasError, setError] = useState(false);
   const [errorMessage, setErrorMessage] = useState();

   const errorHandler = () => {
      setError(prevState => !prevState);
   };

   const popupHandler = () => {
      setGood(prevState => !prevState);
   };

   // VALIDATE
   const submitFormHandler = event => {
      event.preventDefault();
      const passwordCurrent = passwordRef.current.value;
      if (passwordCurrent.trim() === " ") {
         return;
      } else {
         fetch(END_URL, {
            method: "POST",
            body: JSON.stringify({
               idToken: authCtx.token,
               password: passwordCurrent,
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
               setGood(true);
               authCtx.token = data.idToken;
               setTimeout(() => {history.replace("/")}, 2000);
            })
            .catch(error => {
               console.log(error);
            });
      }
   };
   return (
      <form className={classes.form} onSubmit={submitFormHandler}>
         {/* GOOD THING */}
         {didGood && (
            <PopupModal
               errorMessage="Password Change"
               setHide={popupHandler}
               isShowing={didGood}
            />
         )}
         {/* NOT GOOD */}
         {hasError && (
            <PopupModal
               errorMessage={errorMessage}
               setHide={errorHandler}
               isShowing={hasError}
            />
         )}
         
         <div className={classes.control}>
            <label htmlFor="new-password">New Password</label>
            <input type="password" id="new-password" ref={passwordRef} />
         </div>
         <div className={classes.action}>
            <button>Change Password</button>
         </div>
      </form>
   );
};

export default PasswordChange;
