"use client";
import React, { useEffect, useRef } from 'react';
import { SKILLS_DATA } from '../../../constants';
import SectionTitle from './SectionTitle';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills: React.FC = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    const title = el.querySelector('.section-title');
    const skillCategories = el.querySelectorAll('.skill-category');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    tl.from(title, {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: 'power3.out'
    });

    skillCategories.forEach(category => {
      const categoryTitle = category.querySelector('h3');
      const skills = category.querySelectorAll('.skill-item');

      const categoryTl = gsap.timeline({
        scrollTrigger: {
          trigger: category,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });

      categoryTl.from(categoryTitle, {
        opacity: 0,
        y: -30,
        duration: 0.8,
        ease: 'power3.out'
      }).from(skills, {
        opacity: 0,
        y: 20,
        scale: 0.9,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power3.out'
      }, "-=0.5");
    });

  }, []);

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
