import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  addTags,
  deleteTags,
  removeTags,
  toggleTagsModal,
} from "../../../../redux/featuresNotes";
import { v4 } from "uuid";
import {
  IconCheck,
  IconX,
  IconMinus,
  IconPlus,
} from "@tabler/icons-react";
import { getStandardName } from "../../../../utils";

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const TagsModal = ({}) => {
  const classes = useStyles();
  const dispatch = useDispatch();


  return (
    <Dialog open={true} onClose={() => dispatch(({ type, view: false }))}   style={{ zIndex: 3000 }} // Add this style
    >
      <DialogTitle className={classes.dialogTitle}>
        
      </DialogTitle>
      <DialogContent>
        
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(toggleTagsModal({ type, view: false }))} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TagsModal;
