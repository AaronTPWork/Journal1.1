import React, { useState, useEffect } from "react";
import axios from "axios";

import { Folders } from "./sections/Folders";
import { SavedNotes } from "./sections/SavedNotes";
import NewNotes from "./sections/NewNotes";

import { baseUrl } from "../../Utils/config";

import styles from "./styles.module.css";

export const Home = () => {
  const [savedNotes, setSavedNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState([]);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await axios.get(`${baseUrl}/journal/daily_journal_date`);
        setSavedNotes(Object.values(response.data));
      } catch (error) {
        console.log(error);
      }
    }

    getNotes();
  }, []);

  const handleSelectNote = async (date) => {
    console.log(date);
    const response = await axios.get(`${baseUrl}/journal/daily_journal_date?date_created=${date}`);
    setSelectedNote(Object.values(response.data));
  }

  return (
    <>
      <div className={styles.home}>
        <div className={styles.home_header}></div>
        <div className={styles.home_app}>
          {/* Folders Section */}
          <Folders />
          {/* Saved Notes Section */}
          <SavedNotes notes={savedNotes} handleSelectNote={handleSelectNote} />
          {/* New Notes Section */}
          <NewNotes journals={selectedNote} handleSelectNote={handleSelectNote}/>
          <div className={styles.newNotes}></div>
        </div>
      </div>
    </>
  );
};
