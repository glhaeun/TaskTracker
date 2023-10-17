import React, { useState, useEffect } from "react";

import ContactList from "../../../../component/Journal/card/cardList";
import NewContact from "../../../../component/Journal/card/newCard";
import DialogBox from "../../../../component/Journal/card/DialogBox";

import { IconCircleCheckFilled } from "@tabler/icons-react";
import { useSelector } from 'react-redux';

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const getContactList = useSelector((state) => state.contact.contactList);
  const [searchTerm, setSearchTerm] = useState("");
  const [contactListData, setContactListData] = useState([]);

  useEffect(() => {
    setContactListData(getContactList);
    const filteredData = getContactList.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    setContactListData(filteredData);
  }, [getContactList, searchTerm]);

  const dialogHandle = () => {
    setOpen((current) => !current);
  };

  return (
    <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-green-200 via-indigo-200 to-pink-200">
      <div className="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75">
        <input
          className="flex items-center h-10 px-4 ml-10 text-sm w-1/3 bg-gray-200 rounded-full focus:outline-none focus:ring"
          type="search"
          placeholder="Search contact …"
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        />
        <button
          type="submit"
          className="flex items-center text-indigo-600 p-2 rounded text-sm w-auto"
          onClick={dialogHandle}
        >
          <IconCircleCheckFilled />
          <span>&nbsp;Add</span>
        </button>
        <button className="flex items-center justify-center w-8 h-8 ml-auto overflow-hidden rounded-full cursor-pointer">
          <img
            src="https://i.pinimg.com/280x280_RS/ab/a2/8e/aba28eb29f66aab5f24db128a0232f3f.jpg"
            alt=""
          />
        </button>
      </div>
      <ContactList contacts={contactListData} />
      {open && (
        <DialogBox open={open} OnDialogHandle={dialogHandle}>
          <NewContact id={""} />
        </DialogBox>
      )}
    </div>
  );
};

export default HomePage;
