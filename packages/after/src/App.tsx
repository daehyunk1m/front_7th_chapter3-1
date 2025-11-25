import React from "react";
import { Header } from "./components/organisms";
import { ManagementPage } from "./pages/ManagementPage";
import "./styles/components.css";

export const App: React.FC = () => {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f7fafc" }}>
      <Header />
      <main>
        <div className='bg-blue-500 text-white p-4'>test</div>
        <ManagementPage />
      </main>
    </div>
  );
};
