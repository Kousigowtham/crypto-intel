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
import FadeIn from "./components/FadeIn/FadeIn";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [showSidebar, setshowSidebar] = useState(false);

  useEffect(() => {
    dispatch(fetchMetaData());
    dispatch(fetchCoinList());
  }, [dispatch]);

  const FadeOutComponent = () => {
    return (
      <i
        class="bi bi-chevron-left sidebar-menu"
        onClick={() => setshowSidebar(true)}
      ></i>
    );
  };

  return (
    <>
      {location.pathname !== "/" && (
        <div className="sidemenu-main-container">
          <FadeIn
            classes={"d-flex"}
            show={showSidebar}
            FadeOutComponent={FadeOutComponent}
          >
            <i
              class="bi bi-chevron-right sidebar-menu"
              onClick={() => setshowSidebar(false)}
            ></i>
            <Sidebar setshowSidebar={setshowSidebar} />
          </FadeIn>
        </div>
      )}

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
