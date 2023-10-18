import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const modoClaroTheme = {
    backgroundColor: "#f5f5f5",
    secondaryBackgroundColor: "rgba(78, 150, 209, 0.8)",
    titleColor: "#333",
    textColor: "#333",
    highlightColor: "#00d1ff",
    navBarColor: "#fff",
    focusedColor: "#00d1ff",
  };

  const modoOscuroTheme = {
    backgroundColor: "#313131",
    secondaryBackgroundColor: "rgba(106, 90, 205, 0.8)",
    titleColor: "#FFFFFF",
    textColor: "#FFFFFF",
    highlightColor: "#4B4B4B",
    navBarColor: "#000",
    focusedColor: "#6a5acd",
  };

  const temaNocheTheme = {
    backgroundColor: "#36465d",
    secondaryBackgroundColor: "#374785",
    titleColor: "#7388A0",
    textColor: "#B2DAFA",
    highlightColor: "#252850",
    navBarColor: "#2C3E50",
    focusedColor: "#b2dafa",
  };

  const temaFuegoTheme = {
    backgroundColor: "#FF7F66",
    secondaryBackgroundColor: "#FFA07A",
    titleColor: "#FFFFFF",
    textColor: "#fff",
    highlightColor: "#FF4500",
    navBarColor: "#FF6347",
    focusedColor: "#FFa420",
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
