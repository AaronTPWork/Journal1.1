import React from "react";

import { MenuIcon, TileIcon, ThreeDots } from "../../../Components/icons";

import styles from "../styles/savedNotes.module.css";

export const SavedNotes = ({ notes, handleSelectNote }) => {
  return (
    <>
      <div className={styles.home_savedNotes}>
        <div className={styles.home_savedNotesHeader}>
          <div className={styles.home_savedNotesListIcon}>
            <MenuIcon styles={"h-10 my-auto mx-auto"} />
          </div>
          <div className={styles.home_savedNotesTileIcon}>
            <TileIcon styles={"h-10 my-auto"} />
          </div>
        </div>
        {notes?.reverse().map((note) => (
          <div key={note.date_created} className={styles.home_savedNotesNote}>
            <div className="flex">
              <ThreeDots styles={"h-10 my-auto text-gray-300"} />
              <div className={styles.home_savedNoteDetails}>
                <h3 onClick={() => handleSelectNote(note.date_created)}>{note.date_created}</h3>
              </div>
            </div>
            <div className={styles.home_savedNoteDate}>
              <p>{note.record_count}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
