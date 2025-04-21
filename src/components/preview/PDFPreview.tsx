// src/components/preview/PDFPreview.tsx
'use client';

import React from 'react';
import { CandidateFormData } from '@/components/form/CandidateForm';
import { 
  Search, 
  Star, 
  Globe, 
  Languages,
  Clock,
  Briefcase, 
  GraduationCap, 
} from 'lucide-react';

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
            className="px-4 py-2 bg-[#EF4444] text-white rounded-md hover:bg-[#DC2626]"
          >
            Generate PDF
          </button>
        </div>
      </div>
      
      {/* PDF Preview Container */}
      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        {/* Header */}
        <header className="py-12 px-12 bg-white border-b border-gray-200">
          <h1 className="text-2xl leading-relaxed">
            <span className="text-gray-400 font-light">Hello! My name is </span>
            <span className="text-black font-bold">{candidateData.fullName} </span>
            <span className="text-gray-400 font-light">and I am </span>
            <br />
            <span className="text-gray-400 font-light">a </span>
            <span className="text-black">{candidateData.positionName}</span>
          </h1>
        </header>
        
        {/* Main Content */}
        <main className="px-12 pb-12 bg-white">
          {/* Overview Card */}
          <div className="my-6 border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 bg-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-5 h-5">
                  <Search className="h-5 w-5 text-gray-500" />
                </div>
                <h2 className="font-bold text-sm uppercase tracking-wide">OVERVIEW</h2>
              </div>
              <p className="text-xs leading-relaxed text-gray-700">{candidateData.interviewNotes}</p>
            </div>
          </div>
          
          {/* Two-column layout */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Left Column */}
            <div className="w-full md:w-1/3 space-y-4">
              {/* FIT5 Card */}
              <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 bg-white">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center w-5 h-5">
                      <Star className="h-5 w-5 text-amber-500" />
                    </div>
                    <h2 className="font-bold text-sm uppercase tracking-wide">FIT5</h2>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-xs text-gray-700">{candidateData.fit5.ownership}/10 Ownership</p>
                    <p className="text-xs text-gray-700">{candidateData.fit5.collaboration}/10 Collaboration</p>
                    <p className="text-xs text-gray-700">{candidateData.fit5.impact}/10 Impact</p>
                    <p className="text-xs text-gray-700">{candidateData.fit5.tenacity}/10 Tenacity</p>
                    <p className="text-xs text-gray-700">{candidateData.fit5.curiosity}/10 Curiosity</p>
                  </div>
                </div>
              </div>
              
              {/* Location Card */}
              <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 bg-white">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center w-5 h-5">
                      <Globe className="h-5 w-5 text-amber-500" />
                    </div>
                    <h2 className="font-bold text-sm uppercase tracking-wide">LOCATION</h2>
                  </div>
                  <p className="text-xs text-gray-700">{candidateData.countryOfResidence}</p>
                </div>
              </div>
              
              {/* Languages Card */}
              <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 bg-white">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center w-5 h-5">
                      <Languages className="h-5 w-5 text-amber-500" />
                    </div>
                    <h2 className="font-bold text-sm uppercase tracking-wide">LANGUAGES</h2>
                  </div>
                  <p className="text-xs text-gray-700">{candidateData.englishLevel} (English)</p>
                </div>
              </div>
              
              {/* Experience Card */}
              <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 bg-white">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center w-5 h-5">
                      <Clock className="h-5 w-5 text-amber-500" />
                    </div>
                    <h2 className="font-bold text-sm uppercase tracking-wide">EXPERIENCE</h2>
                  </div>
                  <p className="text-xs text-gray-700">{candidateData.yearsOfExperience} Years</p>
                </div>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="w-full md:w-2/3 space-y-4">
              {/* Work Experience Card */}
              <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 bg-white">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center w-5 h-5">
                      <Briefcase className="h-5 w-5 text-gray-500" />
                    </div>
                    <h2 className="font-bold text-sm uppercase tracking-wide">WORK EXPERIENCE</h2>
                  </div>
                  <div className="space-y-4">
                    {candidateData.experience.map((job, index) => (
                      <div
                        key={index}
                        className={`${
                          index < candidateData.experience.length - 1 
                            ? 'pb-4 border-b border-gray-200' 
                            : ''
                        }`}
                      >
                        <h3 className="font-medium text-xs">{job.title}</h3>
                        <p className="text-[10px] text-gray-500 mb-1">
                          {job.company} | {job.dateRange}
                        </p>
                        <p className="text-xs text-gray-700 leading-relaxed">{job.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Education Card */}
              <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
  <div className="p-6 bg-white">
    <div className="flex items-center gap-3 mb-3">
      <div className="flex items-center justify-center w-5 h-5">
        <GraduationCap className="h-5 w-5 text-gray-500" />
      </div>
      <h2 className="font-bold text-sm uppercase tracking-wide">EDUCATION</h2>
    </div>
    <div className="space-y-4">
      {candidateData.education.map((edu, index) => (
        <div
          key={index}
          className={`${
            index < candidateData.education.length - 1 
              ? 'pb-2 border-b border-gray-200' 
              : ''
          }`}
        >
          <h3 className="font-medium text-xs">{edu.degree}</h3>
          <p className="text-[10px] text-gray-500">{edu.institution} | {edu.dateRange}</p>
        </div>
      ))}
    </div>
  </div>
</div>
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <footer className="bg-red-500 py-4">
          <div className="px-12">
            <div className="text-white text-xl font-bold">=TRUE</div>
          </div>
        </footer>
      </div>
    </div>
  );
}