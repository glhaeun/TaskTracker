//styles
import { NotesContainer } from "../../views/pages/qnote/style";

//component
import NoteCard from "../NoteCard/NoteCard2";

const MainWrapper = ({ notes, type ,fetchNotes}) => {
  return (
    <NotesContainer>
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} type={type} fetchNotes={fetchNotes}/>
      ))}
    </NotesContainer>
  );
};

export default MainWrapper;
