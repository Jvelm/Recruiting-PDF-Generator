// src/components/form/CandidateForm.tsx
'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ParsedResume } from '@/lib/pdf-parser';

interface CandidateFormProps {
  parsedResume: ParsedResume;
  existingData?: CandidateFormData; // Add optional existingData prop
  onSubmit: (data: CandidateFormData) => void;
}

export interface CandidateFormData {
  // Personal info
  fullName: string;
  positionName: string;
  countryOfResidence: string;
  yearsOfExperience: number;
  
  // Assessment
  englishLevel: string;

  fit5: {
    ownership: number;
    collaboration: number;
    impact: number;
    tenacity: number;
    curiosity: number;
  };
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

export default function CandidateForm({ parsedResume, existingData, onSubmit }: CandidateFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<CandidateFormData>({

   defaultValues: {
     // Use existing data if available, otherwise use parsed data
      fullName: existingData?.fullName || parsedResume.personalInfo.name,

     positionName: existingData?.positionName || '',
     countryOfResidence: existingData?.countryOfResidence || '',
     yearsOfExperience: existingData?.yearsOfExperience || 0,
      experience: parsedResume.experience,
     englishLevel: existingData?.englishLevel || '',
      fit5: {
       ownership: existingData?.fit5?.ownership || 8,
       collaboration: existingData?.fit5?.collaboration || 8,
       impact: existingData?.fit5?.impact || 8,
       tenacity: existingData?.fit5?.tenacity || 8,
       curiosity: existingData?.fit5?.curiosity || 8
      },
     interviewNotes: existingData?.interviewNotes || '',
     // Include optional fields if they exist in existing data
     portfolioUrl: existingData?.portfolioUrl || undefined,
     linkedinUrl: existingData?.linkedinUrl || undefined,
     githubUrl: existingData?.githubUrl || undefined
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
                Position Name
              </label>
              <input
                type="text"
                {...register('positionName', { required: 'Position name is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g. Frontend Developer"
              />
              {errors.positionName && (
                <p className="mt-1 text-sm text-red-600">{errors.positionName.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country of Residence
              </label>
              <input
                type="text"
                {...register('countryOfResidence', { required: 'Country is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.countryOfResidence && (
                <p className="mt-1 text-sm text-red-600">{errors.countryOfResidence.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Years of Experience
              </label>
              <input
                type="number"
                {...register('yearsOfExperience', { 
                  required: 'Years of experience is required',
                  min: { value: 0, message: 'Must be a positive number' }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.yearsOfExperience && (
                <p className="mt-1 text-sm text-red-600">{errors.yearsOfExperience.message}</p>
              )}
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

           <label className="block text-sm font-medium text-gray-700 mb-3">
             FIT 5 Assessment
            </label>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">

                 <label className="text-sm text-gray-600">Ownership</label>
                  <span className="text-sm text-gray-600">
                   {[7, 8, 9, 10].map((value) => (
                      <label key={value} className="ml-3 cursor-pointer">
                        <input
                          type="radio"
                          value={value}
                         {...register('fit5.ownership', { required: true })}
                          className="mr-1"
                        />
                        {value}
                      </label>
                    ))}
                  </span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                 <label className="text-sm text-gray-600">Collaboration</label>
                  <span className="text-sm text-gray-600">
                   {[7, 8, 9, 10].map((value) => (
                      <label key={value} className="ml-3 cursor-pointer">
                        <input
                          type="radio"
                          value={value}
                         {...register('fit5.collaboration', { required: true })}
                          className="mr-1"
                        />
                        {value}
                      </label>
                    ))}
                  </span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                 <label className="text-sm text-gray-600">Impact</label>
                  <span className="text-sm text-gray-600">
                   {[7, 8, 9, 10].map((value) => (
                      <label key={value} className="ml-3 cursor-pointer">
                        <input
                          type="radio"
                          value={value}
                         {...register('fit5.impact', { required: true })}
                          className="mr-1"
                        />
                        {value}
                      </label>
                    ))}
                  </span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                 <label className="text-sm text-gray-600">Tenacity</label>
                  <span className="text-sm text-gray-600">
                   {[7, 8, 9, 10].map((value) => (
                      <label key={value} className="ml-3 cursor-pointer">
                        <input
                          type="radio"
                          value={value}
                         {...register('fit5.tenacity', { required: true })}
                          className="mr-1"
                        />
                        {value}
                      </label>
                    ))}
                  </span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                 <label className="text-sm text-gray-600">Curiosity</label>
                  <span className="text-sm text-gray-600">
                   {[7, 8, 9, 10].map((value) => (
                      <label key={value} className="ml-3 cursor-pointer">
                        <input
                          type="radio"
                          value={value}
                         {...register('fit5.curiosity', { required: true })}
                          className="mr-1"
                        />
                        {value}
                      </label>
                    ))}
                  </span>
                </div>
              </div>
            </div>
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
            className="px-5 py-2 bg-[#F12A30] text-white font-medium rounded-md hover:bg-[#d91c22]"
          >
            Preview PDF
          </button>
        </div>
      </form>
    </div>
  );
}