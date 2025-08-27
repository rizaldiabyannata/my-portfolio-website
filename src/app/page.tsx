"use client"
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SocialLinks from "./components/SocialLinks";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Hero from "./components/Hero";
import Contact from "./components/Contact";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  if (!isMounted) {
    return (
      <div className="bg-navy w-screen h-screen flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="bg-navy text-slate font-sans leading-relaxed antialiased">
      <Header />
      <SocialLinks />

      <Hero />

      <main>
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
            <About />
        </div>


        <div className="container mx-auto px-6 md:px-12 lg:px-24">
            <Skills />
            <Projects />
        </div>


        <div className="container mx-auto px-6 md:px-12 lg:px-24">
            <Contact />
        </div>
      </main>
      
      <footer className="text-center py-6">
        <p className="text-slate text-sm font-mono">
          Designed & Built by Rizaldi Abyannata
        </p>
      </footer>
    </div>
  );
}
