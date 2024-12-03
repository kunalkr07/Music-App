import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Navbar />
    <Hero />
    <Footer />
  </StrictMode>
);
