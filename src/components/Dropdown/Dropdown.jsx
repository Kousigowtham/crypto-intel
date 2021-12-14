import React, { useState } from "react";
import "./Dropdown.css";

const Dropdown = ({ coinList, selectHandler, selected, disabled }) => {
  const [search, setsearch] = useState("");
  return (
    <>
      <div className="btn-group" style={{ width: "7rem" }}>
        <button
          type="button"
          className="btn btn-danger dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          disabled={disabled}
        >
          {selected?.name}
        </button>
        <ul
          className="dropdown-menu overflow-auto"
          style={{
            height: "300px",
            width: "200px",
          }}
        >
          <input
            placeholder="search..."
            value={search}
            onChange={(e) => setsearch(e.target.value)}
            type="search"
            className="border-0 border-bottom ms-1 mb-3 search-form"
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
