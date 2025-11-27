import React, { useState } from "react";
import "./styles/components.css";
import { Header } from "./_legacy/organisms";
import { ManagementPage } from "./pages/ManagementPage";
import { cn } from "./lib/utils";

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
