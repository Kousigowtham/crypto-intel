import React from "react";
import { useRef } from "react";
import { connect } from "react-redux";
import no_data from "../../Assets/Messages/no_data.svg";
import "./messagesByPlatformChannels.css";
import { TailSpin } from "react-loader-spinner";

const MessagesByPlatformChannels = ({
  platformChannelMessages,
  scrollHandler,
  showLoadmoreLabel,
}) => {
  const messageContainerRef = useRef();

  console.log(platformChannelMessages);
  return (
    <>
      {platformChannelMessages.length > 0 ? (
        <div
          onScroll={scrollHandler}
          ref={messageContainerRef}
          className="message-container"
        >
          {platformChannelMessages?.map((msg, index) => {
            return (
              <>
                <div className="container">
                  <div className="my-3 ms-5">
                    <div>
                      <div className="d-flex flex-wrap mb-2 align-items-baseline">
                        <div
                          className=" mb-0 flex-grow-1"
                          style={{
                            whiteSpace: "break-spaces",
                            lineHeight: "30px",
                          }}
                        >
                          {msg.messageContent}
                        </div>
                        <div className="text-muted">{msg.date}</div>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              </>
            );
          })}
          <div
            className={`m-auto px-3 py-2 loading-label ${
              showLoadmoreLabel ? "show" : ""
            }`}
          >
            Loading...
            {showLoadmoreLabel && (
              <TailSpin color="#73fbd3" height={15} width={15} />
            )}
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center h-100">
          <img src={no_data} alt="no_data" width="150px" height="200px" />
          <i className="bi bi-chat-left-text-fill"></i>
          <p>There is no signals in the selected channel</p>
        </div>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setSignalDispatch: (setSignalAction) => dispatch(setSignalAction),
  updateSignalDispatch: (updateSignalAction) => dispatch(updateSignalAction),
});

export default connect(null, mapDispatchToProps)(MessagesByPlatformChannels);
