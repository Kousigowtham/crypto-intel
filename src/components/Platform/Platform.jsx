import React, { useState, useEffect, useRef } from "react";
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
  const PlatformMessageRef = useRef();
  const [showLoadmoreLabel, setshowLoadmoreLabel] = useState({
    Bottom: false,
    Top: false,
  });

  const scrollHandler = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

    console.log(scrollTop, "scrollTop");
    console.log(clientHeight, "clientHeight");
    console.log(scrollHeight, "scrollHeight");

    if (
      Math.round(scrollHeight - scrollTop) === clientHeight &&
      platformChannelMessages?.platformChannelMessages?.pageNumber <
        platformChannelMessages?.platformChannelMessages?.pageCount - 1
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
      platformChannelMessages?.platformChannelMessages?.pageNumber > 0
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
    if (platformChannelMessages) PlatformMessageRef.current.scrollTop = 50;
  }, [platformChannelMessages]);
  useEffect(() => {
    dispatch(fetchPlatformChannel());
  }, [dispatch]);

  const selectedPlatformChannelHandler = (platformChannelId) => {
    setselectedPlatformChannel(platformChannelId);
  };

  return (
    <div className="platform-container">
      <div className="col-3  platform-channel-column-container">
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
        className="col-8 platform-message-column-container"
        onScroll={scrollHandler}
        ref={PlatformMessageRef}
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
  );
};

const MapStateToProps = (state) => ({
  platformChannel: state.platformChannel,
  platformChannelMessages: state.platformChannelMessages,
});

export default connect(MapStateToProps)(MessagesByPlatform);
