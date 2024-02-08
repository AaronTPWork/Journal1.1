import React, { useState } from "react";
import {
  CirclePlus,
  Circle,
  CircleHalf,
  CircleFull,
  CircleArrowLeft,
  CircleArrowRight,
  CircleX,
  Square,
  PencilPage,
  DownloadIcon,
  LockIcon,
  SearchIcon,
  SquareHalf,
  SquareFull,
  SquareLeftArrow,
  SquareRightArrow,
  SquareX,
  Diamond,
  DiamondHalf,
  DiamondFull,
  DiamondLeft,
  DiamondRight,
  DiamondX,
  Minus,
  DollarBill,
  Astrick,
  Exclamation1,
  Exclamation2,
  Exclamation3,
  QuestionMark,
} from "../../../Components/icons";

const iconComponents = {
  CirclePlus,
  Circle,
  CircleHalf,
  CircleFull,
  CircleArrowLeft,
  CircleArrowRight,
  CircleX,
  Square,
  PencilPage,
  DownloadIcon,
  LockIcon,
  SearchIcon,
  SquareHalf,
  SquareFull,
  SquareLeftArrow,
  SquareRightArrow,
  SquareX,
  Diamond,
  DiamondHalf,
  DiamondFull,
  DiamondLeft,
  DiamondRight,
  DiamondX,
  Minus,
  DollarBill,
  Astrick,
  Exclamation1,
  Exclamation2,
  Exclamation3,
  QuestionMark,
};

