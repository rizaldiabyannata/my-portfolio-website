"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "../../components/icons/TechIcons";

export const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        disabled
        aria-label="Theme switcher loading"
      >
        <span className="font-mono text-xs">...</span>
      </Button>
    );
  }

  const currentTheme = resolvedTheme || theme;
  const isDark = currentTheme === "dark";

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group border-border/70 bg-card/70 backdrop-blur-sm"
    >
      {isDark ? (
        <SunIcon className="size-4 transition-transform duration-200 group-active:scale-90" />
      ) : (
        <MoonIcon className="size-4 transition-transform duration-200 group-active:scale-90" />
      )}
    </Button>
  );
};

export default ThemeToggle;
