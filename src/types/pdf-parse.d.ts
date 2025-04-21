// src/types/pdf-parse.d.ts
declare module 'pdf-parse' {
    interface PDFInfo {
      PDFFormatVersion?: string;
      IsAcroFormPresent?: boolean;
      IsXFAPresent?: boolean;
      IsCollectionPresent?: boolean;
      Title?: string;
      Author?: string;
      Subject?: string;
      Keywords?: string;
      Creator?: string;
      Producer?: string;
      CreationDate?: string;
      ModDate?: string;
      [key: string]: unknown;
    }
  
    interface PDFMetadata {
      [key: string]: unknown;
    }
  
    interface PDFParseOptions {
      pagerender?: (pageData: { getTextContent: () => Promise<any> }) => Promise<string>;
      max?: number;
      version?: string;
    }
  
    interface PDFParseResult {
      numpages: number;
      numrender: number;
      info: PDFInfo;
      metadata: PDFMetadata;
      text: string;
      version: string;
    }
  
    function parse(dataBuffer: Buffer, options?: PDFParseOptions): Promise<PDFParseResult>;
    
    export = parse;
  }