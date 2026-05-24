/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { initialProjects, testimonialsData } from '../mockData';
import { MapPin, User, Wallet, ChevronLeft, ChevronRight, Star, Clock, CheckCircle } from 'lucide-react';

interface ProjectsProps {
  customProjects: any[]; // User submitted inquiries spawned as active projects
}

export default function Projects({ customProjects }: ProjectsProps) {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'completed' | 'ongoing'>('all');
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Combine static projects with any custom-activated projects in order
  const allProjects = [...customProjects, ...initialProjects];

  const filteredProjects = allProjects.filter((project) => {
    if (filter === 'all') return true;
    return project.status === filter;
  });

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const activeTestimonial = testimonialsData[testimonialIndex];

  return (
    <section id="projects" className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Projects Heading Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-brand-orange tracking-widest uppercase block border-b-2 border-brand-orange/20 w-max pb-1 mx-auto">
            {t('projects.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight leading-tight">
            {t('projects.title')}
          </h2>
          <p className="text-sm sm:text-base text-brand-gray font-light">
            {t('projects.subtitle')}
          </p>
        </div>

        {/* Status Filter Buttons */}
        <div className="flex justify-center space-x-2 rtl:space-x-reverse mb-10">
          {(['all', 'completed', 'ongoing'] as const).map((type) => (
            <button
              key={type}
              id={`project-filter-${type}`}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
                filter === type
                  ? 'bg-brand-orange border-brand-orange text-white'
                  : 'bg-brand-light border-slate-200 text-brand-navy hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              {type === 'all' && (language === 'en' ? 'All Portfolio' : 'كل المشاريع')}
              {type === 'completed' && t('projects.status.completed')}
              {type === 'ongoing' && t('projects.status.ongoing')}
            </button>
          ))}
        </div>

        {/* Projects Grid Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-24">
          {filteredProjects.map((project, idx) => {
            const isCompleted = project.status === 'completed';
            return (
              <div 
                key={project.id}
                id={`project-card-${project.id}`}
                className="bg-brand-light rounded-2xl border border-slate-200/60 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Visual Header */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.name[language] || project.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Absolute Status Badge */}
                  <span className={`absolute top-4 right-4 rtl:right-auto rtl:left-4 z-10 px-3 py-1 rounded-full text-xs font-bold text-white shadow flex items-center space-x-1 ${
                    isCompleted ? 'bg-emerald-600' : 'bg-brand-orange animate-pulse'
                  }`}>
                    {isCompleted ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    <span>{isCompleted ? t('projects.status.completed') : t('projects.status.ongoing')}</span>
                  </span>

                  {/* Absolute Municipal tag */}
                  <span className="absolute bottom-4 left-4 rtl:left-auto rti:right-4 font-semibold text-white text-xs flex items-center space-x-1 bg-brand-navy/60 backdrop-blur-sm px-2.5 py-1 rounded">
                    <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                    <span>{project.location[language] || project.location}</span>
                  </span>
                </div>

                {/* Scope & Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-brand-navy leading-snug">
                      {project.name[language] || project.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-gray font-light leading-relaxed">
                      {project.scope[language] || project.scope}
                    </p>
                  </div>

                  {/* Key metadata table */}
                  <div className="pt-4 border-t border-slate-200/60 grid grid-cols-2 gap-4 text-xs font-semibold text-brand-navy">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <User className="w-4 h-4 text-brand-orange" />
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase leading-none">{t('projects.manager')}</span>
                        <span className="block mt-0.5">{project.manager}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Wallet className="w-4 h-4 text-brand-orange" />
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase leading-none">{t('projects.budget')}</span>
                        <span className="block mt-0.5">{project.budget}</span>
                      </div>
                    </div>
                  </div>

                  {/* Operational progress layout */}
                  <div className="space-y-1 pt-2">
                    <div className="flex justify-between text-[11px] font-bold text-brand-navy">
                      <span>{language === 'en' ? 'Construction Milestone Progression' : 'مقدمة إنجاز المخطط الإنشائي'}</span>
                      <span className="text-brand-orange">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-brand-orange h-full rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>


        {/* Testimonials Frame Slider Carousel */}
        <div className="bg-brand-navy text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
          {/* Background graphics */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-orange/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-blue/30 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <span className="text-[10px] font-bold text-brand-orange tracking-widest uppercase block mb-1">
                {t('testimonials.badge')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {t('testimonials.title')}
              </h2>
            </div>

            {/* Micro Rating Indicator block */}
            <div className="flex justify-center space-x-0.5 rtl:space-x-reverse text-amber-500">
              {[...Array(activeTestimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>

            {/* Testimonial Core text with Quotes design */}
            <blockquote className="text-center text-base sm:text-lg md:text-xl font-light italic leading-relaxed text-brand-light/95">
              "{activeTestimonial.text[language]}"
            </blockquote>

            {/* Author Profile Information */}
            <div className="text-center">
              <cite className="not-italic text-sm sm:text-base font-bold block text-white">
                {activeTestimonial.name[language]}
              </cite>
              <span className="text-xs text-brand-orange font-mono uppercase tracking-wider block mt-0.5">
                {activeTestimonial.role[language]} {" - "} {activeTestimonial.company[language]}
              </span>
            </div>

            {/* Navigational Arrows Grid */}
            <div className="flex justify-center items-center space-x-6 rtl:space-x-reverse pt-4">
              <button
                id="testimonial-prev-btn"
                onClick={prevTestimonial}
                className="p-2.5 rounded-full border border-white/20 hover:border-brand-orange hover:bg-white/5 text-white transition-all cursor-pointer"
                title="Previous Review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Slider Dots */}
              <div className="flex space-x-2">
                {testimonialsData.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setTestimonialIndex(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      testimonialIndex === idx ? 'w-6 bg-brand-orange' : 'w-2 bg-white/30 hover:bg-white/60'
                    }`}
                  ></button>
                ))}
              </div>

              <button
                id="testimonial-next-btn"
                onClick={nextTestimonial}
                className="p-2.5 rounded-full border border-white/20 hover:border-brand-orange hover:bg-white/5 text-white transition-all cursor-pointer"
                title="Next Review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
