import { Toaster } from "react-hot-toast";
import Board from "./components/Board/Board";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Board />
    </>
  );
}

export default App;

