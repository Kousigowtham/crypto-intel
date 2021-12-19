import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Channles from "../Channels/Channles";
import SignalsByChannel from "../SignalsByChannel/SignalsByChannel";
import "./Signals.css";
import SkeletonSignal from "../Skeleton/SkeletonSignal";
import { useDispatch } from "react-redux";
import { fetchSignalList } from "../../reducers/signalListReducer";
import { useNavigate } from "react-router-dom";
const Signals = ({ signalList }) => {
  const dispatch = useDispatch();
  const [selectedChannel, setselectedChannel] = useState("");
  const selectedChannelHandler = (name) => {
    setselectedChannel(name);
    dispatch(fetchSignalList());
  };

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchSignalList());
  }, []);

  return (
    <>
      <div className="container-fluid m-0 p-0 border-top">
        <div className="row">
          <div
            className="col-3 p-0 overflow-auto bg-light"
            style={{ height: "680px" }}
          >
            <Channles selectChannelHandler={selectedChannelHandler} />
          </div>
          <div className="col-8 p-0 overflow-auto" style={{ height: "680px" }}>
            {!signalList.loading ? (
              <SignalsByChannel
                channel={selectedChannel}
                signalListByChannel={signalList.signalList.filter(
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
});

export default connect(mapStateToProps)(Signals);
