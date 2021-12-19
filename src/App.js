import React, { useEffect } from "react";
import "./App.css";
import { fetchCoinList } from "./reducers/coinListReducer";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import Signals from "./components/Signals/Signals";
import { useDispatch } from "react-redux";
import { fetchMetaData } from "./reducers/metaDataReducer";
import CreateSignal from "./components/CreateSignal/CreateSignal";
import MessagesByPlatform from "./components/Platform/Platform";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMetaData());
    dispatch(fetchCoinList());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/signals" element={<Signals />} />
        <Route exact path="/createSignal" element={<CreateSignal />} />
        <Route exact path="/platforms" element={<MessagesByPlatform />} />
      </Routes>
    </>
  );
};

export default App;
