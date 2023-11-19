

import moment from "moment/moment";

export const cardsData = [
  {
    title: "Revenue",
    change: 24,
    amount: 42056,
  },
  {
    title: "Orders",
    change: 14,
    amount: 52125.03,
  },
  {
    title: "Expenses",
    change: 18,
    amount: 1216.5,
  },
  {
    title: "Profit",
    change: 12,
    amount: 10125.0,
  },
];

export const ordersData = [
  {
    name: "Skatebnoard",
    type: "Illustration",
    items: 58,
    change: 290,
  },
  {
    name: "Language courses",
    type: "Illustration",
    items: 12,
    change: 72
  },
  {
    name: "Office Collaboration",
    type: "Illustration",
    items: 7,
    change: 70
  },
  {
    name: "Robot",
    type: "Illustration",
    items: 21,
    change: 15
  }
]


//* get the value in group number format
export const groupNumber = (number) => {
  return parseFloat(number.toFixed(2)).toLocaleString("en", {
    useGrouping: true,
  });
};


//* calendar Events
let eventGuid = 0
let todayStr = moment().format("YYYY-MM-DD")  // YYYY-MM-DD of today
// export const INITIAL_EVENTS = [
//   {
//     id: createEventId(),
//     title: 'Lunch Pary',
//     start: todayStr + 'T09:00:00',


//   },
//   {
//     id: createEventId(),
//     title: 'Timed event',
//     start: moment(todayStr).add(1, "days").format("YYYY-MM-DD") + 'T16:00:00'
//   },
//   {
//     id: createEventId(),
//     title: "Head Meetup",
//     start: moment(todayStr).add(2, "days").format("YYYY-MM-DD") + 'T20:00:00'
//   },
//   {
//     id: createEventId(),
//     title: "VC Meeting",
//     start: moment(todayStr).add(3, "days").format("YYYY-MM-DD") + 'T09:00:00'
//   },
//   {
//     id: createEventId(),
//     title: "Payment Shedules",
//     start: moment(todayStr).add(5, "days").format("YYYY-MM-DD") + 'T13:00:00'
//   },
//   {
//     id: createEventId(),
//     title: "VC Meeting",
//     start: moment(todayStr).add(6, "days").format("YYYY-MM-DD") + 'T13:00:00'
//   },
// ]

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'Lunch Party',
    start: moment(todayStr + 'T09:00:00').format('MM/DD/YYYY'),
    end: moment(todayStr + 'T13:00:00').format(),
    description: 'This is a lunch party event',
    allDay: false, // Set to true if it's an all-day event
    color: '#FF5733', // Set the desired color
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: moment(todayStr).add(1, 'days').format('YYYY-MM-DD') + 'T16:00:00',
    end: moment(todayStr).add(1, 'days').format('YYYY-MM-DD') + 'T18:00:00', 
    description: 'This is a timed event',
    allDay: false,
    color: '#3366FF',
  },
  {
    id: createEventId(),
    title: 'Head Meetup',
    start: moment(todayStr).add(2, 'days').format('YYYY-MM-DD') + 'T20:00:00',
    end: moment(todayStr).add(2, 'days').format('YYYY-MM-DD') + 'T23:00:00',
    description: 'This is a meetup event',
    allDay: false,
    color: '#33FF33',
  },
  {
    id: createEventId(),
    title: 'VC Meeting',
    start: moment(todayStr).add(2, 'days').format('YYYY-MM-DD'), // Only the date
    end: moment(todayStr).add(2, 'days').format('YYYY-MM-DD'),
    description: 'This is a VC meeting event',
    allDay: true,
    color: '#9933FF',
  },
  {
    id: createEventId(),
    title: 'Payment Schedules',
    start: moment(todayStr).add(5, 'days').format('YYYY-MM-DD') + 'T13:00:00',
    description: 'This is a payment schedules event',
    allDay: false,
    color: '#FF3366',
  }
];


export function createEventId() {
  return String(eventGuid++)
}

