import React from "react";
import type {
  NavLink,
  Project,
  Skill,
  SkillGroup,
  SocialLink,
} from "./types";
import {
  BunIcon,
  CssIcon,
  DockerIcon,
  ExpressIcon,
  GitIcon,
  GinIcon,
  HtmlIcon,
  JavaScriptIcon,
  MongoIcon,
  MysqlIcon,
  NextjsIcon,
  NodejsIcon,
  NuxtjsIcon,
  PostgresqlIcon,
  ReactIcon,
  RedisIcon,
  TailwindIcon,
  VuejsIcon,
} from "./src/components/icons/TechIcons";
import {
  EmailIcon,
  GithubIcon,
  InstagramIcon,
  LinkedInIcon,
} from "./src/components/icons/UtilityIcons";

const icon = (Component: React.ComponentType) => React.createElement(Component);

export const SITE_CONTENT = {
  name: "Rizaldi Abyannata",
  initials: "RA",
  title: "Backend-focused Full-Stack Developer",
  heroEyebrow: "Editorial-tech portfolio",
  heroDescription:
    "I build backend-heavy products with clear APIs, practical data models, and web interfaces that stay fast, readable, and easy to maintain.",
  heroSupportingCopy:
    "Currently studying Informatics Engineering while shipping full-stack and backend systems with Node.js, Express.js, Bun.js, React, Vue, and Next.js.",
  availability:
    "Actively seeking internships, freelance projects, and product teams that need reliable backend execution.",
  aboutParagraphs: [
    "I am a 7th-semester Informatics Engineering student at Universitas Mataram, expected to graduate in 2026, with hands-on experience delivering real web products and backend services.",
    "Most of my work lives where product requirements meet implementation detail: API design, database architecture, service logic, and frontend delivery that supports the experience instead of fighting it.",
    "I care about maintainable systems, strong technical fundamentals, and shipping work that helps a team move from idea to release without unnecessary complexity.",
  ],
  contactTitle: "Ready for useful work.",
  contactDescription:
    "If you need someone who can own backend-heavy features, shape dependable APIs, and still care about the product surface, I am open to the conversation.",
  email: "mail@rizaldiabyannata.dev",
  footerNote: "Designed and built by Rizaldi Abyannata",
};

export const NAV_LINKS: NavLink[] = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "#contact" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/rizaldiabyannata",
    icon: icon(GithubIcon),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rizaldi-abyannata-1093571b5/",
    icon: icon(LinkedInIcon),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/abyannata___/",
    icon: icon(InstagramIcon),
  },
  {
    label: "Email",
    href: `mailto:${SITE_CONTENT.email}`,
    icon: icon(EmailIcon),
  },
];

const backendSkills: Skill[] = [
  { name: "Node.js", icon: icon(NodejsIcon) },
  { name: "Express.js", icon: icon(ExpressIcon) },
  { name: "Bun.js", icon: icon(BunIcon) },
  { name: "Gin", icon: icon(GinIcon) },
];

const frontendSkills: Skill[] = [
  { name: "JavaScript", icon: icon(JavaScriptIcon) },
  { name: "React.js", icon: icon(ReactIcon) },
  { name: "Vue.js", icon: icon(VuejsIcon) },
  { name: "Next.js", icon: icon(NextjsIcon) },
  { name: "Nuxt.js", icon: icon(NuxtjsIcon) },
  { name: "Tailwind CSS", icon: icon(TailwindIcon) },
  { name: "HTML5", icon: icon(HtmlIcon) },
  { name: "CSS3", icon: icon(CssIcon) },
];

const dataSkills: Skill[] = [
  { name: "MySQL", icon: icon(MysqlIcon) },
  { name: "MongoDB", icon: icon(MongoIcon) },
  { name: "PostgreSQL", icon: icon(PostgresqlIcon) },
  { name: "Redis", icon: icon(RedisIcon) },
];

