export const user = {
  id: 'sunita',
  name: 'Sunita',
  age: 54,
  location: 'Delhi',
  greetingName: 'Sunita ji',
};

// top(%), left(%) position on the village map — arranged by emotional proximity
export const familyMembers = [
  {
    id: 'priya',
    name: 'Priya',
    relation: 'Daughter',
    location: 'Jodhpur',
    circle: 'inner',
    gardenState: 'lush',
    lastConnected: 'Today',
    emoji: '👩🏽',
    houseEmoji: '🏡',
    top: 20,
    left: 20,
    active: true,
  },
  {
    id: 'rahul',
    name: 'Rahul',
    relation: 'Son',
    location: 'Bengaluru',
    circle: 'inner',
    gardenState: 'lush',
    lastConnected: 'Yesterday',
    emoji: '🧑🏽',
    houseEmoji: '🏠',
    top: 18,
    left: 72,
    active: true,
  },
  {
    id: 'papa',
    name: 'Papa',
    relation: 'Father',
    location: 'Delhi',
    circle: 'inner',
    gardenState: 'lush',
    lastConnected: '2 days ago',
    emoji: '👴🏽',
    houseEmoji: '🏘️',
    top: 46,
    left: 8,
  },
  {
    id: 'meena',
    name: 'Meena Maasi',
    relation: 'Aunt',
    location: 'Lucknow',
    circle: 'middle',
    gardenState: 'wilting',
    lastConnected: '3 weeks ago',
    emoji: '👵🏽',
    houseEmoji: '🏚️',
    top: 50,
    left: 78,
  },
  {
    id: 'chachi',
    name: 'Chachi',
    relation: 'Aunt',
    location: 'Agra',
    circle: 'outer',
    gardenState: 'fading',
    lastConnected: '6 weeks ago',
    emoji: '👩🏽‍🦳',
    houseEmoji: '🏚️',
    top: 66,
    left: 68,
  },
];

export const deitiesByDay = {
  Sunday: { name: 'Surya Dev', greeting: 'Shubh Ravivar', emoji: '☀️', color: '#D4A017' },
  Monday: { name: 'Shivji', greeting: 'Shubh Somvar', emoji: '🔱', color: '#6B3FA0' },
  Tuesday: { name: 'Hanuman ji', greeting: 'Shubh Mangalvar', emoji: '🚩', color: '#C17B5A' },
  Wednesday: { name: 'Ganesh ji', greeting: 'Shubh Budhvar', emoji: '🐘', color: '#F5A623' },
  Thursday: { name: 'Vishnu ji', greeting: 'Shubh Guruvar', emoji: '🪷', color: '#2D5016' },
  Friday: { name: 'Durga Maa', greeting: 'Shubh Shukravar', emoji: '🌺', color: '#C17B5A' },
  Saturday: { name: 'Shani Dev', greeting: 'Shubh Shanivar', emoji: '🪔', color: '#3A2E27' },
};

export const getToday = () => {
  // Demo is fixed to Monday morning per the prototype brief.
  return 'Monday';
};
