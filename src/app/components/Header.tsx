"use client"
import React, { useState, useEffect, useRef } from 'react';
import { NAV_LINKS } from '../../../constants';
import { gsap } from 'gsap';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    gsap.from(headerRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });

    gsap.from(".logo", {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.3
      });

    gsap.from(".nav-link", {
      y: -20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.1,
      delay: 0.5
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header ref={headerRef} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-light-navy/80 shadow-lg backdrop-blur-sm' : ''}`}>
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
              <span className="text-brand mr-1">0{index + 1}.</span>{link.name}
            </a>
          ))}
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="nav-link font-mono text-brand border border-brand rounded px-4 py-2 hover:bg-brand/10 transition-colors duration-300">
            Resume
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-brand z-50 relative w-8 h-8">
            <span className={`block absolute h-0.5 w-full bg-current transform transition duration-500 ease-in-out ${isMenuOpen ? 'rotate-45' : '-translate-y-2'}`}></span>
            <span className={`block absolute h-0.5 w-full bg-current transform transition duration-500 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block absolute h-0.5 w-full bg-current transform transition duration-500 ease-in-out ${isMenuOpen ? '-rotate-45' : 'translate-y-2'}`}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed top-0 right-0 h-full w-3/4 bg-light-navy transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {NAV_LINKS.map((link, index) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-lightest-slate font-mono text-lg hover:text-brand transition-colors duration-300"
            >
              <span className="text-brand block text-center mb-1">0{index + 1}.</span>{link.name}
            </a>
          ))}
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="font-mono text-lg text-brand border border-brand rounded px-6 py-3 hover:bg-brand/10 transition-colors duration-300 mt-4">
            Resume
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;