import { Select, Button, Dialog, DialogContent, DialogTitle, Grid, TextField, MenuItem } from '@mui/material';
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
import categoryModal from './categoryModal';
import CategoryModal from './categoryModal';


const JournalModal = ({id}) => {
    const [open, setOpen] = useState(true);
    const [title, setTitle] = useState('Untitled')
    const [caption, setCaption] = useState('Set your caption here')
    const [value, setValue] = useState('');
    const [selectedColor, setSelectedColor] = useState("");
    const [cardValues, setCardValues] = useState({ categories: [] }); // Initialize categories as an empty array
    const [openCategoryModal, setOpenCategoryModal] = useState(false); // State for the category modal


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const journalData = useSelector((state)=>
    state.journal.journalList.find((journal)=> journal.id === id));
    const journalList = useSelector((state) => state.journal.journalList);

    useEffect(() => {
        if (journalData) {
            setTitle(journalData.title)
            setCaption(journalData.caption)
            setValue(journalData.content)
            setSelectedImage(journalData.photo)
            setCardValues([journalData])
            setCardValues({ categories: journalData.categories || [] }); 
        }

        console.log(cardValues)
    }, [journalData])

    const editTitle = (e) => {
        const newTitle = e.target.value;
      
        if (journalData) {
            const updatedJournalList = journalList.map((journal) =>
              journal.id === journalData.id ? { ...journal, title: newTitle } : journal
            );
            dispatch(updateJournal({ ...journalData, title: newTitle }));
          } 
        setTitle(newTitle);
      };
      

    const editCaption = (event) => {
        const newCaption= event.target.value;
        if (journalData) {
            const updatedJournalList = journalList.map((journal) =>
              journal.id === journalData.id ? { ...journal, caption: newCaption } : journal
            );
            dispatch(updateJournal({ ...journalData, caption: newCaption }));
          }
        setCaption(newCaption)
    }

    const editContent = (newValue) => {
        setValue(newValue); // Update the state with the new content
        if (journalData) {
            dispatch(updateJournal({ ...journalData, content: newValue }));
          }
    }



    const handleClose = () => {
        if(!id) {
            dispatch(addJournal({title: title, caption: caption, categories:[...cardValues.categories] ,content: value, id: uuidv4(), picture: "https://i.pinimg.com/280x280_RS/ab/a2/8e/aba28eb29f66aab5f24db128a0232f3f.jpg"  }))
        }
        setOpen(false);
        navigate("/journal/all");
      };

      const [checking, setChecking] = useState(0);
      const addCategory = (category) => {
        if(!id ) {
          const updatedCategories = [category];
          if(checking == 0){
            setCardValues({categories: updatedCategories})
          }  else {
            setCardValues({categories:[...cardValues.categories, ...updatedCategories]})
          }
          setChecking(checking + 1); 
          console.log(cardValues)// Update the checking value
        } else {
        const index = journalData.categories.findIndex(
          (item) => item.text === category.text
        );

        if (index === -1) {
          const updatedCategories = [...journalData.categories, category];

          const updatedJournalData = {
            ...journalData,
            categories: updatedCategories,
          };

          setCardValues((prevValues) => ({
            ...prevValues,
            categories: [...prevValues.categories, category],
          }));
            dispatch(updateJournal(updatedJournalData));

        }
        }
      };      

    
      const removeLabel = (label) => {
        const tempLabels = cardValues.labels.filter(
          (item) => item.text !== label.text
        );
    
        setCardValues({
          ...cardValues,
          labels: tempLabels,
        });
      };


      const [selectedImage, setSelectedImage] = useState(null);
      const [selectedCategory, setSelectedCategory] = useState('personal'); // Initialize selected category

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
                    <TextEditor value={value} setValue={editContent} />
                    </Grid>
                </Grid> 

                <div className="cardinfo-box">

                <div className="cardinfo-box-title">
                    <Tag />
                    <p>Keywords</p>
                </div>
                <div className="cardinfo-box-labels">
                    {cardValues.categories?.map((item, index) => (
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

                
          <div className="category-dropdown">
            <label>Category:</label>
            <Select
              value={selectedCategory}
              onChange={(e) => {
                if (e.target.value === 'add') {
                  setOpenCategoryModal(true);
                } else {
                  setSelectedCategory(e.target.value);
                }
              }}
            >
              <MenuItem value="personal">Personal</MenuItem>
              <MenuItem value="work">Work</MenuItem>
              <MenuItem value="school">School</MenuItem>
              <MenuItem value="add">Add Category</MenuItem>
            </Select>
          </div>
        </DialogContent>
      </Dialog>

      {openCategoryModal && (
      <CategoryModal open={openCategoryModal} onClose={() => setOpenCategoryModal(false)} />
      )}

    </>
  )
}

export default JournalModal