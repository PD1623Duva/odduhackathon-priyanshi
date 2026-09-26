import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const navigate = (page) => {
    setCurrentPage(page);
  };

  if (currentPage === "products") {
    return <Products onNavigate={navigate} />;
  }

  return <Dashboard onNavigate={navigate} />;
}

export default App;