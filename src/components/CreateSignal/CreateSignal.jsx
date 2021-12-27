import React, { useState, useEffect } from "react";
import SignalForm from "../SignalForm/SignalForm";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { createCoin } from "../../axios/api/async";
import { connect } from "react-redux";
import { SET_SIGNALDATA_ACTION, UPDATE_SIGNAL_ACTION } from "../../actions";
import { useDispatch } from "react-redux";
import { fetchSignalList } from "../../reducers/signalListReducer";
import { useNavigate } from "react-router-dom";
import { Wrapper } from "../components.styles";

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

const CreateSignal = ({
  setSignalDispatch,
  updateSignalDispatch,
  COINLIST,
  METADATA,
  SIGNALDATA,
  UPDATESIGNAL,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    const SelectedCoin = COINLIST.coinList.find((x) => x.id === selected.id);
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
          channelId: METADATA?.metaData?.channelList.find(
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
          channelId: METADATA?.metaData?.channelList.find(
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
    console.log(signalSkeleton);
    createCoin(signalSkeleton).then((res) => {
      console.log(res);
      onSubmitProps.setSubmitting(false);
      onSubmitProps.resetForm();
      setselected({
        name: "Select Coin",
        id: "",
      });
      dispatch(fetchSignalList());
    });
    updateSignalDispatch(UPDATE_SIGNAL_ACTION(false));
    setSignalDispatch(SET_SIGNALDATA_ACTION({ ...initialValues }));
    navigate("/signals");
  };

  const deletehandler = (formik) => {
    formik.resetForm();
    createCoin({ ...SIGNALDATA, active: false }).then((res) => {
      dispatch(fetchSignalList());
    });
    updateSignalDispatch(UPDATE_SIGNAL_ACTION(false));
    setSignalDispatch(SET_SIGNALDATA_ACTION({ ...initialValues }));
    setselected({
      name: "Select Coin",
      id: "",
    });
  };
  return (
    <Wrapper>
      <div className="pt-5 bg-secondary min-vh-100">
        <div className="container bg-white w-50 py-5 px-4 rounded">
          <div>
            <h5>
              {`${UPDATESIGNAL ? "Update the Signal" : "Create a new Signal!"}`}
            </h5>
          </div>
          <div>
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
                      coinList={COINLIST?.coinList?.filter(
                        (x) => x.market === formik.values.market
                      )}
                    />
                    <button
                      type="reset"
                      className="btn btn-outline-secondary px-4 me-4"
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
                        navigate("/signals");
                      }}
                    >
                      Close
                    </button>
                    {UPDATESIGNAL === true ? (
                      <button
                        type="submit"
                        className="btn btn-danger me-4 px-4"
                        onClick={() => deletehandler(formik)}
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
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </Wrapper>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateSignal);
