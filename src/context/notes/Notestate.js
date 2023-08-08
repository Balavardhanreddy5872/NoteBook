import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  // Get all Notes 
  const getNotes = async () => {
    // Api call 
    const response = await fetch(`${host}/api/note/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    // client side functaility
    const json = await response.json()
    setNotes(json)
  }

  // ADD a note 
  const addnote = async (title, description, tag) => {
    // Apicall 
    const response = await fetch(`${host}/api/note/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json()
    setNotes(notes.concat(note))
  }

  //  Deleting  a note 
  const deletenote = async (id) => {
    // APi call 
    const response = await fetch(`${host}/api/note/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json()
    console.log(json)
    console.log('Deleting note with id' + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

//  editing a note
  const editnote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/note/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag })
    });
       
    const json = await response.json()
    console.log(json)
    // 
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        notes[index] = title;
        notes[index] = description;
        notes[index] = tag;
        break;
      }
       
    }
    
  }



  return (
    <NoteContext.Provider value={{ notes, addnote, deletenote, editnote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;