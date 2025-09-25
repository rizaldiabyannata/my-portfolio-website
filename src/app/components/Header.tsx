"use client";
import React, { useState, useEffect, useRef } from "react";
import { NAV_LINKS } from "../../../constants";
import { gsap } from "gsap";

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
        scrolled ? "bg-light-navy/80 shadow-lg backdrop-blur-sm" : ""
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
              className="nav-link text-lightest-slate font-mono hover:text-brand transition-colors duration-300"
            >
              <span className="text-brand mr-1">0{index + 1}.</span>
              {link.name}
            </a>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link font-mono text-brand border border-brand rounded px-4 py-2 hover:bg-brand/10 transition-colors duration-300"
          >
            Resume
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-brand z-[220] relative w-8 h-8 flex flex-col justify-center items-center focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span
              className={`block absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                isMenuOpen ? "rotate-45 translate-y-0" : "-translate-y-1.5"
              }`}
            ></span>
            <span
              className={`block absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`block absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                isMenuOpen ? "-rotate-45 translate-y-0" : "translate-y-1.5"
              }`}
            ></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[200] md:hidden">
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-[#0a192f]/80 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Menu Panel */}
          <aside
            className={`absolute right-0 top-0 h-full w-[85vw] max-w-sm bg-light-navy shadow-2xl ring-1 ring-white/10 transform transition-transform duration-300 ease-out ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            } z-[210]`}
            aria-label="Mobile navigation"
          >
            <nav className="flex flex-col h-full pt-[calc(env(safe-area-inset-top)+6rem)] pb-10 px-6 gap-6 overflow-y-auto">
              {NAV_LINKS.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-lightest-slate font-mono text-xl hover:text-brand transition-colors duration-200 text-left"
                >
                  <span className="text-brand mr-2 text-sm">0{index + 1}.</span>
                  {link.name}
                </a>
              ))}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center font-mono text-base text-brand border border-brand rounded px-5 py-3 hover:bg-brand/10 transition-colors duration-200"
              >
                Resume
              </a>
            </nav>
          </aside>
        </div>
      )}
    </header>
  );
};

export default Header;
