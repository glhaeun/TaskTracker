import React, { useState } from 'react'
import styled from 'styled-components'
import Title from './title';
import Info from './info';
import Score from './score';
import { Box } from '@mui/material';


const Wrapper = styled.div`
  display: flex;
  justify-content: 'center';
  align-item: 'center';
  cursor: move;
  border-radius: 20px;
  padding: 15px;
  margin: 0 5px 10px 5px;
  border: '1px dashed #92929d';
  opacity: '0.999';
  background: 'white';
`
const TaskCard = () => {
    // const [data, setData] = useState({
    //     id: '1', 
    //     title: 'hello',
    //     status: 'status',
    //     score: '2023-02-03',
    //     line: '14',

    // });

    const [modal, setModal] = useState(false)
    const [drag, setDrag] = useState(false)
  
    const onDragStart = (e) => {
      setDrag(prevState => !prevState)
    //   e.dataTransfer.setData('text/html', data.id)
    }
  
    const toggleModal = ()=> {
      setModal(prevState => !prevState)
    }
  return (
    <>
        <Box
        draggable={true}
        onDragStart={onDragStart}
        onClick={toggleModal}
        drag={drag}
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItem: 'center',
            cursor: 'move',
            borderRadius: '20px',
            padding: '15px',
            margin:' 0 5px 10px 5px',
            border: '1px dashed #92929d',
            opacity: '0.999',
            background: 'white' 
        }}
      >
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: 'column'
        }}>
        <Title />
        <Info/>
        <Score/>
        </Box>
      </Box>
    </>
  )
}

export default TaskCard