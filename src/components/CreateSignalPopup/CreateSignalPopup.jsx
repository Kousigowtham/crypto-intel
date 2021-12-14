import React, { useState, useEffect } from "react";
import SignalForm from "../SignalForm/SignalForm";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { createCoin, getSignals } from "../../axios/api/async";
import { connect } from "react-redux";
import {
  GET_SIGNALSLIST_ACTION,
  SET_SIGNALDATA_ACTION,
  UPDATE_SIGNAL_ACTION,
  UPDATE_SIGNAL_LIST_LOADER_ACTION,
} from "../../actions";

const initialValues = {
  channel: "",
  leverage: "",
  market: "",
  buyPrice: "",
  coin: "",
  date: "",
  targetDetails: [
    {
      targetType: "",
      targetValue: "",
      targetValueUnit: "%",
    },
  ],
};

const validation = Yup.object({
  channel: Yup.string().required("Required*"),
  leverage: Yup.string().required("Required*"),
  market: Yup.string().required("Required*"),
  buyPrice: Yup.string().required("Required*"),
  date: Yup.string().required("Required*"),
});

const CreateSignalPopup = ({
  setSignalDispatch,
  updateSignalListLoaderDispatch,
  updateSignalDispatch,
  getSignalListDispatch,
  COINLIST,
  METADATA,
  SIGNALDATA,
  UPDATESIGNAL,
  UPDATESIGNALLISTLOADER,
}) => {
  const [selected, setselected] = useState(() => ({
    name: "Select Coin",
    id: "",
  }));
  useEffect(() => {
    if (SIGNALDATA !== null) {
      if (SIGNALDATA?.channel !== "") setselected(SIGNALDATA.coinDetail);
    }
  }, [SIGNALDATA]);
  const SumbitHandler = (values, onSubmitProps) => {
    const SelectedCoin = COINLIST.data.find((x) => x.id === selected.id);
    const date = values.date.substring(0, values.date.indexOf("T"));
    const time = values.date.substring(
      values.date.indexOf("T") + 1,
      values.date.length
    );
    const formattedDate = date.split("-");
    const reversedDate = formattedDate.reverse().join("-");

    const FinalDate = reversedDate + " " + time;

    let updateTargetValues = [];
    if (UPDATESIGNAL && SIGNALDATA && SIGNALDATA.channel !== "") {
      let changedChannelTargetArray = values.targetDetails;
      let unchangedChanneltargetArray = SIGNALDATA.signalTargetDetails.filter(
        (x) => x.targetMode === "CHANNEL_TARGET"
      );
      let targetWithIds = [];
      let targetWithoutIds = [];
      let deletedTargets = [];

      for (let i = 0; i < changedChannelTargetArray.length; i++) {
        if (changedChannelTargetArray[i].id !== undefined)
          targetWithIds.push(changedChannelTargetArray[i]);
        else
          targetWithoutIds.push({
            ...changedChannelTargetArray[i],
            percentage: "0.0",
            reached: null,
            reachedTime: null,
            active: true,
            targetMode: "CHANNEL_TARGET",
          });
      }

      for (let i = 0; i < unchangedChanneltargetArray.length; i++) {
        if (
          !targetWithIds.find((x) => x.id === unchangedChanneltargetArray[i].id)
        )
          deletedTargets.push({
            ...unchangedChanneltargetArray[i],
            active: false,
          });
      }
      updateTargetValues = [
        ...targetWithIds,
        ...targetWithoutIds,
        ...deletedTargets,
      ];
    }

    const signalSkeleton = UPDATESIGNAL
      ? {
          ...SIGNALDATA,
          channelId: METADATA?.filterData?.channelList.find(
            (x) => x.name === values.channel
          ).id,
          coinId: selected.id,
          exchange: SelectedCoin.exchange,
          signalDate: FinalDate,
          buyPrice: values.buyPrice,
          active: true,
          signalTargetDetails: [...updateTargetValues],
          coinDetail: { ...SelectedCoin },
        }
      : {
          channelId: METADATA?.filterData?.channelList.find(
            (x) => x.name === values.channel
          ).id,
          coinId: selected.id,
          exchange: SelectedCoin.exchange,
          signalDate: FinalDate,
          buyPrice: values.buyPrice,
          active: true,
          signalTargetDetails: values.targetDetails.map((targets) => ({
            targetValue: targets.targetValue,
            targetType: targets.targetType,
            percentage: "0.0",
            reached: null,
            reachedTime: null,
            active: true,
            targetMode: "CHANNEL_TARGET",
          })),
          coinDetail: { ...SelectedCoin },
        };

    createCoin(signalSkeleton).then((res) => {
      onSubmitProps.setSubmitting(false);
      onSubmitProps.resetForm();
      setselected({
        name: "Select Coin",
        id: "",
      });
    });
    updateSignalListLoaderDispatch(UPDATE_SIGNAL_LIST_LOADER_ACTION(true));
    updateSignalDispatch(UPDATE_SIGNAL_ACTION(false));
    setSignalDispatch(SET_SIGNALDATA_ACTION({ ...initialValues }));
    getSignals().then((res) => {
      getSignalListDispatch(GET_SIGNALSLIST_ACTION(res.data));
      updateSignalListLoaderDispatch(UPDATE_SIGNAL_LIST_LOADER_ACTION(false));
    });
  };

  const deletehandler = (formik) => {
    formik.resetForm();
    updateSignalListLoaderDispatch(UPDATE_SIGNAL_LIST_LOADER_ACTION(true));
    createCoin({ ...SIGNALDATA, active: false })
      .then(() => getSignals())
      .then((res) => {
        getSignalListDispatch(GET_SIGNALSLIST_ACTION(res.data));
        updateSignalListLoaderDispatch(UPDATE_SIGNAL_LIST_LOADER_ACTION(false));
      });
    updateSignalDispatch(UPDATE_SIGNAL_ACTION(false));
    setSignalDispatch(SET_SIGNALDATA_ACTION({ ...initialValues }));
    setselected({
      name: "Select Coin",
      id: "",
    });
  };
  return (
    <>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                {`${
                  UPDATESIGNAL ? "Update the Signal" : "Create a new Signal!"
                }`}
              </h5>
            </div>
            <div className="modal-body">
              <Formik
                initialValues={SIGNALDATA || initialValues}
                onSubmit={SumbitHandler}
                validationSchema={validation}
                enableReinitialize
              >
                {(formik) => {
                  return (
                    <Form>
                      <SignalForm
                        SumbitHandler={SumbitHandler}
                        selected={selected}
                        disabled={formik.values.market === "" ? true : false}
                        setselected={setselected}
                        coinList={COINLIST?.data?.filter(
                          (x) => x.market === formik.values.market
                        )}
                      />
                      <div className="modal-footer">
                        <button
                          type="reset"
                          className="btn btn-outline-secondary px-4 me-4"
                          data-bs-dismiss="modal"
                          disabled={formik.isSubmitting}
                          onClick={() => {
                            if (UPDATESIGNAL)
                              updateSignalDispatch(UPDATE_SIGNAL_ACTION(false));
                            setSignalDispatch(
                              SET_SIGNALDATA_ACTION({ ...initialValues })
                            );
                            setselected({
                              name: "Select Coin",
                              id: "",
                            });
                          }}
                        >
                          Close
                        </button>
                        {UPDATESIGNAL === true ? (
                          <button
                            type="submit"
                            onClick={() => deletehandler(formik)}
                            classNameName="btn btn-danger me-4 px-4"
                            data-bs-dismiss="modal"
                          >
                            Delete
                          </button>
                        ) : null}
                        <button
                          type="submit"
                          disabled={!formik.isValid}
                          className="btn btn-primary px-4"
                        >
                          {formik.isSubmitting ? "Saving..." : "Save"}
                        </button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  METADATA: state.metaData,
  COINLIST: state.coinList,
  SIGNALDATA: state.signalData,
  UPDATESIGNAL: state.updateSignal,
  UPDATESIGNALLISTLOADER: state.updateSignalListloader,
});

const mapDispatchToProps = (dispatch) => ({
  setSignalDispatch: (setSignalAction) => dispatch(setSignalAction),
  updateSignalDispatch: (updateSignalAction) => dispatch(updateSignalAction),
  getSignalListDispatch: (getSignalListAction) => dispatch(getSignalListAction),
  updateSignalListLoaderDispatch: (updateSignalListLoaderAction) =>
    dispatch(updateSignalListLoaderAction),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateSignalPopup);
