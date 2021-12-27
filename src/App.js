import React, { useEffect } from "react";
import "./App.css";
import { fetchCoinList } from "./reducers/coinListReducer";
import { Route, Routes } from "react-router-dom";
import Signals from "./components/Signals/Signals";
import { useDispatch } from "react-redux";
import { fetchMetaData } from "./reducers/metaDataReducer";
import CreateSignal from "./components/CreateSignal/CreateSignal";
import MessagesByPlatform from "./components/Platform/Platform";
import Home from "./components/Home/Home";
import Navbar from "./components/NavBar/Navbar";
import { useLocation } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchMetaData());
    dispatch(fetchCoinList());
  }, [dispatch]);

  return (
    <>
      {/* <Header /> */}
      <Navbar
        style={
          location.pathname !== "/"
            ? {
                backgroundColor: "black",
                color: "black",
              }
            : null
        }
      />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signals" element={<Signals />} />
        <Route exact path="/createSignal" element={<CreateSignal />} />
        <Route exact path="/platforms" element={<MessagesByPlatform />} />
      </Routes>
    </>
  );
};

export default App;
