import React, { useState, useRef, useContext} from "react";

// VISUAL IMPORTS
import ErrorModal from "../Layout/PopupModal";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./AuthForm.module.css";

// CONTEXT
import AuthContext from "../../store/Auth-context";
import { useHistory } from "react-router-dom";

const AuthForm = () => {
   // ERROR HANDELING
   const [hasError, setError] = useState(false);
   const [errorMessage, setErrorMessage] = useState();
   // LOGIN
   const [isLogin, setIsLogin] = useState(false);
   const [isloading, setloading] = useState(false);
   // GET VALUES
   const emailRef = useRef();
   const passwordRef = useRef();
   // CONTEXT
   const authCtx = useContext(AuthContext);

   const history = useHistory();

   //REDIRECT IF CREDENTIALS TO OLD
   // useEffect(() => {
   //    if (!authCtx) {
   //      history.push("/auth");
   //    }
   // },[authCtx, history]) 

   const switchAuthModeHandler = () => {
      setIsLogin(prevState => !prevState);
   };

   const errorHandler = () => {
      setError(prevState => !prevState);
   };

   // Const function => form
   const submitLoginHandler = event => {
      event.preventDefault();
      setloading(true);
      const emailCurrent = emailRef.current.value;
      const passwordCurrent = passwordRef.current.value;
      // CHECK VALUES
      if (emailCurrent.trim() === " ") return;
      if (passwordCurrent.trim() === " ") return;
      // LOGGED IN?/!
      let urlEnd;
      if (isLogin) {
         urlEnd =
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC6dGNwU02TWzTJrXdA14s88P5FqjPH45g";
      } else {
         urlEnd =
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC6dGNwU02TWzTJrXdA14s88P5FqjPH45g";
      }
      fetch(urlEnd, {
         method: "POST",
         body: JSON.stringify({
            email: emailCurrent,
            password: passwordCurrent,
            returnSecureToken: true,
         }),
         headers: {
            "Content-Type": "application/json",
         },
      })
      .then(response => {
         setloading(false);
         // GREAT SUCCESS
         if (response.ok) {
            console.log("succed");
            return response.json();
         }
         // NO SUCCESS
         else {
            response.json().then(data => {
               setError(true);
               setErrorMessage(data.error.message);
               console.log(data);
            });
         }
      })
      .then(data => {
         const experationTime = new Date(new Date().getTime() + (+data.expiresIn * 1000));
         authCtx.login(data.idToken, experationTime.toISOString());
         history.replace("/")
      })
      // ERROR WHILE RETURNING
      .catch(error => {
         console.log("catch" + error);
      });


   };
   return (
      <section className={classes.auth}>
         {hasError && (
            <ErrorModal
               errorMessage={errorMessage}
               setHide={errorHandler}
               isShowing={hasError}
            />
         )}
         <h1>{isLogin ? "Login" : "Sign Up"}</h1>
         <form onSubmit={submitLoginHandler}>
            <div className={classes.control}>
               <label htmlFor="email">Your Email</label>
               <input ref={emailRef} type="email" id="email" required />
            </div>
            <div className={classes.control}>
               <label htmlFor="password">Your Password</label>
               <input
                  ref={passwordRef}
                  type="password"
                  id="password"
                  required
               />
            </div>
            {/* UNDER THE FORM */}
            {isloading ? (
               <LoadingSpinner />
            ) : (
               <div className={classes.actions}>
                  <button>{isLogin ? "Login" : "Create Account"}</button>
                  <button
                     type="button"
                     className={classes.toggle}
                     onClick={switchAuthModeHandler}
                  >
                     {isLogin
                        ? "Create new account"
                        : "Login with existing account"}
                  </button>
               </div>
            )}
         </form>
      </section>
   );
};

export default AuthForm;
