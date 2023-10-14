import React from 'react'
import styled from 'styled-components'
import { IconPaperclip, IconCalendar} from '@tabler/icons-react'


const TextStyles = styled.div`
  font-size: 14px;
  letter-spacing: 0.1px;
  color: #92929d;
`
const Wrapper = styled.div`
  display: flex;
  margin: 15px 0 10px 0;
`
const Status = styled(TextStyles)`
  margin: 0 15px 0 20px;
  display: flex;
  align-items: center;
  svg {
    margin-right: 5px;
    fill: #92929d;
    width: 14px;
    height: 14px;
  }
`

const Activity = styled(Status)`
  background-color:'red'};
  color: 'black'};
  padding: 5px;
  border-radius: 5px;
  margin: 0;
  span:last-child {
    margin-left: 5px;
  }
  svg {
    fill: 'pink;
  }
`

const Info = () => {

  return (
    <>
    <Wrapper>
      <Status>
        <IconPaperclip />
        4/5
      </Status>
        <Activity>
          <IconCalendar />
          <span>12</span>
          <span>days left</span>
        </Activity>
      
    </Wrapper>
    </>
  )
}

export default Info