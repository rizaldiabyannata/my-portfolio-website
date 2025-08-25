"use client";
import React, { useState, useEffect } from 'react';
import { SKILLS_DATA } from '../../../constants';
import SectionTitle from './SectionTitle';

const Skills: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section id="skills" className="py-24">
      <SectionTitle number="2" title="My Skills" />
      <div className="space-y-12">
        {Object.entries(SKILLS_DATA).map(([category, skills], index) => (
          <div
            key={category}
            className={`${isMounted ? 'fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <h3 className="text-xl font-bold text-lightest-slate mb-6">{category}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {skills.map((skill) => (
                <div key={skill.name} className="flex flex-col items-center justify-center p-4 bg-light-navy rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
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
