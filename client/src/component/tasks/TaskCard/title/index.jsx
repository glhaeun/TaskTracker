import React from 'react'
import styled from 'styled-components'

const TextStyles = styled.div`
  font-size: 14px;
  letter-spacing: 0.1px;
  color: #92929d;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const Titles = styled(TextStyles)`
  color: #171725;
  margin-bottom: 7px;
  text-decoration: 'line-through';
`

const Title = () => {
  return (
    <>
        <Wrapper>
      <Titles>Title</Titles>
    </Wrapper>
    </>
  )
}

export default Title