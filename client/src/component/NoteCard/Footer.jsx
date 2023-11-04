import React, { useState } from 'react'
import { NotesIconBox } from '../../views/pages/finalNotes/style';
import { IconTrash , IconArchive, IconRestore, IconEdit} from "@tabler/icons-react";
import notesApi from '../../api/notesApi';

const Footer = ({type, fetchNotes, isEditing, setIsEditing, note}) => {
    const {id, isArchive, isDelete} = note
    console.log(note)
    const editNoteHandler = () => {
        setIsEditing(true); // Set the state to indicate that editing is requested
      };
    
      const setArchiveHandler = async(id, isArchive) => {
        console.log(id)
        console.log(isArchive)
        await notesApi.setArchive(id, {isArchive: !isArchive});
        fetchNotes();
      }

      const setDeleteHandler = async(id, isDelete) => {
        console.log(id)
        console.log(isDelete)
        await notesApi.setDelete(id, {isDelete: !isDelete});
        fetchNotes();
      }
    
    let footer = null;

  if (type === "notes") {
    footer = (
      <div className="normalCard">
        <NotesIconBox data-info="Edit" onClick={editNoteHandler}>
          <IconEdit style={{ fontSize: "1rem" }} />
        </NotesIconBox>
        <NotesIconBox onClick={() => setArchiveHandler(id, isArchive)} data-info="Archive">
          <IconArchive />
        </NotesIconBox>
        <NotesIconBox onClick={() => setDeleteHandler(id, isDelete)} data-info="Delete">
          <IconTrash />
        </NotesIconBox>
      </div>
    );
  } else if (type === "archive") {
    footer = (
      <div className="archivedCard">
        <NotesIconBox onClick={() => setArchiveHandler(id, isArchive)} data-info="Restore">
          <IconRestore />
        </NotesIconBox>
        <NotesIconBox data-info="Delete">
          <IconTrash />
        </NotesIconBox>
      </div>
    );
  } else {
    footer = (
        <div className="deleteCard">
          <NotesIconBox onClick={() => setDeleteHandler(id, isDelete)} data-info="Restore">
            <IconRestore />
          </NotesIconBox>
          <NotesIconBox data-info="Delete">
            <IconTrash />
          </NotesIconBox>
        </div>
      );
  }
  return (
    <div>{footer}</div>
  )
}

export default Footer

{/* <NotesIconBox data-info="Edit" onClick={editNoteHandler}> 
          <IconEdit style={{ fontSize: "1rem" }} 
          />
        </NotesIconBox>
        <NotesIconBox
          onClick={() => setArchiveHandler(id, isArchive)}
          data-info="Archive"
        >
          <IconArchive />
        </NotesIconBox>
        <NotesIconBox
          // onClick={() => dispatch(setTrashNotes(note))}
          data-info="Delete"
        >
          <IconTrash />
        </NotesIconBox>
          </> */}