import React, { useState } from "react";
import { X } from "react-feather";

import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import './style.css'
import MainCard from './../../component/cards/MainCard';

function CustomInput(props) {
  const {
    text,
    onSubmit,
    displayClass,
    editClass,
    placeholder,
    defaultValue,
    buttonText,
  } = props;

  const [isCustomInput, setIsCustomInput] = useState(false);
  const [inputText, setInputText] = useState(defaultValue || "");

  const submission = (e) => {
    e.preventDefault();
    if (inputText && onSubmit) {
      setInputText("");
      onSubmit(inputText);
    }
    setIsCustomInput(false);
  };

  return (
    <MainCard className="custom-input">
      {isCustomInput ? (
        <form
          className={`custom-input-edit ${editClass ? editClass : ""}`}
          onSubmit={submission}
        >
          <input
            type="text"
            value={inputText}
            placeholder={placeholder || text}
            onChange={(event) => setInputText(event.target.value)}
            autoFocus
          />
          <div className="custom-input-edit-footer">
            <Button variant="outlined" startIcon={<AddIcon/>} type="submit">{buttonText || "Add"}</Button>
            <Button variant="outlined" startIcon={<X/>} onClick={() => setIsCustomInput(false)} >Cancel</Button>
          </div>
        </form>
      ) : (
        <p
          className={`custom-input-display ${displayClass ? displayClass : ""}`}
          onClick={() => setIsCustomInput(true)}
        >
          {text}
        </p>
      )}
    </MainCard>
  );
}

export default CustomInput;
