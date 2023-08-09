import { useContext } from "react";
import React  from "react";
import noteContext from "../context/notes/noteContext"

const Userdetails = () => {
  const context = useContext(noteContext);
  const {userdeatils} = context;
  return (
    <>
       
    </>
  )
}

export default Userdetails
