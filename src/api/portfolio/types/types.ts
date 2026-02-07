// 포트폴리오 타입 정의

export interface Project {
  id: number;
  title: string;
  description: string;
  period: string;
  role: string;
  team: string;
  skills: string[];
  features: string[];
  troubleshooting: {
    problem: string;
    solutions: string[];
  }[];
  github?: string;
}

export interface Education {
  id: number;
  institution: string;
  period: string;
  description: string;
}

export interface Certificate {
  id: number;
  name: string;
  date: string;
  organization: string;
}

export interface Activity {
  id: number;
  title: string;
  period: string;
  description: string;
}

export interface About {
  name: string;
  title: string;
  slogan: string;
  introduction: string;
  email: string;
  blogUrl: string;
  githubUrl: string;
  profileImage: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface PortfolioData {
  about: About;
  skills: SkillCategory[];
  projects: Project[];
  education: Education[];
  certificates: Certificate[];
  activities: Activity[];
}