const NoteWithAnnotations = () => {
  const [rawNote, setRawNote] = useState("");
  const [note, setNote] = useState([""]);
  const [annotations, setAnnotations] = useState({});
  const [showPrimaryFloatingMenu, setShowPrimaryFloatingMenu] = useState(false);
  const [showSecondaryFloatingMenu, setShowSecondaryFloatingMenu] =
    useState(false);
  const [floatingMenuPosition, setFloatingMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [selectedLineIndex, setSelectedLineIndex] = useState(0);

  const cleanupAnnotations = (validKeys) => {
    setAnnotations((currentAnnotations) => {
      // Object to hold the cleaned annotations
      const cleanedAnnotations = {};

      // Iterate over the current annotations
      for (const key of validKeys) {
        // If the key is valid and exists in the current annotations, keep it
        if (currentAnnotations[key]) {
          cleanedAnnotations[key] = currentAnnotations[key];
        }
      }

      // Return the cleaned annotations object
      return cleanedAnnotations;
    });
  };

  const handleInput = (e) => {
    setRawNote(e.target.value);
    const lines = e.target.value.split("\n");
    setNote(lines);

    // After setting the new note, clean up the annotations
    cleanupAnnotations(lines.map((_, index) => index.toString()));
  };

  const getIconComponent = (iconName, styles) => {
    const IconComponent = iconComponents[iconName];
    return <IconComponent styles={styles} />;
  };

  const handlePrimaryClick = (event, index) => {
    const buttonPosition = event.target.getBoundingClientRect();
    setShowSecondaryFloatingMenu(false);
    setFloatingMenuPosition({ x: buttonPosition.x, y: buttonPosition.y });
    setShowPrimaryFloatingMenu(true);
    setSelectedLineIndex(index);
  };

  const handleSecondaryClick = (event, index) => {
    const buttonPosition = event.target.getBoundingClientRect();
    setShowPrimaryFloatingMenu(false);
    setFloatingMenuPosition({ x: buttonPosition.x, y: buttonPosition.y });
    setShowSecondaryFloatingMenu(true);
    setSelectedLineIndex(index);
  };

  const closeMenu = () => {
    setShowPrimaryFloatingMenu(false);
    setShowSecondaryFloatingMenu(false);
    setFloatingMenuPosition({
      x: 0,
      y: 0,
    });
  };

  const selectPrimaryIcon = (iconName) => {
    setAnnotations((prevAnnotations) => ({
      ...prevAnnotations,
      [selectedLineIndex]: {
        ...prevAnnotations[selectedLineIndex],
        primary: iconName,
      },
    }));
    setShowPrimaryFloatingMenu(false); // Close the floating menu
  };

  const selectSecondaryIcon = (iconName) => {
    setAnnotations((prevAnnotations) => ({
      ...prevAnnotations,
      [selectedLineIndex]: {
        ...prevAnnotations[selectedLineIndex],
        secondary: iconName,
      },
    }));
    setShowSecondaryFloatingMenu(false); // Close the floating menu
  };

  return (
    <div className="flex flex-col w-3/4 border-x">
      <div className="flex h-20 border">
        <PencilPage styles={"h-10 my-auto ml-5"} />
        <div className="flex gap-x-5">
          <div className="flex px-5 my-auto border-r h-fit">
            <LockIcon styles={"w-10 my-auto"} />
          </div>

          <button className="">
            <DownloadIcon styles={"h-10"} />
          </button>
          <div className="flex px-5 my-auto border-l h-fit">
            <SearchIcon styles={"w-10 my-auto"} />
          </div>
        </div>
      </div>
      <div className="flex pt-10 h-full">
        <div className="flex flex-col h-full w-20 pt-1 border-r border-r-[#e5e7eb] relative">
          <div className="w-[1px] h-full right-[50%] absolute bg-[#e5e7eb]"></div>
          {note.map((_, index) => (
            <div key={index} className="flex h-6 w-full items-start">
              <div className="w-1/2 h-full flex justify-center items-center">
                {annotations[index]?.primary ? (
                  getIconComponent(
                    annotations[index].primary,
                    "h-[18px] mx-auto"
                  )
                ) : (
                  <button
                    className="opacity-25 hover:opacity-100"
                    onClick={(e) => handlePrimaryClick(e, index)}
                  >
                    <CirclePlus styles={"mx-auto"} />
                  </button>
                )}
              </div>
              <div className="w-1/2 h-full flex justify-center items-center">
                {annotations[index]?.secondary ? (
                  getIconComponent(
                    annotations[index].secondary,
                    "h-[18px] mx-auto"
                  )
                ) : (
                  <button
                    className="opacity-25 hover:opacity-100"
                    onClick={(e) => handleSecondaryClick(e, index)}
                  >
                    <CirclePlus styles={"mx-auto"} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col w-full h-full pl-1">
          <textarea
            className="border-none outline-none border-gray-300 p-1 leading-6 h-full whitespace-pre-wrap"
            placeholder="Type your note here..."
            value={rawNote}
            onChange={handleInput}
          />
        </div>
      </div>
      {showPrimaryFloatingMenu && (
        <div
          className="absolute z-20 flex flex-col w-56 p-2 bg-gray-100 border border-gray-400 rounded"
          style={{
            top: `${floatingMenuPosition.y + 30}px`,
            left: `${floatingMenuPosition.x + 12}px`,
          }}
        >
          <button onClick={closeMenu} className="self-end text-lg p-1">
            &times;
          </button>
          <p className="pb-2 mx-auto text-sm">ADD A TAG</p>
          <div className="flex flex-col items-start mt-2">
            <button
              onClick={() => {
                selectPrimaryIcon("CircleHalf");
              }}
              className="icon_button"
            >
              <CircleHalf styles={"h-4"} /> <p>Lorem ipsum Tag 2</p>
            </button>

            <button
              onClick={() => {
                selectPrimaryIcon("Circle");
              }}
              className="icon_button"
            >
              <Circle styles={"h-4"} /> <p>Lorem ipsum Tag 1</p>
            </button>

            <button
              onClick={() => {
                selectPrimaryIcon("CircleFull");
              }}
              className="icon_button"
            >
              <CircleFull styles={"h-4"} /> <p>Lorem ipsum Tag 2</p>
            </button>

            <button
              onClick={() => {
                selectPrimaryIcon("CircleArrowLeft");
              }}
              className="icon_button"
            >
              <CircleArrowLeft styles={"h-4"} /> <p>Lorem ipsum Tag 2</p>
            </button>

            <button
              onClick={() => {
                selectPrimaryIcon("CircleArrowRight");
              }}
              className="icon_button"
            >
              <CircleArrowRight styles={"h-4"} /> <p>Lorem ipsum Tag 2</p>
            </button>

            <button
              onClick={() => {
                selectPrimaryIcon("CircleX");
              }}
              className="icon_button"
            >
              <CircleX styles={"h-4"} /> <p>Lorem ipsum Tag 2</p>
            </button>

            <button
              onClick={() => {
                selectPrimaryIcon("Square");
              }}
              className="icon_button"
            >
              <Square styles={"h-4"} /> <p>Lorem ipsum Tag 2</p>
            </button>

            <button
              onClick={() => {
                selectPrimaryIcon("SquareHalf");
              }}
              className="icon_button"
            >
              <SquareHalf styles={"h-4"} /> <p>Lorem ipsum Tag 2</p>
            </button>

            <button
              onClick={() => {
                selectPrimaryIcon("SquareFull");
              }}
              className="icon_button"
            >
              <SquareFull styles={"h-4"} /> <p>Lorem ipsum Tag 2</p>
            </button>

            <button
              onClick={() => {
                selectPrimaryIcon("SquareLeftArrow");
              }}
              className="icon_button"
            >
              <SquareLeftArrow styles={"h-4"} /> <p>Lorem ipsum Tag 2</p>
            </button>

            <button
              onClick={() => {
                selectPrimaryIcon("SquareRightArrow");
              }}
              className="icon_button"
            >
              <SquareRightArrow styles={"h-4"} /> <p>Lorem ipsum Tag 2</p>
            </button>

            <button
              onClick={() => {
                selectPrimaryIcon("SquareX");
              }}
              className="icon_button"
            >
              <SquareX styles={"h-4"} /> <p>Lorem ipsum Tag 2</p>
            </button>

            <button
              onClick={() => {
                selectPrimaryIcon("Diamond");
              }}
              className="icon_button"
            >
              <Diamond styles={"h-4"} /> <p>Lorem ipsum Tag 2</p>
            </button>

            <button
              onClick={() => {
                selectPrimaryIcon("DiamondHalf");
              }}
              className="icon_button"
            >
              <DiamondHalf styles={"h-4"} /> <p>Lorem ipsum Tag 2</p>
            </button>

            <button
              onClick={() => {
                selectPrimaryIcon("DiamondFull");
              }}
              className="icon_button"
            >
              <DiamondFull styles={"h-4"} /> <p>Lorem ipsum Tag 2</p>
            </button>

            <button
              onClick={() => {
                selectPrimaryIcon("DiamondLeft");
              }}
              className="icon_button"
            >
              <DiamondLeft styles={"h-4"} /> <p>Lorem ipsum Tag 2</p>
            </button>

            <button
              onClick={() => {
                selectPrimaryIcon("DiamondRight");
              }}
              className="icon_button"
            >
              <DiamondRight styles={"h-4"} /> <p>Lorem ipsum Tag 2</p>
            </button>

            <button
              onClick={() => {
                selectPrimaryIcon("DiamondX");
              }}
              className="icon_button"
            >
              <DiamondX styles={"h-4"} /> <p>Lorem ipsum Tag 2</p>
            </button>
          </div>
        </div>
      )}
      {showSecondaryFloatingMenu && (
        <div
          className="absolute z-20 flex flex-col w-56 p-2 bg-gray-100 border border-gray-400 rounded"
          style={{
            top: `${floatingMenuPosition.y + 30}px`,
            left: `${floatingMenuPosition.x + 12}px`,
          }}
        >
          <button onClick={closeMenu} className="self-end text-lg p-1">
            &times;
          </button>
          <p className="pb-2 mx-auto text-sm">ADD A TAG</p>
          <div className="flex flex-col items-start mt-2">
            <button
              onClick={() => {
                selectSecondaryIcon("Minus");
              }}
              className="icon_button"
            >
              <Minus styles={"h-4"} /> <p>Lorem ipsum Tag 2</p>
            </button>

            <button
              onClick={() => {
                selectSecondaryIcon("DollarBill");
              }}
              className="icon_button"
            >
              <DollarBill styles={"h-4"} /> <p>Lorem ipsum Tag 1</p>
            </button>

            <button
              onClick={() => {
                selectSecondaryIcon("Astrick");
              }}
              className="icon_button"
            >
              <Astrick styles={"h-4"} /> <p>Lorem ipsum Tag 2</p>
            </button>

            <button
              onClick={() => {
                selectSecondaryIcon("Exclamation1");
              }}
              className="icon_button"
            >
              <Exclamation1 styles={"h-4"} /> <p>Lorem ipsum Tag 2</p>
            </button>

            <button
              onClick={() => {
                selectSecondaryIcon("Exclamation2");
              }}
              className="icon_button"
            >
              <Exclamation2 styles={"h-4"} /> <p>Lorem ipsum Tag 2</p>
            </button>

            <button
              onClick={() => {
                selectSecondaryIcon("Exclamation3");
              }}
              className="icon_button"
            >
              <Exclamation3 styles={"h-4"} /> <p>Lorem ipsum Tag 2</p>
            </button>

            <button
              onClick={() => {
                selectSecondaryIcon("QuestionMark");
              }}
              className="icon_button"
            >
              <QuestionMark styles={"h-4"} /> <p>Lorem ipsum Tag 2</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteWithAnnotations;
