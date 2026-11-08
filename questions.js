/* Questions for both games. Edit text here; keep the structure.
   Question types:
     mc    – multiple choice (options + answer index)
     order – tap tiles into the right order
     line  – tap a line (here: the line of code that does a job)
     bins  – sort each item into one of two (or three) groups
   Any question can have its own "seconds". */
window.SITE_INFO = {
 "badge": "Grade 10 · Unit 4 · Sprint 4.1 · Session 2",
 "titleText": "Dictionary & Set Games",
 "warmup": {
  "label": "Warm-up",
  "sub": "Guess today’s mission"
 },
 "wrapup": {
  "label": "Wrap-up",
  "sub": "Set Showdown"
 },
 "titleHTML": "<span class=\"c1\">D</span><span class=\"c2\">i</span><span class=\"c3\">c</span><span class=\"c4\">t</span><span class=\"c5\">i</span><span class=\"c1\">o</span><span class=\"c2\">n</span><span class=\"c3\">a</span><span class=\"c4\">r</span><span class=\"c5\">y</span> <span class=\"c1\">&</span><br><span class=\"c2\">S</span><span class=\"c3\">e</span><span class=\"c4\">t</span> <span class=\"c5\">G</span><span class=\"c1\">a</span><span class=\"c2\">m</span><span class=\"c3\">e</span><span class=\"c4\">s</span>"
};
window.GAMES = {
 "warmup": {
  "badge": "Unit 4 · Sprint 4.1 · Session 2 · Warm-up",
  "name": "Key Quest",
  "titleHTML": "<span class=\"c1\">K</span><span class=\"c2\">e</span><span class=\"c3\">y</span><br><span class=\"c4\">Q</span><span class=\"c5\">u</span><span class=\"c1\">e</span><span class=\"c2\">s</span><span class=\"c3\">t</span>",
  "intro": "Last lesson you met dictionaries and sets. Every correct answer flips letters of today’s mystery mission. Crack it for +200!",
  "rules": [
   "Play on your own device (or with your partner)",
   "Faster answers = more points",
   "3 right in a row = 🔥 streak bonus",
   "Crack the mission early: +200",
   "Watch your name climb on the teacher’s screen"
  ],
  "seconds": 35,
  "points": 100,
  "floaters": [
   "🔑",
   "{ }",
   "📖",
   "🛒",
   "🎟️",
   "🐍",
   "✨",
   "🧮"
  ],
  "topic": "Dictionaries & Sets",
  "mystery": {
   "label": "Today’s mystery mission",
   "phrase": "SCHOOL STORE",
   "order": [
    0,
    8,
    3,
    1,
    7,
    9,
    4,
    11,
    5,
    10,
    2
   ],
   "perCorrect": 3,
   "bonus": 200,
   "accept": [
    "school store",
    "the school store",
    "a school store",
    "store",
    "school shop"
   ],
   "finalQ": "Put the clues together. What will we build with Python today?",
   "finalOptions": [
    "A School Store",
    "A Weather App",
    "A Video Game",
    "A Calculator"
   ],
   "finalAnswer": 0,
   "finalWhy": "Today we use dictionaries and sets to run a School Store and its clubs!"
  },
  "questions": [
   {
    "type": "mc",
    "ctx": "Session 1 recap",
    "skill": "Remember",
    "q": "A dictionary stores data as…",
    "options": [
     "key-value pairs",
     "numbered rows only",
     "pictures",
     "loops"
    ],
    "answer": 0,
    "why": "Each key is paired with a value, like \"pen\": 3."
   },
   {
    "type": "mc",
    "ctx": "Keys",
    "skill": "Remember",
    "q": "Which statement about dictionary keys is correct?",
    "options": [
     "Keys can be duplicated",
     "Keys must be unique and immutable",
     "Keys must be strings",
     "Keys can be lists"
    ],
    "answer": 1,
    "why": "Keys are unique and immutable: strings, numbers or tuples."
   },
   {
    "type": "mc",
    "ctx": "Sets",
    "skill": "Understand",
    "q": "What does print(len({1, 2, 2, 3, 3, 3})) show?",
    "options": [
     "6",
     "3",
     "2",
     "Error"
    ],
    "answer": 1,
    "why": "A set removes duplicates: {1, 2, 3} has 3 elements."
   },
   {
    "type": "bins",
    "ctx": "Which brackets?",
    "skill": "Analyze",
    "seconds": 50,
    "q": "Dictionary or set?",
    "bins": [
     "📖 Dictionary",
     "🎟️ Set"
    ],
    "items": [
     {
      "t": "{\"pen\": 3}",
      "b": 0
     },
     {
      "t": "{1, 2, 3}",
      "b": 1
     },
     {
      "t": "set()",
      "b": 1
     },
     {
      "t": "{}",
      "b": 0
     },
     {
      "t": "{\"Ali\": \"A1\"}",
      "b": 0
     }
    ],
    "why": "A colon means key-value pairs (a dictionary). Watch out: {} is an EMPTY DICTIONARY. An empty set is set()."
   },
   {
    "type": "mc",
    "ctx": "Access",
    "skill": "Apply",
    "q": "prices = {\"pen\": 3, \"book\": 12}. What is prices[\"book\"]?",
    "options": [
     "\"book\"",
     "12",
     "3",
     "1"
    ],
    "answer": 1,
    "why": "Use the key in square brackets to get its value: 12."
   },
   {
    "type": "mc",
    "ctx": "remove vs discard",
    "skill": "Understand",
    "q": "Which method raises a KeyError if the element is missing?",
    "options": [
     "discard()",
     "remove()",
     "add()",
     "clear()"
    ],
    "answer": 1,
    "why": "remove() raises a KeyError; discard() quietly does nothing."
   },
   {
    "type": "mc",
    "ctx": "Operators",
    "skill": "Remember",
    "q": "Which operator gives the elements COMMON to two sets?",
    "options": [
     "|",
     "&",
     "-",
     "^"
    ],
    "answer": 1,
    "why": "& is intersection: the elements in both sets."
   }
  ],
  "endHTML": "<div class=\"reveal\"><span class=\"pill\">Today's mission</span><div class=\"big\">School Store</div><p class=\"lede\">Run a store with dictionaries and its clubs with sets.</p></div>\n<div class=\"recap\"><div><b>Dictionary</b>key → value</div><div><b>Set</b>unique items only</div><div><b>Today</b>use them for real</div></div>"
 },
 "wrapup": {
  "badge": "Unit 4 · Sprint 4.1 · Session 2 · Wrap-up",
  "name": "Set Showdown",
  "titleHTML": "<span class=\"c1\">S</span><span class=\"c2\">e</span><span class=\"c3\">t</span><br><span class=\"c4\">S</span><span class=\"c5\">h</span><span class=\"c1\">o</span><span class=\"c2\">w</span><span class=\"c3\">d</span><span class=\"c4\">o</span><span class=\"c5\">w</span><span class=\"c1\">n</span>",
  "intro": "Ten challenges from today’s School Store and clubs: predict the output, fix the bug, pick the operator!",
  "rules": [
   "Play on your own device (or with your partner)",
   "Faster answers = more points",
   "3 right in a row = 🔥 streak bonus",
   "Sort cards, order tiles and tap code lines",
   "Watch your name climb on the teacher’s screen"
  ],
  "seconds": 45,
  "points": 100,
  "floaters": [
   "🛒",
   "🎟️",
   "{ }",
   "&",
   "|",
   "-",
   "^",
   "🐍"
  ],
  "topic": "Dictionaries & Sets",
  "exit": {
   "q": "Name one difference between a dictionary and a set, and give one real use for each.",
   "placeholder": "A dictionary… but a set…",
   "model": "A dictionary stores key-value pairs (like item → price), but a set stores only unique values with no keys. Use a dictionary for a store price list and a set to list club members without duplicates."
  },
  "questions": [
   {
    "type": "mc",
    "ctx": "Store",
    "skill": "Apply",
    "q": "prices = {\"pen\": 3}. prices[\"pen\"] = 4. What is prices now?",
    "options": [
     "{\"pen\": 3}",
     "{\"pen\": 4}",
     "{\"pen\": 3, \"pen\": 4}",
     "Error"
    ],
    "answer": 1,
    "why": "Assigning to an existing key UPDATES its value: keys stay unique."
   },
   {
    "type": "line",
    "ctx": "Store",
    "skill": "Analyze",
    "q": "Tap the line that ADDS a new item to the store.",
    "code": [
     "prices = {\"pen\": 3, \"book\": 12}",
     "prices[\"ruler\"] = 5",
     "prices[\"pen\"] = 4",
     "del prices[\"book\"]",
     "for item, cost in prices.items():",
     "    print(item, cost)"
    ],
    "answer": 1,
    "why": "prices[\"ruler\"] = 5 creates a new key-value pair because \"ruler\" was not there yet."
   },
   {
    "type": "mc",
    "ctx": "Safe lookup",
    "skill": "Apply",
    "q": "prices = {\"pen\": 3}. What does prices.get(\"bag\", 0) return?",
    "options": [
     "Error",
     "0",
     "None",
     "\"bag\""
    ],
    "answer": 1,
    "why": "get() returns the default (0) when the key is missing, so there is no KeyError."
   },
   {
    "type": "mc",
    "ctx": "Loop",
    "skill": "Understand",
    "q": "In for item, cost in prices.items():, what is cost?",
    "options": [
     "The key",
     "The value",
     "The index",
     "The dictionary"
    ],
    "answer": 1,
    "why": ".items() gives (key, value) pairs: item is the key, cost is the value."
   },
   {
    "type": "mc",
    "ctx": "Remove duplicates",
    "skill": "Apply",
    "q": "Which code removes duplicates from my_list?",
    "options": [
     "my_list.clear()",
     "list(set(my_list))",
     "set.remove(my_list)",
     "dict(my_list)"
    ],
    "answer": 1,
    "why": "List → set → list: the set drops the duplicates."
   },
   {
    "type": "bins",
    "ctx": "Clubs",
    "skill": "Analyze",
    "seconds": 60,
    "q": "robotics = {\"Ali\", \"Sara\", \"Omar\"}, chess = {\"Sara\", \"Huda\"}. Match each operator to its result.",
    "bins": [
     "robotics & chess",
     "robotics | chess",
     "chess - robotics"
    ],
    "items": [
     {
      "t": "{\"Sara\"}",
      "b": 0
     },
     {
      "t": "{\"Ali\", \"Sara\", \"Omar\", \"Huda\"}",
      "b": 1
     },
     {
      "t": "{\"Huda\"}",
      "b": 2
     }
    ],
    "why": "& = in both · | = in either · - = in the first set but not the second."
   },
   {
    "type": "mc",
    "ctx": "Multiples",
    "skill": "Apply",
    "q": "m2 = {2, 4, 6, 8, 10, 12}, m3 = {3, 6, 9, 12}. What is m2 & m3?",
    "options": [
     "{6, 12}",
     "{2, 3, 4}",
     "{2, 4, 8, 10}",
     "{}"
    ],
    "answer": 0,
    "why": "Numbers that are multiples of BOTH 2 and 3: 6 and 12."
   },
   {
    "type": "mc",
    "ctx": "Bug hunt",
    "skill": "Evaluate",
    "q": "clubs = {}. clubs.add(\"Art\") crashes! Why?",
    "options": [
     "add() needs two values",
     "{} is an empty DICTIONARY, not a set",
     "Sets cannot hold strings",
     "\"Art\" is too short"
    ],
    "answer": 1,
    "why": "{} makes an empty dictionary. Use clubs = set() for an empty set."
   },
   {
    "type": "order",
    "ctx": "Login",
    "skill": "Apply",
    "seconds": 55,
    "q": "Put the login program steps in order.",
    "sub": "Tap the tiles in order.",
    "tiles": [
     "Compare with users[username]",
     "Ask for the username",
     "Store users in a dictionary",
     "Ask for the password with getpass"
    ],
    "answer": [
     "Store users in a dictionary",
     "Ask for the username",
     "Ask for the password with getpass",
     "Compare with users[username]"
    ],
    "why": "Load the dictionary, ask for the username, hide the password with getpass, then check the key's value."
   },
   {
    "type": "mc",
    "ctx": "Choose",
    "skill": "Evaluate",
    "q": "You need the price of each item in the canteen. Which structure fits best?",
    "options": [
     "A set",
     "A dictionary",
     "A tuple of prices only",
     "A single string"
    ],
    "answer": 1,
    "why": "Item → price is a key-value pair: a dictionary."
   }
  ],
  "endHTML": "<div class=\"recap\"><div><b>Dictionary</b>prices[\"pen\"] = 4</div><div><b>Set</b>list(set(my_list))</div><div><b>Operators</b>| & - ^</div></div>"
 }
};
