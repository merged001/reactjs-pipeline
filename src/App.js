/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import routes from "./pages/index";
import { connect } from "react-redux";
import Login from "./pages/Login";
import { useAddress, useNetworkMismatch } from "@thirdweb-dev/react";

import { loginSuccess } from "./actions";
import HomePage from "./pages/HomePage";

const App = (props) => {
  const address = useAddress();
  const isMismatched = useNetworkMismatch()

  return (
    <Routes>
      {
        (address && !isMismatched) ?
          routes.map((data, index) => (
            <Route
              onUpdate={() => window.scrollTo(0, 0)}
              exact={true}
              path={data.path}
              element={data.component}
              key={index}
            />
          )) : <>
            <Route path="/create-item" element={<Login />} />
            <Route path="/wallet-connect" element={<Login />} />
            <Route path="/*" element={<HomePage />} />
          </>}
    </Routes>
  );
};

export default connect(
  ({ auth }) => ({ auth: auth })
)(App);
