import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CommentsPage } from "./pages/CommentsPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CommentsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
