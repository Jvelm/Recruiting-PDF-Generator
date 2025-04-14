// src/components/resume/ResumeUploader.tsx
'use client';

import { useState } from 'react';
import { ParsedResume, parseResumePDF } from '@/lib/pdf-parser';

interface ResumeUploaderProps {
  onParsed: (data: ParsedResume) => void;
}

export default function ResumeUploader({ onParsed }: ResumeUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
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

    try {
      // For now, we'll use the local mock implementation
      const fileBuffer = await file.arrayBuffer();
      const parsedData = await parseResumePDF(fileBuffer);
      
      // Call the callback to notify parent component
      onParsed(parsedData);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
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
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>

      <button
        onClick={handleUpload}
        disabled={loading || !file}
        className={`w-full py-2 px-4 rounded-md font-medium text-white
          ${loading || !file 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-[#F6F5F4] hover:bg-[#E6E5E4] text-gray-800'}`}
      >
        {loading ? 'Processing...' : 'Parse Resume'}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
}