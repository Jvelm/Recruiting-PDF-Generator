// src/components/pdf/PDFGenerator.tsx
'use client';

import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { CandidateFormData } from '@/components/form/CandidateForm';

interface PDFGeneratorProps {
  candidateData: CandidateFormData;
}

// Define styles for PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    borderBottom: '1px solid #ccc',
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contactInfo: {
    fontSize: 10,
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  contactItem: {
    marginRight: 15,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subsection: {
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  company: {
    fontSize: 11,
  },
  dateRange: {
    fontSize: 10,
    color: '#666',
  },
  description: {
    fontSize: 10,
    marginTop: 3,
    lineHeight: 1.4,
  },
  assessmentRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  assessmentLabel: {
    fontWeight: 'bold',
    fontSize: 10,
    width: 100,
  },
  assessmentValue: {
    fontSize: 10,
  },
  notesTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  notes: {
    fontSize: 10,
    lineHeight: 1.4,
  },
});

// PDF Document component
const CandidatePDF = ({ candidateData }: PDFGeneratorProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header with candidate info */}
      <View style={styles.header}>
        <Text style={styles.name}>{candidateData.fullName}</Text>
        <View style={styles.contactInfo}>
          <Text style={styles.contactItem}>{candidateData.countryOfResidence}</Text>
          <Text style={styles.contactItem}>{candidateData.email}</Text>
          <Text style={styles.contactItem}>{candidateData.phone}</Text>
        </View>
        {(candidateData.linkedinUrl || candidateData.githubUrl || candidateData.portfolioUrl) && (
          <View style={styles.contactInfo}>
            {candidateData.linkedinUrl && (
              <Text style={styles.contactItem}>LinkedIn: {candidateData.linkedinUrl}</Text>
            )}
            {candidateData.githubUrl && (
              <Text style={styles.contactItem}>GitHub: {candidateData.githubUrl}</Text>
            )}
            {candidateData.portfolioUrl && (
              <Text style={styles.contactItem}>Portfolio: {candidateData.portfolioUrl}</Text>
            )}
          </View>
        )}
      </View>

      {/* Candidate Assessment */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Candidate Assessment</Text>
        <View style={styles.assessmentRow}>
          <Text style={styles.assessmentLabel}>Position:</Text>
          <Text style={styles.assessmentValue}>{candidateData.positionName}</Text>
        </View>
        <View style={styles.assessmentRow}>
          <Text style={styles.assessmentLabel}>Experience:</Text>
          <Text style={styles.assessmentValue}>{candidateData.yearsOfExperience} years</Text>
        </View>
        <View style={styles.assessmentRow}>
          <Text style={styles.assessmentLabel}>Country:</Text>
          <Text style={styles.assessmentValue}>{candidateData.countryOfResidence}</Text>
        </View>
        <View style={styles.assessmentRow}>
          <Text style={styles.assessmentLabel}>English Level:</Text>
          <Text style={styles.assessmentValue}>{candidateData.englishLevel}</Text>
        </View>
        
        <View style={[styles.subsection, { marginTop: 10 }]}>
          <Text style={styles.notesTitle}>Cultural Fit Assessment</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 5 }}>
            <View style={{ width: '33%', marginBottom: 8 }}>
              <Text style={[styles.assessmentLabel, { width: 'auto' }]}>Teamwork:</Text>
              <Text>{candidateData.culturalFit.teamwork}/5</Text>
            </View>
            <View style={{ width: '33%', marginBottom: 8 }}>
              <Text style={[styles.assessmentLabel, { width: 'auto' }]}>Communication:</Text>
              <Text>{candidateData.culturalFit.communication}/5</Text>
            </View>
            <View style={{ width: '33%', marginBottom: 8 }}>
              <Text style={[styles.assessmentLabel, { width: 'auto' }]}>Adaptability:</Text>
              <Text>{candidateData.culturalFit.adaptability}/5</Text>
            </View>
            <View style={{ width: '33%', marginBottom: 8 }}>
              <Text style={[styles.assessmentLabel, { width: 'auto' }]}>Problem Solving:</Text>
              <Text>{candidateData.culturalFit.problemSolving}/5</Text>
            </View>
            <View style={{ width: '33%', marginBottom: 8 }}>
              <Text style={[styles.assessmentLabel, { width: 'auto' }]}>Leadership:</Text>
              <Text>{candidateData.culturalFit.leadership}/5</Text>
            </View>
          </View>
        </View>
        <View style={[styles.subsection, { marginTop: 10 }]}>
          <Text style={styles.notesTitle}>Interview Notes</Text>
          <Text style={styles.notes}>{candidateData.interviewNotes}</Text>
        </View>
      </View>

      {/* Work Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Work Experience</Text>
        {candidateData.experience.map((exp, index) => (
          <View key={`exp-${index}`} style={styles.subsection}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.jobTitle}>{exp.title}</Text>
              <Text style={styles.dateRange}>{exp.dateRange}</Text>
            </View>
            <Text style={styles.company}>{exp.company}</Text>
            <Text style={styles.description}>{exp.description}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

// Component for downloading the PDF
export default function PDFGenerator({ candidateData }: PDFGeneratorProps) {
  return (
    <PDFDownloadLink 
      document={<CandidatePDF candidateData={candidateData} />} 
      fileName={`${candidateData.fullName.replace(/\s+/g, '_')}_Resume.pdf`}
      className="px-5 py-2 bg-[#F12A30] text-white font-medium rounded-md hover:bg-[#d91c22] inline-block"
    >
      {({ loading}) => 
        loading ? 'Generating PDF...' : 'Download PDF'
      }
    </PDFDownloadLink>
  );
}