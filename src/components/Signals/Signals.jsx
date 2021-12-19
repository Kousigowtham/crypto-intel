import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Channles from "../Channels/Channles";
import SignalsByChannel from "../SignalsByChannel/SignalsByChannel";
import {
  GET_SIGNALSLIST_ACTION,
  UPDATE_SIGNAL_LIST_LOADER_ACTION,
} from "../../actions";
import { getSignals } from "../../axios/api/async";
import "./Signals.css";
import SkeletonSignal from "../Skeleton/SkeletonSignal";

const Signals = ({
  getSignalListDispatch,
  updateSignalListLoader,
  updateSignalListLoaderDispatch,
  signalList,
}) => {
  const [selectedChannel, setselectedChannel] = useState("");
  const selectedChannelHandler = (name) => {
    setselectedChannel(name);
    updateSignalListLoaderDispatch(UPDATE_SIGNAL_LIST_LOADER_ACTION(true));

    getSignals().then((res) => {
      getSignalListDispatch(GET_SIGNALSLIST_ACTION(res.data));
      updateSignalListLoaderDispatch(UPDATE_SIGNAL_LIST_LOADER_ACTION(false));
    });
  };
  useEffect(() => {
    getSignals().then((res) => {
      getSignalListDispatch(GET_SIGNALSLIST_ACTION(res.data));
    });
  }, [getSignalListDispatch]);

  return (
    <>
      <i
        className="bi bi-plus m-4 text-center rounded-circle position-absolute text-white bg-success plus"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        style={{
          height: "50px",
          width: "50px",
          fontSize: "50px",
          bottom: "5%",
          right: "5%",
        }}
      ></i>
      <div className="container-fluid m-0 p-0 border-top">
        <div className="row">
          <div
            className="col-3 p-0 overflow-auto bg-light"
            style={{ height: "680px" }}
          >
            <Channles selectChannelHandler={selectedChannelHandler} />
          </div>
          <div className="col-8 p-0 overflow-auto" style={{ height: "680px" }}>
            {signalList !== null && !updateSignalListLoader ? (
              <SignalsByChannel
                channel={selectedChannel}
                signalListByChannel={signalList.data.data.filter(
                  (x) =>
                    x.signal.channelDetail.name === selectedChannel &&
                    x.signal.active === true
                )}
              />
            ) : (
              <div className="d-flex container flex-column justify-content-between">
                {[1, 2, 3, 4, 5].map((index) => (
                  <div key={index}>
                    <SkeletonSignal />
                    <hr />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  signalList: state.signalList,
  updateSignalListLoader: state.updateSignalListloader,
});

const mapDispatchToProps = (dispatch) => ({
  getSignalListDispatch: (getSignalListAction) => dispatch(getSignalListAction),
  updateSignalListLoaderDispatch: (updateSignalListLoaderAction) =>
    dispatch(updateSignalListLoaderAction),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signals);
