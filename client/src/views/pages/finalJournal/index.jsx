import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion'
import { variants } from '../../../component/motion/layoutMotion';

const ContentJournal = React.lazy(() => import('./content'));

const Wrapper = styled.div`
  display: flex;
  max-width: 1600px;
  margin: 0 auto;
`;


const ToDo = () => {
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
              <ContentJournal />
        </Wrapper>
        </motion.div>
      </>
  )
}

export default ToDo



