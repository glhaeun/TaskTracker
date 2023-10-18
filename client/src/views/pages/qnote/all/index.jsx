import React from 'react';
import styled from 'styled-components';
// import ErrorBoundary from './../../error';

const ContentQuickNotes = React.lazy(() => import('./content'));

const Wrapper = styled.div`
  display: flex;
  max-width: 1600px;
  margin: 0 auto;
`;


const QuickNotes = () => {
  return (
      <>
        <Wrapper>
              <ContentQuickNotes />
        </Wrapper>
      </>
  )
}

export default QuickNotes


