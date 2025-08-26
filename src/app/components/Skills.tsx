"use client";
import React, { useState, useEffect, useRef } from 'react';
import { SKILLS_DATA } from '../../../constants';
import SectionTitle from './SectionTitle';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills: React.FC = () => {
  const sectionRef = useRef(null);
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
    gsap.set(title, { autoAlpha: 0, y: -50 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
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

    const skillCategories = gsap.utils.toArray<HTMLElement>('.skill-category');
    skillCategories.forEach(category => {
      const categoryTitle = category.querySelector('h3');
      const skills = gsap.utils.toArray<HTMLElement>(category.querySelectorAll('.skill-item'));

      gsap.set([categoryTitle, ...skills], { autoAlpha: 0 });

      const categoryTl = gsap.timeline({
        scrollTrigger: {
          trigger: category,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });

      if(categoryTitle) {
          categoryTl.to(categoryTitle, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
          });
      }

      categoryTl.to(skills, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power3.out'
      }, "-=0.5");
    });

  }, [isMounted]);

  return (
    <section id="skills" ref={sectionRef} className="py-24">
      <div className="section-title">
        <SectionTitle number="2" title="My Skills" />
      </div>
      <div className="space-y-12">
        {Object.entries(SKILLS_DATA).map(([category, skills]) => (
          <div key={category} className="skill-category">
            <h3 className="text-xl font-bold text-lightest-slate mb-6">{category}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {skills.map((skill) => (
                <div key={skill.name} className="skill-item flex flex-col items-center justify-center p-4 bg-light-navy rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 mb-3 text-brand">{skill.icon}</div>
                  <p className="font-mono text-light-slate text-center">{skill.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
