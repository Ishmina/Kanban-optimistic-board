# Kanban Board with Optimistic Updates

This project is a Kanban board built using **React + Vite**, focused on implementing **optimistic UI updates**, **error rollback**, and **drag-and-drop interactions** using a mocked API.

The main goal of this assignment was to handle frontend state correctly when API calls fail, while keeping the user experience fast and responsive.

---

## Tech Stack

- React (with Vite)
- JavaScript
- Tailwind CSS
- @hello-pangea/dnd (drag & drop)
- react-hot-toast (notifications)

No backend or paid external services are used.

---

## Project Setup

The project was set up using the **official documentation** of each tool.

### React + Vite
- Project scaffolded using Vite's official React template  
- Reference: https://vitejs.dev/guide/

### Tailwind CSS
- Tailwind CSS configured using the official Tailwind + Vite guide  
- PostCSS and Autoprefixer added as recommended  
- Tailwind directives included in the global CSS file  

Reference: https://tailwindcss.com/docs/guides/vite

---

## Running the Project Locally

```bash
git clone <https://github.com/Ishmina/Kanban-optimistic-board>
cd kanban-board
npm install
npm run dev
```

The application runs at:

http://localhost:5173

---

## Features Implemented

### Kanban Board

Three fixed columns:

- Todo
- Doing
- Done

### Card Structure

Each card contains:

```json
{
  "id": "",
  "title": "",
  "description": "",
  "priority": ""
}
```

### Card Actions

- Create new cards using a top task creator
- Edit existing cards
- Delete cards
- Drag cards across columns

### Drag & Drop

- Implemented using @hello-pangea/dnd
- Cards update position immediately on drop
- Layout remains stable during drag using placeholders

---

## Optimistic UI Updates & Rollback

All user actions (create, edit, delete, drag) follow the same optimistic pattern:

1. The UI updates immediately

2. A mocked API request runs in the background

3. If the API request fails:
   - The previous state is restored automatically
   - A toast error message is shown to the user

To support rollback, a deep copy of the current state is saved before each operation. If the API throws an error, that saved state is restored.

All optimistic logic is centralized inside a custom hook, keeping UI components focused only on rendering.

---

## Mocked API

- Simulates real network latency (~600ms)
- Randomly fails around 15% of the time
- Helps demonstrate optimistic updates and rollback without a real backend

This matches the assignment requirement of a 10–20% random failure rate.

---

## Folder Structure

```
src/
├── api/
│   └── fakeApi.js          // Mocked API with random failure
├── components/
│   ├── board/
│   │   ├── Board.jsx
│   │   ├── Column.jsx
│   │   └── TaskCreator.jsx
│   └── card/
│       └── Card.jsx
├── hooks/
│   └── useKanban.js        // Centralized state & optimistic logic
├── utils/
│   └── randomFailure.js
└── App.jsx
```

---

## Assumptions & Tradeoffs

- New cards always start in the Todo column
- Card IDs are generated using Date.now() for simplicity
- State is stored in memory only (no persistence)
- State structure is kept simple instead of fully normalized for readability

---

## Known Limitations

- Data resets on page refresh
- No reordering within the same column
- No handling for concurrent rapid actions
- No keyboard navigation for drag & drop

---

## What I Would Improve With More Time

- Add persistence using localStorage or a backend
- Add unit tests for the core state logic
- Improve accessibility (keyboard support, ARIA roles)
- Handle concurrent mutations more safely
- Add undo functionality for destructive actions

---
