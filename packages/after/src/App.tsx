import React from "react";
import "./styles/components.css";
import { Header } from "./_legacy/organisms";
import { ManagementPage } from "./pages/ManagementPage";

export const App: React.FC = () => {
  return (
    <div className='min-h-screen bg-[#f7fafc]'>
      <Header />
      <main>
        <ManagementPage />
      </main>
    </div>
  );
};
