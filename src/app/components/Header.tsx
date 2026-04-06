"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { motion } from "motion/react";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { NAV_LINKS, SITE_CONTENT } from "../../../constants";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveHash("");
      return;
    }

    const sections = NAV_LINKS.filter((link) => link.href.startsWith("#"))
      .map((link) => document.querySelector(link.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveHash(`#${visible.target.id}`);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.1, 0.35, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const activeHref = useMemo(() => {
    if (pathname.startsWith("/blog")) {
      return "/blog";
    }

    if (pathname === "/") {
      return activeHash;
    }

    return "";
  }, [activeHash, pathname]);

  const indicatorHref = hoveredHref ?? activeHref;

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    const isHashLink = href.startsWith("#");

    if (!isHashLink || pathname !== "/") {
      setIsMenuOpen(false);
      return;
    }

    event.preventDefault();
    const target = document.querySelector(href);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveHash(href);
    }

    setIsMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        <motion.div
          layout
          className={`flex w-full items-center justify-between rounded-full border px-4 py-3 backdrop-blur-xl transition-colors duration-200 sm:px-5 ${
            scrolled
              ? "border-border/80 bg-background/82 shadow-xl shadow-black/10 dark:shadow-black/30"
              : "border-border/60 bg-background/62"
          }`}
        >
          <Link
            href="/"
            className="flex items-center gap-3 rounded-full border border-primary/25 bg-primary/10 px-3 py-2"
          >
            <span className="font-heading text-lg font-semibold text-foreground">
              {SITE_CONTENT.initials}
            </span>
            <span className="hidden font-mono text-[0.68rem] uppercase tracking-[0.24em] text-primary/80 sm:block">
              portfolio
            </span>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            <nav className="flex items-center gap-1 rounded-full border border-border/70 bg-card/70 p-1">
              {NAV_LINKS.map((link) => {
                const isHashLink = link.href.startsWith("#");
                const resolvedHref = isHashLink ? `/${link.href}` : link.href;
                const isActive =
                  activeHref === link.href ||
                  (link.href === "/blog" && pathname.startsWith("/blog"));

                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setHoveredHref(link.href)}
                    onMouseLeave={() => setHoveredHref(null)}
                  >
                    {indicatorHref === link.href ? (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-full border border-primary/20 bg-primary/12"
                        transition={{ type: "spring", stiffness: 320, damping: 30 }}
                      />
                    ) : null}
                    <Link
                      href={resolvedHref}
                      onClick={(event) => handleNavClick(event, link.href)}
                      className={`relative z-10 inline-flex items-center rounded-full px-4 py-2 text-sm transition-colors ${
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </div>
                );
              })}
            </nav>

            <Button asChild variant="default" size="sm">
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                Resume
              </a>
            </Button>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Open navigation menu"
                  className="bg-card/70"
                >
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="border-l-border/70 bg-background/96 px-6 py-16">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <div className="mb-10 space-y-3">
                  <p className="font-heading text-2xl font-semibold text-foreground">
                    {SITE_CONTENT.name}
                  </p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {SITE_CONTENT.title}
                  </p>
                </div>

                <nav className="flex flex-col gap-3">
                  {NAV_LINKS.map((link) => {
                    const isHashLink = link.href.startsWith("#");
                    const resolvedHref = isHashLink ? `/${link.href}` : link.href;

                    return (
                      <Link
                        key={link.name}
                        href={resolvedHref}
                        onClick={(event) => handleNavClick(event, link.href)}
                        className="rounded-[1.2rem] border border-border/70 bg-card/70 px-4 py-4 text-base text-foreground transition-colors hover:border-primary/35 hover:bg-accent/70"
                      >
                        {link.name}
                      </Link>
                    );
                  })}

                  <Button asChild variant="default" className="mt-3">
                    <a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Resume
                    </a>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
