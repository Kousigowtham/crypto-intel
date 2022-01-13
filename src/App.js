import React, { useEffect, useState } from "react";
import "./App.css";
import { fetchCoinList } from "./reducers/coinListReducer";
import { Route, Routes } from "react-router-dom";
import Signals from "./components/Signals/Signals";
import { useDispatch } from "react-redux";
import { fetchMetaData } from "./reducers/metaDataReducer";
import CreateSignal from "./components/CreateSignal/CreateSignal";
import MessagesByPlatform from "./components/Platform/Platform";
import { useLocation } from "react-router-dom";
import Home from "./Pages/Home/Home";
import { Login, Signup } from "./Pages/Account/Account";
import Sidebar from "./components/Sidebar/Sidebar";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [showSidebar, setshowSidebar] = useState(false);

  useEffect(() => {
    dispatch(fetchMetaData());
    dispatch(fetchCoinList());
  }, [dispatch]);

  return (
    <>
      {!showSidebar && location.pathname !== "/" && (
        <i
          class="bi bi-list sidebar-menu"
          onClick={() => setshowSidebar(true)}
        ></i>
      )}
      {showSidebar && <Sidebar setshowSidebar={setshowSidebar} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signals" element={<Signals />} />
        <Route exact path="/createSignal" element={<CreateSignal />} />
        <Route exact path="/platforms" element={<MessagesByPlatform />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;
