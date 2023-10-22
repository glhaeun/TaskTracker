import { v4 as uuidv4 } from "uuid";

const dummyJournalData = [
  {
    id: uuidv4(), // Replace with a valid id ID
    title: "My First Journal Entry",
    caption: "A memorable day in my life",
    content:
      "Remembering that I will be dead soon is the most important tool I’ve ever encountered to help me make the big choices in life. Because almost everything all external expectations, all pride, all fear of embarrassment or failure, these things just fall away in the face of death, leaving what is only truly important.",
      date: "10/12/22 2.55 PM",
      createdTime: new Date("Sat Dec 10 2022 14:55:22").getTime(),
      editedTime: null,
      photo: "image_url.jpg",
      categories: [{ color: "#ff5733", text: "Travel" }],
    },
  {
    id: uuidv4(), // Replace with a valid id ID
    title: "Another Journal Entry",
    caption: "A day to remember",
    content:
      "Remembering that I will be dead soon is the most important tool I’ve ever encountered to help me make the big choices in life. Because almost everything all external expectations, all pride, all fear of embarrassment or failure, these things just fall away in the face of death, leaving what is only truly important.",
      date: "10/12/22 2.55 PM",
      createdTime: new Date("Sat Dec 10 2022 14:55:22").getTime(),
      editedTime: null,
    photo: "image_url_2.jpg",
    categories: [{ color: "#ff5733", text: "Travel" }],
  },
  {
    id: uuidv4(), // Replace with a valid id ID
    title: "Memories of a Vacation",
    caption: "Exploring new places",
    content:
      "Remembering that I will be dead soon is the most important tool I’ve ever encountered to help me make the big choices in life. Because almost everything all external expectations, all pride, all fear of embarrassment or failure, these things just fall away in the face of death, leaving what is only truly important.",
      date: "10/12/22 2.55 PM",
      createdTime: new Date("Sat Dec 10 2022 14:55:22").getTime(),
      editedTime: null,
    photo: "image_url_3.jpg",
    categories: [{ color: "#ff5733", text: "Travel" }],
  },
  {
    id: uuidv4(), // Replace with a valid id ID
    title: "A Day at the Beach",
    caption: "Sun, sand, and relaxation",
    content:
      "Remembering that I will be dead soon is the most important tool I’ve ever encountered to help me make the big choices in life. Because almost everything all external expectations, all pride, all fear of embarrassment or failure, these things just fall away in the face of death, leaving what is only truly important.",
      date: "10/12/22 2.55 PM",
      createdTime: new Date("Sat Dec 10 2022 14:55:22").getTime(),
      editedTime: null,    
    photo: "image_url_4.jpg",
    categories: [{ color: "#ff5733", text: "Travel" }],
  },
  {
    id: uuidv4(), // Replace with a valid id ID
    title: "Hiking Adventure",
    caption: "Conquering the mountain",
    content:
      "Remembering that I will be dead soon is the most important tool I’ve ever encountered to help me make the big choices in life. Because almost everything all external expectations, all pride, all fear of embarrassment or failure, these things just fall away in the face of death, leaving what is only truly important.",
      date: "10/12/22 2.55 PM",
      createdTime: new Date("Sat Dec 10 2022 14:55:22").getTime(),
      editedTime: null,  
    photo: "image_url_5.jpg",
    categories: [{ color: "#ff5733", text: "Travel" }],
  },
  {
    id: uuidv4(), // Replace with a valid id ID
    title: "Cooking Experiment",
    caption: "Trying a new recipe",
    content:
      "Remembering that I will be dead soon is the most important tool I’ve ever encountered to help me make the big choices in life. Because almost everything all external expectations, all pride, all fear of embarrassment or failure, these things just fall away in the face of death, leaving what is only truly important.",
    date: "10/12/22 2.55 PM",
    createdTime: new Date("Sat Dec 10 2022 14:55:22").getTime(),
    editedTime: null,
    photo: "image_url_6.jpg",
    categories: [{ color: "#ff5733", text: "Travel" }],
  },
  {
    id: uuidv4(), // Replace with a valid id ID
    title: "Family Reunion",
    caption: "Quality time with loved ones",
    content:
      "Remembering that I will be dead soon is the most important tool I’ve ever encountered to help me make the big choices in life. Because almost everything all external expectations, all pride, all fear of embarrassment or failure, these things just fall away in the face of death, leaving what is only truly important.",
    date: "10/12/22 2.55 PM",
    createdTime: new Date("Sat Dec 10 2022 14:55:22").getTime(),
    editedTime: null,
    photo: "image_url_7.jpg",
    categories: [{ color: "#ff5733", text: "Travel" }],
  },
  // You can continue to add more journal entries as needed
];

export default dummyJournalData;
