import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";

import rootSaga from "./sagas";
import reducers from "./reducers";
import App from "./App";
import ScrollToTop from "./ScrollToTop";
import { requestApi } from "./utils/constant";
import ErrorPopUp from "./components/comman/ErrorPopUp";

axios.defaults.baseURL = requestApi;

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
const rootElement = document.getElementById("root");

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <ThirdwebProvider
      desiredChainId={ChainId.Goerli}
      sdkOptions={{
        gasSettings: { maxPriceInGwei: 500, speed: "fast" },
        readonlySettings: {
          chainId: ChainId.Goerli,
          rpcUrl: "https://goerli.infura.io/v3/45b5efd51eed4e77975a091aa750664c",
        },
      }}
    >
      <BrowserRouter>
        <ScrollToTop />
        <App />
        <ErrorPopUp/>
      </BrowserRouter>
    </ThirdwebProvider>
  </Provider>,
  rootElement
);
