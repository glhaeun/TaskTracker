import React from "react";

import { Container, EmptyMsgBox } from "../style";

import { useSelector } from "react-redux";

import { MainWrapper } from "../../../../component";

const DeletedNotes = () => {
  const { trashNotes } = useSelector((state) => state.notesList);

  return (
    <Container>
      {trashNotes.length === 0 ? (
        <EmptyMsgBox>There are no deleted notes</EmptyMsgBox>
      ) : (
        <MainWrapper notes={trashNotes} type="trash" />
      )}
    </Container>
  );
};

export default DeletedNotes;
