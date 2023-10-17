import { Container, EmptyMsgBox } from "../style";

import { MainWrapper } from "../../../../component";

import { useSelector } from "react-redux";

const ArchiveNotes = () => {
  const { archiveNotes } = useSelector((state) => state.notesList);

  return (
    <Container>
      {archiveNotes.length === 0 ? (
        <EmptyMsgBox>There are no archive notes</EmptyMsgBox>
      ) : (
        <MainWrapper notes={archiveNotes} type="archive" />
      )}
    </Container>
  );
};

export default ArchiveNotes;
