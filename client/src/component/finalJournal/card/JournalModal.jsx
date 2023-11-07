import { Button, Dialog, DialogContent, DialogTitle, Grid, TextField, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addJournal, updateJournal } from '../../../redux/featuresJournal/journal/tesSlice';
import TextEditor from '../../TextEditor/TextEditor';
import { Tag } from 'react-feather';
import Chip from '../../extended/Chips';
import CustomInput from '../../../ApiMockData/CustomInput';
import { colorsList } from "../../../utils/Util";
import "./style.css";
import { v4 as uuidv4 } from "uuid";
import journalApi from '../../../api/journalApi';



const JournalModal = ({id, addJournal, journalUpdate}) => {
    const [open, setOpen] = useState(true);
    const [title, setTitle] = useState('Untitled')
    const [caption, setCaption] = useState('Set your caption here')
    const [content, setContent] = useState('');
    const [selectedColor, setSelectedColor] = useState("");
    const [cardValues, setCardValues] = useState([]); 
    const [journalData, setJournalData] = useState([])

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect( () => {
      if(id) {
        const fetchJournalData = async () => {
          try {
            const journalData2 = await journalApi.getOne(id); 
            setJournalData(journalData2)
            setTitle(journalData2.title)
            setCaption(journalData2.caption)
            setSelectedImage(journalData.photo)
            setContent(journalData2.content)
            setCardValues(journalData2.category || []); // Initialize with categories from journalData2
          } catch (error) {
            console.error("Error fetching board data: ", error);
          }
        };
        fetchJournalData();
      }
  }, [id, journalUpdate])


    const editTitle = (e) => {
        const newTitle = e.target.value;
        if(id) {
          journalUpdate(id, { ...journalData, title: newTitle })
        }
        setTitle(newTitle);
    };
      

    const editCaption = (event) => {
        const newCaption= event.target.value;
        if(id) {
          journalUpdate(id, { ...journalData, caption: newCaption })
        }
        setCaption(newCaption)
    }

    const editContent = (newValue) => {
        setContent(newValue); // Update the state with the new content
        if(id) {
          journalUpdate(id, { ...journalData, content: newValue })
        }
    }



    const handleClose = async () => {
      if(!id) {
        let photoUrl = "https://i.pinimg.com/280x280_RS/ab/a2/8e/aba28eb29f66aab5f24db128a0232f3f.jpg"; // Default URL

        if (selectedImage) {
          photoUrl = selectedImage; 
        }
        console.log(cardValues.category)

          const journalData = {
            title: title,
            caption: caption,
            content: content,
            category: cardValues,
            photo: photoUrl
          }

          try {
            const response = await journalApi.create({journalData});
            console.log('Journal created:', response);
            const newJournal = response.data;
            addJournal(response);
          } catch (error) {
            console.error('Error creating journal:', error);
          }

      }
      setOpen(false);
      navigate("/journal");
  }

      const [checking, setChecking] = useState(0);
      const addCategory = (category) => {
        if (!id) {
          if (checking === 0) {
            setCardValues([category]);
          } else {
            setCardValues((prevCategories) => [...prevCategories, category]);
          }
          setChecking(checking + 1);
        } else {
          const index = journalData.category.findIndex((item) => item.text === category.text);
          if (index === -1) {
            const updatedCategories = [...journalData.category, category];
            console.log(updatedCategories)
            const updatedJournalData = {
              ...journalData,
              category: updatedCategories,
            };

            console.log(updatedJournalData)
      
            setCardValues(updatedCategories);
            journalUpdate(id, updatedJournalData);
          }
        }
      };
      
      
    
    
      

    
    const removeLabel = (label) => {
      if (id) {
        const tempCategories = cardValues.filter((item) => item.text !== label.text);
    
        const updatedJournalData = {
          ...journalData,
          category: tempCategories,
        };
    
        setCardValues(updatedJournalData.category); // Update the category part of cardValues
        journalUpdate(id, updatedJournalData);
      } else {
        const tempCategories = cardValues.filter((item) => item.text !== label.text);
    
        setCardValues(tempCategories);
      }
    };
    


      const [selectedImage, setSelectedImage] = useState(null);

      function convertToBase64(e) {
        console.log(e)
        var reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
          console.log(reader.result)
          setSelectedImage(reader.result)
          dispatch(updateJournal({ ...journalData, photo: reader.result }));
      }        

        reader.onerror = error => {
          console.log('Error: ', error)
        }
      }

  return (
    <>
        <Dialog open={open} onClose={handleClose} max-width="xs" fullWidth>
            <DialogTitle style={{display:'flex', justifyContent: 'space-between', alignContent: 'center'}}>{id? "Edit Journal" : "Add Journal" }
            <input type="file" accept="image/*" onChange={convertToBase64} style={{ display: 'none' }} />
            <Button onClick={() => document.querySelector('input[type="file"]').click()}>{id? "Edit Cover" : "Add Cover" }</Button>
            </DialogTitle>
            <DialogContent>
            {selectedImage && <img src={selectedImage} alt="Selected Cover" style={{ height: '300px', width: '100%' }} />}
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField 
                        value={title}
                        variant='standard'
                        InputProps={{
                            style: {
                                border: "none",
                                fontSize: '2rem',
                                fontWeight: '700',
                                disableUnderline: true
                            }
                        }}
                        fullWidth
                        onChange={editTitle}
                        sx={{
                            '& .MuiOutlinedInput-input': {padding: '10px'},
                            '& .MuiOutlinedInput-notchedOutlined': {border: 'unset'},
                            '& .MuiOutlinedInput-root': { fontSize: '2rem', fontWeight: '700'},
                        }}/>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField 
                        value={caption}
                        variant='standard'
                        InputProps={{
                            style: {
                                border: "none",
                                fontSize: '1rem',
                                fontWeight: '700',
                                disableUnderline: true
                            }
                        }}
                        fullWidth
                        onChange={editCaption}
                        sx={{
                            '& .MuiOutlinedInput-input': {padding: '10px'},
                            '& .MuiOutlinedInput-notchedOutlined': {border: 'unset'},
                            '& .MuiOutlinedInput-root': { fontSize: '2rem', fontWeight: '700'},
                        }}/>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <TextEditor value={content} setValue={editContent} />
                    </Grid>
                </Grid> 

                <div className="cardinfo-box">

                <div className="cardinfo-box-title">
                    <Tag />
                    <p>Keywords</p>
                </div>
                <div className="cardinfo-box-labels">
                    {cardValues?.map((item, index) => (
                    <Chip key={index} item={item} removeLabel={removeLabel} />
                    ))}
                </div>
                <ul>
                    {colorsList.map((item, index) => (
                    <li
                        key={index}
                        style={{ backgroundColor: item }}
                        className={selectedColor === item ? "li-active" : ""}
                        onClick={() => setSelectedColor(item)}
                    />
                    ))}
                </ul>
                <CustomInput
                    text="Add Keyword"
                    placeholder="Enter Keyword text"
                    onSubmit={(value) =>
                    addCategory({ color: selectedColor, text: value })
                    }
                />
                </div>

              
        </DialogContent>
      </Dialog>

    </>
  )
}

export default JournalModal