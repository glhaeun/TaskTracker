//styles
import { FixedContainer, DeleteBox } from "../Modal.styles";
import { Box } from "./style";

//icon

import { IconX } from "@tabler/icons-react";

import parse from "html-react-parser";

import { useDispatch } from "react-redux";

import { readNote } from "../../../redux/featuresNotes";

const ViewNoteModal = ({ note, type }) => {
  const dispatch = useDispatch();

  return (
    <FixedContainer>
      <Box style={{ backgroundColor: note.color }}>
        <DeleteBox
          onClick={() => dispatch(readNote({ type, id: note.id }))}
          className="readNote__close-btn"
        >
          <IconX />
        </DeleteBox>
        <div className="readNote__title">{note.title}</div>
        <div className="readNote__content">{parse(note.content)}</div>
      </Box>
    </FixedContainer>
  );
};

export default ViewNoteModal;
