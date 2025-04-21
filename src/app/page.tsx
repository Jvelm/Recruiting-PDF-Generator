// src/app/page.tsx
'use client';

import { useState } from 'react';
import ResumeUploader from '@/components/resume/ResumeUploader';
import CandidateForm, { CandidateFormData } from '@/components/form/CandidateForm';
import PDFPreview from '@/components/preview/PDFPreview';
import PDFGenerator from '@/components/pdf/PDFGenerator';

import { ParsedResume } from '@/lib/pdf-parser';

export default function Home() {
  const [parsedResume, setParsedResume] = useState<ParsedResume | null>(null);
  const [formData, setFormData] = useState<CandidateFormData | null>(null);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [showPDFGenerator, setShowPDFGenerator] = useState<boolean>(false);
  
  const handleParsedResume = (data: ParsedResume) => {
    setParsedResume(data);
    window.scrollTo(0, 0); // Scroll to top when form appears
  };
  
  const handleFormSubmit = (data: CandidateFormData) => {
    setFormData(data);
    setShowPreview(true);
    setShowPDFGenerator(false);
    window.scrollTo(0, 0); // Scroll to top when preview appears
  };
  
  const handleEditForm = () => {
    setShowPreview(false);
    setShowPDFGenerator(false);
  };
  
  const handleGeneratePDF = () => {
    setShowPDFGenerator(true);
    // Scroll to where the download button will appear
    setTimeout(() => {
      const downloadSection = document.getElementById('pdf-download-section');
      if (downloadSection) {
        downloadSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#F12A30]">
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-white">Candidate PDF Generator</h1>
        
        {!parsedResume && (
          <ResumeUploader onParsed={handleParsedResume} />
        )}
        
        {parsedResume && !showPreview && (
         <CandidateForm 
           parsedResume={parsedResume} 
           existingData={formData || undefined} 
           onSubmit={handleFormSubmit} 
         />)}
        
        {showPreview && formData && (
          <div>
            <PDFPreview 
              candidateData={formData} 
              onEdit={handleEditForm} 
              onGeneratePDF={handleGeneratePDF}
            />
            
            {showPDFGenerator && formData && (
              <div id="pdf-download-section" className="mt-6 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Your PDF is ready!</h2>
                <p className="mb-4">Click the button below to download the candidate's PDF profile:</p>
                <PDFGenerator candidateData={formData} />
                <p className="mt-4 text-sm text-gray-500">
                  Note: The PDF will be downloaded to your device and will open in your default PDF viewer.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}