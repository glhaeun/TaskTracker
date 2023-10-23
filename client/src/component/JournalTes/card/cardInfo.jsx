import { Box, Button, Drawer, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Icon123, IconCircleMinus, IconEdit, IconQuotes, IconCalendar } from "@tabler/icons-react";
import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { removeJournal } from "../../../redux/featuresJournal/journal/tesSlice";
import Chip from "../../extended/Chips";
import "./styleCardInfo.css"

const JournalInfo = (props) => {
  const dispatch = useDispatch();
  const journal = props.journal;
  const content = journal.content
  const photo = journal.photo;

  console.log(photo)

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
  

      <CardContent className="flex flex-col p-4 group cursor-pointer hover:bg-opacity-100 hover:bg-gray-100">
      <Typography variant="h2">{journal.title}</Typography>
        <div className="flex items-center mb-3">
          <IconQuotes />
          <Typography variant="body2" className="ml-1">
            {journal.caption}
          </Typography>
        </div>
        <div className="flex items-center mb-3">
          <Typography variant="body2" className="ml-1">
          {content.toString().length > 50 ? content.slice(0, 10) + " ..." : content}
          </Typography>
        </div>
        <div className="flex items-center" >
          <div className="flex items-center mr-4">
            <IconCalendar />
            <Typography variant="body2" className="ml-1">
            {journal.date}
            </Typography>
          </div>
        </div>
        <div className="cardinfo-box-labels">
            {journal.categories?.map((item, index) => (
            <Chip key={index} item={item}  />
            ))}
        </div>

        <div className="flex items-center justify-between mb-3">
          <Button onClick={setUpdatePage}>
            <IconEdit />
          </Button>
          <Button onClick={() => dispatch(removeJournal(journal.id))}>
            <IconCircleMinus />
          </Button>
        </div>
      </CardContent>
    </Card>

    <Drawer anchor="right" open={openDrawer} onClose={handleCloseDrawer} PaperProps={{ style: { width: 500} }}>
      {image && <img src={image} alt="Selected Cover" style={{ height: '300px', width: '100%' }} />}
        
      <Box sx={{ padding: '20px' }}>
        <Typography variant="h2">{journal.title}</Typography>
        <Typography variant="h4">{journal.createdTime}</Typography>
        <Typography variant="h4">{journal.caption}</Typography>
        <Typography
          sx={{ '& img': { maxWidth: '300px' } }} // Apply the style to img elements
          dangerouslySetInnerHTML={{ __html: journal.content }}
        />
      </Box>

        

        <Button onClick={handleCloseDrawer}>Close</Button>
    </Drawer>

    </>
  );
};

export default JournalInfo;
