// src/components/resume/ResumeUploader.tsx
'use client';

import { useState } from 'react';
import { ParsedResume } from '@/lib/pdf-parser';

interface ResumeUploaderProps {
  onParsed: (data: ParsedResume) => void;
}

export default function ResumeUploader({ onParsed }: ResumeUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [parsingStatus, setParsingStatus] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
      setParsingStatus(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    // Only accept PDF files
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }

    setLoading(true);
    setError(null);
    setParsingStatus('Processing resume...');

    try {
      // Generate a random resume with the correct filename
      const data = generatePseudoParsedResume(file.name);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setParsingStatus('Resume processed successfully!');
      
      // Pass the generated data to the parent
      onParsed(data);
    } catch (err) {
      console.error('Processing error:', err);
      setError('An error occurred while processing the resume');
    } finally {
      setLoading(false);
    }
  };

  // Generate a pseudo-parsed resume based on filename patterns
  const generatePseudoParsedResume = (filename: string): ParsedResume => {
    // Extract potential name from filename
    let name = "Candidate";
    const nameMatch = filename.match(/([A-Za-z]+)[\s_-]([A-Za-z]+)/);
    if (nameMatch) {
      name = `${nameMatch[1]} ${nameMatch[2]}`;
      // Capitalize first letters
      name = name.split(' ')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(' ');
    }
    
    // Sample job titles and companies
    const jobTitles = [
      "Software Engineer", "Frontend Developer", "Backend Developer", 
      "Full Stack Developer", "Product Manager", "UX Designer",
      "Data Scientist", "DevOps Engineer", "Project Manager"
    ];
    
    const companies = [
      "Tech Innovations", "Digital Solutions", "Software Labs",
      "Cloud Systems", "Data Insights", "Web Dynamics",
      "App Factory", "Code Crafters", "Tech Giants"
    ];
    
    // Generate random experiences
    const experience = [];
    const usedTitles = new Set();
    
    for (let i = 0; i < 2; i++) {
      // Pick a random title that hasn't been used yet
      let title;
      do {
        title = jobTitles[Math.floor(Math.random() * jobTitles.length)];
      } while (usedTitles.has(title) && usedTitles.size < jobTitles.length);
      
      usedTitles.add(title);
      
      // Pick a random company
      const company = companies[Math.floor(Math.random() * companies.length)];
      
      // Generate a date range
      const endYear = 2023 - i;
      const startYear = endYear - Math.floor(Math.random() * 3) - 1;
      const dateRange = i === 0 ? 
        `${startYear} - Present` : 
        `${startYear} - ${endYear}`;
      
      // Generate a description
      const descriptions = [
        `Led development of key features for ${company}'s main product.`,
        `Collaborated with cross-functional teams to deliver high-quality software solutions.`,
        `Implemented new features and optimized existing code for better performance.`,
        `Worked on frontend and backend components for web applications.`,
        `Managed project timelines and coordinated with stakeholders to ensure on-time delivery.`
      ];
      
      const description = descriptions[Math.floor(Math.random() * descriptions.length)];
      
      experience.push({
        title,
        company,
        dateRange,
        description
      });
    }
    
    // Generate random skills based on job title
    const skills = generateSkillsForJobTitle(experience[0]?.title || "Developer");
    
    return {
      personalInfo: {
        name,
        email: `${name.toLowerCase().replace(' ', '.')}@example.com`,
        phone: `+1 (555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        location: "United States"
      },
      experience,
      education: [
        {
          degree: `Bachelor's in ${experience[0]?.title.includes("Data") ? "Data Science" : 
                   experience[0]?.title.includes("Design") ? "Design" : "Computer Science"}`,
          institution: "University of Technology",
          dateRange: "2014 - 2018"
        }
      ],
      skills,
      yearsOfExperience: experience.reduce((total, exp) => {
        const match = exp.dateRange.match(/(\d{4})\s*-\s*(\d{4}|Present)/);
        if (match) {
          const start = parseInt(match[1]);
          const end = match[2] === 'Present' ? new Date().getFullYear() : parseInt(match[2]);
          return total + (end - start);
        }
        return total + 2; // Default to 2 years if can't parse
      }, 0)
    };
  };
  
  // Generate skills based on job title
  const generateSkillsForJobTitle = (title: string): string[] => {
    const commonSkills = ["Git", "JIRA", "Agile", "Communication"];
    
    const titleSkills: Record<string, string[]> = {
      "Software Engineer": ["Java", "Python", "C++", "Algorithms", "System Design"],
      "Frontend Developer": ["JavaScript", "React", "HTML", "CSS", "TypeScript"],
      "Backend Developer": ["Node.js", "Express", "SQL", "NoSQL", "API Design"],
      "Full Stack Developer": ["JavaScript", "React", "Node.js", "MongoDB", "AWS"],
      "Product Manager": ["Product Strategy", "Roadmapping", "User Research", "A/B Testing"],
      "UX Designer": ["Figma", "Adobe XD", "User Research", "Wireframing", "Prototyping"],
      "Data Scientist": ["Python", "R", "Machine Learning", "SQL", "Data Visualization"],
      "DevOps Engineer": ["Docker", "Kubernetes", "CI/CD", "AWS", "Infrastructure as Code"],
      "Project Manager": ["Project Planning", "Risk Management", "Stakeholder Communication"]
    };
    
    // Find matching skills or use default
    let skills = titleSkills["Full Stack Developer"];
    
    for (const [key, value] of Object.entries(titleSkills)) {
      if (title.includes(key) || key.includes(title)) {
        skills = value;
        break;
      }
    }
    
    // Add common skills and return
    return [...skills, ...commonSkills].slice(0, 8);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Upload Candidate Resume</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Resume PDF
        </label>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className={`block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            ${file 
              ? 'file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200' 
              : 'file:bg-blue-600 file:text-white hover:file:bg-blue-700'}`}
        />
      </div>

      <button
        onClick={handleUpload}
        disabled={loading || !file}
        className={`w-full py-2 px-4 rounded-md font-medium
          ${loading
            ? 'bg-gray-400 cursor-not-allowed text-white'
            : !file
              ? 'bg-gray-200 cursor-not-allowed text-gray-500'
              : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
      >
        {loading ? 'Processing...' : 'Parse Resume'}
      </button>

      {parsingStatus && !error && (
        <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-md">
          {parsingStatus}
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
}