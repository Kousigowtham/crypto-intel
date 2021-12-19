import React from "react";
import { Field, ErrorMessage, FieldArray } from "formik";
import { connect } from "react-redux";
import Dropdown from "../Dropdown/Dropdown";

const SignalForm = ({
  METADATA,
  coinList,
  selected,
  setselected,
  disabled,
}) => {
  return (
    <>
      <div className="d-flex mb-2  justify-content-between">
        <div className="me-2 flex-fill">
          <label htmlFor="channel">Channel</label>
          <Field
            as="select"
            className="form-select"
            id="channel"
            name="channel"
          >
            <option selected value="">
              Select
            </option>
            {!METADATA.loading
              ? METADATA?.metaData?.channelList?.map((channel, index) => (
                  <option key={channel.name + index} value={channel.name}>
                    {channel.name}
                  </option>
                ))
              : null}
          </Field>
          <ErrorMessage name="channel">
            {(error) => (
              <div className="text-danger" style={{ fontSize: "0.5rem" }}>
                {error}
              </div>
            )}
          </ErrorMessage>
        </div>
        <div className="">
          <label htmlFor="leverage">Leverage</label>
          <Field
            className="form-control"
            id="leverage"
            name="leverage"
            type="text"
          />
          <ErrorMessage name="leverage">
            {(error) => (
              <div className="text-danger" style={{ fontSize: "0.5rem" }}>
                {error}
              </div>
            )}
          </ErrorMessage>
        </div>
      </div>
      <div className="d-flex mb-2 justify-content-between">
        <div className="me-2 flex-fill">
          <label htmlFor="Market">Market</label>
          <Field
            as="select"
            className="form-select"
            id="market"
            name="market"
            type="text"
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
          </Field>
          <ErrorMessage name="market">
            {(error) => (
              <div className="text-danger" style={{ fontSize: "0.5rem" }}>
                {error}
              </div>
            )}
          </ErrorMessage>
        </div>
        <div className="d-flex flex-column">
          <label htmlFor="coin">Coin</label>
          {/* <Field
            as="select"
            className="form-select"
            id="coin"
            name="coin"
            type="input"
          >
            <option selected value={selected}>
              {selected}
            </option>
            <option value="dsds">dsds</option>
            <ErrorMessage name="coin">
              {(error) => (
                <div className="text-danger" style={{ fontSize: "0.5rem" }}>
                  {error}
                </div>
              )}
            </ErrorMessage>
          </Field> */}
          <Dropdown
            selectHandler={setselected}
            selected={selected}
            coinList={coinList}
            disabled={disabled}
          />
        </div>
      </div>
      <div className="mb-2 ">
        <label htmlFor="buyPrice">BuyPrice</label>
        <Field
          id="buyPrice"
          className="form-control"
          name="buyPrice"
          type="number"
        />
        <ErrorMessage name="buyPrice">
          {(error) => (
            <div className="text-danger" style={{ fontSize: "0.5rem" }}>
              {error}
            </div>
          )}
        </ErrorMessage>
      </div>
      <div className="bg-light p-4 position-relative">
        <label htmlFor="targetDetails">Target Details</label>
        <FieldArray name="targetDetails" id="targetDetails">
          {(fieldArrayProps) => {
            const { form, remove, push } = fieldArrayProps;
            const { values } = form;
            const { targetDetails } = values;

            return (
              <>
                <div
                  className="btn btn-success position-absolute me-4"
                  style={{ width: "3rem", right: "0%" }}
                  onClick={() =>
                    push({
                      targetType: "",
                      targetValue: "",
                      targetValueUnit: "%",
                    })
                  }
                >
                  +
                </div>
                {targetDetails?.map((targetDetail, index) => (
                  <div
                    key={index}
                    className="d-flex mb-2  justify-content-between align-items-end"
                  >
                    <div className="me-2 flex-grow-1">
                      <label htmlFor="targetType" style={{ fontSize: "10px" }}>
                        TargetType
                      </label>

                      <Field
                        as="select"
                        className="form-select"
                        id="targetType"
                        name={`targetDetails[${index}].targetType`}
                      >
                        <option value=""></option>
                        {!METADATA.loading
                          ? METADATA?.metaData?.targetTypeList?.map(
                              (targetType, index) => (
                                <option
                                  key={targetType.name + index}
                                  value={targetType.name}
                                >
                                  {targetType.name}
                                </option>
                              )
                            )
                          : null}
                      </Field>
                    </div>
                    <div className="me-2">
                      <label htmlFor="targetValue" style={{ fontSize: "10px" }}>
                        TargetValue
                      </label>
                      <Field
                        type="number"
                        className="form-control"
                        style={{ width: "6rem" }}
                        id="tagerValue"
                        name={`targetDetails[${index}].targetValue`}
                      />
                    </div>
                    <div className="me-2">
                      <label
                        htmlFor="targetValueUnit"
                        style={{ fontSize: "10px" }}
                      >
                        Unit
                      </label>
                      <Field
                        className="form-control bg-light"
                        style={{ width: "2.5rem" }}
                        id="targetValueUnit"
                        value="%"
                        disabled
                        name={`targetDetails[${index}].targetValueUnit`}
                      />
                    </div>

                    <div
                      className={`btn btn-danger ${
                        targetDetails.length === 1 ? "disabled" : ""
                      }`}
                      style={{ width: "3rem" }}
                      onClick={() => remove(index)}
                    >
                      -
                    </div>
                  </div>
                ))}
              </>
            );
          }}
        </FieldArray>
      </div>
      <div className="mb-2 ">
        <label htmlFor="date">Signal Date</label>
        <Field
          className="form-control"
          id="date"
          name="date"
          format="DD-MM-YYYYThh:mm"
          type="datetime-local"
        />
        <ErrorMessage name="date">
          {(error) => (
            <div className="text-danger" style={{ fontSize: "0.5rem" }}>
              {error}
            </div>
          )}
        </ErrorMessage>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  METADATA: state.metaData,
});
export default connect(mapStateToProps)(SignalForm);
