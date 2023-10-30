import React from 'react';
import styled from 'styled-components';
// import ErrorBoundary from './../../error';

const Content = React.lazy(() => import('./Content'));

const Wrapper = styled.div`
  display: flex;
  max-width: 1600px;
  margin: 0 auto;
`;


const ToDo = () => {
  return (
      <>
        <Wrapper>
              <Content />
        </Wrapper>
      </>
  )
}

export default ToDo



