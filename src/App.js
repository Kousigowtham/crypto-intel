import React, { useEffect } from "react";
import { connect } from "react-redux";
import { GET_COINLIST_ACTION, GET_METADATA_ACTION } from "./actions";
import "./App.css";
import { getCoinsList, getMetaData } from "./axios/api/async";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import Signals from "./components/Signals/Signals";
import CreateSignalPopup from "./components/CreateSignalPopup/CreateSignalPopup";

const App = ({ metaDataDispatch, coinListDispatch }) => {
  useEffect(() => {
    getMetaData().then((metaData) =>
      metaDataDispatch(GET_METADATA_ACTION(metaData))
    );
    getCoinsList().then((coinList) =>
      coinListDispatch(GET_COINLIST_ACTION(coinList))
    );
  }, [coinListDispatch, metaDataDispatch]);

  return (
    <>
      <Header />
      <CreateSignalPopup />
      <Routes>
        <Route exact path="/signals" element={<Signals />} />
      </Routes>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  metaDataDispatch: (metadataAction) => dispatch(metadataAction),
  coinListDispatch: (coinListAction) => dispatch(coinListAction),
});

export default connect(null, mapDispatchToProps)(App);
