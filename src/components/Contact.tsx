/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { QuoteInquiry } from '../types';
import { Mail, Phone, MapPin, CheckCircle, Calculator, ChevronRight, MessageSquare } from 'lucide-react';

interface ContactProps {
  onSubmitInquiry: (inquiry: QuoteInquiry) => void;
  selectedCategoryFromServices: string;
}

export default function Contact({ onSubmitInquiry, selectedCategoryFromServices }: ContactProps) {
  const { t, language } = useLanguage();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceCategory: 'construction',
    projectSize: 100,
    materialStandard: 'premium',
    location: 'Doha',
    details: ''
  });

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  // Synchronize category if clicked from Services Section
  useEffect(() => {
    if (selectedCategoryFromServices) {
      setFormData((prev) => ({ ...prev, serviceCategory: selectedCategoryFromServices }));
    }
  }, [selectedCategoryFromServices]);

  // Estimator live computation
  const calculateEstimate = () => {
    let baseRate = 1800; // QAR per sqm for construction
    if (formData.serviceCategory === 'fitout') baseRate = 1100;
    if (formData.serviceCategory === 'maintenance') baseRate = 500;
    if (formData.serviceCategory === 'manpower') baseRate = 150;

    let multiplier = 1.0;
    if (formData.materialStandard === 'premium') multiplier = 1.4;
    if (formData.materialStandard === 'luxury') multiplier = 2.2;

    const total = baseRate * formData.projectSize * multiplier;
    return new Intl.NumberFormat('en-QA', { style: 'currency', currency: 'QAR', maximumFractionDigits: 0 }).format(total);
  };

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = t('contact.form.required');
    
    // Email regex check
    if (!formData.email.trim()) {
      tempErrors.email = t('contact.form.required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = t('contact.form.invalidEmail');
    }

    // Phone 8 digits check
    if (!formData.phone.trim()) {
      tempErrors.phone = t('contact.form.required');
    } else if (!/^\d{8}$/.test(formData.phone.replace(/\s+/g, ''))) {
      tempErrors.phone = t('contact.form.invalidPhone');
    }

    if (!formData.details.trim()) tempErrors.details = t('contact.form.required');

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Real-time clearing of error labels
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Build the completed Quote Inquiry object
    const finalInquiry: QuoteInquiry = {
      id: `inq-${Math.random().toString(36).substr(2, 9)}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      serviceCategory: formData.serviceCategory,
      projectSize: Number(formData.projectSize),
      location: formData.location,
      details: formData.details,
      status: 'Pending Review',
      estimatedCost: calculateEstimate(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    onSubmitInquiry(finalInquiry);
    setIsSuccess(true);

    // Reset fields
    setFormData({
      name: '',
      email: '',
      phone: '',
      serviceCategory: 'construction',
      projectSize: 100,
      materialStandard: 'premium',
      location: 'Doha',
      details: ''
    });

    setTimeout(() => {
      setIsSuccess(false);
    }, 6000);
  };

  // Prefilled WhatsApp message
  const getWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Hello DutyFix Qatar! I am interested in your ${formData.serviceCategory} services for a project size of ${formData.projectSize} sqm located in ${formData.location}. Please get in touch. Thank you!`
    );
    return `https://wa.me/97455006677?text=${text}`;
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-brand-orange tracking-widest uppercase block border-b-2 border-brand-orange/20 w-max pb-1 mx-auto">
            {t('contact.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight leading-tight">
            {t('contact.title')}
          </h2>
          <p className="text-sm sm:text-base text-brand-gray font-light">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Dynamic Survey Inquiry + Instant Quote Calculator */}
          <div className="lg:col-span-7 bg-brand-light rounded-3xl p-6 sm:p-8 border border-slate-200/60 shadow-xl space-y-8">
            <div className="flex items-center space-x-3.5 rtl:space-x-reverse border-b border-slate-200 pb-4">
              <Calculator className="w-5 h-5 text-brand-orange" />
              <div>
                <h3 className="font-extrabold text-brand-navy text-base sm:text-lg">
                  {t('contact.calc.title')}
                </h3>
                <p className="text-xs text-brand-gray font-light">
                  {t('contact.calc.desc')}
                </p>
              </div>
            </div>

            {/* Custom Interactive Estimate Showpiece */}
            <div className="bg-brand-navy text-white p-5 rounded-2xl flex items-center justify-between border border-brand-blue relative overflow-hidden shadow-inner">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 rounded-full blur-xl pointer-events-none"></div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-brand-orange font-bold">
                  {t('contact.calc.result.title')}
                </span>
                <span className="block text-2xl sm:text-3xl font-black text-white mt-1 font-mono tracking-tight text-gradient">
                  {calculateEstimate()}
                </span>
              </div>
              <div className="text-right flex flex-col items-end">
                <span className="bg-emerald-500/20 text-emerald-400 text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-emerald-500/30 font-bold mb-1">
                  QQA-PROVISIONAL
                </span>
                <span className="text-[10px] text-brand-light/60 font-mono">Doha Municipal rates</span>
              </div>
            </div>

            {/* Form Fields Tag */}
            <form onSubmit={handleFormSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Full name input */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-navy block" htmlFor="contact-name">
                    {t('contact.form.name')} *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-xs text-brand-navy transition-all focus:ring-1 focus:ring-brand-orange"
                  />
                  {errors.name && <span className="text-[10px] font-bold text-red-500 block">{errors.name}</span>}
                </div>

                {/* Email Address */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-navy block" htmlFor="contact-email">
                    {t('contact.form.email')} *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-xs text-brand-navy transition-all"
                  />
                  {errors.email && <span className="text-[10px] font-bold text-red-500 block">{errors.email}</span>}
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Qatar Phone check */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-navy block" htmlFor="contact-phone">
                    {t('contact.form.phone')} *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold border-r border-slate-200 pr-2">
                      +974
                    </span>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      placeholder="e.g. 55006677"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-slate-200 rounded-lg pl-14 pr-3 py-2.5 text-xs text-brand-navy transition-all"
                    />
                  </div>
                  {errors.phone && <span className="text-[10px] font-bold text-red-500 block">{errors.phone}</span>}
                </div>

                {/* Service Category */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-navy block" htmlFor="contact-service">
                    {t('contact.form.service')}
                  </label>
                  <select
                    id="contact-service"
                    name="serviceCategory"
                    value={formData.serviceCategory}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-xs text-brand-navy cursor-pointer"
                  >
                    <option value="construction">{language === 'en' ? 'Construction Services' : 'أعمال التشييد والبناء السكني'}</option>
                    <option value="fitout">{language === 'en' ? 'Interior Fit-Out & Decor' : 'الديكور والتشطيب الداخلي المالي'}</option>
                    <option value="maintenance">{language === 'en' ? 'Maintenance & Diagnostics' : 'الصيانة الشاملة الوقائية'}</option>
                    <option value="manpower">{language === 'en' ? 'Manpower Supply Solutions' : 'توريد عمالة متميزة قانوننة'}</option>
                  </select>
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Location / Municipality */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-navy block" htmlFor="contact-location">
                    {t('contact.form.location')}
                  </label>
                  <select
                    id="contact-location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-xs text-brand-navy cursor-pointer"
                  >
                    <option value="Doha">Doha (الدوحة)</option>
                    <option value="Lusail">Lusail City (لوسيل)</option>
                    <option value="Al Rayyan">Al Rayyan (الريان)</option>
                    <option value="Al Wakrah">Al Wakrah (الوكرة)</option>
                    <option value="Al Khor">Al Khor (الخور)</option>
                  </select>
                </div>

                {/* Dimensions (Size in sqm) */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-brand-navy">
                    <label htmlFor="contact-size">{t('contact.form.size')}:</label>
                    <span className="text-brand-orange font-bold">{formData.projectSize} sqm</span>
                  </div>
                  <input
                    id="contact-size"
                    type="range"
                    name="projectSize"
                    min="10"
                    max="1000"
                    value={formData.projectSize}
                    onChange={handleInputChange}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-orange mt-2.5"
                  />
                </div>

              </div>

              {/* Material Standard selector */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-navy block" htmlFor="contact-material">
                  {t('contact.calc.material')}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['economy', 'premium', 'luxury'] as const).map((std) => (
                    <button
                      key={std}
                      id={`calc-std-btn-${std}`}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, materialStandard: std }))}
                      className={`py-2 rounded-lg text-[10px] sm:text-xs font-bold border transition-all cursor-pointer ${
                        formData.materialStandard === std 
                          ? 'bg-brand-navy border-brand-navy text-white shadow-md' 
                          : 'bg-white border-slate-200 text-brand-navy hover:bg-slate-50'
                      }`}
                    >
                      {std === 'economy' && t('contact.calc.mat.economy')}
                      {std === 'premium' && t('contact.calc.mat.premium')}
                      {std === 'luxury' && t('contact.calc.mat.luxury')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scope details */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-navy block" htmlFor="contact-details">
                  {t('contact.form.details')} *
                </label>
                <textarea
                  id="contact-details"
                  name="details"
                  rows={3}
                  value={formData.details}
                  onChange={handleInputChange}
                  placeholder={language === 'en' ? "Please specify materials or requirements..." : "مثال: أريد تجهيز جدران جبس بورد، صبغ داخلي، وصيانة السباكة لفيلا..."}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-brand-navy transition-all"
                ></textarea>
                {errors.details && <span className="text-[10px] font-bold text-red-500 block">{errors.details}</span>}
              </div>

              {/* Success Notification */}
              {isSuccess && (
                <div className="bg-emerald-50 text-emerald-800 p-4 border border-emerald-200 rounded-xl flex items-start space-x-3.5 rtl:space-x-reverse animate-fade-in">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold">
                    {t('contact.form.success')}
                  </span>
                </div>
              )}

              {/* Submission Button */}
              <button
                id="contact-submit-btn"
                type="submit"
                className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-extrabold text-xs sm:text-sm py-3.5 rounded-lg shadow-lg hover:shadow-brand-orange/20 cursor-pointer transition-all uppercase tracking-wider block"
              >
                {t('contact.form.submit')}
              </button>

            </form>
          </div>

          {/* Right Side: Office Info Card + WhatsApp + Google Map Embed */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick action card */}
            <div className="bg-brand-navy text-white p-6 sm:p-8 rounded-3xl border border-brand-blue/60 shadow-xl space-y-6">
              <span className="text-[10px] font-mono tracking-widest text-brand-orange font-bold uppercase block">
                {t('contact.badge')}
              </span>
              
              <h3 className="text-xl font-extrabold">
                {language === 'en' ? 'Immediate Urgent Support?' : 'صيانة الطوارئ والمقر الرئيسي؟'}
              </h3>

              <p className="text-xs text-brand-light/75 leading-relaxed font-light">
                {language === 'en' 
                  ? 'We are available for quick surveys. Get in touch with our representative instantly on mobile or chat.' 
                  : 'متوفرون في الدوحة لمعاينة المواقع والردود الفورية. اتصل مباشرة بمكتبنا أو باشر عبر مراسلة واتساب.'}
              </p>

              {/* Detail Blocks */}
              <div className="space-y-4 pt-2 border-t border-brand-light/10 text-xs text-brand-light">
                
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <Phone className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">{language === 'en' ? 'Direct Representative Mobile' : 'استفسارات الجوال'}</span>
                    <a href="tel:+97455006677" className="hover:text-brand-orange font-mono mt-0.5 block">+974 5500 6677</a>
                    <a href="tel:+97444882233" className="hover:text-brand-orange font-mono mt-0.5 block">+974 4488 2233 (Office)</a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <Mail className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">{language === 'en' ? 'Official Inquiries' : 'البريد الإلكتروني'}</span>
                    <a href="mailto:info@dutyfix.qa" className="hover:text-brand-orange font-mono mt-0.5 block">info@dutyfix.qa</a>
                    <a href="mailto:contracts@dutyfix.qa" className="hover:text-brand-orange font-mono mt-0.5 block">contracts@dutyfix.qa</a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">{t('contact.info.title')}</span>
                    <p className="font-light mt-0.5 leading-snug">{t('contact.info.address')}</p>
                  </div>
                </div>

              </div>

              {/* Primary Direct WhatsApp Builder Button */}
              <a 
                id="whatsapp-direct-btn"
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-6 rounded-lg shadow-md transition-all flex items-center justify-center space-x-2.5 rtl:space-x-reverse cursor-pointer"
              >
                {/* Standard WhatsApp icon inline SVG */}
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.455L0 24zm6.59-4.846c1.6.95 3.498 1.45 5.411 1.451 5.463 0 9.904-4.433 9.907-9.897.001-2.648-1.03-5.136-2.902-7.01C17.19 1.824 14.7 .792 12.008.792c-5.461 0-9.903 4.433-9.907 9.896-.001 1.98.517 3.915 1.502 5.62l-.991 3.616 3.701-.97c1.657.904 3.513 1.38 5.405 1.381h.005zm8.125-6.526c-.307-.154-1.82-.898-2.103-1.002-.283-.104-.49-.154-.694.154-.204.307-.792.998-.971 1.201-.18.203-.359.227-.666.073-.307-.152-1.298-.478-2.471-1.527-.913-.814-1.53-1.82-1.71-2.128-.18-.309-.018-.476.136-.629.139-.138.307-.359.462-.54.154-.18.206-.309.308-.514.103-.206.051-.385-.026-.54-.077-.154-.694-1.67-.951-2.289-.249-.599-.503-.517-.69-.526-.176-.008-.378-.01-.58-.01-.202 0-.531.076-.807.378-.278.303-1.062 1.036-1.062 2.529 0 1.492 1.085 2.936 1.235 3.138.152.203 2.136 3.262 5.174 4.57 3.038 1.308 3.038.872 3.593.823.556-.048 1.82-.743 2.078-1.46.257-.717.257-1.332.18-1.46-.076-.128-.282-.204-.589-.358z" />
                </svg>
                <span>{t('ui.whatsappChat')}</span>
              </a>

            </div>

            {/* Realistic High-Fidelity Google Maps Iframe Pointing to Doha Business Corridor */}
            <div className="bg-white rounded-3xl border border-slate-200/60 p-4 shadow-xl overflow-hidden relative group">
              <span className="text-[10px] font-bold text-brand-navy tracking-wider block uppercase mb-3 px-1">
                {language === 'en' ? 'Interactive Office Location' : 'موقع المكتب التفاعلي على الخريطة'}
              </span>
              
              <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-inner h-[280px]">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.7289520442387!2d51.50302061099688!3d25.27989522811467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45da179b00ebf5%3A0xe7261a8ef1af2b53!2sSuhaim%20Bin%20Hamad%20St%2C%20Doha%2C%20Qatar!5e0!3m2!1sen!2sqa!4v1716584000000!5m2!1sen!2sqa" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="DutyFix Map location"
                ></iframe>
              </div>

              <div className="flex items-center justify-between mt-3 text-[10px] text-brand-gray px-1">
                <span>{language === 'en' ? 'Latitude: 25.2798° N · Longitude: 51.5030° E' : 'خط عرض: 25.2798° شمال · خط طول: 51.5030° شرق'}</span>
                <span className="text-brand-orange font-bold uppercase">{language === 'en' ? 'Suhaim Rd, Doha' : 'شارع سحيم، الدوحة'}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
