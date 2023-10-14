import React from 'react'
import {IconPlus} from '@tabler/icons-react'
import styled from 'styled-components'; 

const variables = {
    color: '#0062ff',
    colorBorder: '#e2e2ea',
    crossSize: 16
}

const Wrapper = styled.button`
height: 35px;
width: 100%;
border-radius: 0 0 15px 15px;
outline: none;
border: 1px solid ${variables.colorBorder};
position: relative;
cursor: pointer;
background-color: white;
:hover {
  border: 1px dashed ${variables.color};
}
`

const AddButton = () => {
  return (
    <>
        <Wrapper>
            <IconPlus />
        </Wrapper>
    </>
  )
}

export default AddButton