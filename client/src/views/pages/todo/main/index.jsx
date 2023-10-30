import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addBoard, addCard, removeBoard, removeCardAction, updateCard, updateBoard } from "../../../../redux/featuresKanban/kanbanSlice";
import Board from "../board";
import ContentTitle from '../title';
import styled from 'styled-components';
import { Box } from "@mui/material";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 250px;
  background-color: #fafafa;
  padding: 40px;
`;


export default function Main() {

  const boards = useSelector((state) => state.board.boardList);
  const dispatch = useDispatch()
  const [data, setData] = useState(boards);


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

  
  const addboardHandler = (name) => {
    const newBoard = {
      id: Date.now() + Math.random() * 2,
      title: name,
      cards: [],
    };
    dispatch(addBoard(newBoard));
  };

  

const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
  
    if (!destination) {
      return;
    }
  
    if (type === "list") {
      // Handle reordering of boards
      const newBoardOrder = [...data];
      if (source.index !== destination.index) {
        const movedBoard = newBoardOrder.splice(source.index, 1)[0];
        newBoardOrder.splice(destination.index, 0, movedBoard);
      }
      dispatch(updateBoard(newBoardOrder));
      return;
    } 

    //   if (source.droppableId === destination.droppableId) {
    //     // Reorder cards within the same board
    //     const sourceBoardIndex = updatedData.findIndex(
    //       (board) => board.id.toString() === source.droppableId
    //     );
  
    //     if (sourceBoardIndex !== -1) {
    //       const updatedCards = [...updatedData[sourceBoardIndex].cards];
    //       const [movedCard] = updatedCards.splice(source.index, 1);
    //       updatedCards.splice(destination.index, 0, movedCard);
  
    //       updatedData[sourceBoardIndex] = {
    //         ...updatedData[sourceBoardIndex],
    //         cards: updatedCards,
    //       };
    //       dispatch(updateBoard(updatedData));
    //     }
    //   } 
      
    //   if{
    //     // Move card between boards
    //     const sourceBoardIndex = updatedData.findIndex(
    //       (board) => board.id.toString() === source.droppableId
    //     );
    //     const destinationBoardIndex = updatedData.findIndex(
    //       (board) => board.id.toString() === destination.droppableId
    //     );
  
    //     if (sourceBoardIndex !== -1 && destinationBoardIndex !== -1) {
    //       const sourceBoard = updatedData[sourceBoardIndex];
    //       const destinationBoard = updatedData[destinationBoardIndex];
    //       const [movedCard] = sourceBoard.cards.filter(
    //         (card) => card.id.toString() === draggableId
    //       );
  
    //       if (movedCard) {
    //         const updatedSourceCards = sourceBoard.cards.filter(
    //           (card) => card.id.toString() !== draggableId
    //         );
  
    //         const updatedDestinationCards = [...destinationBoard.cards];
    //         updatedDestinationCards.splice(destination.index, 0, movedCard);
  
    //         updatedData[sourceBoardIndex] = {
    //           ...sourceBoard,
    //           cards: updatedSourceCards,
    //         };
  
    //         // Instead of modifying the source board, clone it and update the destination board
    //         const updatedDestinationBoard = {
    //           ...destinationBoard,
    //           cards: updatedDestinationCards,
    //         };
    //         updatedData[destinationBoardIndex] = updatedDestinationBoard;
  
    //         dispatch(updateBoard(updatedData));
    //       }
    //     }
    //   }
    // }
  };
  
  return (
    <Wrapper>
      <ContentTitle addBoard={addboardHandler}/>
      <DragDropContext onDragEnd={onDragEnd}>
      <Box sx={{
                display: 'flex',
                alignItems: 'flex-start',
                width: 'calc(100vw - 400px)',
                overflowX: 'auto'
            }}>
        <Droppable droppableId="app" type="list" direction="vertical">
          {(provided) => (
            <Box ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{width: '300px', padding: '10px', marginRight: '10px'}}>
                
               {boards && boards.map((item, index) => (
                    <Board
                    key={item.id}
                    board={item}
                    addCard={addCardHandler}
                    removeCard={removeCard}
                    updateCard={updateCardHandler}
                    removeBoard={() => dispatch(removeBoard(item.id))}
                    index = {index}
                    />
          ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
        </Box>
      </DragDropContext>
      </Wrapper>
  );
}