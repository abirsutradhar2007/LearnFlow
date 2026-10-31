import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Layout from "./layouts/layout";

import Home from "./pages/Home";
import Generate from "./pages/Generate";
import Material from "./pages/Material";
import Quiz from "./pages/Quiz";
import AllVideos from "./pages/AllVideos";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/generate" element={<Generate />} />

          <Route path="/materials/:videoId" element={<Material />} />
          <Route path="/materials/:videoId/quiz" element={<Quiz />} />
          <Route path="/videos" element={<AllVideos />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);