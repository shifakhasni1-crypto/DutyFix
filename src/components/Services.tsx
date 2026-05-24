/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { servicesData } from '../mockData';
import { Building2, Hammer, Wrench, Users, ArrowRight, ShieldCheck } from 'lucide-react';

interface ServicesProps {
  onServiceSelect: (categoryName: string) => void;
}

export default function Services({ onServiceSelect }: ServicesProps) {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('construction');

  const getCategoryIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'Building2':
        return <Building2 className={className} />;
      case 'Hammer':
        return <Hammer className={className} />;
      case 'Wrench':
        return <Wrench className={className} />;
      case 'Users':
        return <Users className={className} />;
      default:
        return <Building2 className={className} />;
    }
  };

  const getCategoryTheme = (id: string) => {
    switch (id) {
      case 'construction':
        return {
          bg: 'bg-indigo-50 border-indigo-200/50',
          text: 'text-indigo-600',
          indicator: 'bg-indigo-600',
          image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80'
        };
      case 'fitout':
        return {
          bg: 'bg-amber-50 border-amber-200/50',
          text: 'text-amber-600',
          indicator: 'bg-amber-600',
          image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'
        };
      case 'maintenance':
        return {
          bg: 'bg-sky-50 border-sky-200/50',
          text: 'text-sky-600',
          indicator: 'bg-sky-600',
          image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'
        };
      case 'manpower':
        return {
          bg: 'bg-emerald-50 border-emerald-200/50',
          text: 'text-emerald-600',
          indicator: 'bg-emerald-600',
          image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80' // Using premium site view
        };
      default:
        return {
          bg: 'bg-slate-50 border-slate-200/50',
          text: 'text-slate-600',
          indicator: 'bg-slate-600',
          image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80'
        };
    }
  };

  const activeCategory = servicesData.find((cat) => cat.id === activeTab) || servicesData[0];
  const activeTheme = getCategoryTheme(activeCategory.id);

  return (
    <section id="services" className="py-20 md:py-28 bg-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-brand-orange tracking-widest uppercase block border-b-2 border-brand-orange/20 w-max pb-1 mx-auto">
            {t('services.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight leading-tight">
            {t('services.title')}
          </h2>
          <p className="text-sm sm:text-base text-brand-gray font-light">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Tab Selection Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {servicesData.map((category) => {
            const isActive = activeTab === category.id;
            return (
              <button
                key={category.id}
                id={`service-tab-${category.id}`}
                onClick={() => setActiveTab(category.id)}
                className={`p-4 rounded-xl border transition-all text-left rtl:text-right flex items-center space-x-3 rtl:space-x-reverse cursor-pointer ${
                  isActive 
                    ? 'bg-brand-navy border-brand-navy text-white shadow-xl scale-[1.02]' 
                    : 'bg-white border-slate-200 text-brand-navy hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div className={`p-2 rounded-lg ${isActive ? 'bg-brand-orange text-white' : 'bg-brand-light text-brand-orange'}`}>
                  {getCategoryIcon(category.icon, 'w-5 h-5')}
                </div>
                <div className="overflow-hidden">
                  <span className="text-xs sm:text-sm font-bold block truncate">{category.title[language]}</span>
                  <span className="text-[10px] text-slate-400 block truncate hidden sm:block">{language === 'en' ? 'Click to view' : 'اضغط للاطلاع'}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Service Showpiece Frame */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xl overflow-hidden animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Visual Column */}
            <div className="lg:col-span-5 relative min-h-[250px] lg:min-h-full">
              <img 
                src={activeTheme.image} 
                alt={activeCategory.title[language]} 
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/40 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-brand-orange font-bold">
                  {language === 'en' ? 'Premium Quality Standard' : 'معايير جودة متميزة'}
                </span>
                <h3 className="text-lg font-bold uppercase leading-snug">
                  {activeCategory.title[language]}
                </h3>
              </div>
            </div>

            {/* Structured Lists Column */}
            <div className="lg:col-span-12 xl:col-span-7 p-6 sm:p-10 space-y-8 flex flex-col justify-between">
              <div className="space-y-6">
                
                {/* Descriptive banner */}
                <div className="space-y-2">
                  <h4 className="text-xl font-extrabold text-brand-navy">
                    {activeCategory.title[language]}
                  </h4>
                  <p className="text-sm text-brand-gray font-light leading-relaxed">
                    {activeCategory.description[language]}
                  </p>
                </div>

                {/* Sublist Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeCategory.services[language].map((subService, idx) => (
                    <div 
                      key={idx}
                      className="p-3 bg-brand-light rounded-xl border border-slate-200/60 hover:border-brand-orange/30 hover:bg-white transition-all duration-300 flex items-start space-x-3 rtl:space-x-reverse"
                    >
                      <ShieldCheck className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-semibold text-brand-navy">
                        {subService}
                      </span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Action buttons leading to pre-filled estimator */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-brand-gray rtl:text-right">
                  <span className="font-bold text-brand-navy block">
                    {language === 'en' ? 'Need pricing for this?' : 'ترغب بحساب التكلفة المقدرة أولاً؟'}
                  </span>
                  <span>
                    {language === 'en' ? 'Use our estimator tool or apply for safe site visit.' : 'استعمل مخمن الأسعار الفوري أو اطلب موعدًا.'}
                  </span>
                </div>

                <button
                  id={`service-assess-btn-${activeCategory.id}`}
                  onClick={() => onServiceSelect(activeCategory.id)}
                  className="w-full sm:w-auto bg-brand-navy hover:bg-brand-blue/95 text-white font-bold text-xs py-3 px-6 rounded-md shadow transition-all flex items-center justify-center space-x-2 rtl:space-x-reverse cursor-pointer"
                >
                  <span>{t('contact.calc.result.btn')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
