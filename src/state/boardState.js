export const initialBoardState = {
    cardsById: {
      "1": {
        id: "1",
        title: "Design UI",
        description: "Create basic Kanban layout",
        priority: "high",
        status: "todo",
      },
      "2": {
        id: "2",
        title: "Setup project",
        description: "Initialize Vite and Tailwind",
        priority: "medium",
        status: "doing",
      },
    },
    columns: {
      todo: ["1"],
      doing: ["2"],
      done: [],
    },
  };
  