import React, { useEffect, useState } from 'react'
import { NotesIconBox } from '../../views/pages/finalNotes/style';
import { IconTrash , IconArchive, IconRestore, IconEdit} from "@tabler/icons-react";
import notesApi from '../../api/notesApi';
import { toast } from "react-toastify";

const Footer = ({type, fetchNotes, isEditing, setIsEditing, note, handleToast}) => {
    const {id, isArchive, isDeleted} = note

    const editNoteHandler = () => {
        setIsEditing(true); // Set the state to indicate that editing is requested
      };
    
      const setArchiveHandler = async(id, isArchive) => {

        console.log(id)
        console.log(isArchive)
        await notesApi.setArchive(id, {isArchive: !isArchive});
        fetchNotes();
        handleToast('Archived')
      }

      const setDeleteHandler = async(id, isDeleted) => {
        console.log(id)
        console.log(isDeleted)
        await notesApi.setDelete(id, {isDeleted: !isDeleted});
        fetchNotes();
        handleToast('Deleted')
      }

      const deletePermanentHandler = async(id) => {
        await notesApi.delete(id);
        fetchNotes();
      }
    
    let footer = null;

  if (type === "notes") {
    footer = (
      <>
      <div className="normalCard">
        <NotesIconBox data-info="Edit" onClick={editNoteHandler}>
          <IconEdit style={{ fontSize: "1rem" }} />
        </NotesIconBox>
        <NotesIconBox onClick={() => setArchiveHandler(id, isArchive)} data-info="Archive">
          <IconArchive />
        </NotesIconBox>
        <NotesIconBox onClick={() => setDeleteHandler(id, isDeleted)} data-info="Delete">
          <IconTrash />
        </NotesIconBox>
      </div>
      </>
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
          <NotesIconBox onClick={() => setDeleteHandler(id, isDeleted)} data-info="Restore">
            <IconRestore />
          </NotesIconBox>
          <NotesIconBox data-info="Delete">
            <IconTrash onClick={() => deletePermanentHandler(id)} data-info="DeletePermanent"/>
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