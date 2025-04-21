// src/components/pdf/PDFGenerator.tsx
'use client';

import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Font } from '@react-pdf/renderer';
import { CandidateFormData } from '@/components/form/CandidateForm';

// Use standard fonts to avoid embedding issues
Font.registerHyphenationCallback(word => [word]);

interface PDFGeneratorProps {
  candidateData: CandidateFormData;
}

// Create a more robust style set with precise measurements
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    padding: 0,
    backgroundColor: 'white',
    position: 'relative',
  },
  header: {
    paddingTop: 48,
    paddingBottom: 36,
    paddingHorizontal: 48,
    borderBottom: '1px solid #EEEEEE',
  },
  headerText: {
    fontSize: 24,
    lineHeight: 1.3,
  },
  headerGray: {
    color: '#A3A3A3',
    fontWeight: 300,
  },
  headerBlack: {
    color: '#000000',
    fontWeight: 'bold',
  },
  headerNormal: {
    color: '#000000',
    fontWeight: 'normal',
  },
  mainContent: {
    paddingHorizontal: 48,
    paddingBottom: 80, // Leave room for footer
  },
  card: {
    marginTop: 24,
    marginBottom: 24,
    padding: 24,
    borderRadius: 8,
    border: '1px solid #E5E7EB',
    backgroundColor: 'white',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 12,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  overviewText: {
    fontSize: 11,
    lineHeight: 1.5,
    color: '#4B5563',
  },
  columns: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginBottom: 16,
  },
  leftColumn: {
    width: '30%',
    paddingRight: 16,
  },
  rightColumn: {
    width: '70%',
    paddingLeft: 16,
  },
  columnCard: {
    marginBottom: 16,
    padding: 24,
    borderRadius: 8,
    border: '1px solid #E5E7EB',
    backgroundColor: 'white',
  },
  itemRow: {
    fontSize: 11,
    marginBottom: 6,
    color: '#4B5563',
  },
  itemRowLast: {
    fontSize: 11,
    color: '#4B5563',
  },
  workItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottom: '1px solid #E5E7EB',
  },
  workItemLast: {
    marginBottom: 0,
    paddingBottom: 0,
  },
  workTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#111827',
  },
  workSubtitle: {
    fontSize: 10,
    marginBottom: 6,
    color: '#6B7280',
  },
  workDescription: {
    fontSize: 10,
    lineHeight: 1.4,
    color: '#4B5563',
  },
  eduItem: {
    marginBottom: 8,
    paddingBottom: 8,
    borderBottom: '1px solid #E5E7EB',
  },
  eduItemLast: {
    marginBottom: 0,
    paddingBottom: 0,
  },
  eduTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#111827',
  },
  eduSubtitle: {
    fontSize: 10,
    color: '#6B7280',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#EF4444',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

// Helper function to render section icons consistently
const renderIcon = (iconType: string) => {
  let icon = '•';
  
  switch (iconType) {
    case 'overview':
      icon = '🔍';
      break;
    case 'fit5':
      icon = '★';
      break;
    case 'location':
      icon = '🌎';
      break;
    case 'languages':
      icon = '💬';
      break;
    case 'experience':
      icon = '⏱';
      break;
    case 'work':
      icon = '💼';
      break;
    case 'education':
      icon = '🎓';
      break;
    default:
      icon = '•';
  }
  
  return <Text style={styles.icon}>{icon}</Text>;
};

// PDF Document component
const CandidatePDF = ({ candidateData }: PDFGeneratorProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          <Text style={styles.headerGray}>Hello! My name is </Text>
          <Text style={styles.headerBlack}>{candidateData.fullName} </Text>
          <Text style={styles.headerGray}>and I am {'\n'}a </Text>
          <Text style={styles.headerNormal}>{candidateData.positionName}</Text>
        </Text>
      </View>

      {/* Main content */}
      <View style={styles.mainContent}>
        {/* Overview */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            {renderIcon('overview')}
            <Text style={styles.sectionTitle}>OVERVIEW</Text>
          </View>
          <Text style={styles.overviewText}>{candidateData.interviewNotes}</Text>
        </View>

        {/* Two-column layout */}
        <View style={styles.columns}>
          {/* Left column */}
          <View style={styles.leftColumn}>
            {/* FIT5 */}
            <View style={styles.columnCard}>
              <View style={styles.sectionHeader}>
                {renderIcon('fit5')}
                <Text style={styles.sectionTitle}>FIT5</Text>
              </View>
              <Text style={styles.itemRow}>{candidateData.fit5.ownership}/10 Ownership</Text>
              <Text style={styles.itemRow}>{candidateData.fit5.collaboration}/10 Collaboration</Text>
              <Text style={styles.itemRow}>{candidateData.fit5.impact}/10 Impact</Text>
              <Text style={styles.itemRow}>{candidateData.fit5.tenacity}/10 Tenacity</Text>
              <Text style={styles.itemRowLast}>{candidateData.fit5.curiosity}/10 Curiosity</Text>
            </View>

            {/* Location */}
            <View style={styles.columnCard}>
              <View style={styles.sectionHeader}>
                {renderIcon('location')}
                <Text style={styles.sectionTitle}>LOCATION</Text>
              </View>
              <Text style={styles.itemRowLast}>{candidateData.countryOfResidence}</Text>
            </View>

            {/* Languages */}
            <View style={styles.columnCard}>
              <View style={styles.sectionHeader}>
                {renderIcon('languages')}
                <Text style={styles.sectionTitle}>LANGUAGES</Text>
              </View>
              <Text style={styles.itemRowLast}>{candidateData.englishLevel} (English)</Text>
            </View>

            {/* Experience Years */}
            <View style={styles.columnCard}>
              <View style={styles.sectionHeader}>
                {renderIcon('experience')}
                <Text style={styles.sectionTitle}>EXPERIENCE</Text>
              </View>
              <Text style={styles.itemRowLast}>{candidateData.yearsOfExperience} Years</Text>
            </View>
          </View>

          {/* Right column */}
          <View style={styles.rightColumn}>
            {/* Work Experience */}
            <View style={styles.columnCard}>
              <View style={styles.sectionHeader}>
                {renderIcon('work')}
                <Text style={styles.sectionTitle}>WORK EXPERIENCE</Text>
              </View>
              
              {candidateData.experience.map((job, index) => (
                <View 
                  key={`job-${index}`} 
                  style={index === candidateData.experience.length - 1 ? styles.workItemLast : styles.workItem}
                >
                  <Text style={styles.workTitle}>{job.title}</Text>
                  <Text style={styles.workSubtitle}>{job.company} | {job.dateRange}</Text>
                  <Text style={styles.workDescription}>{job.description}</Text>
                </View>
              ))}
            </View>

            {/* Education */}
            <View style={styles.columnCard}>
  <View style={styles.sectionHeader}>
    {renderIcon('education')}
    <Text style={styles.sectionTitle}>EDUCATION</Text>
  </View>
  
  {candidateData.education.map((edu, index) => (
    <View 
      key={`edu-${index}`} 
      style={index === candidateData.education.length - 1 ? styles.eduItemLast : styles.eduItem}
    >
      <Text style={styles.eduTitle}>{edu.degree}</Text>
      <Text style={styles.eduSubtitle}>{edu.institution} | {edu.dateRange}</Text>
    </View>
  ))}
</View>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>=TRUE</Text>
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
      className="px-5 py-2 bg-[#EF4444] text-white font-medium rounded-md hover:bg-[#DC2626] inline-block"
    >
      {({ loading }) => 
        loading ? 'Generating PDF...' : 'Download PDF'
      }
    </PDFDownloadLink>
  );
}