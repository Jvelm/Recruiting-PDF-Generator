// src/components/form/CandidateForm.tsx
'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ParsedResume } from '@/lib/pdf-parser';

interface CandidateFormProps {
  parsedResume: ParsedResume;
  onSubmit: (data: CandidateFormData) => void;
}

export interface CandidateFormData {
  // Personal info
  fullName: string;
  location: string;
  email: string;
  phone: string;
  
  // Assessment
  englishLevel: string;
  culturalFit: string;
  interviewNotes: string;
  
  // Experience entries from resume
  experience: Array<{
    title: string;
    company: string;
    dateRange: string;
    description: string;
  }>;
  
  // Optional info
  portfolioUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

export default function CandidateForm({ parsedResume, onSubmit }: CandidateFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<CandidateFormData>({
    defaultValues: {
      fullName: parsedResume.personalInfo.name,
      location: parsedResume.personalInfo.location,
      email: parsedResume.personalInfo.email,
      phone: parsedResume.personalInfo.phone,
      experience: parsedResume.experience,
      englishLevel: '',
      culturalFit: '',
      interviewNotes: '',
    }
  });
  
  const submitForm: SubmitHandler<CandidateFormData> = (data) => {
    onSubmit(data);
  };
  
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Candidate Information</h2>
      
      <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
        {/* Personal Information Section */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-medium mb-4">Personal Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                {...register('fullName', { required: 'Name is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                {...register('location')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Please enter a valid email'
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                {...register('phone')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
        
        {/* Assessment Section */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-medium mb-4">Candidate Assessment</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              English Level
            </label>
            <select
              {...register('englishLevel', { required: 'English level is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select English Level</option>
              <option value="Native">Native</option>
              <option value="Fluent">Fluent</option>
              <option value="Advanced">Advanced</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Basic">Basic</option>
            </select>
            {errors.englishLevel && (
              <p className="mt-1 text-sm text-red-600">{errors.englishLevel.message}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cultural Fit
            </label>
            <select
              {...register('culturalFit', { required: 'Cultural fit assessment is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Cultural Fit</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Average">Average</option>
              <option value="Below Average">Below Average</option>
              <option value="Poor">Poor</option>
            </select>
            {errors.culturalFit && (
              <p className="mt-1 text-sm text-red-600">{errors.culturalFit.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interview Notes
            </label>
            <textarea
              {...register('interviewNotes', { required: 'Interview notes are required' })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter detailed notes from the interview..."
            ></textarea>
            {errors.interviewNotes && (
              <p className="mt-1 text-sm text-red-600">{errors.interviewNotes.message}</p>
            )}
          </div>
        </div>
        
        {/* Experience Section */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-medium mb-4">Work Experience</h3>
          
          {parsedResume.experience.map((exp, index) => (
            <div key={index} className="mb-6 p-3 border border-gray-200 rounded-md">
              <div className="grid md:grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title
                  </label>
                  <input
                    type="text"
                    {...register(`experience.${index}.title` as const)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    {...register(`experience.${index}.company` as const)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Range
                </label>
                <input
                  type="text"
                  {...register(`experience.${index}.dateRange` as const)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  {...register(`experience.${index}.description` as const)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                ></textarea>
              </div>
            </div>
          ))}
        </div>
        
        {/* Optional Links */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-medium mb-4">Additional Links (Optional)</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Portfolio URL
              </label>
              <input
                type="url"
                {...register('portfolioUrl')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="https://portfolio.example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                LinkedIn
              </label>
              <input
                type="url"
                {...register('linkedinUrl')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GitHub
              </label>
              <input
                type="url"
                {...register('githubUrl')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="https://github.com/username"
              />
            </div>
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
          >
            Preview PDF
          </button>
        </div>
      </form>
    </div>
  );
}