import React from "react";
import { ThemeProvider } from "@material-ui/core";
import AppRouter from "./routes/AppRouter";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { theme } from "./theme/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <main>
        <AppRouter />
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
