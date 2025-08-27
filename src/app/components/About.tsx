"use client";
import React, { useState, useEffect, useRef } from 'react';
import SectionTitle from './SectionTitle';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 200);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const el = sectionRef.current;
    if (!el) return;

    const title = el.querySelector('.section-title');
    const paragraphs = gsap.utils.toArray<HTMLElement>(el.querySelectorAll('p'));

    gsap.set([title, ...paragraphs], { autoAlpha: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none'
      }
    });

    if (title) {
        tl.to(title, {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
        });
    }

    tl.to(paragraphs, {
      autoAlpha: 1,
      y: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power3.out'
    }, "-=0.5");

  }, [isMounted]);

  return (
    <section id="about" ref={sectionRef} className="py-24">
      <div className="section-title">
        <SectionTitle number="1" title={t('about.title')} />
      </div>
      <div className="max-w-3xl space-y-4 text-slate text-lg">
        <p>
          {t('about.p1')}
        </p>
        <p>
          {t('about.p2')}
        </p>
        <p>
          {t('about.p3')}
        </p>
      </div>
    </section>
  );
};

export default About;