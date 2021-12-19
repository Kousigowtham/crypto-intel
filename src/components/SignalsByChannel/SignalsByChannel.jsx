import React from "react";
import { connect } from "react-redux";
import "./SignalsByChannel.css";
import { SET_SIGNALDATA_ACTION, UPDATE_SIGNAL_ACTION } from "../../actions";
import { useNavigate } from "react-router-dom";

const SignalsByChannel = ({
  setSignalDispatch,
  signalListByChannel,
  updateSignalDispatch,
  channel,
}) => {
  const navigate = useNavigate();

  const clickHandler = (signal) => {
    const date = signal.signalDate.substring(0, signal.signalDate.indexOf(" "));
    const time = signal.signalDate.substring(
      signal.signalDate.indexOf(" ") + 1,
      signal.signalDate.length
    );
    const formattedDate = date.split("-");
    const reversedDate = formattedDate.reverse().join("-");

    const FinalDate = reversedDate + "T" + time;

    setSignalDispatch(
      SET_SIGNALDATA_ACTION({
        ...signal,
        channel: signal.channelDetail.name,
        leverage: "",
        market: signal.coinDetail.market,
        buyPrice: signal.buyPrice,
        coinDetail: {
          name: signal.coinDetail.name,
          id: signal.coinDetail.id,
        },
        date: FinalDate,
        targetDetails: signal?.signalTargetDetails
          ?.filter((x) => x.targetMode === "CHANNEL_TARGET")
          .map((target) => ({
            ...target,
            targetValue: target.targetValue,
            targetType: target.targetType,
          })),
      })
    );
    updateSignalDispatch(UPDATE_SIGNAL_ACTION(true));
    navigate("/createSignal");
  };
  return (
    <>
      <i
        className="bi bi-plus m-4 text-center rounded-circle position-absolute text-white bg-success plus"
        style={{
          height: "50px",
          width: "50px",
          fontSize: "50px",
          bottom: "5%",
          right: "5%",
        }}
        onClick={() => navigate("/createSignal")}
      ></i>
      {signalListByChannel.length > 0 ? (
        signalListByChannel.map((signals, index) => {
          return (
            <>
              <div className="container">
                <div
                  className="my-3 ms-5"
                  onClick={() => {
                    clickHandler(signals.signal);
                  }}
                >
                  <div>
                    <div className="d-flex flex-wrap mb-2 align-items-baseline">
                      <div className="h5 mb-0 flex-grow-1">
                        {signals.signal.coinDetail.symbol}
                        <span
                          className="text-muted ms-2"
                          style={{ fontSize: "10px" }}
                        >
                          {channel}
                        </span>
                      </div>
                      <div className="text-muted">
                        {signals.signal.signalDate}
                      </div>
                    </div>
                    <div className="d-flex flex-wrap">
                      <div
                        className="me-5 mb-2 px-2 py-1"
                        style={{
                          backgroundColor: "#1fc422",
                          fontSize: "0.8rem",
                        }}
                      >
                        Buy price: {`  ${signals.signal.buyPrice.toFixed(2)}`}
                      </div>
                      <div
                        className="me-5 mb-2 px-2 py-1 bg-warning"
                        style={{
                          fontSize: "0.8rem",
                        }}
                      >
                        Current price:{" "}
                        {`  ${signals.signal.buyPrice.toFixed(2)}`}
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            </>
          );
        })
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center h-100">
          <i className="bi bi-chat-left-text-fill"></i>
          <p>{`${
            channel === ""
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

export default connect(null, mapDispatchToProps)(SignalsByChannel);
