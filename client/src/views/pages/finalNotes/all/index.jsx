import React from 'react';
import styled from 'styled-components';
// import ErrorBoundary from './../../error';
import ContentQuickNotes from './content';
import { motion } from 'framer-motion'
import { variants } from '../../../../component/motion/layoutMotion';

const Wrapper = styled.div`
  display: flex;
  max-width: 1600px;
  margin: 0 auto;
`;


const QuickNotes = () => {
  return (
      <>
        
    <motion.div
			variants={variants}
			initial='hidden'
			animate='enter'
			exit='exit'
			transition={{ type: 'linear' }}
      >
        <Wrapper>
              <ContentQuickNotes />
        </Wrapper>
        </motion.div>
      </>
  )
}

export default QuickNotes



