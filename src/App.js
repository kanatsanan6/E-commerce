import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetail from "./routes/ProductDetail";
import Home from './routes/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
