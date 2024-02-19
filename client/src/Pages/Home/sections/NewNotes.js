import React, { useEffect, useState } from "react";
import axios from "axios";

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

import { baseUrl } from "../../../Utils/config";

const bulletIconComponents = [
  CircleHalf,
  Circle,
  CircleFull,
  CircleArrowLeft,
  CircleArrowRight,
  CircleX,
  Square,
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
  DiamondX,
  CirclePlus,
  PencilPage,
  DownloadIcon,
  LockIcon,
  SearchIcon,
]

const contextIconComponents = [
  Minus,
  DollarBill,
  Astrick,
  Exclamation1,
  Exclamation2,
  Exclamation3,
  QuestionMark,
];

const NoteWithAnnotations = ({ journals, handleSelectNote }) => {
  const [showContextFloatingMenu, setShowContextFloatingMenu] = useState(false);
  const [showBulletFloatingMenu, setShowBulletFloatingMenu] = useState(false);
  const [contextIcons, setContextIcons] = useState([]);
  const [bulletIcons, setBulletIcons] = useState([]);
  const [floatingMenuPosition, setFloatingMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [selectedJournalId, setSelectedJournalId] = useState(null);
  const [rawNote, setRawNote] = useState("");
  const [annotations, setAnnotations] = useState({});

  useEffect(() => {
    const getIcons = async () => {
      try {
        const contextResponse = await axios.get(`${baseUrl}/journal/ref_context`);
        setContextIcons(Object.values(contextResponse.data));
        const bulletResponse = await axios.get(`${baseUrl}/journal/ref_bullet`);
        setBulletIcons(Object.values(bulletResponse.data));
      } catch (error) {
        console.log(error);
      }
    };

    getIcons();
  }, []);

  const handleTextChange = (value, journalId) => {
    const journal = journals.filter(j => j.id === journalId)[0];
    const data = { ...journal, text_stream: value };
    updateJournal(data);
  }

  const getIconComponentNew = (isContext, index, styles) => {
    const IconComponent = isContext ? contextIconComponents[index] : bulletIconComponents[index];
    return <IconComponent styles={styles} />;
  };

  const handleIconClick = (event, type, journalId = null) => {
    const buttonPosition = event.target.getBoundingClientRect();
    setShowBulletFloatingMenu(!type);
    setShowContextFloatingMenu(type);
    setFloatingMenuPosition({ x: buttonPosition.x, y: buttonPosition.y });
    setSelectedJournalId(journalId);
  };

  const closeMenu = () => {
    setShowContextFloatingMenu(false);
    setShowBulletFloatingMenu(false);
    setFloatingMenuPosition({
      x: 0,
      y: 0,
    });
  };

  const handleIconSubmit = (id, type) => {
    if (selectedJournalId) {
      const journal = journals.filter(j => j.id === selectedJournalId)[0];
      const data = type ? {
          context_stream: id,
          text_stream: journal.text_stream,
          bullet_stream: journal.bullet_stream,
          state_stream: journal.state_stream,
          project_stream: journal.project_stream,
          additional_stream: journal.additional_stream,
          date_modified: journal.date_created,
        } : { 
          bullet_stream: id,
          text_stream: journal.text_stream,
          context_stream: journal.context_stream,
          state_stream: journal.state_stream,
          project_stream: journal.project_stream,
          additional_stream: journal.additional_stream,
          date_modified: journal.date_created,
        };
      updateJournal(data);
    } else {
      if (type) {
        setAnnotations((prevAnn) => ({
          ...prevAnn,
          context: id
        }));
      } else {
        setAnnotations((prevAnn) => ({
          ...prevAnn,
          bullet: id
        }));
      }
    }
    setShowBulletFloatingMenu(false);
    setShowContextFloatingMenu(false);
  }

  const updateJournal = async (data) => {
    const journal = journals.filter(j => j.id === selectedJournalId)[0];
    const response = await axios.put(`${baseUrl}/journal/daily_journal/${selectedJournalId}`, data);
    if (response.data.status === "success") {
      handleSelectNote(journal.date_created.slice(0, 10));
    }
    setSelectedJournalId(null);
  }

  const getDateTimeString = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    
    return formattedDateTime;
  }

  const handleTextSubmit = (e) => {
    if (e.key === "Enter") {
      const data = {
        text_stream: rawNote,
        bullet_stream: annotations.bullet,
        context_stream: annotations.context,
        state_stream: "1",
        project_stream: "1",
        additional_stream: "",
        date_modified: getDateTimeString(),
      }
      const response = axios.post(`${baseUrl}/journal/daily_journal`, data);
      setShowBulletFloatingMenu(false);
      setShowContextFloatingMenu(false);
      setAnnotations({});
      setRawNote("");
    }
  }

  const AddTagModal = (type) => {
    const icons = type ? contextIcons : bulletIcons;

    return (
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
          {icons?.map((icon) => (
            <button
              key={icon.id}
              onClick={() => {
                handleIconSubmit(icon.id, type);
              }}
              className="icon_button"
            >
              {getIconComponentNew(type, icon.id, "h-4")}
              <p>{type ? icon.name : icon.name + "-" + icon.state}</p>
            </button>
          ))}
        </div>
      </div>
    )
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
      <div className="flex flex-col pt-10">
        {journals?.map((journal) => (
          <div key={journal.id} className="flex">
            <div className="flex w-20 relative border-r border-r-[#e5e7eb]">
              <div
                className="w-1/2 justify-center items-center cursor-pointer relative"
                onClick={(e) => handleIconClick(e, true, journal.id)}
              >
                {getIconComponentNew(true, journal.context_stream, "h-[18px] mx-auto")}
              </div>
              <div className="w-[1px] h-full right-[50%] absolute bg-[#e5e7eb]"></div>
              <div
                className="w-1/2 justify-center items-center cursor-pointer relative"
                onClick={(e) => handleIconClick(e, false, journal.id)}
              >
                {getIconComponentNew(false, journal.bullet_stream, "h-[18px] mx-auto")}
              </div>
            </div>
            <div className="flex w-full h-full pl-1">
              <textarea
                className="border-none outline-none border-gray-300 px-1 leading-6 h-full whitespace-pre-wrap"
                placeholder="Type your note here..."
                value={journal.text_stream}
                onChange={(e) => handleTextChange(e.target.value, journal.id)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex h-full">
        <div className="flex flex-col h-full w-20 pt-1 border-r border-r-[#e5e7eb] relative">
          <div className="w-[1px] h-full right-[50%] absolute bg-[#e5e7eb]"></div>
          <div className="flex h-6 w-full items-start">
            <div className="w-1/2 h-full flex justify-center items-center">
              <button
                onClick={(e) => handleIconClick(e, true)}
              >
                {annotations?.context ? (
                  getIconComponentNew(true, annotations.context,"h-[18px] mx-auto")
                ) : (
                  <CirclePlus styles={"mx-auto opacity-25 hover:opacity-100"} />
                )}
              </button>
            </div>
            <div className="w-1/2 h-full flex justify-center items-center">
              <button
                onClick={(e) => handleIconClick(e, false)}
              >
                {annotations?.bullet ? (
                  getIconComponentNew(false, annotations.bullet,"h-[18px] mx-auto")
                ) : (
                  <CirclePlus styles={"mx-auto opacity-25 hover:opacity-100"} />
                )}
                </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full h-full pl-1">
          <textarea
            className="border-none outline-none border-gray-300 p-1 leading-6 h-full whitespace-pre-wrap"
            placeholder="Type your note here..."
            value={rawNote}
            onKeyDown={handleTextSubmit}
            onChange={(e) => setRawNote(e.target.value)}
          />
        </div>
      </div>
      {showContextFloatingMenu && AddTagModal(true)}
      {showBulletFloatingMenu && AddTagModal(false)}
    </div>
  );
};

export default NoteWithAnnotations;
