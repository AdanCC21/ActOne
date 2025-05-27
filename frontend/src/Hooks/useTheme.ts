import { useContext } from "react";
import { ThemeContext } from "../context/AppContext";

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        return false;
    }
    const { isLightMode, setIsLightMode } = context;
    return { isLightMode, setIsLightMode }
}