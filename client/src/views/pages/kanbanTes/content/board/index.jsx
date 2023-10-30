import React, { useState } from "react";
import { MoreHorizontal } from "react-feather";

import CustomInput from "../../../../../ApiMockData/CustomInput";

import MainCard from "../../../../../component/cards/MainCard";
import "./style.css";
import TrelloCard from './trelloCard';
import Menu from './Menu'

function Board(props) {
  const {
    board,
    addCard,
    removeBoard,
    removeCard,
    onDragEnd,
    onDragEnter,
    updateCard,
  } = props;
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <MainCard className="board" key={board?.id} sx={{
      width: '280px'
    }}>
        <div className="board-header">
          <p className="board-header-title">
            {board?.title}
            <span>{board?.cards?.length || 0}</span>
          </p>
          <div
            className="board-header-title-more"
            onClick={(event) => {
              event.stopPropagation();
              setShowDropdown(!showDropdown);
            }}
          >
            <MoreHorizontal />
            {showDropdown && (
              <Menu
                className="board-dropdown"
                onClose={() => setShowDropdown(false)}
              >
                <p onClick={() => removeBoard(board?.id)}>Delete</p>
              </Menu>
            )}
          </div>
        </div>
        <div className="board-cards custom-scroll">
          {board?.cards?.map((item) => (
            <TrelloCard
              key={item.id}
              card={item}
              boardId={board.id}
              removeCard={removeCard}
              onDragEnter={onDragEnter}
              onDragEnd={onDragEnd}
              updateCard={updateCard}
            />
          ))}
          <CustomInput
            text="+ Add Card"
            placeholder="Enter Card Title"
            displayClass="board-add-card"
            editClass="board-add-card-edit"
            onSubmit={(value) => addCard(board?.id, value)}
          />
        </div>
    </MainCard>
  );
}

export default Board;
