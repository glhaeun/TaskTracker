const Board = require('../models/board')
const Task = require('../models/task')

exports.create = async (req,res) => {
    const {boardName, color} = req.body
    try {
        const board = await Board.create({user: req.user._id, title: boardName, color: color})
        board._doc.tasks = []
        await board.save(); 
        res.status(201).json(board)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.update = async (req, res) => {
    const {boardId} = req.params
    try {
        const board = await Board.findByIdAndUpdate(
            boardId,
            { $set: req.body}
        )
        board._doc.tasks = []
        res.status(200).json(board)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.delete = async (req, res) => {
const {boardId} = req.params
    try {
        await Task.deleteMany({board: boardId})

        await Board.deleteOne({ _id: boardId})
        res.status(200).json('deleted')
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getAll = async (req, res) =>{
    try{
        const boards = await Board.find({ user: req.user._id }).populate('tasks');
        res.status(200).json(boards)
    } catch(err) {
        console.error(err); // Log the error for debugging
        res.status(500).json(err)
    }
}

