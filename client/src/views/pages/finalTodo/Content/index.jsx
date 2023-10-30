import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Kanban from './Kanban';
import ContentTitle from './title';
import boardApi from '../../../../api/boardApi';


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
  const user = useSelector((state) => state.user.value);
  const [userId, setUserId] = useState(0)
  const [board, setBoard] = useState([])

  useEffect(() => {
    setUserId(user._id)
    const getBoard = async () => {
        try {
          const result = await boardApi.getAll({userId})
          setBoard(result)
          console.log(result)
          } catch (error) {
          alert(error)
          console.log(error)
        }
      } 
      getBoard()
  }, [user, userId])
  

  const addboardHandler = (newBoard) => {
    const updatedBoard = [...board, newBoard];
    setBoard(updatedBoard);
  };

    return (
    <>
      <Wrapper>
      <ContentTitle addBoard={addboardHandler}/>
      <Kanban userId={userId} board={board} ></Kanban>
      </Wrapper>
    </>
  );
};




export default Content;
