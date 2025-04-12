// src/app/page.tsx
'use client';

import { useState } from 'react';
import ResumeUploader from '@/components/resume/ResumeUploader';
import CandidateForm, { CandidateFormData } from '@/components/form/CandidateForm';
import { ParsedResume } from '@/lib/pdf-parser';

export default function Home() {
  const [parsedResume, setParsedResume] = useState<ParsedResume | null>(null);
  const [formData, setFormData] = useState<CandidateFormData | null>(null);
  
  const handleParsedResume = (data: ParsedResume) => {
    setParsedResume(data);
    window.scrollTo(0, 0); // Scroll to top when form appears
  };
  
  const handleFormSubmit = (data: CandidateFormData) => {
    setFormData(data);
    console.log('Form submitted:', data);
    // In a real implementation, we would redirect to preview page
    // or generate PDF here
  };
  
  return (
    <main className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Candidate PDF Generator</h1>
      
      {!parsedResume ? (
        <ResumeUploader onParsed={handleParsedResume} />
      ) : (
        <CandidateForm parsedResume={parsedResume} onSubmit={handleFormSubmit} />
      )}
    </main>
  );
}