import React, { useState } from "react";
import { connect } from "react-redux";

const ChannelsByPlatform = ({
  platformChannelList,
  selectedPlatformChannelHandler,
  METADATA,
}) => {
  const [accordion, setaccordion] = useState({
    DISCORD: false,
    TELEGRAM: false,
  });

  return (
    <>
      <div className="d-flex overflow-auto flex-column scrollbar-styling">
        <div className="ps-4 pt-5 d-flex align-items-baseline ">
          <ul style={{ listStyle: "none" }}>
            {!METADATA.loading
              ? METADATA?.metaData?.platformList?.map((platform, index) => {
                  const platformName = platform.name;
                  console.log(accordion[platformName]);
                  return (
                    <>
                      <div
                        className="d-flex align-items-center "
                        onClick={() =>
                          setaccordion((prevState) => ({
                            ...prevState,
                            [platformName]: !prevState[platformName],
                          }))
                        }
                      >
                        <i
                          className="bi bi-chevron-down me-2"
                          style={
                            accordion[platform.name]
                              ? {
                                  transform: "rotate(-90deg)",
                                  fontSize: "10px",
                                }
                              : { fontSize: "10px" }
                          }
                        ></i>
                        <li key={platform.name + index}>{platform.name}</li>
                      </div>
                      <ul
                        style={{
                          listStyle: "none",
                          display: accordion[platformName] ? "none" : "",
                        }}
                      >
                        {platformChannelList
                          ?.filter((x) => x.platform === platform.name)
                          .map((platformChannel, index) => {
                            return (
                              <li
                                className="pt-3 pb-2 ps-4 mx-3  text-secondary"
                                key={platformChannel.id}
                                onClick={() =>
                                  selectedPlatformChannelHandler(
                                    platformChannel.id
                                  )
                                }
                              >
                                {platformChannel.platformChannelName}
                              </li>
                            );
                          })}
                      </ul>
                    </>
                  );
                })
              : null}
          </ul>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  METADATA: state.metaData,
});
export default connect(mapStateToProps)(ChannelsByPlatform);
