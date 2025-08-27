"use client"
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SocialLinks from "./components/SocialLinks";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Hero from "./components/Hero";
import Contact from "./components/Contact";
import ParallaxSection from './components/ParallaxSection';

const parallaxImg1 = "https://images.unsplash.com/photo-1597733336794-12d05021d510?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YWJzdHJhY3QlMjB0ZWNoJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D";
const parallaxImg2 = "https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWJzdHJhY3QlMjB0ZWNoJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D";


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

        <ParallaxSection imageUrl={parallaxImg1} />

        <div className="container mx-auto px-6 md:px-12 lg:px-24">
            <Skills />
            <Projects />
        </div>

        <ParallaxSection imageUrl={parallaxImg2} />

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
