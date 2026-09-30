export interface Project {
  id: string;
  title: string;
  category: "Data Analytics" | "Python AI" | "AI Applications";
  description: string;
  longDescription?: string;
  tags: string[];
  image?: string;
  featured?: boolean;
  demoUrl?: string;
  metrics?: { label: string; value: string }[];
  caseStudy?: {
    overview: string;
    challenge: string;
    solution: string;
    results: string[];
    techStack: string[];
    sampleCode?: string;
    chartData?: { name: string; value1: number; value2: number }[];
  };
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  borderColor: string;
  iconColor: string;
  skills: { name: string; level: string; description: string }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  bullets?: string[];
  type: "work" | "education";
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}
