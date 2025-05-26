import { useState } from "react";
import { ThemeContext } from "./AppContext";
import { BackendRoute } from "./AppContext";

export default function ThemeProvider({ children }) {
    const [lightMode, setTheme] = useState(false);

    return (
        <ThemeContext.Provider value={{ lightMode, setTheme }} >
            {children}
        </ThemeContext.Provider >

    )
}