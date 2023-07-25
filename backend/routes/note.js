const express = require('express');
const fetchuser = require('../middleware.js/fetchuser');
const router = express.Router();
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// Route-1 : fetching all notes of loggined user  "/api/note/fetchallnotes",  login required 
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        // finding the notes of user using auth-token
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }

});

// Route-2 :  adding  notes of loggined user  "/api/note/addnotes",  login required
router.post('/addnotes', fetchuser, [
    body('title', 'Title must exists').exists(),
    body('description', 'description must exists').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, tag } = req.body;
    try {
        // creating a newnote object by user id 
        const notes = new Notes({
            title, description, tag, user: req.user.id
        })
        const savednotes = await notes.save();
        res.json(savednotes)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }

});

// Route-3 :  update an existing note  "/api/note/updatenote",  login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

    // create a newNote object 
    const newNote = {}
    if (title) { newNote.tile = title };
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }

    // find the note to be updated and update it 
    let note = await Notes.findById(req.params.id)
    if (!note) { return res.status(400).send("Not found") }

    // find a user note to update if user owns it 
    if (note.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed") }

    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json(note)

});

// Route-4 :  delete an exisisting note  "/api/note/deletenote",  login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    // find the note to be deleted and delete it 
    let note = await Notes.findById(req.params.id)
    if (!note) { return res.status(400).send("Not found") }


    // find a user note to delete if user owns it 
    if (note.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed") }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({ "Sucess": "Note deleted", note: note })

});

module.exports = router;