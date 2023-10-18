import { startTransition, useState } from "react";

//styles
import {
  Container,
  EmptyMsgBox,
  NotesContainer,
} from "../../../style";
import { Box, Header, Controls, Username, Text } from "./styles";

//reddux
import { useDispatch, useSelector } from "react-redux";
import { toggleCreateNoteModal, toggleFiltersModal } from "../../../../../../redux/featuresNotes";

//components
import { CreateNoteModal, FiltersModal, NoteCard } from "../../../../../../component";

import { IconPlus, IconSearch, IconSortAscending } from "@tabler/icons-react";
import { getAllNotes } from "../../../../../../utils";
import { useLocation } from "react-router-dom";
import { AppBar, Button, InputBase, Toolbar } from "@mui/material";

const AllNotes = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value)

  const { mainNotes } = useSelector((state) => state.notesList)
  const { viewFiltersModal } = useSelector((state) => state.modal);

  const [filter, setFilter] = useState("");
  const [searchInput, setSearchInput] = useState("");

  //getting path
  const location = useLocation();
  const { pathname, state } = location;

  const { viewCreateNoteModal } = useSelector((state) => state.modal);


  //not displaying navbar in the following path
  if (pathname === "/" || pathname === "/404") {
    return;
  }
 
  const handleClick = () => {
    startTransition(() => {
      dispatch(toggleCreateNoteModal(true));
    });
  };

  // handle all filters
  const filterHandler = (e) => {
    setFilter(e.target.value);
  };

  //clear.filters handler
  const clearHandler = () => {
    setFilter("");
  };

  const searchResult = () => {
    const searchedNotes = mainNotes.filter(({ title }) =>
      title.toLowerCase().includes(searchInput.toLowerCase())
    );

    if (searchedNotes.length > 0) {
      return (
        <NotesContainer>
          {searchedNotes.map((note) => (
            <NoteCard key={note.id} note={note} type="notes" />
          ))}
        </NotesContainer>
      );
    } else {
      return <EmptyMsgBox>No Results Found</EmptyMsgBox>;
    }
  };

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
      {mainNotes.length === 0 ? (
        <EmptyMsgBox>There are no notes</EmptyMsgBox>
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
                {viewCreateNoteModal && <CreateNoteModal />}
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
                  
          <Box style={{ margin: "16px 0" }}>            {searchInput !== ""
              ? searchResult()
              : getAllNotes(mainNotes, filter, searchInput)}
          </Box>
        </>
      )}
    </Container>
  );
};

export default AllNotes;
