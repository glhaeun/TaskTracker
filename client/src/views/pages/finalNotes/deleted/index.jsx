import React, { useEffect, useState } from "react";
import emptyImg from '../../../img/empty.svg';
import { Link } from 'react-router-dom';
import { Container } from "../style";

import { MainWrapper } from "../../../../component/finalNotes";
import notesApi from "../../../../api/notesApi";
import { motion } from 'framer-motion'
import { variants } from '../../../../component/motion/layoutMotion';
import { Box, Button } from "@mui/material";

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
         <>
         <Box sx={{
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'center',
           flexDirection: 'column'
         }}>
           <Box sx={{
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
           }}>
             <img src={emptyImg} alt='errorimg' />
             <Box sx={{
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
           }}>
               <h1 style={{
                   color: 'var(--white-color)',
                   margin: '3rem 0 2rem 0',
                   fontSize: '2rem'
               }}>There are no archived notes</h1>
               <Link to = '/quicknotes/all'>
                 <Button>Back to all notes</Button> 
               </Link>             
             </Box>
           </Box>
         </Box>
       </>
      ) : (
        <MainWrapper notes={trashNotes} type="trash" fetchNotes={fetchNotes}/>
      )}
    </Container>
      </motion.div>
    </>
    
  );
};

export default DeletedNotes;
