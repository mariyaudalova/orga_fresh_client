import React, { useState } from "react";
import { ThemeProvider } from "@material-ui/core";
import AppRouter from "./routes/AppRouter";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { theme } from "./theme/theme";
import HeaderState from "./context/HeaderState";

function App() {
  const [isSidebarOpen, serIsSidebarOpen] = useState(false);

  const toggleSidebar = (isSidebarOpen) => {
    console.log("from toggle", isSidebarOpen);
    serIsSidebarOpen(isSidebarOpen);
  };

  return (
    <HeaderState.Provider value={{ isSidebarOpen, toggleSidebar }}>
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
