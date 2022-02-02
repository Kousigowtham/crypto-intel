import React from "react";
import { Formik, Form } from "formik";
import FormikController from "../FormikController";
import * as Yup from "yup";
import "./FilterForm.css";
import CreatePortal from "../../CreatePortal/CreatePortal";
import Button from "../../Button/Button";
import { dateConversion } from "../../../Services/service";
import { fetchSignalList } from "../../../reducers/signalListReducer";
import { useDispatch } from "react-redux";

const initialState = {
  startDate: null,
  endDate: null,
  market: "",
  coin: "",
};

const validationSchema = Yup.object({
  startDate: Yup.object().nullable(),
  endDate: Yup.object()
    .nullable()
    .when("startDate", (startDate, schema) => {
      return startDate ? schema.required("*Required") : schema.nullable();
    }),
  market: Yup.object(),
  coin: Yup.object().when("market", (market, schema) => {
    return market ? schema.required("*Required") : schema.nullable();
  }),
});

const FilterForm = ({
  marketList,
  coinList,
  setShowFilter,
  selectedChannel,
}) => {
  const dispatch = useDispatch();

  const submitHandler = (values, formikBag) => {
    if (!formikBag.dirty) {
      setShowFilter(false);
      return;
    }

    const convertedStartDate = values.startDate
      ? dateConversion(values.startDate._d)
      : "";
    const convertedEndDate = values.endDate
      ? dateConversion(values.endDate._d)
      : "";

    dispatch(
      fetchSignalList(convertedStartDate, convertedEndDate, values.coin.id)
    );
    setShowFilter(false);
  };

  const clearHandler = (formik) => {
    setShowFilter(false);

    if (!formik.dirty) return;
    dispatch(fetchSignalList("", "", "", selectedChannel.id));
  };
  return (
    <CreatePortal>
      <Formik
        initialValues={initialState}
        onSubmit={submitHandler}
        validationSchema={validationSchema}
      >
        {(formik) => {
          return (
            <Form
              onSubmit={formik.handleSubmit}
              className="filter-form-container"
            >
              <div className="input-filter-container">
                <FormikController
                  id="startDate"
                  label="Enter a Start Date"
                  name="startDate"
                  control="datepicker"
                  classes="input-class"
                />
                <FormikController
                  id="endDate"
                  label="Enter a End Date"
                  name="endDate"
                  control="datepicker"
                  classes="input-class"
                  disabled={formik.values.startDate ? false : true}
                />
              </div>
              <div className="input-filter-container">
                <FormikController
                  id="market"
                  label="SELECT MARKET"
                  name="market"
                  control="dropdown"
                  options={marketList}
                  classes="input-class"
                />
                <FormikController
                  id="coin"
                  label="SELECT COIN"
                  name="coin"
                  control="dropdown"
                  options={
                    formik.values.market
                      ? coinList.filter(
                          (x) => x.market === formik.values.market.name
                        )
                      : coinList
                  }
                  isSearchPresent
                  classes="input-class"
                  disabled={formik.values.market ? false : true}
                />
              </div>
              <div className="fliter-bth-grp">
                <Button
                  classes="filter-button clear"
                  type="button"
                  Content="Clear"
                  onClick={() => clearHandler(formik)}
                />
                <Button
                  classes="filter-button"
                  type="submit"
                  Content="Filter"
                />
              </div>
              <i
                className="bi bi-x-square filter-close"
                onClick={() => setShowFilter(false)}
              ></i>
            </Form>
          );
        }}
      </Formik>
    </CreatePortal>
  );
};

export default FilterForm;
