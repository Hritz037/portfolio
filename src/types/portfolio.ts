export type ProjectCategory = 'all' | 'fullstack' | 'systems' | 'ai_canvas' | 'fintech' | 'opensource';

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ArchitectureTier {
  name: string;
  technology: string;
  responsibility: string;
  dataFlow: string;
}

export interface ArchitectureTradeoff {
  decision: string;
  chosenApproach: string;
  alternativeConsidered: string;
  rationale: string;
}

export interface ArchitectureDiagramNode {
  step: number;
  label: string;
  tech: string;
  protocol: string;
  detail: string;
}

export interface ProjectArchitecture {
  systemOverview: string;
  diagramFlow: ArchitectureDiagramNode[];
  layers: ArchitectureTier[];
  tradeoffs: ArchitectureTradeoff[];
  resilienceMechanisms: string[];
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  year: string;
  role: string;
  clientOrContext: string;
  overview: string;
  challenge: string;
  architectureSolution: string;
  architecture?: ProjectArchitecture;
  metrics: ProjectMetric[];
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  image: string;
  featured: boolean;
}

export interface SkillItem {
  name: string;
  proficiency: number; // 0 - 100
  experienceYears: number;
  featured?: boolean;
}

export interface SkillCategoryGroup {
  id: string;
  name: string;
  description: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: string;
  current?: boolean;
  summary: string;
  achievements: string[];
  technologies: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  honors?: string;
  focus: string;
}

export interface SocialProfile {
  id: string;
  platform: 'github' | 'linkedin' | 'twitter' | 'email';
  label: string;
  url: string;
  handle: string;
  displayHint: string;
}

export interface ProfileData {
  name: string;
  roleTitle: string;
  headline: string;
  email: string;
  location: string;
  availability: string;
  yearsExperience: number;
  shippedProjectsCount: number;
  usersReachedCount: string;
  bioIntro: string;
  bioParagraphs: string[];
  principles: Array<{
    title: string;
    description: string;
  }>;
  socials: SocialProfile[];
}
