import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { fetchPlatformChannelMessages } from "../../reducers/platformChannelMessagesReducer";
import { fetchPlatformChannel } from "../../reducers/platformChannelReducer";
import ChannelsByPlatform from "../ChannelsByPlatform/ChannelsByPlatform";
import MessagesByPlatformChannels from "../MessagesByPlatformChannels/MessagesByPlatformChannels";
import SkeletonChannel from "../Skeleton/SkeletonChannel";
import SkeletonSignal from "../Skeleton/SkeletonSignal";

const MessagesByPlatform = ({ platformChannel, platformChannelMessages }) => {
  const dispatch = useDispatch();
  const [selectedPlatformChannel, setselectedPlatformChannel] = useState("");

  const scrollHandler = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

    console.log(platformChannelMessages);
    if (
      scrollHeight - scrollTop === clientHeight &&
      platformChannelMessages.platformChannelMessages.pageNumber <
        platformChannelMessages.platformChannelMessages.pageCount - 1
    ) {
      dispatch(
        fetchPlatformChannelMessages(
          selectedPlatformChannel,
          platformChannelMessages.platformChannelMessages.pageNumber + 1,
          platformChannelMessages.platformChannelMessages.pageLimit
        )
      );
    }
    if (
      scrollTop === 0 &&
      platformChannelMessages.platformChannelMessages.pageNumber > 0
    ) {
      dispatch(
        fetchPlatformChannelMessages(
          selectedPlatformChannel,
          platformChannelMessages.platformChannelMessages.pageNumber - 1,
          platformChannelMessages.platformChannelMessages.pageLimit
        )
      );
    }
  };
  useEffect(() => {
    dispatch(fetchPlatformChannelMessages(selectedPlatformChannel));
  }, [dispatch, selectedPlatformChannel]);

  useEffect(() => {
    dispatch(fetchPlatformChannel());
  }, [dispatch]);

  const selectedPlatformChannelHandler = (platformChannelId) => {
    setselectedPlatformChannel(platformChannelId);
  };

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
                selectedPlatformChannelHandler={selectedPlatformChannelHandler}
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
          <div
            className="col-8 px-0  py-5 overflow-auto"
            style={{ height: "680px" }}
            onScroll={scrollHandler}
          >
            {!platformChannelMessages.loading ? (
              <MessagesByPlatformChannels
                platformChannelMessages={platformChannelMessages}
                selectedPlatformChannel={selectedPlatformChannel}
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

const MapStateToProps = (state) => ({
  platformChannel: state.platformChannel,
  platformChannelMessages: state.platformChannelMessages,
});

export default connect(MapStateToProps)(MessagesByPlatform);
