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

const TagsModal = ({ type, addedTags, handleTags }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { tagsList } = useSelector((state) => state.tags);
  const [inputText, setInputText] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (!inputText) {
      return;
    }

    dispatch(addTags({ tag: inputText.toLowerCase(), id: v4() }));
    setInputText("");
  };

  const deleteTagsHandler = (tag, id) => {
    dispatch(deleteTags(id));
    dispatch(removeTags({ tag }));
  };

  return (
    <Dialog open={true} onClose={() => dispatch(toggleTagsModal({ type, view: false }))}   style={{ zIndex: 3000 }} // Add this style
    >
      <DialogTitle className={classes.dialogTitle}>
        <div className="editTags__title">{type === "add" ? "Add" : "Edit"} Tags</div>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={submitHandler} style={{
      display: "flex"}}>
          <TextField
            fullWidth
            type="text"
            value={inputText}
            placeholder="New Tag .."
            onChange={(e) => setInputText(e.target.value)}
          />
          <IconButton onClick={submitHandler} disabled={!inputText}>
            <IconCheck />
          </IconButton>
        </form>
        <List>
          {tagsList.map(({ tag, id }) => (
            <ListItem key={id}>
              <ListItemText primary={getStandardName(tag)} />
              {type === "edit" ? (
                <ListItemSecondaryAction>
                  <IconButton onClick={() => deleteTagsHandler(tag, id)}>
                    <IconX />
                  </IconButton>
                </ListItemSecondaryAction>
              ) : (
                <ListItemSecondaryAction>
                  {addedTags?.find((addedTag) => addedTag.tag === tag.toLowerCase()) ? (
                    <IconButton onClick={() => handleTags(tag, "remove")}>
                      <IconMinus />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => handleTags(tag, "add")}>
                      <IconPlus />
                    </IconButton>
                  )
                  }
                </ListItemSecondaryAction>
              )}
            </ListItem>
          ))}
        </List>
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
