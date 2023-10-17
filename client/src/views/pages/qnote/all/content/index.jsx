import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Box } from '@mui/material';
import AllNotes from './memo';
import TitleQuickNotes from './title';

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

const ContentQuickNotes = () => {

  return (
    <>
      <Wrapper>
      <TitleQuickNotes />
      <Box>
        <AllNotes></AllNotes>
      </Box>
      </Wrapper>
    </>
  );
};




export default ContentQuickNotes;
