import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Details from "./pages/Details";
import CreateClothing from "./pages/CreateClothing";
import EditClothing from "./pages/EditClothing";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/roupa/:id"
          element={<Details />}
        />

        <Route
          path="/nova-peca"
          element={<CreateClothing />}
        />

        <Route
          path="/editar/:id"
          element={<EditClothing />}
        />
      </Routes>
    </BrowserRouter>
  );
}