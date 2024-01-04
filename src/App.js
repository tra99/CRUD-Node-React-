import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from "./pages/create.page";
import BookPage from "./pages/book.page";
import "./style.css"
import Update from "./pages/update.page";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BookPage />} />
          <Route path="/create" element={<Create />} />
          <Route path="/update/:book_id" element={<Update />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
