
import React from 'react';
import { PROJECTS_DATA } from '../../../constants';
import SectionTitle from './SectionTitle';
import { FolderIcon, GithubIcon, ExternalLinkIcon } from './icons/UtilityIcons';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24">
      <SectionTitle number="3" title="Things I've Built" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS_DATA.map((project, index) => (
          <div 
            key={project.title} 
            className="bg-light-navy p-7 rounded-lg shadow-md flex flex-col justify-between hover:-translate-y-2 transition-transform duration-300"
            style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.15}s forwards`, opacity: 0 }}
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
