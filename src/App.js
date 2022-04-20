import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from './routes/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/product/:id" element={<ProductDetail/>} /> */}
        {/* <Route path="/" element={<Home/>} />
        <Route path="/" element={<Home/>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
