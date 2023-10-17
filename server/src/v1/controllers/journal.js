import {v4 as uuidv4} from "uuid"
const Journal = require('../models/journal')
const User = require('../models/user')

exports.create = async (req,res) => {

    try {
        const getUser = await User.findOne({username: req.body.username})
        const journal = await Journal.create({
            user: getUser._id,
            title: "Hello This is your Journal Title",
            caption: "Type your caption here",
            slug: uuidv4(),
            body:{
                type:"doc",
                content:[],
            },
            photo:"",
        })
        res.status(201).json(journal)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getAll = async (req, res) =>{
    const sectionId = req.query.sectionId;
  
    try{
        const task = await Task.find({section: sectionId}).sort('-position')
        res.status(201).json(task)
    } catch(err) {
        res.status(500).json(err)
    }
  }