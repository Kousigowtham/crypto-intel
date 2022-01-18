import React, { useState } from "react";
import "./Dropdown.css";

const Dropdown = ({ coinList, selectHandler, selected, disabled }) => {
  const [search, setsearch] = useState("");
  return (
    <>
      <div className="inner-dropdown btn-group">
        <button
          type="button"
          className="btn btn-danger dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          disabled={disabled}
        >
          {selected?.name}
        </button>
        <ul className="dropdown-menu overflow-auto inner-dropdown-menu">
          <input
            placeholder="search..."
            value={search}
            onChange={(e) => setsearch(e.target.value)}
            type="search"
            className="border-0 border-bottom my-3 search-form w-100"
          />
          {coinList !== null
            ? search !== ""
              ? coinList
                  .filter((x) =>
                    x.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((coinData) => {
                    return (
                      <li
                        key={coinData.id}
                        onClick={(e) =>
                          selectHandler({
                            name: e.target.innerText,
                            id: coinData.id,
                          })
                        }
                        className="dropdown-item"
                      >
                        {coinData?.name}
                      </li>
                    );
                  })
              : coinList?.map((coinData) => {
                  return (
                    <li
                      key={coinData.id}
                      onClick={(e) =>
                        selectHandler({
                          name: e.target.innerText,
                          id: coinData.id,
                        })
                      }
                      className="dropdown-item"
                    >
                      {coinData.name}
                    </li>
                  );
                })
            : null}
        </ul>
      </div>
    </>
  );
};

export default Dropdown;
