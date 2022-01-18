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
    <div className="h-100 position-relative">
      <i
        className="bi bi-plus m-4 text-center rounded-circle position-absolute text-white bg-success plus"
        style={{
          height: "50px",
          width: "50px",
          fontSize: "50px",
          bottom: "5%",
          right: "5%",
          zIndex: "99",
        }}
        onClick={() => navigate("/createSignal")}
      ></i>

      {signalListByChannel.length > 0 ? (
        signalListByChannel.map((signals, index) => {
          const channelTargetSignals =
            signals.signal.signalTargetDetails.filter(
              (x) => x.targetMode === "CHANNEL_TARGET"
            );
          const takeProfit = channelTargetSignals.filter(
            (x) => x.targetType === "TAKE_PROFIT"
          );
          const stopLoss = channelTargetSignals.filter(
            (x) => x.targetType === "STOP_LOSS"
          );
          let orderedChannelTargets;
          if (signals.targetTimelines) {
            const channelTargetTimeLines = signals.targetTimelines.filter((x) =>
              channelTargetSignals.find(
                (xx) => xx.id === x.signalTargetDetailId
              )
            );
            orderedChannelTargets = channelTargetTimeLines.map(
              (reachedTimeLines) => {
                const matchedTarget = channelTargetSignals.find(
                  (x) => x.id === reachedTimeLines.signalTargetDetailId
                );
                const removeIndex = channelTargetSignals.findIndex(
                  (x) => x.id === reachedTimeLines.signalTargetDetailId
                );
                channelTargetSignals.splice(removeIndex, 1);
                return matchedTarget;
              }
            );
            orderedChannelTargets = [
              ...orderedChannelTargets,
              ...channelTargetSignals,
            ];
          } else orderedChannelTargets = [...channelTargetSignals];
          return (
            <>
              <div className="channel-container">
                <div
                  className=" channel-signal-container ms-5"
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
                      {stopLoss.map((sl) => {
                        return (
                          <div
                            className="me-5 mb-2 px-2 py-1 bg-danger text-white"
                            style={{
                              fontSize: "0.8rem",
                            }}
                          >
                            {" "}
                            Stop Loss:
                            {`  ${sl.targetValue.toFixed(2)}`}
                          </div>
                        );
                      })}
                    </div>
                    <div className="d-flex flex-wrap">
                      {orderedChannelTargets.map((signaltargets, index) => {
                        return (
                          <div
                            className={`pe-2
                              ${
                                signaltargets.reached
                                  ? signaltargets.targetType === "TAKE_PROFIT"
                                    ? "text-success"
                                    : "text-danger"
                                  : "text-muted"
                              }`}
                            style={{
                              fontSize: "0.95rem",
                            }}
                          >
                            {signaltargets.targetType === "TAKE_PROFIT"
                              ? `TP${
                                  takeProfit.findIndex(
                                    (x) => x.id === signaltargets.id
                                  ) + 1
                                }: ${signaltargets.targetValue.toFixed(
                                  2
                                )} (${signaltargets.percentage.toFixed(2)}%)`
                              : `SL${
                                  stopLoss.findIndex(
                                    (x) => x.id === signaltargets.id
                                  ) + 1
                                }: ${signaltargets.targetValue.toFixed(
                                  2
                                )} (${signaltargets.percentage
                                  .toFixed(2)
                                  .replace("-", "")}%)`}
                            {orderedChannelTargets.length - 1 > index ? (
                              <span className="ps-2">{"-->"}</span>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <hr className="m-0" />
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
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setSignalDispatch: (setSignalAction) => dispatch(setSignalAction),
  updateSignalDispatch: (updateSignalAction) => dispatch(updateSignalAction),
});

export default connect(null, mapDispatchToProps)(SignalsByChannel);
