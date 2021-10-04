import React, { useState } from "react";
import { ThemeProvider } from "@material-ui/core";

import AppRouter from "./routes/AppRouter";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeaderState from "./context/HeaderState";

import { theme } from "./theme/theme";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = (isSidebarOpen: boolean) => {
    setIsSidebarOpen(isSidebarOpen);
  };

  return (
    <HeaderState.Provider value={{ isSidebarOpen, toggleSidebar } as any}>
      <ThemeProvider theme={theme}>
        <Header />
        <main>
          <AppRouter />
          <div className={isSidebarOpen ? "overlay" : ""}></div>
        </main>
        <Footer />
      </ThemeProvider>
    </HeaderState.Provider>
  );
}

export default App;
