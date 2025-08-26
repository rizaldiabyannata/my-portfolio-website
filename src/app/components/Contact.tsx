"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const children = Array.from(el.children);

    gsap.from(children, {
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 20,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power3.out'
    });
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-24 text-center max-w-2xl mx-auto">
      <h2 className="text-brand font-mono text-lg mb-4">04. What&apos;s Next?</h2>
      <h3 className="text-4xl md:text-5xl font-bold text-lightest-slate mb-4">Get In Touch</h3>
      <p className="text-slate text-lg mb-10">
        I&apos;m actively seeking new opportunities and collaborations. My inbox is always open. Whether you have a question or just want to connect, feel free to reach out!
      </p>
      <a
        href="mailto:mail@rizaldiabyannata.dev"
        className="inline-block font-mono text-brand border border-brand rounded px-8 py-4 text-lg hover:bg-brand/10 transition-all duration-300"
      >
        Say Hello
      </a>
    </section>
  );
};

export default Contact;