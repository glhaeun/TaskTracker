import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Card from "../card";
import CustomInput from "../../../../ApiMockData/CustomInput";
import MainCard from "../../../../component/cards/MainCard";
import { MoreHorizontal } from "react-feather";
import "./style.css";
import Menu from '../Menu'


export default function Board({ board, index, addCard, removeBoard, removeCard, updateCard }) {
    const [showDropdown, setShowDropdown] = useState(false);

  return (
    <>
    
    <Draggable draggableId={board.id.toString()} index={index}>
      {(provided) => (
        
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <MainCard className="board" key={board.id} >
          <div className="board-header" {...provided.dragHandleProps}>
            <div className="board-header-title">
              <Typography>{board.title}</Typography>
            </div>
            <div
            className="board-header-title-more"
            onClick={(event) => {
              event.stopPropagation();
              setShowDropdown(!showDropdown);
            }}
          ><MoreHorizontal />
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
              <Droppable droppableId={board.id.toString()} type="task">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="board-cards custom-scroll"
                  >
                    {board.cards.map((card, index) => (
                      <Card
                        key={card.id}
                        card={card}
                        index={index}
                        boardId={board.id}
                        removeCard={removeCard}
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
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              </MainCard>
            </div>
      )}
    </Draggable>
    </>
  );
}