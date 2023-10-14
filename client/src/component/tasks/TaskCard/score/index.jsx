import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: 'column';
  align-items: 'center';
`
const ScoreLine = styled.div`
  background-color: #e2e2ea;
  width: 100%;
  height: 3px;
  border-radius: 2.5px;
  min-width: '150px';
  div {
    height: 3px;
    background-color: #3dd598;
    width: '14%';
  }
`
const ScoreLineTitle = styled.div`
  font-size: 14px;
  letter-spacing: 0.1px;
  color: #696974;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-left: '10px';
`

const Score = () => {
  return (
    <>
    <Wrapper >
      <ScoreLineTitle >14%</ScoreLineTitle>
      <ScoreLine >
        <div />
      </ScoreLine>
    </Wrapper>
    </>
  )
}

export default Score