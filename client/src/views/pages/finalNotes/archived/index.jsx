import { Container, EmptyMsgBox } from "../style";

import { MainWrapper } from "../../../../component/finalNotes";

import { useEffect, useState } from "react";
import notesApi from "../../../../api/notesApi";

const ArchiveNotes = () => {
  const [archiveNotes, setArchiveNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await notesApi.getArchived();
      setArchiveNotes(response);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  return (
    <Container>
      {archiveNotes.length === 0 ? (
        <EmptyMsgBox>There are no archive notes</EmptyMsgBox>
      ) : (
        <MainWrapper notes={archiveNotes} type="archive" fetchNotes={fetchNotes}/>
      )}
    </Container>
  );
};

export default ArchiveNotes;
