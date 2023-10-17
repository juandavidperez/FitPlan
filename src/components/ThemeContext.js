import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const modoClaroTheme = {
    backgroundColor: "#f5f5f5",
    secondaryBackgroundColor: "rgba(78, 150, 209, 0.8)",
    titleColor: "#000",
    textColor: "#333",
    highlightColor: "#00d1ff",
  };

  const modoOscuroTheme = {
    backgroundColor: "#313131",
    secondaryBackgroundColor: "rgba(106, 90, 205, 0.8)",
    titleColor: "#FFFFFF",
    textColor: "#FFFFFF",
    highlightColor: "#4B4B4B",
  };

  const temaNocheTheme = {
    backgroundColor: "#36465d",
    secondaryBackgroundColor: "#374785",
    titleColor: "#b2dafa",
    textColor: "#B2DAFA",
    highlightColor: "#252850",
  };

  const temaFuegoTheme = {
    backgroundColor: "#FF7F66",
    secondaryBackgroundColor: "#FFA07A",
    titleColor: "#FFFFFF",
    textColor: "#000",
    highlightColor: "#FF4500",
  };

  const themes = [
    modoClaroTheme,
    modoOscuroTheme,
    temaNocheTheme,
    temaFuegoTheme,
  ];

  const [selected, setSelected] = useState(0);

  const handleContextChange = (selectedOption) => {
    setSelected(selectedOption);
  };

  const contextValue = {
    selected,
    handleContextChange,
    themes,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
