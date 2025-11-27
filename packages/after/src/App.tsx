import React, { useState } from "react";
// import "./styles/components.css";
import { cn } from "./lib/utils";
import { ManagementPage } from "./pages/ManagementPage";
import { Header } from "./components/header/Header";

export const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={cn("min-h-screen bg-background", darkMode && "dark")}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main>
        <ManagementPage />
      </main>
    </div>
  );
};
