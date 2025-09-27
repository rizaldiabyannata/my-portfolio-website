"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "../../components/icons/TechIcons";
import { Button } from "@/components/ui/button";

export const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const current = resolvedTheme || theme;

  if (!mounted) {
    return (
      <Button variant="brand" size="icon" disabled aria-label="Toggle theme">
        …
      </Button>
    );
  }

  const isDark = current === "dark";

  return (
    <Button
      variant="brand"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group"
    >
      {isDark ? (
        <SunIcon className="p-2 group-active:scale-90 transition-transform" />
      ) : (
        <MoonIcon className="p-2 group-active:scale-90 transition-transform" />
      )}
    </Button>
  );
};

export default ThemeToggle;
