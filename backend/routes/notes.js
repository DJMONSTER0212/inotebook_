const express = require("express")
const router = express.Router();
const fetchUser = require('../middleware/fetchUser')
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// route 1 : Get all the notes of a user using GET 
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server error occured")
    }

})

// route 2 : to add new notes using post "/api/auth/addnote" . login required 
router.post('/addnote', fetchUser, [
    body('title', 'Enter a valid Name').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server error occured")
    }

})

module.exports = router 