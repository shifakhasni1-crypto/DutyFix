/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { Facebook, Instagram, Linkedin, ShieldCheck, Mail, ArrowUp, Briefcase, FileText, X } from 'lucide-react';

interface FooterProps {
  onScrollTo: (id: string) => void;
}

export default function Footer({ onScrollTo }: FooterProps) {
  const { t, language } = useLanguage();
  const [showCareers, setShowCareers] = useState(false);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer id="app-footer" className="bg-brand-navy text-white pt-16 pb-8 border-t border-brand-blue/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          
          {/* Brand Summary Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
              <div className="w-8 h-8 bg-brand-orange rounded flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white uppercase">
                DUTY<span className="text-brand-orange">FIX</span>
              </span>
            </div>
            
            <p className="text-xs text-brand-light/75 leading-relaxed font-light">
              {t('brand.description')}
            </p>

            <div className="flex items-center space-x-3 rtl:space-x-reverse pt-2">
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-brand-orange hover:text-white transition-colors" title="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-brand-orange hover:text-white transition-colors" title="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-brand-orange hover:text-white transition-colors" title="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Municipal Links Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-brand-orange border-b border-brand-orange/20 pb-1.5 w-max">
              {language === 'en' ? 'Quick Directory' : 'روابط سريعة تفاعلية'}
            </h4>
            <div className="grid grid-cols-1 gap-2.5 text-xs text-brand-light/80">
              <button onClick={() => onScrollTo('home')} className="text-left rtl:text-right hover:text-brand-orange transition-colors cursor-pointer">{t('nav.home')}</button>
              <button onClick={() => onScrollTo('about')} className="text-left rtl:text-right hover:text-brand-orange transition-colors cursor-pointer">{t('nav.about')}</button>
              <button onClick={() => onScrollTo('services')} className="text-left rtl:text-right hover:text-brand-orange transition-colors cursor-pointer">{t('nav.services')}</button>
              <button onClick={() => onScrollTo('projects')} className="text-left rtl:text-right hover:text-brand-orange transition-colors cursor-pointer">{t('nav.projects')}</button>
              <button onClick={() => onScrollTo('dashboard')} className="text-left rtl:text-right hover:text-brand-orange transition-colors cursor-pointer">{t('nav.dashboard')}</button>
              <button onClick={() => onScrollTo('contact')} className="text-left rtl:text-right hover:text-brand-orange transition-colors cursor-pointer">{t('nav.contact')}</button>
            </div>
          </div>

          {/* Careers & Professional recruitment Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-brand-orange border-b border-brand-orange/20 pb-1.5 w-max">
              {language === 'en' ? 'Join Our Team' : 'انضم لفرقة العمل بالدوحة'}
            </h4>
            <p className="text-xs text-brand-light/70 leading-relaxed font-light">
              {language === 'en'
                ? 'Looking for skilled engineers, draftsmen, construction supervisors, and technicians.'
                : 'نبحث دائمًا عن المهندسين، الطواقم الفنية، الفنيين المؤهلين والمشرفين الميدانيين بالدوحة.'}
            </p>
            <button
              id="footer-careers-modal-btn"
              onClick={() => setShowCareers(true)}
              className="text-xs text-brand-orange font-bold hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'View Active Vacancies' : 'استكشف شواغر العمل المتاحة'}</span>
            </button>
          </div>

          {/* Secure compliance badge */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-brand-orange border-b border-brand-orange/20 pb-1.5 w-max">
              {language === 'en' ? 'Office Detail' : 'المقر التفصيلي'}
            </h4>
            <div className="text-xs text-brand-light/80 space-y-1.5">
              <span className="block font-bold text-white">Doha, Qatar</span>
              <p className="font-light leading-snug">{t('contact.info.address').substring(0, 30)}...</p>
              <div className="flex items-center gap-1.5 text-brand-orange pt-1.5 font-bold">
                <ShieldCheck className="w-4 h-4 animate-pulse" />
                <span className="font-mono text-[10px]">REGISTERED CR: 128492</span>
              </div>
            </div>
          </div>

        </div>

        {/* Outer credit, stats, & back up button */}
        <div className="pt-8 mt-8 border-t border-brand-light/10 flex flex-col sm:flex-row justify-between items-center text-xs text-brand-light/60 gap-4">
          <div className="text-center sm:text-left rtl:sm:text-right">
            <span>© {new Date().getFullYear()} DutyFix Construction & Maintenance (Doha, Qatar). {language === 'en' ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}</span>
          </div>

          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <span className="font-mono text-[10px] bg-white/5 px-2.5 py-0.5 rounded border border-white/10 uppercase tracking-widest text-brand-orange font-bold">
              {language === 'en' ? 'SECURE SSL ENCRYPTED' : 'اتصال مشفر آمن'}
            </span>
            <button
              id="back-to-top-btn"
              onClick={handleScrollTop}
              className="p-2.5 bg-brand-orange text-white rounded-lg hover:bg-brand-orange/95 cursor-pointer transition-all"
              title={t('ui.backToTop')}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Careers Info Modal Overlay */}
      {showCareers && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white text-brand-navy rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl relative space-y-6">
            <button
              id="careers-close-btn"
              onClick={() => setShowCareers(false)}
              className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-1.5 text-slate-400 hover:text-brand-orange hover:bg-slate-100 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 rtl:space-x-reverse border-b border-slate-100 pb-3">
              <Briefcase className="w-6 h-6 text-brand-orange" />
              <h3 className="text-lg sm:text-xl font-extrabold text-brand-navy">
                {t('careers.title')}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-brand-gray font-light leading-relaxed">
              {t('careers.desc')}
            </p>

            <div className="bg-brand-light rounded-2xl p-4 border border-slate-200/50 space-y-3">
              <span className="text-[11px] font-bold text-brand-navy uppercase block tracking-wider">
                {language === 'en' ? 'Open Vacancies in Doha (May 2026):' : 'الفرص المتاحة بالدوحة (مايو 2026):'}
              </span>
              <ul className="text-xs text-brand-navy font-semibold space-y-2 list-disc pl-4 rtl:pl-0 rtl:pr-4">
                <li>{language === 'en' ? 'Project Site Engineer (Civil structural works experience)' : 'مهندس جودة موقع (بناء وإنشاءات خرسانية)'}</li>
                <li>{language === 'en' ? 'HVAC Senior Maintenance Supervisor' : 'مشرف أول صيانة تكييف مركزي وحراري'}</li>
                <li>{language === 'en' ? 'Bespoke Interior Woodworking Draftsman (CAD/3D)' : 'رسام تصميم داخلي وتجهيز خشبي وديكور'}</li>
                <li>{language === 'en' ? 'Skilled Multi-craft Foreman' : 'فورمان متعدد الصناعات والحرف'}</li>
              </ul>
            </div>

            <div className="border-t border-slate-100 pt-4 text-center">
              <span className="text-xs text-brand-gray font-light block mb-2">{language === 'en' ? 'To apply, submit your credentials to:' : 'للتقديم، يرجى إرسال ملفك وسيرتك لبريد قطاع التوظيف:'}</span>
              <div className="bg-brand-orange/15 border border-brand-orange/25 p-3 rounded-xl inline-flex items-center space-x-2.5 rtl:space-x-reverse font-bold text-xs sm:text-sm text-brand-orange">
                <FileText className="w-4 h-4" />
                <a href="mailto:recruitment@dutyfix.qa" className="hover:underline">recruitment@dutyfix.qa</a>
              </div>
            </div>

          </div>
        </div>
      )}

    </footer>
  );
}
