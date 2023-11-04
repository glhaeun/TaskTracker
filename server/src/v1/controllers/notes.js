const Notes = require('../models/notes')
const User = require('../models/user')

exports.create = async (req,res) => {
    console.log("here0")
    console.log(req.body);

    try {
        const getUser = await User.findOne({_id: req.user._id})
        console.log(getUser);
        const notes = await Notes.create({
            user: getUser._id,
            title: req.body.note.title, 
            date: new Date(), 
            createdTime: new Date(), 
            editedTime: new Date(), 
            content: req.body.note.content, 
            tags: req.body.note.tags, 
            color: req.body.note.color, 
            priority: req.body.note.priority,
        })
       console.log(notes)

        res.status(201).json(notes)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getAll = async (req, res) =>{  
    try{
        const notes = await Notes.find({user: req.user._id,  isArchive: false, isDeleted: false });
        res.status(201).json(notes)
    } catch(err) {
        res.status(500).json(err)
    }
}

exports.getArchive = async (req, res) => {
  console.log("hilo")
  try {
    console.log("what")
      const archivedNotes = await Notes.find({ user: req.user._id, isArchive: true });
      console.log(archivedNotes)
      res.status(200).json(archivedNotes);
  } catch (error) {
      res.status(500).json(error);
  }
};

exports.getDeleted = async (req, res) => {
  console.log("hihihi")
  try {
      const deletedNotes = await Notes.find({ user: req.user._id, isDeleted: true });
      res.status(200).json(deletedNotes);
  } catch (error) {
      res.status(500).json(error);
  }
};

exports.updateStatus = async (req, res) => {
  const { noteId } = req.params;
  const action = req.query.action;

  console.log(noteId);

  if (action === 'setPinned') {
      const { isPinned } = req.body;
      try {
          const updatedNote = await Notes.findOneAndUpdate(
              { _id: noteId, user: req.user._id },
              { $set: { isPinned: isPinned } },
              { new: true }
          );

          if (!updatedNote) {
              return res.status(404).json({ error: 'Note not found' });
          }

          res.status(200).json(updatedNote); // Respond with a valid JSON object
      } catch (error) {
          res.status(500).json({ error: 'Internal server error' }); // Handle the error with a JSON response
      }
  } else if (action === 'setArchive') {
    console.log("hohoho")
      const { isArchive } = req.body;
      console.log(isArchive)
      console.log(req.body)
      try {
          const updatedNote = await Notes.findOneAndUpdate(
              { _id: noteId, user: req.user._id },
              { $set: { isArchive: isArchive } },
              { new: true }
          );

          if (!updatedNote) {
              return res.status(404).json({ error: 'Note not found' });
          }
          console.log(updatedNote)

          res.status(200).json(updatedNote); // Respond with a valid JSON object
      } catch (error) {
          res.status(500).json({ error: 'Internal server error' }); // Handle the error with a JSON response
      }
 
  } else if (action === 'setDelete') {
    const { isDeleted } = req.body;
    console.log("first")
    console.log(isDeleted)

    try {
        const updatedNote = await Notes.findOneAndUpdate(
            { _id: noteId, user: req.user._id },
            { $set: { isDeleted: isDeleted } },
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ error: 'Note not found' });
        }
        console.log(updatedNote)

        res.status(200).json(updatedNote); // Respond with a valid JSON object
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' }); // Handle the error with a JSON response
    }

}
};


  

  exports.delete = async (req, res) => {
    const {noteId} = req.params
        try {
            await Notes.deleteOne({ _id: noteId})
            res.status(200).json('deleted')
        } catch (error) {
            res.status(500).json(error)
        }
    }

    exports.update = async (req, res) => {
        const {noteId} = req.params
        console.log(req.body)
        try {
            const note = await Notes.findByIdAndUpdate(
                noteId,
                { $set: req.body.note}
            )
            console.log(note)
            res.status(200).json(note)
        } catch (error) {
            res.status(500).json(error)
        }
    }

//     exports.getOne = async (req, res) =>{  
//         const {journalId} = req.params
//         console.log(journalId)
//         try{
//             const journal = await Journal.findOne({_id: journalId})
//             res.status(201).json(journal)
//         } catch(err) {
//             res.status(500).json(err)
//         }
//       }