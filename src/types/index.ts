export type ToolId =
  | "cursor"
  | "move"
  | "marquee"
  | "lasso"
  | "brush"
  | "pen"
  | "text"
  | "crop"
  | "colorpicker";

export type SectionId =
  | "hero"
  | "about"
  | "projects"
  | "experience"
  | "skills"
  | "achievements"
  | "campus"
  | "resume"
  | "contact";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  status: "live" | "wip" | "archived";
  role: string;
  team: number;
  duration: string;
  linesOfCode: string;
  impact: string;
  github?: string;
  demo?: string;
  color: string;
  accentColor: string;
  architecture: string[];
  challenges: string[];
  gallery?: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  duration: string;
  type: "internship" | "leadership" | "project" | "hackathon";
  description: string;
  achievements: string[];
  color: string;
  logo: string;
}

export interface Skill {
  name: string;
  category: string;
  level: number; // 0-100
  years: number;
  icon: string;
}

export interface Achievement {
  id: string;
  title: string;
  event: string;
  year: string;
  description: string;
  icon: string;
  color: string;
}

export interface BrushStroke {
  id: string;
  points: { x: number; y: number }[];
  color: string;
  width: number;
}

export interface FloatingWindow {
  id: string;
  type: "project" | "panel";
  x: number;
  y: number;
  width: number;
  height: number;
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
  data?: Project;
}
