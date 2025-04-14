// src/components/preview/PDFPreview.tsx
'use client';

import React from 'react';
import { CandidateFormData } from '@/components/form/CandidateForm';

interface PDFPreviewProps {
  candidateData: CandidateFormData;
  onEdit: () => void;
  onGeneratePDF: () => void;
}

export default function PDFPreview({ 
  candidateData, 
  onEdit, 
  onGeneratePDF 
}: PDFPreviewProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Preview PDF</h2>
        <div className="flex space-x-3">
          <button 
            onClick={onEdit}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Edit Information
          </button>
          <button 
            onClick={onGeneratePDF}
            className="px-4 py-2 bg-[#F12A30] text-white rounded-md hover:bg-[#d91c22]"
          >
            Generate PDF
          </button>
        </div>
      </div>
      
      {/* PDF Preview Display */}
      <div className="border border-gray-200 rounded-lg p-8 max-w-4xl mx-auto">
        {/* Candidate Header */}
        
          <h1 className="text-3xl font-bold text-gray-800">{candidateData.fullName}</h1>
          <div className="flex flex-wrap text-gray-600 mt-2">
          <div className="mr-4">{candidateData.countryOfResidence}</div>
            <div className="mr-4">{candidateData.email}</div>
            <div>{candidateData.phone}</div>
          </div>
          {(candidateData.linkedinUrl || candidateData.githubUrl || candidateData.portfolioUrl) && (
            <div className="flex flex-wrap text-blue-600 mt-2">
              {candidateData.linkedinUrl && (
                <div className="mr-4">LinkedIn: {candidateData.linkedinUrl}</div>
              )}
              {candidateData.githubUrl && (
                <div className="mr-4">GitHub: {candidateData.githubUrl}</div>
              )}
              {candidateData.portfolioUrl && (
                <div>Portfolio: {candidateData.portfolioUrl}</div>
              )}
            </div>
          )}
    
        
        {/* Candidate Assessment */}
        
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Candidate Assessment</h2>
         
          <div>
    <span className="font-medium">Position:</span> {candidateData.positionName}
  </div>
  <div>
    <span className="font-medium">Years of Experience:</span> {candidateData.yearsOfExperience}
  </div>
  <div>
    <span className="font-medium">Country:</span> {candidateData.countryOfResidence}
  </div>
  <div>
    <span className="font-medium">English Level:</span> {candidateData.englishLevel}
  </div>
          
          <div>
            <div className="mb-4">
    <h3 className="text-lg font-medium mb-2">Cultural Fit Assessment</h3>
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
      <div className="border rounded p-2 text-center">
        <div className="font-medium">Teamwork</div>
        <div className="text-xl mt-1">{candidateData.culturalFit.teamwork}/5</div>
      </div>
      <div className="border rounded p-2 text-center">
        <div className="font-medium">Communication</div>
        <div className="text-xl mt-1">{candidateData.culturalFit.communication}/5</div>
      </div>
      <div className="border rounded p-2 text-center">
        <div className="font-medium">Adaptability</div>
        <div className="text-xl mt-1">{candidateData.culturalFit.adaptability}/5</div>
      </div>
      <div className="border rounded p-2 text-center">
        <div className="font-medium">Problem Solving</div>
        <div className="text-xl mt-1">{candidateData.culturalFit.problemSolving}/5</div>
      </div>
      <div className="border rounded p-2 text-center">
        <div className="font-medium">Leadership</div>
        <div className="text-xl mt-1">{candidateData.culturalFit.leadership}/5</div>
      </div>
    </div>
  </div>
            <h3 className="text-lg font-medium mb-2">Interview Notes</h3>
            <p className="text-gray-700 whitespace-pre-line">{candidateData.interviewNotes}</p>
          </div>
    
        
        {/* Work Experience */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Work Experience</h2>
          {candidateData.experience.map((exp, index) => (
            <div key={index} className="mb-5">
              <div className="flex justify-between mb-1">
                <h3 className="text-lg font-medium">{exp.title}</h3>
                <span className="text-gray-600">{exp.dateRange}</span>
              </div>
              <div className="text-gray-800 mb-1">{exp.company}</div>
              <p className="text-gray-700">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}