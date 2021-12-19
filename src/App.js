import React, { useEffect } from "react";
import "./App.css";
import { fetchCoinList } from "./reducers/coinListReducer";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import Signals from "./components/Signals/Signals";
import CreateSignalPopup from "./components/CreateSignalPopup/CreateSignalPopup";
import { useDispatch } from "react-redux";
import { fetchMetaData } from "./reducers/metaDataReducer";
import CreateSignal from "./components/CreateSignal/CreateSignal";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMetaData());
    dispatch(fetchCoinList());
  }, []);

  return (
    <>
      <Header />
      <CreateSignalPopup />
      <Routes>
        <Route exact path="/signals" element={<Signals />} />
        <Route exact path="/createSignal" element={<CreateSignal />} />
      </Routes>
    </>
  );
};

export default App;
