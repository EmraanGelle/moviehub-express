import React from "react";

const SearchBar = ({ value, onChange }) => {
  return (
    <div style={{ margin: "1rem 0" }}>
      <input
        type="text"
        placeholder="Search movies..."
        value={value}
        onChange={onChange}
        style={{
          padding: "0.5rem",
          width: "100%",
          maxWidth: "400px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
};

export default SearchBar;
