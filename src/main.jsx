import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Header from "./components/Header";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Header/>
    <Navbar />
    <Hero />
    <Footer />
  </StrictMode>
);
