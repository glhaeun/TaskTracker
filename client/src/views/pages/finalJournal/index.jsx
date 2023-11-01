import React from 'react';
import styled from 'styled-components';

const ContentJournal = React.lazy(() => import('./content'));

const Wrapper = styled.div`
  display: flex;
  max-width: 1600px;
  margin: 0 auto;
`;


const ToDo = () => {
  return (
      <>
        <Wrapper>
              <ContentJournal />
        </Wrapper>
      </>
  )
}

export default ToDo



