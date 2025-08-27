import React from 'react';
import type { Project, Skill } from './types';
import { 
  NodejsIcon, DockerIcon, ReactIcon, MongoIcon, VuejsIcon, NextjsIcon, 
  NuxtjsIcon, TailwindIcon, JavaScriptIcon, HtmlIcon, CssIcon, BunIcon, 
  MysqlIcon, GitIcon, 
  ExpressIcon
} from './src/app/components/icons/TechIcons';

export const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export const SKILLS_DATA: { [key: string]: Skill[] } = {
  'Backend': [
    { name: 'Node.js', icon: React.createElement(NodejsIcon) },
    { name: 'Express.js', icon: React.createElement(ExpressIcon) },
    { name: 'Bun.js', icon: React.createElement(BunIcon) },
  ],
  'Frontend': [
    { name: 'JavaScript', icon: React.createElement(JavaScriptIcon) },
    { name: 'React.js', icon: React.createElement(ReactIcon) },
    { name: 'Vue.js', icon: React.createElement(VuejsIcon) },
    { name: 'Next.js', icon: React.createElement(NextjsIcon) },
    { name: 'Nuxt.js', icon: React.createElement(NuxtjsIcon) },
    { name: 'Tailwind CSS', icon: React.createElement(TailwindIcon) },
    { name: 'HTML5', icon: React.createElement(HtmlIcon) },
    { name: 'CSS3', icon: React.createElement(CssIcon) },
  ],
  'Database': [
      { name: 'MySQL', icon: React.createElement(MysqlIcon) },
      { name: 'MongoDB', icon: React.createElement(MongoIcon) },
  ],
  'Others': [
    { name: 'Docker', icon: React.createElement(DockerIcon) },
    { name: 'Git', icon: React.createElement(GitIcon) },
  ]
};

export const PROJECTS_DATA: Project[] = [
  {
    title: 'Company Profile - CV. POLLACHEIAL NETWORK',
    description: 'Served as the sole developer in designing, developing, and launching a complete company profile website. Built an efficient backend using Node.js & Express.js and an interactive, responsive UI with Vue.js.',
    tags: ['Node.js', 'Express.js', 'Vue.js', 'Solo Developer'],
    repoUrl: 'https://github.com/rizaldiabyannata',
  },
  {
    title: 'Backend for Company Profile - PT. TOTAL DESAIN KONSULTAN',
    description: 'An ongoing project to develop a robust backend system for a professional company profile website. Responsibilities include designing the database architecture and building RESTful APIs.',
    tags: ['Node.js', 'Express.js', 'API Design', 'Database Architecture'],
    repoUrl: 'https://github.com/rizaldiabyannata',
  },
  {
    title: 'Personal Finance Mobile App Backend (Academic)',
    description: 'Developed the complete backend API service for a mobile app that helps users track and manage personal finances. Also took on the role of Project Manager to coordinate team workflow and ensure project milestones were met.',
    tags: ['Node.js', 'Express.js', 'API Development', 'Project Management'],
    repoUrl: 'https://github.com/rizaldiabyannata',
  },
];