import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ContentTitle from './title';
import { Box } from '@mui/material';
import Board from './board';
import { fetchBoardList, updateLocalStorageBoards } from '../../../../ApiMockData/Helper/APILayer';

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

  const [boards, setBoards] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const boardsData = await fetchBoardList();
    setBoards(boardsData);
    console.log(boardsData)
  }

  const [targetCard, setTargetCard] = useState({
    boardId: 0,
    cardId: 0,
  });

  const removeBoard = (boardId) => {
    const boardIndex = boards.findIndex((item) => item.id === boardId);
    if (boardIndex < 0) return;

    const tempBoardsList = [...boards];
    tempBoardsList.splice(boardIndex, 1);
    setBoards(tempBoardsList);
  };

  const addCardHandler = (boardId, title) => {
    const boardIndex = boards.findIndex((item) => item.id === boardId);
    if (boardIndex < 0) return;

    const tempBoardsList = [...boards];
    tempBoardsList[boardIndex].cards.push({
      id: Date.now() + Math.random() * 2,
      title,
      labels: [],
      date: '',
      tasks: [],
      desc: '',
    });
    setBoards(tempBoardsList);
  };

  const removeCard = (boardId, cardId) => {
    const boardIndex = boards.findIndex((item) => item.id === boardId);
    if (boardIndex < 0) return;

    const tempBoardsList = [...boards];
    const cards = tempBoardsList[boardIndex].cards;

    const cardIndex = cards.findIndex((item) => item.id === cardId);
    if (cardIndex < 0) return;

    cards.splice(cardIndex, 1);
    setBoards(tempBoardsList);
  };

  const updateCard = (boardId, cardId, card) => {
    const boardIndex = boards.findIndex((item) => item.id === boardId);
    if (boardIndex < 0) return;

    const tempBoardsList = [...boards];
    const cards = tempBoardsList[boardIndex].cards;

    const cardIndex = cards.findIndex((item) => item.id === cardId);
    if (cardIndex < 0) return;

    tempBoardsList[boardIndex].cards[cardIndex] = card;

    setBoards(tempBoardsList);
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
    const tempBoardsList = [...boards];
    tempBoardsList.push({
      id: Date.now() + Math.random() * 2,
      title: name,
      cards: [],
    });
    setBoards(tempBoardsList);
  };

  useEffect(() => {
    updateLocalStorageBoards(boards);
  }, [boards]);

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
        {boards.map((item) => (
            <Board
              key={item.id}
              board={item}
              addCard={addCardHandler}
              removeBoard={() => removeBoard(item.id)}
              removeCard={removeCard}
              onDragEnd={onDragEnd}
              onDragEnter={onDragEnter}
              updateCard={updateCard}
            />
          ))}

      </Box>
      </Wrapper>
    </>
  );
};




export default Content;
