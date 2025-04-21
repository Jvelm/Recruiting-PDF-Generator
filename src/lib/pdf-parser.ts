// src/lib/pdf-parser.ts
export interface ParsedResume {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  experience: Array<{
    title: string;
    company: string;
    dateRange: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    dateRange: string;
  }>;
  skills: string[];
  yearsOfExperience?: number;
}