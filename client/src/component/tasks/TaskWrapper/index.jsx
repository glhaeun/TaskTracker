import React, { useState } from 'react'
import styled from 'styled-components'
import {IconDotsVertical} from '@tabler/icons-react'
import TaskCard from '../TaskCard'
import AddButton from './add'


const variables = {
    color: '#0062ff',
    colorBorder: '#e2e2ea',
    crossSize: 16
  }
  

  const Header = styled.div`
    border-radius: 15px 15px 0 0;
    border-top: 1px solid ${variables.colorBorder};
    border-left: 1px solid ${variables.colorBorder};
    border-right: 1px solid ${variables.colorBorder};
    display: flex;
    justify-content: space-between;
  `
  const Title = styled.span`
    font-size: 16px;
    letter-spacing: 0.1px;
    color: #696974;
    padding: 15px 20px;
  `
  const More = styled.div`
    padding: 0 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
    @media (max-width: 450px) {
      display: none;
    }
  `
  const TasksWrapper = styled.div`
    height: auto;
    border-left: 1px solid ${variables.colorBorder};
    border-right: 1px solid ${variables.colorBorder};
    padding: 20px 0;
  `

  const Wrapper = styled.div`
  `





const TaskWrapper = () => {

  const [dragOver, setDragOver] = useState(false)

  const onDragOver = (e) => {
    e.preventDefault()
  }

  const onDragEnter = () => {
    setDragOver(prevState => !prevState)
  }

  const onDragLeave = () => {
    setDragOver(prevState => !prevState)
  }

//   const onDrop = (e) => {
//     setDragOver(false)
//   }

  return (
    <>
    <Wrapper
    //   onDrop={onDrop}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      sx={{
        width: '280px'
      }}
    >
      <Header>
        <Title>Section</Title>
        <More>
          <IconDotsVertical />
        </More>
      </Header>
      <TasksWrapper dragOver={dragOver}>
        <TaskCard></TaskCard>
      </TasksWrapper>
      <AddButton></AddButton>
    </Wrapper>
    </>
  )
}

export default TaskWrapper