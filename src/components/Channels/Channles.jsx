import React, { useState } from "react";
import "./Channels.css";
import SkeletonChannel from "../Skeleton/SkeletonChannel";

const Channles = ({
  channelList,
  selectedChannel,
  selectChannelHandler,
  header,
  platform,
}) => {
  const [accordion, setaccordion] = useState(false);

  return (
    <div>
      <div className="accordion-container">
        <i
          className={`bi bi-chevron-down accordion ${
            accordion && "accordion-open"
          }`}
        ></i>
        <span
          className="channel-header"
          onClick={() => setaccordion((prevState) => !prevState)}
        >
          {header}
        </span>
      </div>
      <div className={accordion && "display-none"}>
        {channelList
          ? channelList?.map((channel, index) => {
              const { name, platformChannelName, id, platformChannelId } =
                channel;
              const active =
                selectedChannel?.name === (name || platformChannelName) &&
                selectedChannel?.id === (id || platformChannelId);
              return (
                <div
                  key={channel.name + index}
                  className={`pt-3 pb-3 ps-4 m-0 channel--container ${
                    active ? "active" : ""
                  }`}
                  onClick={() => {
                    selectChannelHandler(channel);
                  }}
                >
                  <span className="ms-3 me-2">#</span>
                  {name || platformChannelName}
                </div>
              );
            })
          : [1, 2, 3, 4, 5].map((index) => (
              <div key={index}>
                <SkeletonChannel />
                <hr />
              </div>
            ))}
      </div>
    </div>
  );
};

export default Channles;
