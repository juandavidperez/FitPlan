import React, { createContext, useState, ReactNode } from "react";

export type Theme = {
  backgroundColor: string;
  secondaryBackgroundColor: string;
  titleColor: string;
  textColor: string;
  highlightColor: string;
  navBarColor: string;
  focusedColor: string;
};

export type ThemeContextType = {
  selected: number;
  handleContextChange: (selectedOption: number) => void;
  themes: Theme[];
};

const modoClaroTheme: Theme = {
  backgroundColor: "#f5f5f5",
  secondaryBackgroundColor: "rgba(78, 150, 209, 0.8)",
  titleColor: "#333",
  textColor: "#333",
  highlightColor: "#00d1ff",
  navBarColor: "#fff",
  focusedColor: "#00d1ff",
};

const modoOscuroTheme: Theme = {
  backgroundColor: "#313131",
  secondaryBackgroundColor: "rgba(106, 90, 205, 0.8)",
  titleColor: "#FFFFFF",
  textColor: "#FFFFFF",
  highlightColor: "#4B4B4B",
  navBarColor: "#000",
  focusedColor: "#6a5acd",
};

const temaNocheTheme: Theme = {
  backgroundColor: "#36465d",
  secondaryBackgroundColor: "#374785",
  titleColor: "#7388A0",
  textColor: "#B2DAFA",
  highlightColor: "#252850",
  navBarColor: "#2C3E50",
  focusedColor: "#b2dafa",
};

const temaFuegoTheme: Theme = {
  backgroundColor: "#FF7F66",
  secondaryBackgroundColor: "#FFA07A",
  titleColor: "#FFFFFF",
  textColor: "#fff",
  highlightColor: "#FF4500",
  navBarColor: "#FF6347",
  focusedColor: "#FFa420",
};

const themes: Theme[] = [
  modoClaroTheme,
  modoOscuroTheme,
  temaNocheTheme,
  temaFuegoTheme,
];

// 🟢 Valor inicial por defecto del contexto
const defaultContext: ThemeContextType = {
  selected: 0,
  handleContextChange: () => {},
  themes,
};

export const ThemeContext = createContext<ThemeContextType>(defaultContext);

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [selected, setSelected] = useState<number>(0);

  const handleContextChange = (selectedOption: number) => {
    setSelected(selectedOption);
  };

  const contextValue: ThemeContextType = {
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
