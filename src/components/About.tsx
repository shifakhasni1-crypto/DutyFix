/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useLanguage } from './LanguageContext';
import { statisticsData } from '../mockData';
import { Briefcase, HardHat, Building, Award, CheckCircle2 } from 'lucide-react';

export default function About() {
  const { t, language } = useLanguage();

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase':
        return <Briefcase className="w-6 h-6 text-brand-orange" />;
      case 'HardHat':
        return <HardHat className="w-6 h-6 text-brand-orange" />;
      case 'Building':
        return <Building className="w-6 h-6 text-brand-orange" />;
      case 'Award':
        return <Award className="w-6 h-6 text-brand-orange" />;
      default:
        return <Briefcase className="w-6 h-6 text-brand-orange" />;
    }
  };

  const coreStrengths = [
    language === 'en' ? 'Qatari Local Compliance & Safety' : 'الالتزام التام بالقوانين القطرية والبلديات ماليًا وفنيًا',
    language === 'en' ? 'Turnkey Design, Build & Renovation' : 'التطوير والتصاميم والديكورات المتكاملة والمقاولات الشاملة',
    language === 'en' ? 'Experienced Professional Engineering Staff' : 'طاقم من المهندسين والمشرفين ذوي الخبرة الطويلة',
    language === 'en' ? 'Continuous Preventative Support Maintenance' : 'خدمات صيانة وقائية وعلاجية مستمرة ومستويات تشغيل عالية'
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Bento Grid with high-quality Construction imagery referencing Qatar architecture */}
          <div className="lg:col-span-5 relative">
            <div className="grid grid-cols-2 gap-4">
              
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden shadow-md group">
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end p-4">
                    <span className="text-white font-semibold text-xs">{language === 'en' ? 'Lusail Infrastructure' : 'بنية لوسيل التحتية'}</span>
                  </div>
                  <img 
                    src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=400&h=500&q=80" 
                    alt="Construction site" 
                    referrerPolicy="no-referrer"
                    className="w-full h-56 md:h-64 object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="bg-brand-orange text-white p-5 rounded-2xl shadow-lg border border-brand-orange/10 flex flex-col justify-between h-36 md:h-40 transform hover:scale-[1.02] transition-transform">
                  <span className="text-sm font-bold uppercase tracking-widest">{language === 'en' ? 'FOUNDED' : 'تأسست في'}</span>
                  <div>
                    <span className="text-4xl font-extrabold leading-none">2021</span>
                    <p className="text-xs text-white/90 mt-1">{language === 'en' ? 'Delivering Trust in Doha' : 'تقديم الجودة والأمان بالدوحة'}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="bg-brand-navy text-white p-5 rounded-2xl shadow-lg border border-brand-blue/30 h-36 md:h-40 flex flex-col justify-between transform hover:scale-[1.02] transition-transform">
                  <HardHat className="w-8 h-8 text-brand-orange" />
                  <div>
                    <span className="text-lg font-bold block">{language === 'en' ? 'Quality Vetted' : 'مطابقة الجودة'}</span>
                    <span className="text-xs text-brand-light/70">{language === 'en' ? 'Safe workplace processes' : 'إجراءات عمل آمنة'}</span>
                  </div>
                </div>
                
                <div className="relative rounded-2xl overflow-hidden shadow-md group">
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end p-4">
                    <span className="text-white font-semibold text-xs">{language === 'en' ? 'Premium Finishes' : 'التشطيبات الفاخرة'}</span>
                  </div>
                  <img 
                    src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=400&h=500&q=80" 
                    alt="Interior Fit out" 
                    referrerPolicy="no-referrer"
                    className="w-full h-56 md:h-64 object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

            </div>

            {/* Back circle decoration */}
            <div className="absolute -z-10 -left-6 -bottom-6 w-32 h-32 bg-brand-light rounded-full"></div>
          </div>

          {/* Right Column: Narrative Copy & Statistics summary */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-bold text-brand-orange tracking-widest uppercase block border-b-2 border-brand-orange/20 w-max pb-1">
                {t('about.badge')}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight leading-tight">
                {t('about.title')}
              </h2>
            </div>

            <div className="space-y-4 text-brand-gray text-sm md:text-base leading-relaxed font-light">
              <p>{t('about.p1')}</p>
              <p>{t('about.p2')}</p>
            </div>

            {/* Checkmark bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {coreStrengths.map((str, index) => (
                <div key={index} className="flex items-start space-x-2.5 rtl:space-x-reverse text-sm text-brand-navy font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                  <span>{str}</span>
                </div>
              ))}
            </div>

            {/* Statistics counter grid */}
            <div className="pt-6 border-t border-slate-100">
              <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider mb-6">
                {language === 'en' ? 'DutyFix By The Numbers' : 'إنجازات دوتي فيكس بالأرقام الرقمية'}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {statisticsData.map((stat) => (
                  <div 
                    key={stat.id} 
                    className="p-4 bg-brand-light rounded-2xl border border-slate-200/50 flex flex-col justify-between hover:border-brand-orange/40 hover:bg-white hover:shadow-md transition-all duration-300"
                  >
                    <div className="p-1.5 bg-white rounded-lg w-max shadow-sm border border-slate-100">
                      {getIconComponent(stat.icon)}
                    </div>
                    <div className="mt-4">
                      <span className="text-2xl sm:text-3xl font-extrabold text-brand-navy block tracking-tight leading-none">
                        {stat.count}
                      </span>
                      <span className="text-[10px] sm:text-xs text-brand-gray font-normal block mt-1 leading-snug">
                        {stat.label[language]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
