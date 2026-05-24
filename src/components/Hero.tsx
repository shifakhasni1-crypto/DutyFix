/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useLanguage } from './LanguageContext';
import { ArrowRight, Phone, Clock, FileCheck, ShieldAlert } from 'lucide-react';

interface HeroProps {
  onQuoteOpen: () => void;
  onContactClick: () => void;
  onAboutClick: () => void;
}

export default function Hero({ onQuoteOpen, onContactClick, onAboutClick }: HeroProps) {
  const { t, language } = useLanguage();

  return (
    <section 
      id="home"
      className="relative min-h-[92vh] xl:min-h-screen bg-brand-navy flex items-center justify-center pt-24 overflow-hidden"
    >
      {/* Dynamic Background Grid Pattern Overlay */}
      <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ 
        backgroundImage: `linear-gradient(to right, rgba(11, 25, 44, 0.95) 25%, rgba(11, 25, 44, 0.75) 60%, rgba(30, 62, 98, 0.6) 100%), url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1920&q=80')` 
      }}></div>

      {/* Cyber Engineering grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none"></div>

      {/* Geometric architectural backdrop accent */}
      <div className="absolute -right-20 -bottom-20 w-[600px] h-[600px] rounded-full bg-brand-orange/10 blur-3xl pointer-events-none"></div>
      <div className="absolute -left-20 top-20 w-[400px] h-[400px] rounded-full bg-brand-blue/30 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main content column */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left rtl:lg:text-right animate-fade-in">
            {/* Styled Badges with unified alignment in flow */}
            <div className="flex flex-col items-center lg:items-start rtl:lg:items-end gap-3.5">
              {/* Vetted & Registered Qatar Contractor Badge */}
              <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-white/5 border border-white/20 px-3.5 py-1.5 rounded-full text-[11px] font-semibold text-white tracking-wider uppercase backdrop-blur-sm shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="whitespace-nowrap">{language === 'en' ? 'Vetted & Registered Qatar Contractor' : 'شريك هندسي معتمد ومسجل بسجل قطر التجاري'}</span>
              </div>

              {/* Logo details or Sub-banner */}
              <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-brand-orange/15 px-3 py-1.5 rounded-md border border-brand-orange/20">
                <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
                <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">
                  {language === 'en' ? 'Construction · Maintenance · Fit-Out · Manpower' : 'أعمال البناء · الصيانة · التشطيبات · دعم الكوادر العمالية'}
                </span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.12] tracking-tight">
              {t('hero.title').split(',').map((part, index) => (
                <span key={index} className="block">
                  {index === 1 ? <span className="text-brand-orange">{part}</span> : part}
                </span>
              ))}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-brand-light/95 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              {t('hero.subtitle')}
            </p>

            {/* Micro details block */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-xs font-semibold text-brand-light/75">
              <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
                <Clock className="w-4 h-4 text-brand-orange" />
                <span>{language === 'en' ? '24/7 Support in Doha' : 'دعم صيانة على مدار الساعة بالدوحة'}</span>
              </div>
              <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
                <FileCheck className="w-4 h-4 text-brand-orange" />
                <span>{language === 'en' ? 'Compliant with Qatar Labor Law' : 'ملتزمون بكافة لوائح وزارة العمل بقطر'}</span>
              </div>
              <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
                <Phone className="w-4 h-4 text-brand-orange" />
                <span>{language === 'en' ? 'Direct Mobile Response' : 'استجابة هاتفية فورية'}</span>
              </div>
            </div>

            {/* Tri-action buttons block */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-3">
              <button
                id="hero-quote-btn"
                onClick={onQuoteOpen}
                className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange/90 text-white font-bold py-3.5 px-7 rounded-md cursor-pointer transition-all shadow-lg hover:shadow-brand-orange/20 flex items-center justify-center space-x-2 rtl:space-x-reverse"
              >
                <span>{t('hero.cta.quote')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-contact-btn"
                onClick={onContactClick}
                className="w-full sm:w-auto bg-transparent hover:bg-white/5 border border-white/30 text-white font-bold py-3.5 px-7 rounded-md transition-all flex items-center justify-center space-x-2 rtl:space-x-reverse cursor-pointer"
              >
                <span>{t('hero.cta.contact')}</span>
              </button>

              <button
                id="hero-about-btn"
                onClick={onAboutClick}
                className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-brand-light/90 hover:text-white font-semibold py-3.5 px-5 rounded-md transition-all text-sm cursor-pointer"
              >
                {t('hero.cta.about')}
              </button>
            </div>
          </div>

          {/* Right Floating Badge Graphic Card Column */}
          <div className="lg:col-span-5 hidden lg:block relative">
            <div className="relative z-10 bg-brand-navy/80 backdrop-blur-md rounded-2xl border border-brand-blue/50 p-6 shadow-2xl space-y-6 max-w-md mx-auto transform hover:rotate-1 hover:scale-[1.02] transition-all duration-300">
              <div className="flex justify-between items-start">
                <span className="font-mono text-[10px] text-brand-orange tracking-widest font-bold uppercase">{language === 'en' ? 'ENGINEERING OFFICE' : 'المكتب الهندسي الميداني'}</span>
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              </div>
              
              <div className="border-l-4 border-brand-orange pl-3 rtl:border-l-0 rtl:border-r-4 rtl:pr-3">
                <h4 className="font-extrabold text-white text-lg leading-tight">
                  {language === 'en' ? 'DutyFix Construction & Maintenance' : 'دوتي فيكس للمقاولات العامة والصيانة'}
                </h4>
                <p className="text-xs text-brand-light/80 mt-1 font-light">
                  {language === 'en' ? 'Civil, structural, fit-out and manpower suppliers with rigorous quality policies.' : 'مقاولون وشركاء لمشاريع البنية التحتية، الديكورات وتوريد عمالة متميزة في دولة قطر.'}
                </p>
              </div>

              <div className="bg-brand-blue/40 border border-brand-blue/60 p-4 rounded-lg space-y-3">
                <span className="text-[11px] font-bold text-brand-light uppercase flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
                  {language === 'en' ? 'Our Quality Commitment' : 'التزام الجودة والأمان لدينا'}
                </span>
                <p className="text-xs text-brand-light/70 leading-relaxed font-light">
                  {language === 'en' 
                    ? 'We combine highly skilled manpower, tier-1 premium materials, and professional supervision to execute residential and commercial projects safely, under budget and strictly on time.' 
                    : 'نجمع بين الكوادر العمالية المدربة والمهندسين وأجود الخامات محليًا لضمان الجودة والتسليم في الوقت المناسب ومراعاة التكاليف الافتصادية.'}
                </p>
              </div>

              {/* Verified Trust Seal */}
              <div className="flex items-center justify-between text-xs pt-1 border-t border-brand-light/10 text-brand-light/60">
                <div className="flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-brand-orange animate-pulse" />
                  <span>{language === 'en' ? 'HSE Compliant (ISO standard)' : 'معايير البيئة والسلامة المهنية'}</span>
                </div>
                <span>QA-2026</span>
              </div>
            </div>

            {/* Background design elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-dashed border-brand-light/10 rounded-full -z-10 pointer-events-none"></div>
          </div>

        </div>
      </div>
    </section>
  );
}
