"use client";

import { IconButton } from "@chakra-ui/react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function useColorMode() {
  const { resolvedTheme, setTheme } = useTheme();
  const colorMode = resolvedTheme ?? "light";
  const toggleColorMode = () => {
    setTheme(colorMode === "dark" ? "light" : "dark");
  };
  return {
    colorMode,
    setColorMode: setTheme,
    toggleColorMode,
  };
}

export function useColorModeValue(light, dark) {
  const { colorMode } = useColorMode();
  return colorMode === "dark" ? dark : light;
}

export function ColorModeButton(props) {
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = (resolvedTheme ?? "light") === "dark";
  return (
    <IconButton
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      variant="outline"
      size="sm"
      {...props}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </IconButton>
  );
}
