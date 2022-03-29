import React, { Suspense, useContext } from "react";
import { Switch, Route } from "react-router-dom";

// VISUAL IMPORTS
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import LoadingSpinner from "./components/UI/LoadingSpinner";

import AuthContext from "./store/Auth-context";
import { Redirect } from "react-router-dom";

// LAZY
const NoPageFound = React.lazy(() => import("./pages/NoPageFound"));

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Suspense
        fallback={<div><LoadingSpinner/></div>}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/auth">
            <AuthPage />
          </Route>
          <Route path="/profile">
            {authCtx.isLogged ? <UserProfile /> : <Redirect to="auth"/>}
          </Route>
          {/* LOST URL ROUTE */}
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
