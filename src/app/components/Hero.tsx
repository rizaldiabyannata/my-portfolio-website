"use client";
import React, { useState, useEffect } from 'react';
import CanvasScene from './Canvas';

const Hero: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="min-h-screen flex items-center -mt-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 w-full">
        <div className="flex flex-col md:flex-row items-center justify-center w-full">
          <div className={`w-full mt-40 md:w-1/2 ${isMounted ? 'fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <h1 className="text-brand font-mono text-lg mb-4">Hi, my name is</h1>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold text-lightest-slate mb-2">Rizaldi Abyannata.</h2>
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-light-slate mb-6">I build robust backends & dynamic frontends.</h3>
            <p className="max-w-xl text-lg text-light-slate mb-8">
              A proactive 7th-semester Informatics Engineering student with practical experience as a Full-Stack Developer. I specialize in building robust backend systems with Node.js and bringing ideas to life on the web.
            </p>
            <a href="#contact"
               onClick={(e) => {
                 e.preventDefault();
                 document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
               }}
               className="inline-block font-mono text-brand border border-brand rounded px-8 py-4 text-lg hover:bg-brand/10 transition-all duration-300">
              Get In Touch
            </a>
          </div>
          <div className="w-full md:w-1/2 h-[50vh] md:h-[80vh] flex items-center justify-center">
            <CanvasScene />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;