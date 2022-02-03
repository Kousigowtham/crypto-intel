import { FieldArray, Form, Formik } from "formik";
import React from "react";
import "./CreatesignalForm.css";
import FormikController from "../FormikController.jsx";
import Button from "../../Button/Button.jsx";
import CreatePortal from "../../CreatePortal/CreatePortal";
import * as Yup from "yup";
import {
  getCreateSignalPayloadObj,
  getUpdateSignalPayloadObj,
} from "../../../Services/service";
import { createCoin } from "../../../axios/api/async";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { SET_SIGNALDATA_ACTION, UPDATE_SIGNAL_ACTION } from "../../../actions";

const InitialValues = {
  channel: null,
  leverage: "",
  market: null,
  coin: null,
  buyprice: "",
  signaldate: null,
  targetDetails: [
    {
      targetType: "",
      targetValue: "",
      targetValueUnit: "%",
    },
  ],
};

const validationSchema = Yup.object({
  channel: Yup.object().required("*Required").nullable(),
  leverage: Yup.string().required("*Required"),
  market: Yup.object().required("*Required").nullable(),
  coin: Yup.object().when("market", (market, schema) => {
    return market ? schema.required("*Required").nullable() : schema.nullable();
  }),
  buyprice: Yup.number()
    .required("*Required")
    .min(0, "Buy price should be greater than 0"),
  signaldate: Yup.mixed().nullable().required("*Required"),
});

const CreatesignalForm = ({ METADATA, coinList, setShowCreateSignal }) => {
  const dispatch = useDispatch();
  const { UPDATESIGNAL, SIGNALDATA } = useSelector((state) => ({
    UPDATESIGNAL: state.updateSignal,
    SIGNALDATA: state.signalData,
  }));

  const clearHandler = () => {
    if (UPDATESIGNAL) {
      dispatch(UPDATE_SIGNAL_ACTION(false));
      dispatch(SET_SIGNALDATA_ACTION(null));
    }
    setShowCreateSignal(false);
  };

  const deletehandler = (formik) => {
    formik.resetForm();
    createCoin({ ...SIGNALDATA, active: false });
    dispatch(UPDATE_SIGNAL_ACTION(false));
    dispatch(SET_SIGNALDATA_ACTION(null));
    setShowCreateSignal(true);
  };

  const submitHandler = (values, onSubmitProps) => {
    const createSignalPayload = SIGNALDATA
      ? getUpdateSignalPayloadObj(values, SIGNALDATA)
      : getCreateSignalPayloadObj(values);

    createCoin(createSignalPayload).then((res) => {
      setTimeout(() => {
        onSubmitProps.setSubmitting(false);
      }, 2000);
      onSubmitProps.resetForm();
    });
    setShowCreateSignal(false);

    dispatch(UPDATE_SIGNAL_ACTION(false));
    dispatch(SET_SIGNALDATA_ACTION(null));
  };

  return (
    <CreatePortal>
      <Formik
        initialValues={SIGNALDATA ?? InitialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {(formik) => {
          console.log(formik.values);
          return (
            <Form
              onSubmit={formik.handleSubmit}
              className="signal-form-container"
            >
              <div className="signal-input-container">
                <FormikController
                  control="dropdown"
                  name="channel"
                  label="Channel"
                  classes="input-class"
                  options={METADATA?.metaData?.channelList}
                />
                <FormikController
                  control="text"
                  name="leverage"
                  label="Leverage"
                  type="text"
                  classes="input-class"
                />
              </div>
              <div className="signal-input-container">
                <FormikController
                  id="market"
                  label="SELECT MARKET"
                  name="market"
                  control="dropdown"
                  options={METADATA?.metaData?.marketList}
                  classes="input-class"
                />
                <FormikController
                  id="coin"
                  label="SELECT COIN"
                  name="coin"
                  control="dropdown"
                  options={
                    typeof formik?.values?.market === "object"
                      ? coinList.filter(
                          (x) => x.market === formik?.values?.market?.name
                        )
                      : typeof formik?.values?.market === "string"
                      ? coinList.filter(
                          (x) => x.market === formik?.values?.market
                        )
                      : coinList
                  }
                  isSearchPresent
                  classes="input-class"
                  disabled={formik.values?.market ? false : true}
                />
              </div>
              <div className="signal-input-container">
                <FormikController
                  control="text"
                  name="buyprice"
                  label="Buy Price"
                  type="number"
                  classes="input-class"
                />
                <FormikController
                  id="signaldate"
                  label="Signal Date"
                  name="signaldate"
                  control="datepicker"
                  classes="input-class"
                />
              </div>
              <TargetArray
                targetTypeList={METADATA?.metaData?.targetTypeList}
              />
              <div className="signal-btn-grp">
                {UPDATESIGNAL && (
                  <>
                    <Button
                      classes="signal-btn-delete"
                      onClick={deletehandler}
                      Content="Delete"
                      disabled={formik.isSubmitting}
                      type="button"
                    />
                    <Button
                      classes="signal-btn-close"
                      Content="Reset"
                      onClick={() => formik.resetForm()}
                      type="button"
                      disabled={formik.isSubmitting}
                    />
                  </>
                )}
                {!UPDATESIGNAL && (
                  <Button
                    classes="signal-btn-close"
                    Content="close"
                    onClick={clearHandler}
                    type="button"
                    disabled={formik.isSubmitting}
                  />
                )}
                <Button
                  classes="signal-btn"
                  Content={formik.isSubmitting ? "Saving..." : "Save"}
                  disabled={formik.isSubmitting}
                  type="submit"
                />
              </div>
              <i
                className="bi bi-x-square filter-close"
                onClick={clearHandler}
              ></i>
            </Form>
          );
        }}
      </Formik>
    </CreatePortal>
  );
};

export default CreatesignalForm;

const TargetArray = ({ targetTypeList }) => {
  return (
    <FieldArray name="targetDetails" id="targetDetails">
      {(fieldArrayProps) => {
        const { form, remove, push } = fieldArrayProps;
        const { values } = form;
        const { targetDetails } = values;

        return (
          <div className="targetDetails-container">
            <div className="position-relative target-label-container">
              <span>Target Details</span>
              <i
                className="bi bi-plus signal-tagert-add"
                onClick={() =>
                  push({
                    targetType: "",
                    targetValue: "",
                    targetValueUnit: "%",
                  })
                }
              ></i>
            </div>
            {targetDetails?.map((targetDetail, index) => (
              <div
                key={index}
                className="d-flex mb-2  justify-content-between align-items-end signal-input-container"
              >
                <FormikController
                  label="Target type"
                  name={`targetDetails[${index}].targetType`}
                  control="dropdown"
                  options={targetTypeList}
                  classes="input-class"
                  LabelClassName="target-label"
                />
                <FormikController
                  control="text"
                  name={`targetDetails[${index}].targetValue`}
                  label="Target Value"
                  type="number"
                  classes="input-class"
                  LabelClassName="target-label"
                />
                <FormikController
                  control="text"
                  name={`targetDetails[${index}].targetValueUnit`}
                  label="Unit"
                  classes="targetValueUnit-class"
                  type="text"
                  disabled
                  LabelClassName="target-label"
                />
                <i
                  className={`bi bi-dash signal-tagert-dash ${
                    targetDetails.length === 1 ? "disabled" : ""
                  }`}
                  style={{ width: "2.75rem" }}
                  onClick={() => remove(index)}
                ></i>
              </div>
            ))}
          </div>
        );
      }}
    </FieldArray>
  );
};
