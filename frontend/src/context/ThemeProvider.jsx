import { useState } from "react";
import { ThemeContext } from "./AppContext";

export default function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("dark");

    return (
        <ThemeContext.Provider value={{ theme, setTheme }} >
            {children}
        </ThemeContext.Provider >

    )
}