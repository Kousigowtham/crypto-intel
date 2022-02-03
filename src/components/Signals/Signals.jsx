import React, { useState, useEffect } from "react";
import Channles from "../Channels/Channles";
import SignalsByChannel from "../SignalsByChannel/SignalsByChannel";
import "./Signals.css";
import SkeletonSignal from "../Skeleton/SkeletonSignal";
import { useDispatch, useSelector } from "react-redux";
import { fetchSignalList } from "../../reducers/signalListReducer";
import select from "../../Assets/Messages/select.svg";
import FilterForm from "../Formik/FilterForm/FilterForm";
import CreatesignalForm from "../Formik/CreateSignalForm/CreatesignalForm";

const Signals = () => {
  const dispatch = useDispatch();
  const { signalList, METADATA, coinList } = useSelector((state) => ({
    signalList: state.signalList,
    METADATA: state.metaData,
    coinList: state.coinList,
  }));
  const [selectedChannel, setselectedChannel] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const selectedChannelHandler = (channel) => {
    setselectedChannel(channel);
  };

  const [showCreateSignal, setShowCreateSignal] = useState(false);
  // eslint-disable-next-line
  const [isformEdited, setIsFormEdited] = useState(true);
  useEffect(() => {
    if (selectedChannel) {
      setShowFilter(false);
      dispatch(fetchSignalList("", "", "", selectedChannel?.id));
    }
  }, [dispatch, selectedChannel]);

  useEffect(() => {
    if (selectedChannel && isformEdited) {
      setShowFilter(false);
      dispatch(fetchSignalList("", "", "", selectedChannel?.id));
    }
  }, [dispatch, setShowFilter, selectedChannel, isformEdited]);

  return (
    <div className="signal-container">
      <div className="col-3 channel-column-container">
        <Channles
          channelList={
            !METADATA?.loading ? METADATA?.metaData?.channelList : null
          }
          selectedChannel={selectedChannel}
          header="channels"
          selectChannelHandler={selectedChannelHandler}
        />
      </div>
      <div className="col-8 signals-column-container">
        {selectedChannel ? (
          <>
            <div className="meta-channel-header">
              <div className="channel-name">{selectedChannel.name}</div>
              <i
                class="bi bi-filter-square-fill filter-icon"
                onClick={() => setShowFilter((prevState) => !prevState)}
              ></i>
            </div>
            {showFilter && !signalList.loading && (
              <FilterForm
                marketList={METADATA?.metaData?.marketList}
                coinList={coinList?.coinList}
                setShowFilter={setShowFilter}
                selectedChannel={selectedChannel}
              />
            )}
            {!signalList.loading ? (
              <SignalsByChannel
                channel={selectedChannel.name}
                signalListByChannel={signalList?.signalList}
                setShowCreateSignal={setShowCreateSignal}
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
          </>
        ) : (
          <div className="select-channel">
            <img src={select} alt="select" width="150px" height="200px" />
            <p>Select a channel to view signals</p>
          </div>
        )}
      </div>
      {showCreateSignal && (
        // <CreateSignal
        //   setShowCreateSignal={setShowCreateSignal}
        //   setIsFormEdited={setIsFormEdited}
        // />
        <CreatesignalForm
          METADATA={METADATA}
          coinList={coinList?.coinList}
          setShowCreateSignal={setShowCreateSignal}
        />
      )}
    </div>
  );
};

export default Signals;
