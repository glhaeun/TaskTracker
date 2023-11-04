import parse from "html-react-parser";
import { IconTrash , IconArchive, IconRestore, IconEdit} from "@tabler/icons-react";
 

//styles
import {  
  Card,
  TopBox,
  ContentBox,
  TagsBox,
  FooterBox,
} from "./NoteCard.styles";

//redux
import { useDispatch } from "react-redux";
import { setPinnedNotes, readNote, unarchiveNote, setTrashNotes } from "../../redux/featuresNotes";
import ReadNoteModal from "../finalNotes/Modal/NoteReadModal";
import { IconPinFilled } from "@tabler/icons-react";
import { useState } from "react";
import { NotesIconBox } from "../../views/pages/finalNotes/style";
import { CreateNoteModal } from "../finalNotes";
import notesApi from "../../api/notesApi";
import Footer from "./Footer";

const NoteCard = ({ note, type , fetchNotes}) => {
  const { title, content, tags, color, priority, date, isPinned, id, isArchive, isDelete } =
    note;

  const dispatch = useDispatch();
  const [read, setRead] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const func = () => {
    const imgContent = content.includes("img");

    if (imgContent) {
      return content;
    } else {
      return content.length > 75 ? content.slice(0, 75) + " ...." : content;
    }
  };

  const readNoteHandler = (type, id) => {
    setRead(true);
    dispatch(readNote({ type, id }))
  }

  const pinNoteHandler = async(id, isPinned) => {
    console.log(id)
    console.log(isPinned)
    await notesApi.setPinned(id, {isPinned: !isPinned});
    fetchNotes()
  }

  
  return (
    <>
      {read && <ReadNoteModal note={note} type={type} onClose={() => setRead(false)}/>}
      <Card style={{ backgroundColor: color }}>
        <TopBox>
          <div
            className="noteCard__title"
            onClick={() => readNoteHandler(type, id)}
          >
            {title.length > 10 ? title.slice(0, 10) + " ..." : title}
          </div>
          <div className="noteCard__top-options">
            <span className="noteCard__priority">{priority}</span>

            {type !== "archive" && type !== "trash" && (
              <NotesIconBox
                className="noteCard__pin"
                onClick={() => pinNoteHandler(id, isPinned)}
              >
                <IconPinFilled
                  style={{ color: isPinned && "var(--primary-color)" }}
                />
              </NotesIconBox>
            )}
          </div>
        </TopBox>
        <ContentBox onClick={() => dispatch(readNote({ type, id }))}>
          {parse(func())}
        </ContentBox>

        <TagsBox>
          {tags?.map(({ tag, id }) => (
            <span key={id}>{tag}</span>
          ))}
        </TagsBox>

        <FooterBox>
          <div className="noteCard__date">{date}</div>
          <div>
          <Footer type={type} fetchNotes={fetchNotes} isEditing={isEditing} note={note}>
          </Footer>
          </div>
        </FooterBox>
      </Card>
      {isEditing && (
        // Conditionally render CreateNoteModal in "Edit" mode
        // Pass the note information using the editnote prop
        <CreateNoteModal
          mode="Edit"
          editNote={note}
          onClose={() => setIsEditing(false)} // Close the modal when editing is done
        />
      )}
    </>
  );
};

export default NoteCard;
