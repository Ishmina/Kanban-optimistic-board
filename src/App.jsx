import { Toaster } from "react-hot-toast";
import Board from "./components/board/Board";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-pink-50 to-sky-100">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#fff',
            borderRadius: '16px',
            padding: '14px 20px',
            fontSize: '14px',
            fontWeight: '600',
            boxShadow: '0 10px 40px -10px rgba(102, 126, 234, 0.5)',
          },
          success: {
            style: {
              background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
            },
          },
          error: {
            style: {
              background: 'linear-gradient(135deg, #eb3349 0%, #f45c43 100%)',
            },
          },
        }}
      />
      <Board />
    </div>
  );
}