const workflowSkills: Skill[] = [
  { name: "Docker", icon: icon(DockerIcon) },
  { name: "Git", icon: icon(GitIcon) },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Backend Systems",
    summary:
      "Service logic, API contracts, auth flows, and implementation paths designed for maintainability.",
    skills: backendSkills,
  },
  {
    title: "Frontend Delivery",
    summary:
      "Modern interfaces built to support product clarity, responsiveness, and readable user flows.",
    skills: frontendSkills,
  },
  {
    title: "Data Layer",
    summary:
      "Relational and document databases shaped around practical data models and application needs.",
    skills: dataSkills,
  },
  {
    title: "Workflow",
    summary:
      "Tooling that keeps development repeatable, collaborative, and easier to ship with confidence.",
    skills: workflowSkills,
  },
];

export const PROJECTS_DATA: Project[] = [
  {
    title: "HepiBite - Food Delivery & Management Platform",
    description:
      "A full-stack e-commerce platform for food delivery connecting snack lovers with vendors. Built to support ordering, operational management, and real-time coordination across the customer and admin experience.",
    summary:
      "Full-stack food delivery product combining customer ordering, vendor operations, and admin analytics.",
    highlights: [
      "Built multi-variant product ordering and voucher discount flows for the commerce experience.",
      "Integrated real-time delivery coordination with WhatsApp-based tracking updates.",
      "Delivered admin CRUD and analytics coverage for products, categories, partners, and orders.",
    ],
    tags: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Tailwind CSS",
      "Shadcn UI",
    ],
    repoUrl: "https://github.com/rizaldiabyannata/HepiBite",
    role: "Full-stack developer",
    status: "Shipped",
    featured: true,
  },
  {
    title: "Company Profile - CV. POLLACHEIAL NETWORK",
    description:
      "Served as the sole developer in designing, developing, and launching a complete company profile website with an efficient Node.js backend and a responsive Vue.js interface.",
    summary:
      "End-to-end company profile delivery spanning backend implementation and responsive frontend execution.",
    highlights: [
      "Owned the project from design through launch as the sole developer.",
      "Built a responsive Vue.js interface designed around a company profile presentation flow.",
      "Implemented the supporting Node.js and Express.js backend for the site delivery.",
    ],
    tags: ["Node.js", "Express.js", "Vue.js", "Solo Delivery"],
    repoUrl: "https://github.com/rizaldiabyannata",
    role: "Sole developer",
    status: "Delivered",
  },
  {
    title: "Backend for Company Profile - PT. TOTAL DESAIN KONSULTAN",
    description:
      "An ongoing backend project for a professional company profile website, focused on database architecture and dependable REST API delivery.",
    summary:
      "Backend foundation work for a professional company profile, centered on architecture and API design.",
    highlights: [
      "Designed the database structure to support content and system growth cleanly.",
      "Built RESTful APIs for the core company profile data flow.",
      "Focused the implementation on a stable backend foundation for continued delivery.",
    ],
    tags: ["Node.js", "Express.js", "API Design", "Database Architecture"],
    repoUrl: "https://github.com/rizaldiabyannata/TDK-be",
    role: "Backend developer",
    status: "In progress",
  },
  {
    title: "Personal Finance Mobile App Backend (Academic)",
    description:
      "Developed the backend API service for a mobile app that helps users manage personal finances while also coordinating the team workflow as project manager.",
    summary:
      "Academic backend project for personal finance tracking with added delivery ownership across the team.",
    highlights: [
      "Developed the API layer used by the mobile application for finance management flows.",
      "Handled backend responsibilities around feature delivery and service structure.",
      "Coordinated team workflow as project manager to keep milestones on track.",
    ],
    tags: ["Node.js", "Express.js", "API Development", "Project Management"],
    repoUrl: "https://github.com/rizaldiabyannata/fintrack-be",
    role: "Backend developer and project manager",
    status: "Academic",
  },
];
