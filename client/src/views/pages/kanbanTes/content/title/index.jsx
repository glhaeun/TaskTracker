import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ContentTitleSelector from './selector'
import ContentTitleSwitcher from './switcher'
import { AppBar, Button, InputBase, Toolbar } from '@mui/material'
import  AddIcon  from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';
import AddBoard from './addboard'
import { fetchBoardList, updateLocalStorageBoards } from '../../../../../ApiMockData/Helper/APILayer'
import { IconSearch } from '@tabler/icons-react'


const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 450px) {
    justify-content: center;
  }
`
const Header = styled.div`
  @media (max-width: 1050px) {
    display: none;
  }
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
  margin-right: 20px;
`

const Title = (props) => {
  const user = useSelector((state) => state.user.value)
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [boards, setBoards] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const boardsData = await fetchBoardList();
    setBoards(boardsData);
    console.log(boardsData)
  }

  const {addBoard} = props;

  const handleOpen = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const filteredBoards = boards.filter((board) =>
    board.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <Wrapper>
    <AppBar position="static" color="transparent">
        <Toolbar sx={{display:"flex",
        justifyContent: "space-between",
        alignItems: "center"}}>
      <Header>
        <Username>Hi {user.name}</Username>
        <Text>Here is your tasks</Text>
      </Header>
      <Controls>
      <InputBase
                placeholder="Search boards"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
        <Button sx={{marginRight:'20px'}} startIcon={<AddIcon/>} onClick={handleOpen}>Add Section</Button>
      </Controls>
    </Toolbar>
    </AppBar>
    </Wrapper>

    <AddBoard open={showModal} onClose={handleClose} onSubmit={(value) => addBoard(value)} />

    </>
  )
}

export default Title