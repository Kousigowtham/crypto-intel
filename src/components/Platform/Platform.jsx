import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { fetchPlatformChannel } from "../../reducers/platformChannelReducer";
import ChannelsByPlatform from "../ChannelsByPlatform/ChannelsByPlatform";
import SkeletonChannel from "../Skeleton/SkeletonChannel";
import SkeletonSignal from "../Skeleton/SkeletonSignal";

const MessagesByPlatform = ({ platformChannel }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPlatformChannel());
  }, [dispatch]);
  return (
    <>
      <div className="container-fluid m-0 p-0 border-top">
        <div className="row">
          <div
            className="col-3 p-0 overflow-auto bg-light"
            style={{ height: "680px" }}
          >
            {!platformChannel.loading ? (
              <ChannelsByPlatform
                platformChannelList={platformChannel.platformChannel}
              />
            ) : (
              <div className="d-flex container flex-column justify-content-between">
                {[1, 2, 3, 4, 5].map((index) => (
                  <div key={index}>
                    <SkeletonChannel />
                    <hr />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="col-8 p-0 overflow-auto" style={{ height: "680px" }}>
            {!platformChannel.loading ? (
              <ChannelsByPlatform />
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

const MapStateToProps = (state) => ({
  platformChannel: state.platformChannel,
});

export default connect(MapStateToProps)(MessagesByPlatform);
