import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/partials/_global.scss";

import HomePage from "./pages/HomePage/HomePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
