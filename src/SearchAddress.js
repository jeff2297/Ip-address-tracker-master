import React, { useEffect } from "react";
import iconArrow from "./images/icon-arrow.svg";
import { useGlobalContext } from "./context";

const SearchAddress = () => {
  const { isLoading, error, setQuery } = useGlobalContext();
  const searchValue = React.useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(`&domain=${searchValue.current.value}`);
    searchValue.current.value = "";
  };

  return (
    <div className="search-address">
      <h1>IP Address Tracker</h1>
      <form className="search-address-form" onSubmit={handleSubmit}>
        {error.show && <div className="error">{error.msg}</div>}
        <input
          type="text"
          placeholder="Search for any IP address or domain"
          ref={searchValue}
        />
        <button
          className="btn"
          type="submit"
          disabled={isLoading ? "disabled" : null}
        >
          <img src={iconArrow} alt="arrow" />
        </button>
      </form>
    </div>
  );
};

export default SearchAddress;