import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AppBar, Button, InputBase, Toolbar } from '@mui/material'
import { useSelector } from 'react-redux';


const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 450px) {
    justify-content: center;
  }
  width: 100%;
`
const Header = styled.div`
  // background-color: white;
`
const Username = styled.span`
  font-size: 24px;
  text-align: center;
  letter-spacing: 0.1px;
  color: #171725;
  @media (max-width: 450px) {
    display: none;
  }
`
const Text = styled.span`
  font-size: 18px;
  letter-spacing: 0.1px;
  color: #92929d;
  margin-left: 10px;
  font-family: 'Roboto', sans-serif;
`
const Controls = styled.div`
  display: flex;
  justify-items: space-evenly;
  @media (max-width: 1050px) {
    justify-items: space-between;
  }
`

const Title = (props) => {
  const user = useSelector((state) => state.user.value)


  const {addBoard, setSearchInput, searchInput} = props;


  // const filteredBoards = boards.filter((board) =>
  //   board.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <>
    <Wrapper>
    <AppBar position="static" color="transparent">
        <Toolbar sx={{display:"flex",
        justifyContent: "space-between",
        alignItems: "center"}}>
      <Header>
        <Username>Welcome {user.name}</Username>
        <Text>Here is your tasks</Text>
      </Header>
    </Toolbar>
    </AppBar>
    </Wrapper>
    </>
  )
}

export default Title