/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'ar';

export interface ServiceDetail {
  title: string;
  items: string[];
}

export interface ServiceCategory {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  icon: string; // Lucide icon name
  services: {
    en: string[];
    ar: string[];
  };
}

export interface Project {
  id: string;
  name: { en: string; ar: string };
  location: { en: string; ar: string };
  scope: { en: string; ar: string };
  status: 'ongoing' | 'completed' | 'planning';
  progress: number; // percentage (0 - 100)
  clientName: string;
  budget: string;
  startDate: string;
  manager: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: { en: string; ar: string };
  role: { en: string; ar: string };
  company: { en: string; ar: string };
  text: { en: string; ar: string };
  rating: number;
}

export interface StatItem {
  id: string;
  count: string;
  label: { en: string; ar: string };
  icon: string; // Lucide icon name
}

export interface QuoteInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceCategory: string;
  projectSize: number; // in sqm
  location: string;
  details: string;
  status: 'Pending Review' | 'Estimating' | 'Approved' | 'In Progress';
  estimatedCost: string;
  timestamp: string;
}
