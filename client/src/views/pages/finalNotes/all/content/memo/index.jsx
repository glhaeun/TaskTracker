import {  useEffect, useState } from "react";
import emptyImg from '../../../../../img/empty.svg';
import { Link } from 'react-router-dom';
import { ToastContainer, toast} from "react-toastify";
import { handleToast } from "./toastHelper";

//styles
import {
  Container,
  EmptyMsgBox,
  NotesContainer,
} from "../../../style";
import { Box, Header, Controls, Username, Text } from "./styles";

//reddux
import { useDispatch, useSelector } from "react-redux";
import {  toggleFiltersModal } from "../../../../../../redux/featuresNotes";

//components
import { CreateNoteModal, FiltersModal, NoteCard } from "../../../../../../component/finalNotes";

import { IconPlus, IconSearch, IconSortAscending } from "@tabler/icons-react";
import { useLocation } from "react-router-dom";
import { AppBar, Button, InputBase, Toolbar } from "@mui/material";
import notesApi from "../../../../../../api/notesApi";

const AllNotes = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value)

  const { viewFiltersModal } = useSelector((state) => state.modal);

  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [viewCreateModal, setViewCreateModal] = useState(false);

  //getting path
  const location = useLocation();
  const { pathname, state } = location;

  useEffect(() => {
    fetchNotes();
  }, [filter, searchInput]);

  const fetchNotes = async () => {
    try {
      const response = await notesApi.getAll();
      setNotes(response);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const pinnedNotes = notes.filter((note) => note.isPinned);
  const normalNotes = notes.filter((note) => !note.isPinned);

  //not displaying navbar in the following path
  if (pathname === "/" || pathname === "/404") {
    return;
  }
 
  const handleClick = () => {
    setViewCreateModal(true);
  };

  const handleClose = () => {
    setViewCreateModal(false);
  }

  // handle all filters
  const filterHandler = (e) => {
    setFilter(e.target.value);
  };

  //clear.filters handler
  const clearHandler = () => {
    setFilter("");
  };

  const searchResult = () => {
    const searchedNotes = notes.filter(({ title }) =>
      title.toLowerCase().includes(searchInput.toLowerCase())
    );

    if (searchedNotes.length > 0) {
      return (
        <NotesContainer>
          {searchedNotes.map((note) => (
            <NoteCard key={note.id} note={note} type="notes" 
            updateNotePinnedStatus={updateNotePinnedStatus} 
            fetchNotes={fetchNotes}/>
          ))}
        </NotesContainer>
      );
    } else {
      return <EmptyMsgBox>No Results Found</EmptyMsgBox>;
    }
  };

  const updateNotePinnedStatus = (noteId, isPinned) => {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === noteId) {
          return { ...note, isPinned };
        }
        return note;
      });
    });
  };

  // const handleToast = () => {
  //   toast.success("Archive Success !", {
  //     position: "bottom-right",
  //     autoClose: 2500,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "dark",
  //   });
  // }

  return (
    <Container>
      {/* filter modal */}
      {viewFiltersModal && (
        <FiltersModal
          handleFilter={filterHandler}
          handleClear={clearHandler}
          filter={filter}
        />
      )}
      {/* notes */}
      {notes.length === 0 ? (
        <>
        {viewCreateModal && <CreateNoteModal mode="Create" onClose={handleClose}
                 fetchNotes={fetchNotes}/>}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}>
          <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
          }}>
            <img src={emptyImg} alt='errorimg' />
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
          }}>
              <h1 style={{
                  color: 'var(--white-color)',
                  margin: '3rem 0 2rem 0',
                  fontSize: '2rem'
              }}>There are no notes</h1>
                <Button onClick={handleClick} >Click here to add notes</Button> 
            </Box>
          </Box>
        </Box>
      </>
      ) : (
        <>
      <AppBar position="static" color="transparent">
        <Toolbar sx={{display:"flex",
        justifyContent: "space-between",
        alignItems: "center"}}>
          <Header>
            <Username>Hi {user.name}</Username>
            <Text>Here is your quick notes</Text>
          </Header>
          <Controls>
          <InputBase
            className="flex items-center h-10 px-4 ml-10 text-sm w-full bg-gray-200 rounded-full"
            placeholder="Search Notes …"
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
            startAdornment={<IconSearch />}
            type="text"
            />
            <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch(toggleFiltersModal(true))}
            startIcon={<IconSortAscending />}
           />
            <div>
                {viewCreateModal && <CreateNoteModal mode="Create" onClose={handleClose}
                 fetchNotes={fetchNotes}/>}
                  {state !== "Trash" && state !== "Archive" && (
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                    startIcon={<IconPlus />}
                   />
                  )}
            </div>
          </Controls>
          </Toolbar>
          </AppBar>
                  
          <Box style={{ margin: "16px 0" }}>
            {searchInput !== "" ? searchResult() : (
              <Box>
                {/* Pinned Notes Section */}
                {pinnedNotes.length > 0 && (
                  <Box>
                    <div className="allNotes__notes-type">
                      Pinned Notes <span>({pinnedNotes.length})</span>
                    </div>
                    <NotesContainer>
                      {pinnedNotes.map((note) => (
                        <NoteCard key={note.id} note={note} type="notes" 
                        updateNotePinnedStatus={updateNotePinnedStatus}
                        fetchNotes={fetchNotes}
                        handleToast={() => {
                          toast.success("Archive Success !", {
                            position: "bottom-right",
                            autoClose: 2500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                          });
                        }}
                        />
                      ))}
                    </NotesContainer>
                  </Box>
                )}

                {/* Normal Notes Section */}
                {normalNotes.length > 0 && (
                  <Box>
                    <div className="allNotes__notes-type">
                      All Notes <span>({normalNotes.length})</span>
                    </div>
                    <NotesContainer>
                    {normalNotes.map((note) => (
                        <NoteCard key={note.id} note={note} type="notes" 
                        updateNotePinnedStatus={updateNotePinnedStatus}
                        fetchNotes={fetchNotes}
                        handleToast={handleToast}
                        />
                      ))}
                    </NotesContainer>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </>
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
    </Container>
  );
};

export default AllNotes;
