import React, { useState } from "react";
import dataContext from "./DataContext";


const DataState = (props) => {




  //To get all notes
  const getAllNotes = async () => {
    const response = await fetch('https://data-notify.azurewebsites.net/notes/fetch_all_notes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
        'Access-Control-Allow-Origin': '*'
      },
    });
    const json = await response.json();
    const set = json.reverse()
    await setNotes(set);
    // console.log(notes);
  }




  return (
    <>
      <dataContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getAllNotes, noteReminder }}>
        {props.children}
      </dataContext.Provider>
    </>
  )

}
export default DataState 
