"use client";
import React from 'react';
import { PROJECTS_DATA } from '../../../constants';
import SectionTitle from './SectionTitle';
import { FolderIcon, GithubIcon, ExternalLinkIcon } from './icons/UtilityIcons';
import { useScrollFadeIn } from '../hooks/useScrollFadeIn';
import { gsap } from 'gsap';

const Projects: React.FC = () => {
  const sectionRef = useScrollFadeIn<HTMLElement>();

  React.useEffect(() => {
    const projectCards = gsap.utils.toArray<HTMLElement>(".project-card");
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { y: -10, duration: 0.3, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' });
        });
    });
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-24 opacity-0">
      <div className="section-title">
        <SectionTitle number="3" title="Things I've Built" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS_DATA.map((project) => (
          <div
            key={project.title}
            className="project-card bg-light-navy p-7 rounded-lg shadow-md flex flex-col justify-between transition-transform duration-300"
          >
            <div>
              <div className="flex justify-between items-center mb-6">
                <div className="text-brand w-10 h-10">
                  <FolderIcon />
                </div>
                <div className="flex items-center space-x-4">
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-light-slate hover:text-brand transition-colors duration-300 w-6 h-6">
                    <GithubIcon />
                  </a>
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-light-slate hover:text-brand transition-colors duration-300 w-6 h-6">
                      <ExternalLinkIcon />
                    </a>
                  )}
                </div>
              </div>
              <h3 className="text-xl font-bold text-lightest-slate mb-3 group-hover:text-brand transition-colors duration-300">{project.title}</h3>
              <p className="text-slate text-base mb-6">{project.description}</p>
            </div>
            <ul className="flex flex-wrap font-mono text-sm text-slate">
              {project.tags.map(tag => (
                <li key={tag} className="mr-4 mb-2">{tag}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
