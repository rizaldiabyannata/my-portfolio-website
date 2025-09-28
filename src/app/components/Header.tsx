"use client";
import React, { useState, useEffect, useRef } from "react";
import { NAV_LINKS } from "../../../constants";
import { gsap } from "gsap";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 200);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    const headerElement = headerRef.current;
    if (!headerElement) return;

    gsap.set(headerElement, { y: -100, opacity: 0 });
    gsap.set(".logo", { y: -20, opacity: 0 });
    gsap.set(".nav-link", { y: -20, opacity: 0 });

    gsap.to(headerElement, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
    });

    gsap.to(".logo", {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.3,
    });

    gsap.to(".nav-link", {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.1,
      delay: 0.5,
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMounted]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-[500] transition-all duration-300 ${
        scrolled ? "bg-background/80 shadow-lg backdrop-blur-sm" : ""
      }`}
    >
      <nav className="container mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between h-20">
        <div className="logo text-brand text-2xl font-mono font-bold transition-transform duration-300 hover:scale-110">
          <a href="#">RA</a>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="nav-link text-foreground font-mono hover:text-brand transition-colors duration-300"
            >
              <span className="text-brand mr-1">0{index + 1}.</span>
              {link.name}
            </a>
          ))}
          <Button
            asChild
            variant="brand"
            size="sm"
            className="nav-link font-mono"
          >
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              Resume
            </a>
          </Button>
          <ThemeToggle />
        </div>

        {/* Mobile Actions (Theme toggle + Menu button) */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className="text-brand"
              >
                <span className="sr-only">Open menu</span>
                {/* Simple hamburger icon */}
                <span className="flex flex-col gap-1">
                  <span className="block w-5 h-0.5 bg-current"></span>
                  <span className="block w-5 h-0.5 bg-current"></span>
                  <span className="block w-5 h-0.5 bg-current"></span>
                </span>
              </Button>
            </SheetTrigger>
            <SheetContent aria-label="Mobile navigation menu">
              <SheetTitle className="sr-only">
                Mobile navigation menu
              </SheetTitle>
              <nav className="mt-10 flex flex-col gap-6">
                {NAV_LINKS.map((link, index) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-foreground font-mono text-lg hover:text-brand transition-colors duration-200"
                  >
                    <span className="text-brand mr-2 text-sm">
                      0{index + 1}.
                    </span>
                    {link.name}
                  </a>
                ))}
                <Button asChild variant="brand" className="font-mono mt-4">
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
      </nav>

      {/* Mobile Menu controlled via Sheet now */}
    </header>
  );
};

export default Header;
