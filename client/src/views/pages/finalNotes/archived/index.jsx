import { Container } from "../style";
import emptyImg from '../../../img/empty.svg';
import { Link } from 'react-router-dom';
import { MainWrapper } from "../../../../component/finalNotes";

import { useEffect, useState } from "react";
import notesApi from "../../../../api/notesApi";
import { variants } from '../../../../component/motion/layoutMotion';
import { motion } from 'framer-motion'
import { Box, Button } from "@mui/material";


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
    <>
    <motion.div
			variants={variants}
			initial='hidden'
			animate='enter'
			exit='exit'
			transition={{ type: 'linear' }}
      >
    <Container>
      {archiveNotes.length === 0 ? (
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
        <MainWrapper notes={archiveNotes} type="archive" fetchNotes={fetchNotes}/>
      )}
    </Container>
    </motion.div>
    </>
  );
};

export default ArchiveNotes;
