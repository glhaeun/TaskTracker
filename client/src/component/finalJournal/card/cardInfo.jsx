import { Box, Button, Drawer, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Icon123, IconCircleMinus, IconEdit, IconQuotes, IconCalendar } from "@tabler/icons-react";
import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { removeJournal } from "../../../redux/featuresJournal/journal/tesSlice";
import Chip from "../../extended/Chips";
import "./styleCardInfo.css"
import journalApi from '../../../api/journalApi';
import DOMPurify from "dompurify";


const JournalInfo = (props) => {
  const journal = props.journal;
  const photo = journal.photo;
  const timestamp = journal.createdTime;
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleString();

  const formatDate = date.toISOString().split('T')[0];

  
  const [openDrawer, setOpenDrawer] = useState(false);
  const [image, setImage] = useState(null);

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
    setImage(photo);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const setUpdatePage = () => {
    props.onJournalUpdate(journal.id);
  };


  const handleDeleteJournal = async (journalId) => {
    try {
      console.log(journalId)
      await journalApi.delete(journalId)
      
      // const newData = [...data].filter(e => e.id !== boardId)
      // setData(newData)
      props.deleteJournal(journalId);
    } catch(err) {
      console.log(err)
    }
  }


  return (
    <>
    <Card className="mb-3 card">

      

    <CardMedia
        sx={{ height: 140 }}
        image={photo !== undefined? photo : "https://i.pinimg.com/280x280_RS/ab/a2/8e/aba28eb29f66aab5f24db128a0232f3f.jpg" }
        title="Journal Cover"
        onClick={handleOpenDrawer } // Open the modal when the card is clicked
        style={{ cursor: "pointer" }}
      />
  

      <CardContent className="flex flex-col p-4 group cursor-pointer hover:bg-opacity-100 hover:bg-gray-100 outer">
      <div className="inner">
      <Typography variant="h2">{journal.title}</Typography>
        <div className="flex items-center mb-3 caption">
          <IconQuotes />
          <Typography variant="body2" className="ml-1">
            {journal.caption}
          </Typography>
        </div>
        {/* <div className="flex items-center mb-3">
          <Typography variant="body2" className="ml-1">
          {content.toString().length > 50 ? content.slice(0, 10) + " ..." : content}
          </Typography>
        </div> */}
        <div className="flex items-center" >
          <div className="flex items-center mr-4 date">
            <IconCalendar />
            <Typography variant="body2" className="ml-1">
            {formatDate}
            </Typography>
          </div>
        </div>
        <div className="cardinfo-box-labels">
            {journal.category?.map((item, index) => (
            <Chip key={index} item={item}  />
            ))}
        </div>
      </div>
        <div className="flex items-center justify-between mb-3 buttons">
          <Button onClick={setUpdatePage}>
            <IconEdit />
          </Button>
          <Button onClick={() => handleDeleteJournal(journal.id)}>
            <IconCircleMinus />
          </Button>
        </div>
      </CardContent>
    </Card>

    <Drawer anchor="right" open={openDrawer} onClose={handleCloseDrawer} PaperProps={{ style: { width: 500} }}>
      {image && <img src={image} alt="Selected Cover" style={{ height: '300px', width: '100%' }} />}
        
      <Box sx={{ padding: '20px' }}>
        <Typography variant="h1">{journal.title}</Typography>
        <Typography variant="h4">{formattedDate}</Typography>
        <Typography variant="h4"
         sx= {{marginTop: '10px'}}
        >{journal.caption}</Typography>
        {journal.category?.map((item, index) => (
            <Chip key={index} item={item}  />
            ))}
        <Typography
          sx={{ 
            marginTop:'20px',
            '& img': { maxWidth: '300px' } }} // Apply the style to img elements
          dangerouslySetInnerHTML={{ __html: journal.content }}
        />
      </Box>

        

        <Button onClick={handleCloseDrawer}>Close</Button>
    </Drawer>

    </>
  );
};

export default JournalInfo;
