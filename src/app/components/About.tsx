"use client";
import React, { useState, useEffect } from 'react';
import SectionTitle from './SectionTitle';

const About: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section id="about" className={`py-24 ${isMounted ? 'fade-in-up' : 'opacity-0'}`}>
      <SectionTitle number="1" title="About Me" />
      <div className="max-w-3xl space-y-4 text-slate text-lg">
        <p>
          Hello! I&apos;m Rizaldi, a proactive and disciplined 6th-semester Informatics Engineering student at Universitas Mataram (expected graduation in 2026), with practical experience as a Full-Stack Developer.
        </p>
        <p>
          I am skilled in building robust backend systems using Node.js (with Express.js and Bun.js) and developing dynamic frontend interfaces with technologies like Vue.js, React.js, and Next.js. My expertise also includes Docker, RESTful API integration, and database management with MySQL and MongoDB.
        </p>
        <p>
          As a quick learner, I am enthusiastic about applying my skills to build high-performance professional websites. I am ready to contribute effectively and bring technical value to a collaborative team environment.
        </p>
      </div>
    </section>
  );
};

export default About;