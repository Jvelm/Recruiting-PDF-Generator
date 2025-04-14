// src/components/form/CandidateForm.tsx
'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ParsedResume } from '@/lib/pdf-parser';

interface CandidateFormProps {
  parsedResume: ParsedResume;
  onSubmit: (data: CandidateFormData) => void;
}

export interface CandidateFormData {
  // Personal info from resume
  fullName: string;
  email: string;
  phone: string;
  
  // Recruiter mandatory inputs
 positionName: string;
 countryOfResidence: string;
 yearsOfExperience: number;
  englishLevel: string;

 culturalFit: {
   teamwork: number;
   communication: number;
   adaptability: number;
   problemSolving: number;
   leadership: number;
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

export default function CandidateForm({ parsedResume, onSubmit }: CandidateFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<CandidateFormData>({
    defaultValues: {
      fullName: parsedResume.personalInfo.name,
      email: parsedResume.personalInfo.email,
      phone: parsedResume.personalInfo.phone,
      experience: parsedResume.experience,
     positionName: '',
     countryOfResidence: '',
     yearsOfExperience: 0,
      englishLevel: '',

     culturalFit: {
       teamwork: 3,
       communication: 3,
       adaptability: 3,
       problemSolving: 3,
       leadership: 3
     },
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
           <label className="block text-sm font-medium text-gray-700 mb-3">
             Cultural Fit Assessment (1-5)
           </label>
           
           <div className="space-y-3">
             <div>
               <div className="flex justify-between mb-1">
                 <label className="text-sm text-gray-600">Teamwork</label>
                 <span className="text-sm text-gray-600">
                   {[1, 2, 3, 4, 5].map((value) => (
                     <label key={value} className="ml-3 cursor-pointer">
                       <input
                         type="radio"
                         value={value}
                         {...register('culturalFit.teamwork', { required: true })}
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
                 <label className="text-sm text-gray-600">Communication</label>
                 <span className="text-sm text-gray-600">
                   {[1, 2, 3, 4, 5].map((value) => (
                     <label key={value} className="ml-3 cursor-pointer">
                       <input
                         type="radio"
                         value={value}
                         {...register('culturalFit.communication', { required: true })}
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
                 <label className="text-sm text-gray-600">Adaptability</label>
                 <span className="text-sm text-gray-600">
                   {[1, 2, 3, 4, 5].map((value) => (
                     <label key={value} className="ml-3 cursor-pointer">
                       <input
                         type="radio"
                         value={value}
                         {...register('culturalFit.adaptability', { required: true })}
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
                 <label className="text-sm text-gray-600">Problem Solving</label>
                 <span className="text-sm text-gray-600">
                   {[1, 2, 3, 4, 5].map((value) => (
                     <label key={value} className="ml-3 cursor-pointer">
                       <input
                         type="radio"
                         value={value}
                         {...register('culturalFit.problemSolving', { required: true })}
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
                 <label className="text-sm text-gray-600">Leadership</label>
                 <span className="text-sm text-gray-600">
                   {[1, 2, 3, 4, 5].map((value) => (
                     <label key={value} className="ml-3 cursor-pointer">
                       <input
                         type="radio"
                         value={value}
                         {...register('culturalFit.leadership', { required: true })}
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