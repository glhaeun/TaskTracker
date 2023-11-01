import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ContentTitle from './title';
import { Box } from '@mui/material';
import Board from './board';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateCard, addBoard, addCard, removeCardAction, removeBoard } from './../../../../redux/featuresKanban/kanbanSlice';


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 250px;
  background-color: #fafafa;
  padding: 40px;
`;

const types = {
  all: 'All tasks',
  backlog: 'Backlog',
  progress: 'In Progress',
  complete: 'Complete',
};

const Content = () => {

  const boards = useSelector((state) => state.board.boardList);
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(boards)
  }, []);


  const [targetCard, setTargetCard] = useState({
    boardId: 0,
    cardId: 0,
  });



  // Example addCardHandler that dispatches the 'addCard' action
  const addCardHandler = (boardId, title) => {
    dispatch(addCard({ boardId, title }));
  };


  const removeCard = (boardId, cardId) => {
    dispatch(removeCardAction({ boardId, cardId }));
  };
  

  const updateCardHandler = (boardId, cardId, updatedCard) => {
    const boardIndex = boards.findIndex((board) => board.id === boardId);
    if (boardIndex < 0) return;
  
    const cardIndex = boards[boardIndex].cards.findIndex((card) => card.id === cardId);
    if (cardIndex < 0) return;
  
    const updatedCardCopy = { ...updatedCard };
  
    dispatch(updateCard({ boardId, cardId, updatedCard: updatedCardCopy }));
  };
  
  

  const onDragEnd = (boardId, cardId) => {
    const sourceBoardIndex = boards.findIndex((item) => item.id === boardId);
    if (sourceBoardIndex < 0) return;

    const sourceCardIndex = boards[sourceBoardIndex]?.cards?.findIndex(
      (item) => item.id === cardId
    );
    if (sourceCardIndex < 0) return;

    const targetBoardIndex = boards.findIndex(
      (item) => item.id === targetCard.boardId
    );
    if (targetBoardIndex < 0) return;

    const targetCardIndex = boards[targetBoardIndex]?.cards?.findIndex(
      (item) => item.id === targetCard.cardId
    );
    if (targetCardIndex < 0) return;

    const tempBoardsList = [...boards];
    const sourceCard = tempBoardsList[sourceBoardIndex].cards[sourceCardIndex];
    tempBoardsList[sourceBoardIndex].cards.splice(sourceCardIndex, 1);
    tempBoardsList[targetBoardIndex].cards.splice(
      targetCardIndex,
      0,
      sourceCard
    );
    setBoards(tempBoardsList);

    setTargetCard({
      boardId: 0,
      cardId: 0,
    });
  };

  const onDragEnter = (boardId, cardId) => {
    if (targetCard.cardId === cardId) return;
    setTargetCard({
      boardId: boardId,
      cardId: cardId,
    });
  };

  const addboardHandler = (name) => {
    const newBoard = {
      id: Date.now() + Math.random() * 2,
      title: name,
      cards: [],
    };
    dispatch(addBoard(newBoard));
  };
  

  const handleDrop = (e, boardId, cardId) => {
    e.preventDefault();
    onDragEnd(boardId, cardId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Wrapper>
      <ContentTitle addBoard={addboardHandler}
 />
      <Box sx={{
        marginTop: '35px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gridTemplateRows: 'none',
        gridColumnGap: '20px',
        gridRowGap: '20px'
      }}
      onDrop={(e) => handleDrop(e, 0, 0)}
      onDragOver={handleDragOver}
      >
        {boards && boards.map((item) => (
            <Board
              key={item.id}
              board={item}
              addCard={addCardHandler}
              removeBoard={() => dispatch(removeBoard(item.id))}
              removeCard={removeCard}
              onDragEnd={onDragEnd}
              onDragEnter={onDragEnter}
              updateCard={updateCardHandler}
            />
          ))}

      </Box>
      </Wrapper>
    </>
  );
};




export default Content;