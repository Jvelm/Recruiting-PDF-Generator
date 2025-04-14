// src/app/page.tsx
'use client';

import { useState } from 'react';
import ResumeUploader from '@/components/resume/ResumeUploader';
import CandidateForm, { CandidateFormData } from '@/components/form/CandidateForm';
import PDFPreview from '@/components/preview/PDFPreview';
import { ParsedResume } from '@/lib/pdf-parser';

export default function Home() {
  const [parsedResume, setParsedResume] = useState<ParsedResume | null>(null);
  const [formData, setFormData] = useState<CandidateFormData | null>(null);
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const handleParsedResume = (data: ParsedResume) => {
    setParsedResume(data);
    window.scrollTo(0, 0);
  };
  
  const handleFormSubmit = (data: CandidateFormData) => {
    setFormData(data);
   setShowPreview(true);
    console.log('Form submitted:', data);

  };
  
  const handleEditForm = () => {
       setShowPreview(false);
    };
     
    const handleGeneratePDF = () => {
    console.log('Generating PDF with data:', formData);
    };

  return (
    <div className="min-h-screen bg-[#F12A30]">
    <main className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">Branded Resume Generator</h1>
      
      {!parsedResume && (
        <ResumeUploader onParsed={handleParsedResume} />
       )}
       {parsedResume && !showPreview && (
         <CandidateForm parsedResume={parsedResume} onSubmit={handleFormSubmit} />
       )}
       
       {showPreview && formData && (
         <PDFPreview 
           candidateData={formData} 
           onEdit={handleEditForm} 
           onGeneratePDF={handleGeneratePDF}
         />
)}

    </main>
  </div>
  );
}