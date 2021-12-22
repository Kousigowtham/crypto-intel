import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Channles from "../Channels/Channles";
import SignalsByChannel from "../SignalsByChannel/SignalsByChannel";
import "./Signals.css";
import SkeletonSignal from "../Skeleton/SkeletonSignal";
import { useDispatch } from "react-redux";
import { fetchSignalList } from "../../reducers/signalListReducer";
import Dropdown from "../Dropdown/Dropdown";
const Signals = ({ signalList, METADATA, coinList }) => {
  const dispatch = useDispatch();
  const [selectedChannel, setselectedChannel] = useState("");
  const selectedChannelHandler = (name) => {
    setselectedChannel(name);
    dispatch(fetchSignalList());
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
    console.log("fsds");
    dispatch(fetchSignalList(formattedFromDate, formattedToDate, selected.id));
  };

  useEffect(() => {
    dispatch(fetchSignalList());
  }, [dispatch]);

  return (
    <>
      <div className="container-fluid m-0 p-0 border-top">
        <div className="row">
          <div
            className="col-3 p-0 overflow-auto bg-light"
            style={{ height: "680px" }}
          >
            <Channles selectChannelHandler={selectedChannelHandler} />
          </div>
          <div className="col-8 p-0 overflow-auto" style={{ height: "680px" }}>
            <div className="d-flex ps-4 mb-5 mt-2">
              <form className="d-flex  flex-wrap ms-5" onSubmit={searchHandler}>
                <div className="me-4">
                  <label htmlFor="signalFromDateTimeFilter">From</label>
                  <input
                    id="signalFromDateTimeFilter"
                    type="datetime-local"
                    max={new Date().toISOString().split(".")[0]}
                    className="form-control"
                    onChange={(e) =>
                      setsearch({ ...search, from: e.target.value })
                    }
                    value={search.from}
                  />
                </div>
                <div className="me-4">
                  <label htmlFor="signalToDateTimeFilter">To</label>
                  <input
                    id="signalToDateTimeFilter"
                    type="datetime-local"
                    className="form-control"
                    max={new Date().toISOString().split(".")[0]}
                    min={search.from !== "" ? search.from : null}
                    disabled={search.from !== "" ? false : true}
                    onChange={(e) =>
                      setsearch({ ...search, to: e.target.value })
                    }
                    value={search.to}
                  />
                </div>
                <div className="d-flex mb-2 justify-content-between">
                  <div className="me-2 flex-fill">
                    <label htmlFor="Market">Market</label>
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
                        ? METADATA?.metaData?.marketList?.map(
                            (market, index) => (
                              <option
                                key={market.name + index}
                                value={market.name}
                              >
                                {market.name}
                              </option>
                            )
                          )
                        : null}
                    </select>
                  </div>
                  <div className="d-flex flex-column">
                    <label htmlFor="searchCoin">Coin</label>
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
                <button
                  type="submit"
                  disabled={
                    search.from !== "" && search.to === "" ? true : false
                  }
                  className="btn btn-light mt-4 px-3 me-4"
                >
                  Search
                </button>
                <button
                  className="btn btn-outline-dark mt-4 px-3"
                  onClick={() => {
                    setsearch({ from: "", to: "" });
                    setmarket("");
                    setselected({
                      name: "Select Coin",
                      id: "",
                    });
                    dispatch(fetchSignalList());
                  }}
                >
                  cancel
                </button>
              </form>
            </div>
            {!signalList.loading ? (
              <SignalsByChannel
                channel={selectedChannel}
                signalListByChannel={signalList.signalList.filter(
                  (x) =>
                    x.signal.channelDetail.name === selectedChannel &&
                    x.signal.active === true
                )}
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
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  signalList: state.signalList,
  METADATA: state.metaData,
  coinList: state.coinList,
});

export default connect(mapStateToProps)(Signals);
