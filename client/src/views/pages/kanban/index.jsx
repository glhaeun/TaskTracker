import React from 'react';
import styled from 'styled-components';
// import ErrorBoundary from './../../error';

const ContentTrello = React.lazy(() => import('./content'));

const Wrapper = styled.div`
  display: flex;
  max-width: 1600px;
  margin: 0 auto;
`;


const ToDo = () => {
  return (
      <>
        <Wrapper>
              <ContentTrello />
        </Wrapper>
      </>
  )
}

export default ToDo



