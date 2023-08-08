import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext"

const Noteitem = (props) => {
    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const { deletenote } = context;
    
    return (
        <div className="col-md-3"> 
            <div className ="card my-3"> 
                <div className ="card-body" key={note._id}>
                <h5 className ="card-title">{note.title}</h5>
                <p className ="card-text">{note.description}</p> 
                {/* Delete  note */}
                <i className ="fa-solid fa-trash mx-2" onClick={()=>{deletenote(note._id)}}></i> 
                <i className ="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem