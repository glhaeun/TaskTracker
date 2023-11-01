const Journal = require('../models/journal')
const User = require('../models/user')

exports.create = async (req,res) => {
    console.log("here0")

    try {
        const getUser = await User.findOne({_id: req.user._id})
        const title = req.body.journalData.title;

        const journal = await Journal.create({
            user: getUser._id,
            title: req.body.journalData.title, 
            caption: req.body.journalData.caption, 
            date: new Date(), 
            createdTime: new Date(), 
            editedTime: new Date(), 
            content: req.body.journalData.content, 
            category: req.body.journalData.category, 
            photo: req.body.journalData.photo
        })
       console.log(journal)

        res.status(201).json(journal)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getAll = async (req, res) =>{  
    console.log("hi")
    try{
        const journal = await Journal.find({user: req.user._id})
        res.status(201).json(journal)
    } catch(err) {
        res.status(500).json(err)
    }
  }

  exports.delete = async (req, res) => {
    const {journalId} = req.params
        try {
            await Journal.deleteOne({ _id: journalId})
            res.status(200).json('deleted')
        } catch (error) {
            res.status(500).json(error)
        }
    }

    exports.update = async (req, res) => {
        const {journalId} = req.params
        console.log(req.body)
        try {
            const journal = await Journal.findByIdAndUpdate(
                journalId,
                { $set: req.body.journal}
            )
            console.log(journal)
            res.status(200).json(journal)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    exports.getOne = async (req, res) =>{  
        const {journalId} = req.params
        console.log(journalId)
        try{
            const journal = await Journal.findOne({_id: journalId})
            res.status(201).json(journal)
        } catch(err) {
            res.status(500).json(err)
        }
      }