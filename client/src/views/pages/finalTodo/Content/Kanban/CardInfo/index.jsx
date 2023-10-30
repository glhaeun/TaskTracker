import React, { useEffect, useState } from "react";
import { Calendar, CheckSquare, List, Tag, Trash, Type } from "react-feather";
import { colorsList } from "../../../../../../utils/Util";
import Modal from "../Modal";
import "./style.css";
import CustomInput from "../../../../../../ApiMockData/CustomInput";
import Chip from "../../../../../../component/extended/Chips";
import { v4 as uuidv4 } from 'uuid';


const CardInfo = (props) => {
  const { onClose, card, boardId, updateCard } = props;
  const [selectedColor, setSelectedColor] = useState("");
  const [cardValues, setCardValues] = useState({
    ...card,
  });

  const updateTitle = (value) => {
    setCardValues({ ...cardValues, title: value });
  };

  const updateDesc = (value) => {
    setCardValues({ ...cardValues, desc: value });
  };

  const addLabel = (label) => {
    const index = cardValues.labels.findIndex(
      (item) => item.text === label.text
    );
    if (index > -1) return; //if label text already exists, return

    setSelectedColor("");
    setCardValues({
      ...cardValues,
      labels: [...cardValues.labels, label],
    });
  };

  const removeLabel = (label) => {
    const tempLabels = cardValues.labels.filter(
      (item) => item.text !== label.text
    );

    setCardValues({
      ...cardValues,
      labels: tempLabels,
    });
  };

  const addSubTask = (value) => {
    const subtask = {
      id: uuidv4(), // Generate a unique ID
      title: value,
      isCompleted: false
    };
  
    const updatedCardValues = {
      ...cardValues,
      subtasks: [...cardValues.subtasks, subtask],
    };
  
    setCardValues(updatedCardValues);
  
  };
  

  const removeTask = (id) => {
    const subtasks = [...cardValues.subtasks];

    const tempSubTasks = subtasks.filter((item) => item.id !== id);
    setCardValues({
      ...cardValues,
      subtasks: tempSubTasks,
    });
  };

  const updateTask = (id, value) => {
    const subtasks = [...cardValues.subtasks];

    const index = subtasks.findIndex((item) => item.id === id);
    if (index < 0) return;

    subtasks[index].isCompleted = Boolean(value);

    setCardValues({
      ...cardValues,
      subtasks,
    });
  };

  const calculatePercent = () => {
    if (!cardValues.subtasks?.length) return 0;
    const isCompleted = cardValues.subtasks?.filter(
      (item) => item.isCompleted
    )?.length;
    return (isCompleted / cardValues.subtasks?.length) * 100;
  };

  const updateDate = (date) => {
    if (!date) return;

    setCardValues({
      ...cardValues,
      date,
    });
  };

  function formatDateForInput(date) {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, so add 1
    const day = String(dateObject.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
  

  useEffect(() => {
    if (updateCard) updateCard(boardId, cardValues.id, cardValues);
  }, [cardValues]);

  const calculatedPercent = calculatePercent();

  return (
    <Modal onClose={onClose}>
      <div className="cardinfo">
        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <Type />
            <p>Title</p>
          </div>
          <CustomInput
            defaultValue={cardValues.title}
            text={cardValues.title}
            placeholder="Enter Title"
            onSubmit={updateTitle}
          />
        </div>

        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <List />
            <p>Description</p>
          </div>
          <CustomInput
            defaultValue={cardValues.desc}
            text={cardValues.desc || "Add a Description"}
            placeholder="Enter description"
            onSubmit={updateDesc}
          />
        </div>

        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <Calendar />
            <p>Date</p>
          </div>
          <input
            type="date"
            defaultValue={formatDateForInput(cardValues.date)}
            min={new Date().toISOString().substr(0, 10)}
            onChange={(event) => updateDate(event.target.value)}
          />
        </div>

        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <Tag />
            <p>Labels</p>
          </div>
          <div className="cardinfo-box-labels">
            {cardValues.labels?.map((item, index) => (
              <Chip key={index} item={item} removeLabel={removeLabel} />
            ))}
          </div>
          <ul>
            {colorsList.map((item, index) => (
              <li
                key={index}
                style={{ backgroundColor: item }}
                className={selectedColor === item ? "li-active" : ""}
                onClick={() => setSelectedColor(item)}
              />
            ))}
          </ul>
          <CustomInput
            text="Add Label"
            placeholder="Enter label text"
            onSubmit={(value) =>
              addLabel({ color: selectedColor, text: value })
            }
          />
        </div>

        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <CheckSquare />
            <p>Tasks</p>
          </div>
          <div className="cardinfo-box-progress-bar">
            <div
              className="cardinfo-box-progress"
              style={{
                width: `${calculatedPercent}%`,
                backgroundColor: calculatedPercent === 100 ? "limegreen" : "",
              }}
            />
          </div>
          <div className="cardinfo-box-task-list">
          {cardValues.subtasks?.map((item) => {
            console.log(item.title)
            return (
              <div key={item.id} className="cardinfo-box-task-checkbox">
                <input
                  type="checkbox"
                  defaultChecked={item.completed}
                  onChange={(event) =>
                    updateTask(item.id, event.target.checked)
                  }
                />
                <p className={item.completed ? "completed" : ""}>{item.title}</p>
                <Trash onClick={() => removeTask(item.id)} />
              </div>
            );
          })}

          </div>
          <CustomInput
            text={"Add a Task"}
            placeholder="Enter task"
            onSubmit={(value) =>
              addSubTask(value)
            }
          />
        </div>
      </div>
    </Modal>
  );
};

export default CardInfo;
