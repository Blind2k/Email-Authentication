import React, { useState, useEffect, useCallback } from "react";

let logoutTime;
const AuthContext = React.createContext({
   // Variables
   token: "",
   isLogged: false,
   // To change variables
   login: token => {},
   logout: () => {},
});

// TIME LEFT 4 TOKEN
const calculateRemainingTime = experationTime => {
   const currentTime = new Date().getTime();
   const ExperationMili = new Date(experationTime).getTime();

   const timeRemaining = ExperationMili - currentTime;
   return timeRemaining;
};

// TOKEN BRING
const retriveToken = () => {
   const storedToken = localStorage.getItem("verificationToken");
   const storedTime = localStorage.getItem("verificationTime");
   // CURRENT TOKEN TIME LEFT
   const remainingTime = calculateRemainingTime(storedTime);
   if (remainingTime <= 3600 || remainingTime <= 0) {
      localStorage.removeItem("verificationToken");
      localStorage.removeItem("verificationTime");
      return null;
   }
   return { token: storedToken, duration: remainingTime };
};
// OFF CONTEXT PROVIDER => MANAGING OFF RELATED STATE
export const AuthContextProvider = props => {
   const tokenObj = retriveToken();
   let initialToken;
   if (tokenObj) {
      initialToken = tokenObj.token;
   }
   const [token, setToken] = useState(initialToken);

   const userIsLogged = !!token; //"!!" turns something to a boolean

   const logoutHandler = useCallback(() => {
      setToken(null);
      localStorage.removeItem("verificationToken");
      localStorage.removeItem("verificationTime");

      // START AGAIN WHEN REENTER
      if (logoutTime) {
         clearTimeout(logoutTime);
      }
   }, []);

   const loginHandler = (token, experationTime) => {
      setToken(token);
      localStorage.setItem("verificationToken", token);
      localStorage.setItem("verificationTime", experationTime);

      const remainingTime = calculateRemainingTime(experationTime);
      logoutTime = setTimeout(logoutHandler, remainingTime);
   };

   // AUTO LOG THE USER TIMER
   useEffect(() => {
      if (tokenObj) {
         console.log(tokenObj.duration);
         logoutTime = setTimeout(logoutHandler, tokenObj.duration);
      }
   }, [tokenObj, logoutHandler]);

   // SUMMERIZING
   const contextValue = {
      token: token,
      isLogged: userIsLogged,
      login: loginHandler,
      logout: logoutHandler,
   };
   return (
      <AuthContext.Provider value={contextValue}>
         {props.children}
      </AuthContext.Provider>
   );
};
export default AuthContext;
