"use client";
import React, { useState, useEffect, useRef } from 'react';
import CanvasScene from './Canvas';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
    const heroRef = useRef(null);
    const canvasContainerRef = useRef(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setIsMounted(true), 200);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        const heroElements = [
            ".hero-title",
            ".hero-name",
            ".hero-subtitle",
            ".hero-description",
            ".hero-button"
        ];

        gsap.set(heroElements, { opacity: 0, y: 20 });

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.to(".hero-title", { opacity: 1, y: 0, duration: 0.8, delay: 0.2 })
          .to(".hero-name", { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
          .to(".hero-subtitle", { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
          .to(".hero-description", { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
          .to(".hero-button", { opacity: 1, y: 0, duration: 0.8 }, "-=0.6");

        if (canvasContainerRef.current) {
            gsap.to(canvasContainerRef.current, {
                y: '80vh',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                    pin: canvasContainerRef.current,
                }
            });
        }
    }, [isMounted]);

  return (
    <section ref={heroRef} className="min-h-screen flex items-center -mt-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 w-full">
        <div className="flex flex-col md:flex-row items-center justify-center w-full">
          <div className="w-full mt-40 md:w-1/2">
            <h1 className="hero-title text-brand font-mono text-lg mb-4">Hi, my name is</h1>
            <h2 className="hero-name text-4xl sm:text-6xl md:text-7xl font-bold text-lightest-slate mb-2">Rizaldi Abyannata.</h2>
            <h3 className="hero-subtitle text-4xl sm:text-5xl md:text-6xl font-bold text-light-slate mb-6">I build robust backends & dynamic frontends.</h3>
            <p className="hero-description max-w-xl text-lg text-light-slate mb-8">
              A proactive 7th-semester Informatics Engineering student with practical experience as a Full-Stack Developer. I specialize in building robust backend systems with Node.js and bringing ideas to life on the web.
            </p>
            <a href="#contact"
               onClick={(e) => {
                 e.preventDefault();
                 const contactEl = document.querySelector('#contact');
                 if (contactEl) {
                    contactEl.scrollIntoView({ behavior: 'smooth' });
                 }
               }}
               className="hero-button btn-glow inline-block font-mono text-brand border border-brand rounded px-8 py-4 text-lg hover:bg-brand/10 transition-all duration-300">
              Get In Touch
            </a>
          </div>
          <div ref={canvasContainerRef} className="w-full md:w-1/2 h-[50vh] md:h-[80vh] flex items-center justify-center">
            <CanvasScene />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;