import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion'
import { variants } from '../../../component/motion/layoutMotion';
// import ErrorBoundary from './../../error';

const Content = React.lazy(() => import('./Content'));

const Wrapper = styled.div`
  display: flex;
  max-width: 1600px;
  margin: 0 auto;
  color: blue;
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
          <Content />
        </Wrapper>
		</motion.div>
      </>
  )
}

export default ToDo



