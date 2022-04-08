import React from "react";
import { useDispatch } from "react-redux";
import "./SignalsByChannel.css";
import { SET_SIGNALDATA_ACTION, UPDATE_SIGNAL_ACTION } from "../../actions";
import no_data from "../../Assets/Messages/no_data.svg";
import { useSelector } from "react-redux";
import { validateYupSchema } from "formik";

const SignalsByChannel = ({
  signalListByChannel,
  channel,
  setShowCreateSignal,
}) => {
  const dispatch = useDispatch();
  const { METADATA, coinList } = useSelector((state) => ({
    METADATA: state.metaData,
    coinList: state.coinList,
  }));

  const clickHandler = (signal) => {
    dispatch(
      SET_SIGNALDATA_ACTION({
        ...signal,
        channel: METADATA?.metaData?.channelList.find(
          (x) => x.name === signal.channelDetail.name
        ),
        leverage: signal.leverage,
        market: METADATA?.metaData?.marketList.find(
          (x) => x.name === signal.coinDetail.market
        ),
        buyprice: signal.buyPrice,
        direction: signal.signalType,
        coin: coinList?.coinList?.find((x) => x.id === signal.coinId),
        signaldate: signal?.signalDate,
        targetDetails: signal?.signalTargetDetails
          ?.filter((x) => x.targetMode === "CHANNEL_TARGET")
          .map((target) => ({
            ...target,
            targetValue: target.targetValue,
            targetType: target.targetType,
            targetValueUnit: "%",
          })),
      })
    );
    dispatch(UPDATE_SIGNAL_ACTION(true));
    setShowCreateSignal(true);
  };

  return (
    <>
      <div className="fab-container">
        <i
          className="bi bi-plus create-signal-fab"
          onClick={() => setShowCreateSignal(true)}
        ></i>
      </div>
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
              <div
                className="channel-signal-container"
                onClick={() => {
                  clickHandler(signals.signal);
                }}
              >
                <div className="d-flex flex-wrap mb-2 align-items-baseline">
                  <div className="h5">
                    {signals.signal.coinDetail.symbol}
                    <span
                      className="text-muted ms-2"
                      style={{ fontSize: "10px" }}
                    >
                      {channel}
                    </span>
                  </div>
                  <div className="text-muted ms-auto">
                    {signals.signal.signalDate}
                  </div>
                </div>
                <div className="price-tag-btn-grp">
                  <div className="px-2 py-1 btn-gain">
                    Buy price: {` $  ${signals.signal.buyPrice.toFixed(2)}`}
                  </div>
                  <div className="px-2 py-1 bg-warning">
                    Current price:
                    {` $  ${signals.signal.buyPrice.toFixed(2)}`}
                  </div>
                  {stopLoss.map((sl) => {
                    return (
                      <div className="px-2 py-1 bg-danger">
                        Stop Loss:
                        {` $  ${sl.targetValue.toFixed(2)}`}
                      </div>
                    );
                  })}
                </div>
                <div className="d-flex flex-wrap gap-2">
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
              <hr className="m-0" />
            </>
          );
        })
      ) : (
        <div className="no-content-container">
          <img src={no_data} alt="no_data" width="150px" height="200px" />
          <i className="bi bi-chat-left-text-fill"></i>
          <p>There is no signals in the selected channel</p>
        </div>
      )}
    </>
  );
};

export default SignalsByChannel;
