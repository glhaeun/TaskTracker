import React, { useState } from "react";
import { AlignLeft, CheckSquare, MoreHorizontal } from "react-feather";

// import { formatDate } from "../../Helper/Util";

import "./styleTrelloCard.css";
import MainCard from "../../../../../component/cards/MainCard";
import Chip from "../../../../../component/extended/Chips";
import CardInfo from "./CardInfo";
import Menu from "./Menu";

function TrelloCard(props) {
  const { card, boardId, removeCard, onDragEnd, onDragEnter, updateCard } =
    props;
  const { id, title, desc, date, tasks, labels } = card;
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
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
        onDragEnd={() => onDragEnd(boardId, id)}
        onDragEnter={() => onDragEnter(boardId, id)}
        onClick={() => setShowModal(true)}
      >
        <div className="card-top">
          <div className="card-top-labels">
            {labels?.map((item, index) => (
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
                <p onClick={() => removeCard(boardId, id)}>Delete Card</p>
              </Menu>
            )}
          </div>
        </div>
        <div className="card-title">{title}</div>
        <div>
          <p title={desc}>
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
          {tasks && tasks?.length > 0 && (
            <p className="card-footer-item">
              <CheckSquare className="card-footer-icon" />
              {tasks?.filter((item) => item.completed)?.length}/{tasks?.length}
            </p>
          )}
        </div>
      </MainCard>
    </>
  );
}

export default TrelloCard;
