import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import CreateGame from "./routes/CreateGame";
import Layout from "./routes/Layout";
import Leaderboard from "./routes/Leaderboard";
import Info from "./routes/Info";
import JoinGame from "./routes/JoinGame";
import ActiveGames from "./routes/ActiveGames"
import Game from "./routes/Game";
import NotFound from "./routes/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="create-game" element={<CreateGame />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="info" element={<Info />} />
            <Route path="join-game" element={<JoinGame />} />
            <Route path="active-games" element={<ActiveGames />} />
            <Route path="game/:gameId/:player" element={<Game />} />
            <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);