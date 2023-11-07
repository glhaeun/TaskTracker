import React, { useEffect, useState } from "react";

import { Container, EmptyMsgBox } from "../style";

import { MainWrapper } from "../../../../component/finalNotes";
import notesApi from "../../../../api/notesApi";
import { motion } from 'framer-motion'
import { variants } from '../../../../component/motion/layoutMotion';

const DeletedNotes = () => {
  const [trashNotes, setTrashNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await notesApi.getDeleted();
      setTrashNotes(response);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  console.log(trashNotes)


  return (
    <>
    <motion.div
			variants={variants}
			initial='hidden'
			animate='enter'
			exit='exit'
			transition={{ type: 'linear' }}
      >
      <Container>
      {trashNotes.length === 0 ? (
        <EmptyMsgBox>There are no deleted notes</EmptyMsgBox>
      ) : (
        <MainWrapper notes={trashNotes} type="trash" fetchNotes={fetchNotes}/>
      )}
    </Container>
      </motion.div>
    </>
    
  );
};

export default DeletedNotes;
