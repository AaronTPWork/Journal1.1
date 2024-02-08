import React, { useState } from "react";
import { MenuIcon, TileIcon, ThreeDots } from "../../../Components/icons";
import styles from "../styles/savedNotes.module.css";

export const SavedNotes = ({ randomData }) => {
  const [savedNotes, setSavedNotes] = useState();

  useState(() => {
    setSavedNotes([
      {
        id: "9affce97abded4e8d935e3166b6e9361",
        text: "The Human eyes never grow, but nose and ears never stop growing.",
        source: "djtech.net",
        source_url: "http://www.djtech.net/humor/useless_facts.htm",
        language: "en",
        permalink:
          "https://uselessfacts.jsph.pl/api/v2/facts/9affce97abded4e8d935e3166b6e9361",
      },
      {
        id: "e65248c22e937758a61efd189a05f60d",
        text: "Studies show that if a cat falls off the seventh floor of a building it has about thirty percent less chance of surviving than a cat that falls off the twentieth floor. It supposedly takes about eight floors for the cat to realize what is occurring, relax and correct itself.",
        source: "djtech.net",
        source_url: "http://www.djtech.net/humor/useless_facts.htm",
        language: "en",
        permalink:
          "https://uselessfacts.jsph.pl/api/v2/facts/e65248c22e937758a61efd189a05f60d",
      },
      {
        id: "422195f917c2d180bd9398545215c236",
        text: "It was discovered on a space mission that a frog can throw up. The frog throws up its stomach first, so the stomach is dangling out of its mouth. Then the frog uses its forearms to dig out all of the stomach`s contents and then swallows the stomach back down.",
        source: "djtech.net",
        source_url: "http://www.djtech.net/humor/useless_facts.htm",
        language: "en",
        permalink:
          "https://uselessfacts.jsph.pl/api/v2/facts/422195f917c2d180bd9398545215c236",
      },
      {
        id: "2781366ffa6279ac04831226ad536abf",
        text: "Donald Duck`s middle name is Fauntleroy.  ",
        source: "djtech.net",
        source_url: "http://www.djtech.net/humor/useless_facts.htm",
        language: "en",
        permalink:
          "https://uselessfacts.jsph.pl/api/v2/facts/2781366ffa6279ac04831226ad536abf",
      },
      {
        id: "6efa598440e7dd50ed626237abb100c2",
        text: "A signature is called a John Hancock because he signed the Declaration of Independence. Only 2 people signed the declaration of independence on July 4. The Last person signed 2 years later.",
        source: "djtech.net",
        source_url: "http://www.djtech.net/humor/useless_facts.htm",
        language: "en",
        permalink:
          "https://uselessfacts.jsph.pl/api/v2/facts/6efa598440e7dd50ed626237abb100c2",
      },
      {
        id: "4fcc23a13d73613ce81926845a62283f",
        text: "Tom Sawyer was the first novel written on a typewriter.",
        source: "djtech.net",
        source_url: "http://www.djtech.net/humor/useless_facts.htm",
        language: "en",
        permalink:
          "https://uselessfacts.jsph.pl/api/v2/facts/4fcc23a13d73613ce81926845a62283f",
      },
      {
        id: "bf048bb49154273800d7600c1ea75b19",
        text: "Seattle’s Fremont Bridge rises up and down more than any drawbridge in the world.",
        source: "djtech.net",
        source_url: "http://www.djtech.net/humor/useless_facts.htm",
        language: "en",
        permalink:
          "https://uselessfacts.jsph.pl/api/v2/facts/bf048bb49154273800d7600c1ea75b19",
      },
      {
        id: "1fe0dd05895bdc5a5cf1519da948730d",
        text: "The national anthem of Greece has 158 verses. No one in Greece has memorized all 158 verses.  ",
        source: "djtech.net",
        source_url: "http://www.djtech.net/humor/useless_facts.htm",
        language: "en",
        permalink:
          "https://uselessfacts.jsph.pl/api/v2/facts/1fe0dd05895bdc5a5cf1519da948730d",
      },
      {
        id: "66c9546d229838f57824ad4b3c534220",
        text: "Simplistic passwords contribute to over 80% of all computer password break-ins.",
        source: "djtech.net",
        source_url: "http://www.djtech.net/humor/useless_facts.htm",
        language: "en",
        permalink:
          "https://uselessfacts.jsph.pl/api/v2/facts/66c9546d229838f57824ad4b3c534220",
      },
      {
        id: "58ce5dab7f78d74d7caecc21e4cdcbf6",
        text: "It is illegal to hunt camels in the state of Arizona.",
        source: "djtech.net",
        source_url: "http://www.djtech.net/humor/useless_facts.htm",
        language: "en",
        permalink:
          "https://uselessfacts.jsph.pl/api/v2/facts/58ce5dab7f78d74d7caecc21e4cdcbf6",
      },
      {
        id: "643500f128749ac605c663e113b55886",
        text: "A person cannot taste food unless it is mixed with saliva. For example, if a strong-tasting substance like salt is placed on a dry tongue, the taste buds will not be able to taste it. As soon as a drop of saliva is added and the salt is dissolved, however, a definite taste sensation results. This is true for all foods.",
        source: "djtech.net",
        source_url: "http://www.djtech.net/humor/useless_facts.htm",
        language: "en",
        permalink:
          "https://uselessfacts.jsph.pl/api/v2/facts/643500f128749ac605c663e113b55886",
      },
    ]);
  }, []);

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
        {/* Indiviual Saved Notes */}
        {savedNotes
          ? savedNotes.map((note) => {
              return (
                <div className={styles.home_savedNotesNote}>
                  <div className="flex">
                    <ThreeDots styles={"h-10 my-auto text-gray-300"} />
                    <div className={styles.home_savedNoteDetails}>
                      <h3>{note.text.substr(0, 10)}</h3>
                      <p>{note.text.substr(11, 30)}</p>
                    </div>
                  </div>

                  <div className={styles.home_savedNoteDate}>
                    <p>Yesterday</p>
                  </div>
                </div>
              );
            })
          : ""}
      </div>
    </>
  );
};
