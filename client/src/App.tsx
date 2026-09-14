import { Chatbox } from "./components/Chatbox";
import { Sidebar } from "./components/Sidebar";

function App() {
  return (
    <div className="flex h-screen bg-violet-100">
      <Sidebar />
      <main className="flex-1 flex items-center justify-center p-6">
        <Chatbox />
      </main>
    </div>
  );
}

export default App;
