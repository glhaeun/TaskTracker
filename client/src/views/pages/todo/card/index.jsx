import React, { useState } from "react";

import { Draggable } from "react-beautiful-dnd";
import CardInfo from "../../kanban/content/board/CardInfo";
import MainCard from "../../../../component/cards/MainCard";
import Chip from "../../../../component/extended/Chips";
import { AlignLeft, CheckSquare, MoreHorizontal } from "react-feather";
import "./styleTrelloCard.css";
import Menu from "../Menu";



export default function Card({ card, index, removeCard, updateCard, boardId }) {
    const [showModal, setShowModal] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

  return (
    <Draggable draggableId={card.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
                {showModal && (
                    <CardInfo
                      onClose={() => setShowModal(false)}
                      card={card}
                      boardId={boardId}
                      updateCard={updateCard}
                    />
                  )}
            
            <MainCard
            className="card"
            key={card.id}
            draggable
            onClick={() => setShowModal(true)}
            >
         <div className="card-top">
          <div className="card-top-labels">
            {card?.labels?.map((item, index) => (
              <Chip key={index} item={item} />
            ))}
          </div>
          <div
            className="card-top-more"
            onClick={(event) => {
              event.stopPropagation();
              setShowDropdown(true);
            }}
          >
            <MoreHorizontal />
            {showDropdown && (
              <Menu
                class="board-dropdown"
                onClose={() => setShowDropdown(false)}
              >
                <p onClick={() => removeCard(boardId, card.id)}>Delete Card</p>
              </Menu>
            )}
          </div>
        </div>
        <div className="card-title">{card.title}</div>
        <div>
          <p title={card.desc}>
            <AlignLeft />
          </p>
        </div>
        <div className="card-footer">
          {/* {date && (
            <p className="card-footer-item">
              <Clock className="card-footer-icon" />
              {formatDate(date)}
            </p>
          )} */}
          {card.tasks && card.tasks?.length > 0 && (
            <p className="card-footer-item">
              <CheckSquare className="card-footer-icon" />
              {card.tasks?.filter((item) => item.completed)?.length}/{card.tasks?.length}
            </p>
          )}
        </div>

            </MainCard>
            </div>

                
      )}
    </Draggable>
  );
}