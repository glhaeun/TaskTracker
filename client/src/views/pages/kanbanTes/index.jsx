import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import ErrorBoundary from './../../error';
import { useSelector } from 'react-redux';

const ContentTrello = React.lazy(() => import('./content'));

const Wrapper = styled.div`
  display: flex;
  max-width: 1600px;
  margin: 0 auto;
`;


const ToDo = () => {
  const getBoardList = useSelector((state) => state.board.boardList);
  const [boardListData, setBoardListData] = useState([]);

  useEffect(() => {
    setBoardListData(getBoardList);
    
  }, [getBoardList]);
  return (
      <>
        <Wrapper>
              <ContentTrello board={boardListData}/>
        </Wrapper>
      </>
  )
}

export default ToDo



