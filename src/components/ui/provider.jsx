"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ThemeProvider, useTheme } from "next-themes";
import { useEffect } from "react";

function ThemeClassSync({ children }) {
  const { resolvedTheme } = useTheme();
  const themeClass = resolvedTheme === "dark" ? "dark" : "light";

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(themeClass);
    root.style.colorScheme = themeClass;
  }, [themeClass]);

  return (
    <div className={`chakra-theme ${themeClass}`} style={{ minHeight: "100vh" }}>
      {children}
    </div>
  );
}

export function Provider({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      enableSystem={false}
      defaultTheme="light"
      storageKey="chakra-ui-color-mode"
      disableTransitionOnChange
    >
      <ChakraProvider value={defaultSystem}>
        <ThemeClassSync>{children}</ThemeClassSync>
      </ChakraProvider>
    </ThemeProvider>
  );
}
