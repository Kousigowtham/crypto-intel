import React, { useEffect, useState, useRef } from "react";
import ZoomIn from "../ZoomIn/ZoomIn";
import "./Dropdown.css";

const Dropdown = ({
  options,
  isSearchPresent,
  classes,
  label,
  inputName,
  field,
  setFieldValue,
  disabled,
  ...otherProps
}) => {
  const [showList, setShowList] = useState(false);
  const [selected, setSelected] = useState("");
  const dropdownContainerRef = useRef("");
  const [optionList, setOptionList] = useState(options);

  const dropdownCloseHandler = (event) => {
    if (
      !(
        dropdownContainerRef &&
        dropdownContainerRef.current &&
        dropdownContainerRef.current.contains(event.target)
      )
    )
      setShowList(false);
  };
  useEffect(() => {
    window.addEventListener("mousedown", dropdownCloseHandler);
    if (field?.value === null) return;
    if (typeof field?.value === "object") setSelected(field?.value?.name);
    else if (typeof field?.value === "string") setSelected(field?.value);

    return () => {
      window.removeEventListener("mousedown", dropdownCloseHandler);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setOptionList(options);
  }, [showList, options]);

  return (
    <div className="dropdown-container" ref={dropdownContainerRef}>
      <button
        type="button"
        className={`dropdown-btn ${classes} ${disabled && "disabled"}`}
        onClick={() => setShowList((prev) => !prev)}
        disabled={disabled}
      >
        {selected ? selected : label}
      </button>
      <ZoomIn show={showList} classes="ZoomIn-container">
        <div className="dropdown-options-container">
          {isSearchPresent && (
            <SearchList options={options} setOptionList={setOptionList} />
          )}
          {optionList?.map((opt, index) => {
            return (
              <span
                key={opt.name + index}
                className="dropdown-options"
                onClick={() => {
                  setFieldValue(inputName, opt);
                  setSelected(opt.name);
                  setShowList(false);
                }}
              >
                {opt.name}
              </span>
            );
          })}
        </div>
      </ZoomIn>
    </div>
  );
};

export default Dropdown;

const SearchList = ({ options, setOptionList }) => {
  const [search, setSearch] = useState("");

  const changeHandler = (event) => {
    if (event) {
      setSearch(event.target.value);
      setOptionList(
        options.filter((x) =>
          x.name.toUpperCase().includes(event.target.value.toUpperCase())
        )
      );
    } else {
      setSearch("");
      setOptionList(options);
    }
  };
  return (
    <div className="dropdown-search-container">
      <i className="bi bi-search"></i>
      <input
        type="text"
        value={search}
        placeholder="search..."
        onChange={(e) => changeHandler(e)}
      />
      {search && (
        <i
          className="bi bi-x-lg search-close"
          onClick={() => {
            changeHandler("");
          }}
        ></i>
      )}
    </div>
  );
};
