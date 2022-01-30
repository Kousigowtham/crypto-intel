import React, { useState, useEffect } from "react";
import Channles from "../Channels/Channles";
import SignalsByChannel from "../SignalsByChannel/SignalsByChannel";
import "./Signals.css";
import SkeletonSignal from "../Skeleton/SkeletonSignal";
import { useDispatch, useSelector } from "react-redux";
import { fetchSignalList } from "../../reducers/signalListReducer";
import Dropdown from "../Dropdown/Dropdown";
import select from "../../Assets/Messages/select.svg";
import CreateSignal from "../CreateSignal/CreateSignal";

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
  const [search, setsearch] = useState({
    from: "",
    to: "",
  });
  const [selected, setselected] = useState(() => ({
    name: "Select Coin",
    id: "",
  }));
  const [market, setmarket] = useState("");
  const searchHandler = (event) => {
    event.preventDefault();
    let formattedFromDate;
    let formattedToDate;

    if (search.from !== "" && search.to !== "") {
      formattedFromDate = new Date(search.from);
      formattedToDate = new Date(search.to);
      formattedFromDate = [
        [
          formattedFromDate.getUTCDate() < 10
            ? `0${formattedFromDate.getUTCDate()}`
            : formattedFromDate.getUTCDate(),
          formattedFromDate.getUTCMonth() + 1 < 10
            ? `0${formattedFromDate.getUTCMonth() + 1}`
            : formattedFromDate.getUTCMonth() + 1,
          formattedFromDate.getUTCFullYear(),
        ].join("-"),
        [
          formattedFromDate.getHours() < 10
            ? `0${formattedFromDate.getHours()}`
            : formattedFromDate.getHours(),
          formattedFromDate.getMinutes() < 10
            ? `0${formattedFromDate.getMinutes()}`
            : formattedFromDate.getMinutes(),
        ].join(":"),
      ].join(" ");

      formattedToDate = [
        [
          formattedToDate.getUTCDate() < 10
            ? `0${formattedToDate.getUTCDate()}`
            : formattedToDate.getUTCDate(),
          formattedToDate.getUTCMonth() + 1 < 10
            ? `0${formattedToDate.getUTCMonth() + 1}`
            : formattedToDate.getUTCMonth() + 1,
          formattedToDate.getUTCFullYear(),
        ].join("-"),
        [
          formattedToDate.getHours() < 10
            ? `0${formattedToDate.getHours()}`
            : formattedToDate.getHours(),
          formattedToDate.getMinutes() < 10
            ? `0${formattedToDate.getMinutes()}`
            : formattedToDate.getMinutes(),
        ].join(":"),
      ].join(" ");
    }
    dispatch(fetchSignalList(formattedFromDate, formattedToDate, selected.id));
    setShowFilter(false);
  };

  const FilterMessage = () => {
    return (
      <div className="filter-container">
        <form
          className="d-flex gap filter-form flex-wrap"
          onSubmit={searchHandler}
        >
          <div className="flex-grow-1">
            <label className="mb-2" htmlFor="signalFromDateTimeFilter">
              From
            </label>
            <input
              id="signalFromDateTimeFilter"
              type="datetime-local"
              max={new Date().toISOString().split(".")[0]}
              className="form-control"
              onChange={(e) => setsearch({ ...search, from: e.target.value })}
              value={search.from}
            />
          </div>
          <div className="flex-grow-1">
            <label className="mb-2" htmlFor="signalToDateTimeFilter">
              To
            </label>
            <input
              id="signalToDateTimeFilter"
              type="datetime-local"
              className="form-control"
              max={new Date().toISOString().split(".")[0]}
              min={search.from !== "" ? search.from : null}
              disabled={search.from !== "" ? false : true}
              onChange={(e) => setsearch({ ...search, to: e.target.value })}
              value={search.to}
            />
          </div>
          <div className="d-flex flex-grow-1 gap">
            <div className="flex-grow-1">
              <label className="mb-2" htmlFor="Market">
                Market
              </label>
              <select
                className="form-select"
                id="market"
                name="market"
                value={market}
                onChange={(e) => setmarket(e.target.value)}
              >
                <option selected value="">
                  Select
                </option>
                {!METADATA.loading
                  ? METADATA?.metaData?.marketList?.map((market, index) => (
                      <option key={market.name + index} value={market.name}>
                        {market.name}
                      </option>
                    ))
                  : null}
              </select>
            </div>
            <div className="d-flex flex-grow-1 flex-column">
              <label className="mb-2" htmlFor="searchCoin">
                Coin
              </label>
              <Dropdown
                selectHandler={setselected}
                selected={selected}
                coinList={coinList?.coinList?.filter(
                  (x) => x.market === market
                )}
                disabled={market === "" ? true : false}
              />
            </div>
          </div>
          <div className="ms-auto">
            <button
              type="submit"
              disabled={search.from !== "" && search.to === "" ? true : false}
              className="btn btn-primary mt-4 px-3 me-4"
            >
              Search
            </button>
            <button
              className="btn btn-outline-light mt-4 px-3"
              onClick={() => {
                setsearch({ from: "", to: "" });
                setmarket("");
                setselected({
                  name: "Select Coin",
                  id: "",
                });
                dispatch(fetchSignalList());
                setShowFilter(false);
              }}
            >
              cancel
            </button>
          </div>
        </form>
      </div>
    );
  };
  const [showCreateSignal, setShowCreateSignal] = useState(false);
  const [isformEditted, setIsFormEditted] = useState(true);
  useEffect(() => {
    if (selectedChannel) {
      setsearch({
        from: "",
        to: "",
      });
      setShowFilter(false);
      dispatch(fetchSignalList("", "", "", selectedChannel?.id));
    }
  }, [dispatch, selectedChannel]);

  useEffect(() => {
    if (selectedChannel && isformEditted) {
      setsearch({
        from: "",
        to: "",
      });
      setShowFilter(false);
      dispatch(fetchSignalList("", "", "", selectedChannel?.id));
    }
  }, [dispatch, setShowFilter, setsearch, selectedChannel, isformEditted]);

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
            {showFilter && !signalList.loading && <FilterMessage />}
            {/* {!signalList.loading &&
              signalList?.signalList?.filter(
                (x) =>
                  x.signal?.channelDetail?.name === selectedChannel.name &&
                  x.signal?.active === true
              )?.length > 0 && (
                
              )} */}
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
        <CreateSignal
          setShowCreateSignal={setShowCreateSignal}
          setIsFormEditted={setIsFormEditted}
        />
      )}
    </div>
  );
};

export default Signals;
