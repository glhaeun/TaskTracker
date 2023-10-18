import React from "react";
import { Button, Card, CardContent, Typography, Avatar, CardMedia } from "@mui/material";
import { Icon123, Icon12Hours } from "@tabler/icons-react";
import { useDispatch } from 'react-redux';
import { removeJournal } from "../../../redux/featuresJournal/tesSlice";

const JournalInfo = (props) => {
  const dispatch = useDispatch();
  const journal = props.journal;
  const content = journal.content

  const setUpdatePage = () => {
    props.onJournalUpdate(journal.id);
  };

  return (
    <>
    <Card className="mb-3">
    <CardMedia
        sx={{ height: 140 }}
        image="https://i.pinimg.com/280x280_RS/ab/a2/8e/aba28eb29f66aab5f24db128a0232f3f.jpg"
        title="green iguana"
      />
      <CardContent className="flex flex-col p-4 group cursor-pointer hover:bg-opacity-100 hover:bg-gray-100">
        <div className="flex items-center justify-between mb-3">
          <Typography variant="h6">{journal.title}</Typography>
          <Button onClick={setUpdatePage}>
            <Icon12Hours />
          </Button>
          <Button onClick={() => dispatch(removeJournal(journal.id))}>
            <Icon123 />
          </Button>
        </div>
        <div className="flex items-center mb-3">
          <Icon123 />
          <Typography variant="body2" className="ml-1">
            {journal.caption}
          </Typography>
        </div>
        <div className="flex items-center mb-3">
          <Icon123 />
          <Typography variant="body2" className="ml-1">
          {content.toString().length > 50 ? content.slice(0, 10) + " ..." : content}
          </Typography>
        </div>
        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <Icon123 />
            <Typography variant="body2" className="ml-1">
            {journal.date}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
    </>
  );
};

export default JournalInfo;
