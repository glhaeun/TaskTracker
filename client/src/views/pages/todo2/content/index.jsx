import React, { useEffect } from 'react';
import styled from 'styled-components';
import ContentTitle from './title';
import TaskWrapper from '../../../../component/tasks/TaskWrapper';
import { Box } from '@mui/material';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 250px;
  background-color: #fafafa;
  padding: 40px;
`;

// const Tasks = styled.div`
//   margin-top: 35px;
//   display: grid;
//   grid-template-columns: ${(props) =>
//     props.option ? `repeat(auto-fill, minmax(280px, 1fr))` : 'none'};
//   grid-template-rows: ${(props) =>
//     props.option ? 'none' : 'repeat(4, auto)'};
//   grid-column-gap: 20px;
//   grid-row-gap: 20px;
// `;

const types = {
  all: 'All tasks',
  backlog: 'Backlog',
  progress: 'In Progress',
  complete: 'Complete',
};

const Content = () => {

  const backlog = 'backlog'
  const progress = 'progress'
  const complete = 'complete'

  

  return (
    <>
      <Wrapper>
      <ContentTitle />
      <Box sx={{
        marginTop: '35px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gridTemplateRows: 'none',
        gridColumnGap: '20px',
        gridRowGap: '20px'
      }}>
        <TaskWrapper ></TaskWrapper>
        <TaskWrapper ></TaskWrapper>
        <TaskWrapper ></TaskWrapper>
        <TaskWrapper ></TaskWrapper>
      </Box>
      </Wrapper>
    </>
  );
};




export default Content;
