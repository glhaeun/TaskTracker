import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Kanban from './Kanban';
import ContentTitle from './title';
import boardApi from '../../../../api/boardApi';
import { EmptyMsgBox } from '../../finalNotes/style';
import { ToastContainer, toast } from "react-toastify";


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 250px;
  background-color: #fafafa;
  padding: 40px;
`;

const types = {
  all: 'All tasks',
  backlog: 'Backlog',
  progress: 'In Progress',
  complete: 'Complete',
};

const Content = () => {
  const user = useSelector((state) => state.user.value);
  const [userId, setUserId] = useState(0)
  const [board, setBoard] = useState([])
  const [searchInput, setSearchInput] = useState("");
  const [isSearch, setIsSearch] = useState(false);



  const searchResult = () => {
    let filteredData = [...board]; // Create a copy to avoid modifying the original state

    let resultComponent = null;

    if (searchInput !== "") {
      filteredData = filteredData.filter((item) => {
        if (item.title && typeof item.title === 'string') {
          return item.title.toLowerCase().includes(searchInput);
        }
        return false;
      });

      if (filteredData.length > 0) {
        resultComponent = <Kanban userId={userId} board={filteredData} isSearch={true}></Kanban>;
      } else {
        resultComponent = <EmptyMsgBox>No Results Found</EmptyMsgBox>;
      }
    } else {
      resultComponent = <Kanban userId={userId} board={board}></Kanban>;
    }

    return resultComponent;
  };


  useEffect(() => {
    setUserId(user._id)
    const getBoard = async () => {
        try {
          const result = await boardApi.getAll({userId})
          setBoard(result)
          } catch (error) {
          alert(error)
          console.log(error)
        }
      } 
      getBoard()
  }, [user, userId])
  

  const addboardHandler = async (boardName, selectedColor) => {
    try {
      const newBoard = await boardApi.create({boardName: boardName, color: selectedColor})
      const updatedBoard = [...board, newBoard];
      setBoard(updatedBoard);

      toast.success("Add Board Success !", {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch(err) {
      console.log(err)
    }
    
  };

  

    return (
    <>
      <Wrapper>
      <ContentTitle addBoard={addboardHandler} searchInput={searchInput} setSearchInput={setSearchInput}/>
      {searchInput !== "" ? searchResult() : (
        <Kanban userId={userId} board={board} ></Kanban>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      </Wrapper>
    </>
  );
};




export default Content;
