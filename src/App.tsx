import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Header } from "./components/Header";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen">
      <Router>
        <div>
          <Header>
            <Navbar />
          </Header>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
