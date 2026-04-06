
import type { ReactNode } from "react";

export interface Skill {
  name: string;
  icon: ReactNode;
}

export interface SkillGroup {
  title: string;
  summary: string;
  skills: Skill[];
}

export interface Project {
  title: string;
  description: string;
  summary: string;
  highlights: string[];
  tags: string[];
  repoUrl: string;
  liveUrl?: string;
  demoUrl?: string;
  role?: string;
  year?: string;
  status?: string;
  featured?: boolean;
}

export interface NavLink {
  name: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: ReactNode;
}

export type ProjectDetailSectionId =
  | "overview"
  | "highlights"
  | "stack"
  | "contact";
