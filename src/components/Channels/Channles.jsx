import { connect } from "react-redux";
import React, { useState } from "react";
import "./Channels.css";
import SkeletonChannel from "../Skeleton/SkeletonChannel";

const Channles = ({ METADATA, selectChannelHandler }) => {
  const [accordion, setaccordion] = useState(false);

  return (
    <>
      <div className="d-flex overflow-auto flex-column scrollbar-styling">
        <div className="ps-4 pt-5 d-flex align-items-baseline ">
          <i
            className="bi bi-chevron-down align-self-baseline"
            style={
              accordion
                ? {
                    transform: "rotate(-90deg)",
                    fontSize: "10px",
                  }
                : { fontSize: "10px" }
            }
          ></i>
          <span
            className="text-center ps-2 accordion-container"
            onClick={() => setaccordion((prevState) => !prevState)}
          >
            channels
          </span>
        </div>
        <div className="channel-main-container">
          {!METADATA.loading
            ? METADATA?.metaData?.channelList?.map((channel, index) => {
                return (
                  <div
                    key={channel.name + index}
                    className={"pt-3 pb-3 ps-4 ms-3 channel-container"}
                    style={
                      accordion
                        ? {
                            display: "none",
                          }
                        : {}
                    }
                    onClick={() => {
                      selectChannelHandler(channel.name);
                    }}
                  >
                    <div className="fs-6 font-monospace">
                      <span className="ms-3 me-2">#</span>
                      {channel.name}
                    </div>
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
    </>
  );
};
const mapStateToProps = (state) => ({
  METADATA: state.metaData,
});
export default connect(mapStateToProps, null)(Channles);
