import { createSlice } from "@reduxjs/toolkit";

import ApiMockResponse from '../../ApiMockData/dummyData'

const initialState = {
  boardList: [...ApiMockResponse],
  targetCard: {
    boardId: 0,
    cardId: 0,
  },
}
  

export const kanbanSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    addBoard: (state, action) => {
        const { id, title, cards } = action.payload;
        state.boardList.push({ id, title, cards });
      },
    addCard: (state, action) => {
        const { boardId, title } = action.payload;
        const boardIndex = state.boardList.findIndex((board) => board.id === boardId);
  
        if (boardIndex !== -1) {
          state.boardList[boardIndex].cards.push({
            id: Date.now() + Math.random() * 2,
            title,
            labels: [],
            date: '',
            tasks: [],
            desc: '',
          });
        }
      },
      // Add this to your Redux slice
      updateCard: (state, action) => {
        const { boardId, cardId, updatedCard } = action.payload;
      
        // Find the board and card
        const updatedBoardList = state.boardList.map((board) => {
          if (board.id === boardId) {
            const updatedCards = board.cards.map((card) => {
              if (card.id === cardId) {
                return updatedCard;
              }
              return card;
            });
      
            return { ...board, cards: updatedCards };
          }
          return board;
        });
      
        state.boardList = updatedBoardList;
      },      
    removeBoard: (state, action) => {
        const boardIdToRemove = action.payload;
        state.boardList = state.boardList.filter(board => board.id !== boardIdToRemove);
    },
    removeCardAction: (state, action) => {
        const { boardId, cardId } = action.payload;
        const updatedBoardList = state.boardList.map((board) => {
          if (board.id === boardId) {
            return {
              ...board,
              cards: board.cards.filter((card) => card.id !== cardId),
            };
          }
          return board;
        });
        state.boardList = updatedBoardList;
      },
      updateBoard: (state, action) => {
        state.boardList = action.payload;
      },

  }
});

export const { addCard, updateCard, addBoard, updateBoard, removeBoard, removeCardAction, setTargetCard } = kanbanSlice.actions;

// Selectors
export const selectBoardList = (state) => state.board.boardList;
export const selectBoardById = (state, boardId) =>
  state.board.boardList.find((board) => board.id === boardId);

export default kanbanSlice.reducer;
