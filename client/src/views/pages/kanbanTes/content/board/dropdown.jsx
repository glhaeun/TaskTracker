import React, { useEffect, useRef } from "react";

function Dropdown(props) {
  const dropdownRef = useRef();

  const handleClick = (event) => {
    if (
      dropdownRef &&
      !dropdownRef.current?.contains(event.target) &&
      props.onClose
    )
      props.onClose();
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        top: "100%",
        backgroundColor: "#fff",
        borderRadius: "3px",
        minHeight: "40px",
        minWidth: "80px",
        width: "fit-content",
        height: "fit-content",
        maxWidth: "250px",
        maxHeight: "390px",
        overflowY: "auto",
        zIndex: 5,
      }}
      ref={dropdownRef}
      className={`dropdown custom-scroll ${props.class ? props.class : ""}`}
    >
      {props.children}
    </div>
  );
}

export default Dropdown;
