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
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiZDExMTliNmQ5ODhiYWIxMzkzMDEyIn0sImlhdCI6MTY5MDI1NzAyOH0.8C2vx1EdL7NPvmpCUuX5QsW5Msd7hQQX9468UWaAlcw"
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
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiZDExMTliNmQ5ODhiYWIxMzkzMDEyIn0sImlhdCI6MTY5MDI1NzAyOH0.8C2vx1EdL7NPvmpCUuX5QsW5Msd7hQQX9468UWaAlcw"
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json()
    console.log(json)
    const note = {
      "_id": "112361322f19553781a8ca8d0e08",
      "user": "6131dc5e3e4037cd4734a066",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2021-09-03T14:20:09.668Z",
      "__v": 0
    }
    setNotes(notes.concat(note))
  }

  //  Deleting  a note 
  const deletenote = async (id) => {
    // APi call 
    const response = await fetch(`${host}/api/note/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiZDExMTliNmQ5ODhiYWIxMzkzMDEyIn0sImlhdCI6MTY5MDI1NzAyOH0.8C2vx1EdL7NPvmpCUuX5QsW5Msd7hQQX9468UWaAlcw"
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
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiZDExMTliNmQ5ODhiYWIxMzkzMDEyIn0sImlhdCI6MTY5MDI1NzAyOH0.8C2vx1EdL7NPvmpCUuX5QsW5Msd7hQQX9468UWaAlcw"
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