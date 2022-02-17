import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlatformChannelMessages } from "../../reducers/platformChannelMessagesReducer";
import { fetchPlatformChannel } from "../../reducers/platformChannelReducer";
import Channles from "../Channels/Channles";
import MessagesByPlatformChannels from "../MessagesByPlatformChannels/MessagesByPlatformChannels";
import SkeletonChannel from "../Skeleton/SkeletonChannel";
import SkeletonSignal from "../Skeleton/SkeletonSignal";
import select from "../../Assets/Messages/select.svg";
import "./Platform.css";

const MessagesByPlatform = () => {
  const dispatch = useDispatch();
  const { platformChannel, METADATA, platformChannelMessages } = useSelector(
    (state) => ({
      platformChannel: state.platformChannel,
      METADATA: state.metaData,
      platformChannelMessages: state.platformChannelMessages,
    })
  );
  const [selectedPlatformChannel, setselectedPlatformChannel] = useState("");
  const [searchFilter, setSearchFilter] = useState(false);
  const [showLoadmoreLabel, setShowLoadmoreLabel] = useState(true);
  const [messages, setMessages] = useState([]);
  const PlatformMessageRef = useRef();

  const scrollHandler = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    console.log(searchFilter);
    if (
      Math.round(scrollHeight - scrollTop) === clientHeight &&
      !platformChannelMessages.loading &&
      platformChannelMessages?.platformChannelMessages?.pageNumber <
        platformChannelMessages?.platformChannelMessages?.pageCount - 1
    ) {
      setShowLoadmoreLabel(true);
      dispatch(
        fetchPlatformChannelMessages(
          selectedPlatformChannel.id,
          platformChannelMessages.platformChannelMessages.pageNumber + 1,
          platformChannelMessages.platformChannelMessages.pageLimit
        )
      );
    }
  };
  useEffect(() => {
    if (selectedPlatformChannel) {
      setMessages([]);
      dispatch(fetchPlatformChannelMessages(selectedPlatformChannel.id));
    }
  }, [dispatch, selectedPlatformChannel]);

  useEffect(() => {
    if (
      platformChannelMessages &&
      !platformChannelMessages?.loading &&
      platformChannelMessages?.platformChannelMessages?.data
    )
      setMessages([
        ...messages,
        ...platformChannelMessages?.platformChannelMessages?.data,
      ]);
    // eslint-disable-next-line
  }, [platformChannelMessages]);
  useEffect(() => {
    dispatch(fetchPlatformChannel());
  }, [dispatch]);

  useEffect(() => {
    setShowLoadmoreLabel(false);
  }, [messages]);

  const selectedPlatformChannelHandler = (channel) => {
    setselectedPlatformChannel({
      id: channel.id,
      name: channel.platformChannelName,
    });
  };
  return (
    <div className="platform-container">
      <div className="col-3  platform-channel-column-container">
        {!METADATA.loading
          ? METADATA?.metaData?.platformList?.map((platform, index) => (
              <Channles
                channelList={platformChannel.platformChannel?.filter(
                  (x) => x.platform === platform.name
                )}
                selectChannelHandler={selectedPlatformChannelHandler}
                selectedChannel={selectedPlatformChannel}
                header={platform.name}
                platform
              />
            ))
          : [1, 2, 3, 4, 5].map((index) => (
              <div key={index}>
                <SkeletonChannel />
                <hr />
              </div>
            ))}
      </div>
      <div
        className="col-8 platform-message-column-container"
        ref={PlatformMessageRef}
      >
        {selectedPlatformChannel ? (
          !platformChannelMessages.loading || messages.length > 0 ? (
            <>
              <div className="meta-channel-header">
                <div className="channel-name">
                  {selectedPlatformChannel.name}
                </div>
                <i
                  class="bi bi-search search-icon"
                  onClick={() => setSearchFilter((prevState) => !prevState)}
                ></i>
              </div>
              <MessagesByPlatformChannels
                platformChannelMessages={messages}
                selectedPlatformChannel={selectedPlatformChannel}
                scrollHandler={scrollHandler}
                showLoadmoreLabel={showLoadmoreLabel}
              />
            </>
          ) : (
            <div className="d-flex container flex-column justify-content-between">
              {[1, 2, 3, 4, 5].map((index) => (
                <div key={index}>
                  <SkeletonSignal />
                  <hr />
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="select-channel">
            <img src={select} alt="select" width="150px" height="200px" />
            <p>Select a channel to view signals</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesByPlatform;
