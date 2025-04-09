import { useState } from "react";
import { ThemeContext } from "./AppContext";
import { BackendRoute } from "./AppContext";

export default function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("dark");

    return (
        <ThemeContext.Provider value={{ theme, setTheme, BackendRoute }} >
            {children}
        </ThemeContext.Provider >

    )
}