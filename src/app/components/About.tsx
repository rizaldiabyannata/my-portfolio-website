"use client";
import React, { useEffect, useRef } from 'react';
import SectionTitle from './SectionTitle';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    const title = el.querySelector('.section-title');
    const paragraphs = el.querySelectorAll('p');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none'
      }
    });

    tl.from(title, {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: 'power3.out'
    }).from(paragraphs, {
      opacity: 0,
      y: 20,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power3.out'
    }, "-=0.5");

  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24">
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