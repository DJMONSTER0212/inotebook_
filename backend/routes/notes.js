const express = require("express")
const router = express.Router();
const fetchUser = require('../middleware/fetchUser')
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// route 1 : Get all the notes of a user using GET 
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
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

// route 3 : update an existing node using PUT: "/api/notes/updatenode". Login required

router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // create a newNote Object
        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }

        // find  the node to be updated and Update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found") };
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })  // new true ka matlab yeah hai ki agar koi naya contact aata hai toh woh create ho jaayega basically.
        res.json({ note });


    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server error occured")
    }
    // create a newNote Object
    const newNote = {};
    if (title) {
        newNote.title = title;
    }
    if (description) {
        newNote.description = description;
    }
    if (tag) {
        newNote.tag = tag;
    }

    // find  the node to be updated and Update it
    let note = await Note.findById(req.params.id);
    if (!note) { return res.status(404).send("Not found") };
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not allowed")
    }

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })  // new true ka matlab yeah hai ki agar koi naya contact aata hai toh woh create ho jaayega basically.
    res.json({ note });


})


// route 4 : delete an existing node using DELETE : "/api/notes/deletenote". Login required

router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    // verify karna hai ki joh note yeah insaan delete kar raha hai kya woh ushi kya hai
    try {
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found") };

        // Allow Deletion only if user own this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted ", note: note });

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server error occured")
    }

    // find  the node to be updated and deleted it


})

module.exports = router 