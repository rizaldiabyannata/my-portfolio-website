"use client";
import React from 'react';
import SectionTitle from './SectionTitle';
import { useScrollFadeIn } from '../hooks/useScrollFadeIn';

const About: React.FC = () => {
  const sectionRef = useScrollFadeIn<HTMLElement>();

  return (
    <section id="about" ref={sectionRef} className="py-24 opacity-0">
      <div className="section-title">
        <SectionTitle number="1" title="About Me" />
      </div>
      <div className="max-w-3xl space-y-4 text-slate text-lg">
        <p>
          Hello! I&apos;m Rizaldi, a proactive and disciplined 7th-semester Informatics Engineering student at Universitas Mataram (expected graduation in 2026), with practical experience as a Full-Stack Developer.
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