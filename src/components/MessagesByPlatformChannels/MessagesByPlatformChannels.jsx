import React from "react";
import { connect } from "react-redux";

const MessagesByPlatformChannels = ({
  platformChannelMessages,
  selectedPlatformChannel,
}) => {
  console.log(platformChannelMessages, selectedPlatformChannel);
  return (
    <>
      {!platformChannelMessages.loading &&
      platformChannelMessages.platformChannelMessages !== null ? (
        platformChannelMessages?.platformChannelMessages?.data?.map(
          (msg, index) => {
            return (
              <>
                <div className="container">
                  <div className="my-3 ms-5">
                    <div>
                      <div className="d-flex flex-wrap mb-2 align-items-baseline">
                        <div
                          className=" mb-0 flex-grow-1"
                          style={{ whiteSpace: "break-spaces" }}
                        >
                          {msg.messageContent}
                        </div>
                        <div className="text-muted">
                          {new Date(msg.date).toUTCString()}
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              </>
            );
          }
        )
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center h-100">
          <i className="bi bi-chat-left-text-fill"></i>
          <p>{`${
            selectedPlatformChannel === ""
              ? "Select a channel to view the signals belong to that channel"
              : "There is no signals in the selected channel"
          }`}</p>
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
