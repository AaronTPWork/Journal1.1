import React from "react";
import { Folders } from "./sections/Folders";
import { SavedNotes } from "./sections/SavedNotes";

import styles from "./styles.module.css";
// import { NewNotes } from "./sections/NewNotes";
import NoteWithAnnotations from "./sections/NewNotes";

export const Home = () => {
  const notes = [];
  // Calls random fact api to get a random fact and pushes to list
  const callAPI = async () => {
    for (let i = 0; i <= 10; i++) {
      await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random")
        .then((res) => res.json())
        .then((data) => {
          notes.push(data);
        });
    }
  };
  callAPI();

  return (
    <>
      <div className={styles.home}>
        <div className={styles.home_header}></div>
        <div className={styles.home_app}>
          {/* Folders Section */}
          <Folders />
          {/* Saved Notes Section */}
          <SavedNotes randomData={notes} />
          {/* New Notes Section */}
          <NoteWithAnnotations />
          <div className={styles.newNotes}></div>
        </div>
      </div>
    </>
  );
};
