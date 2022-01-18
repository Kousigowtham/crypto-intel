import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { fetchPlatformChannelMessages } from "../../reducers/platformChannelMessagesReducer";
import { fetchPlatformChannel } from "../../reducers/platformChannelReducer";
import ChannelsByPlatform from "../ChannelsByPlatform/ChannelsByPlatform";
import MessagesByPlatformChannels from "../MessagesByPlatformChannels/MessagesByPlatformChannels";
import SkeletonChannel from "../Skeleton/SkeletonChannel";
import SkeletonSignal from "../Skeleton/SkeletonSignal";
import "./Platform.css";

const MessagesByPlatform = ({ platformChannel, platformChannelMessages }) => {
  const dispatch = useDispatch();
  const [selectedPlatformChannel, setselectedPlatformChannel] = useState("");
  const [showLoadmoreLabel, setshowLoadmoreLabel] = useState({
    Bottom: false,
    Top: false,
  });

  const scrollHandler = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

    console.log(platformChannelMessages);
    if (
      scrollHeight - scrollTop === clientHeight &&
      platformChannelMessages.platformChannelMessages.pageNumber <
        platformChannelMessages.platformChannelMessages.pageCount - 1
    ) {
      setshowLoadmoreLabel({ Top: false, Bottom: true });
      setTimeout(() => {
        dispatch(
          fetchPlatformChannelMessages(
            selectedPlatformChannel,
            platformChannelMessages.platformChannelMessages.pageNumber + 1,
            platformChannelMessages.platformChannelMessages.pageLimit
          )
        );
        setshowLoadmoreLabel({ Top: false, Bottom: false });
      }, 2000);
    }
    if (
      scrollTop === 0 &&
      platformChannelMessages.platformChannelMessages.pageNumber > 0
    ) {
      setshowLoadmoreLabel({ Top: true, Bottom: false });
      setTimeout(() => {
        dispatch(
          fetchPlatformChannelMessages(
            selectedPlatformChannel,
            platformChannelMessages.platformChannelMessages.pageNumber - 1,
            platformChannelMessages.platformChannelMessages.pageLimit
          )
        );
        setshowLoadmoreLabel({ Top: false, Bottom: false });
      }, 2000);
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
    <div className="platform-main-container">
      <div className="platform-container">
        <div className="row">
          <div
            className="col-3 p-0 my-1 overflow-auto platform-channel-column-container"
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
            className="col-8 px-0  d-flex flex-column py-5 overflow-auto flex-grow-1"
            style={{ height: "680px" }}
            onScroll={scrollHandler}
          >
            {showLoadmoreLabel.Top && (
              <span className="m-auto px-3 py-2 ">Loading...</span>
            )}
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
            {showLoadmoreLabel.Bottom && (
              <span className="m-auto px-3 py-2 ">Loading...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const MapStateToProps = (state) => ({
  platformChannel: state.platformChannel,
  platformChannelMessages: state.platformChannelMessages,
});

export default connect(MapStateToProps)(MessagesByPlatform);
