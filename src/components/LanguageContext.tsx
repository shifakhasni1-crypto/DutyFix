/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextProps {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

// Rich static translations object
const translations: Record<string, Record<Language, string>> = {
  // Navigation
  'nav.home': { en: 'Home', ar: 'الرئيسية' },
  'nav.about': { en: 'About Us', ar: 'من نحن' },
  'nav.services': { en: 'Services', ar: 'خدماتنا' },
  'nav.projects': { en: 'Projects', ar: 'المشاريع' },
  'nav.dashboard': { en: 'Client Portal', ar: 'بوابة العملاء' },
  'nav.careers': { en: 'Careers', ar: 'الوظائف' },
  'nav.contact': { en: 'Contact Us', ar: 'اتصل بنا' },
  'nav.requestQuote': { en: 'Request a Quote', ar: 'طلب تسعيرة' },

  // Hero Section
  'hero.title': { en: 'Building Excellence, Delivering Quality', ar: 'بناء التميز، تقديم الجودة' },
  'hero.subtitle': { en: 'Your trusted partner for Construction, Renovation, Maintenance, Interior Fit-Out, and Manpower Supply Services in Qatar.', ar: 'شريكك الموثوق لخدمات البناء، الترميم، الصيانة، التصميم الداخلي والتجهيز، وتوريد العمالة في قطر.' },
  'hero.cta.quote': { en: 'Request a Quote', ar: 'طلب تسعيرة' },
  'hero.cta.contact': { en: 'Contact Us', ar: 'اتصل بنا' },
  'hero.cta.about': { en: 'About Us', ar: 'من نحن' },

  // About Section
  'about.badge': { en: 'WHO WE ARE', ar: 'من نحن' },
  'about.title': { en: 'Your Professional Partner in Building & Facility Services', ar: 'شريكك المهني في خدمات البناء وتجهيز المرافق' },
  'about.p1': {
    en: 'DutyFix Construction & Maintenance is a professional construction and facility services company providing reliable solutions for residential, commercial, and industrial projects in Doha and throughout Qatar. We combine skilled manpower, top-tier materials, and industry expertise to deliver projects safely, efficiently, and on time.',
    ar: 'دوتي فيكس للمقاولات والصيانة هي شركة رائدة في مجال أعمال البناء والخدمات الفنية، تقدم حلولاً موثوقة للمشاريع السكنية والتجارية والصناعية في الدوحة وجميع أنحاء دولة قطر. نجمع بين الكوادر العمالية المؤهلة، المواد الممتازة، والخبرة الواسعة في هذا المجال لإنجاز المشاريع بأعلى معايير السلامة والجودة وفي الوقت المحدد.'
  },
  'about.p2': {
    en: 'Rooted in Qatar with a vision of structural sustainability, DutyFix has grown to meet the high demands of the local construction sector. Whether custom fit-outs, building maintenance, civil engineering, or strategic workforce supply, our dedication to precision ensures structural integrity and absolute client satisfaction.',
    ar: 'انطلاقاً من دولة قطر وبِرؤية ترتكز على الاستدامة، نمت دوتي فيكس لتلبية المتطلبات المتزايدة لقطاع التشييد والبناء المحلي. سواء كانت أعمال التصميم الداخلي، صيانة المباني، الأعمال المدنية، أو توريد الأيدي العاملة المتخصصة، فإن التزامنا بالدقة يضمن سلامة المنشآت والرضا التام لعملائنا.'
  },
  'about.stat.projects': { en: 'Completed Projects', ar: 'مشروعاً منجزاً' },
  'about.stat.workers': { en: 'Skilled Workers', ar: 'عاملاً متخصصاً' },
  'about.stat.clients': { en: 'Corporate Clients', ar: 'عميلاً تجارياً' },
  'about.stat.years': { en: 'Years Experience', ar: 'سنوات خبرة' },

  // Services Section
  'services.badge': { en: 'WHAT WE DO', ar: 'خدماتنا المميزة' },
  'services.title': { en: 'Comprehensive Engineering and Maintenance Solutions', ar: 'حلول هندسية وصيانة متكاملة وشاملة' },
  'services.subtitle': { en: 'We deliver custom-tailored solutions across four key pillars supporting Qatar\'s structural landscape.', ar: 'نقدم حلولاً مخصصة عبر أربعة ركائز أساسية تدعم المنهج الإنشائي والخدمي في دولة قطر.' },
  'services.learnMore': { en: 'Learn More', ar: 'تعرف على المزيد' },
  
  // Choose Us Section
  'why.badge': { en: 'WHY DUTYFIX', ar: 'لماذا دوتي فيكس' },
  'why.title': { en: 'Sustaining Value Through Uncompromised Professionalism', ar: 'الحفاظ على قيمة أعمالكم بمهنية لا تعرف المساومة' },
  'why.subtitle': { en: 'Our clients choose us because of our strict adherence to international building codes, precision timelines, and high quality safety policies.', ar: 'يختارنا عملاؤنا لالتزامنا الصارم بـأكواد البناء العالمية، جداول التنفيذ الدقيقة، وسياسات السلامة والصحة المهنية.' },
  'why.item.exp.title': { en: 'Experienced Professionals', ar: 'خبراء ومتخصصون ذوو خبرة' },
  'why.item.exp.desc': { en: 'Engineers, project managers, and technicians vetted for outstanding complex execution standard.', ar: 'مهندسون ومدراء مشاريع وفنيون تم اختيارهم بعناية لضمان أعلى معايير التنفيذ في المعطيات المعقدة.' },
  'why.item.qual.title': { en: 'High-Quality Workmanship', ar: 'جودة تنفيذ ممتازة' },
  'why.item.qual.desc': { en: 'Sourcing the finest materials combined with master craftsmanship for robust, visual perfection.', ar: 'توريد أفضل المواد مقترناً بمهارة حرفية رفيعة المستوى لضمان المتانة والجمال.' },
  'why.item.price.title': { en: 'Competitive Pricing', ar: 'أسعار تنافسية ومدروسة' },
  'why.item.price.desc': { en: 'Transparent estimates and optimized project budgets that yield higher ROI and minimal waste.', ar: 'تقديرات سعرية واضحة وميزانيات محسّنة تضمن أفضل عائد للاستثمار وتقليل الهدر.' },
  'why.item.delivery.title': { en: 'On-Time Project Delivery', ar: 'التسليم في الوقت المحدد' },
  'why.item.delivery.desc': { en: 'Rigorous milestone monitoring guarantees fast execution paths without compromised criteria.', ar: 'المتابعة الدقيقة لمراحل العمل تضمن سرعة الإنجاز والالتزام الكلي بالجداول الزمنية.' },
  'why.item.safety.title': { en: 'Safety-First Approach', ar: 'منهجية السلامة أولاً' },
  'why.item.safety.desc': { en: 'Zero-harm policy, strict PPE regulations, and structural protection for overall workspace security.', ar: 'سياسة الحماية التامة، والالتزام بأدوات الحماية الشخصية لسلامة كافة الأطراف وموقع العمل.' },
  'why.item.guarantee.title': { en: 'Satisfaction Guarantee', ar: 'ضمان الرضا الكامل' },
  'why.item.guarantee.desc': { en: 'Full post-handover warranty schedules and round-the-clock supportive operational readiness.', ar: 'متابعة ما بعد التسليم وضمانات تشغيلية وخدمة دعم عملاء متوفرة على مدار الساعة.' },

  // Projects Section
  'projects.badge': { en: 'OUR PORTFOLIO', ar: 'معرض أعمالنا' },
  'projects.title': { en: 'Recent Projects In Qatar', ar: 'مشاريعنا الحديثة في قطر' },
  'projects.subtitle': { en: 'Explore our track record of civil, industrial, commercial, and interior fit-out accomplishments completed across Doha and key municipalities.', ar: 'تصفح سجل نجاحنا في المشاريع المدنية والصناعية والتجارية وأعمال التصميم والتجهيز الداخلي بالدوحة ومختلف المناطق.' },
  'projects.status.completed': { en: 'Completed', ar: 'مكتمل' },
  'projects.status.ongoing': { en: 'Ongoing', ar: 'جاري العمل' },
  'projects.status.planning': { en: 'Planning', ar: 'مرحلة التخطيط' },
  'projects.manager': { en: 'Project Manager', ar: 'مدير المشروع' },
  'projects.budget': { en: 'Contract Value', ar: 'قيمة العقد' },
  'projects.location': { en: 'Location', ar: 'الموقع' },
  
  // Testimonials
  'testimonials.badge': { en: 'REVIEWS', ar: 'آراء عملائنا' },
  'testimonials.title': { en: 'What Our Clients Say', ar: 'ماذا يقولون عنا' },
  'testimonials.subtitle': { en: 'Discover how DutyFix brings peace of mind and structural excellence to leaders in Qatari commercial and residential estates.', ar: 'اكتشف كيف توفر دوتي فيكس راحة البال والجودة العالية للشركات والملاك العقاريين في قطر.' },

  // Contact Section
  'contact.badge': { en: 'GET IN TOUCH', ar: 'تواصل معنا الآن' },
  'contact.title': { en: 'Discuss Your Next Project With Us', ar: 'دعنا نناقش مشروعك القادم' },
  'contact.subtitle': { en: 'Our engineering response team will review your requirements and provide an initial site survey or quotation within 24 hours.', ar: 'سيقوم فريقنا الهندسي بدراسة متطلباتك وترتيب معاينة للموقع أو تقديم تسعيرة أولية خلال 24 ساعة.' },
  
  // Contact Form & Calculator
  'contact.form.title': { en: 'Send a Message', ar: 'إرسال رسالة مباشرة' },
  'contact.form.name': { en: 'Full Name', ar: 'الاسم بالكامل' },
  'contact.form.email': { en: 'Email Address', ar: 'البريد الإلكتروني' },
  'contact.form.phone': { en: 'Phone Number (Qatar)', ar: 'رقم الهاتف (قطر)' },
  'contact.form.service': { en: 'Service Category Required', ar: 'نوع الخدمة المطلوبة' },
  'contact.form.location': { en: 'Project Location (Municipal/City)', ar: 'موقع المشروع (المدينة/المنطقة)' },
  'contact.form.details': { en: 'Detailed Scope of Work', ar: 'تفاصيل ومجال العمل المطلوبة' },
  'contact.form.size': { en: 'Estimated Project Area (sqm)', ar: 'المساحة التقريبية للمشروع (متر مربع)' },
  'contact.form.submit': { en: 'Submit Quote Request', ar: 'إرسال طلب التسعيرة' },
  'contact.form.success': { en: 'Inquiry submitted successfully! We have also logged this in your Client Portal Tracker.', ar: 'تم إرسال طلبك بنجاح! لقد قمنا أيضاً بتسجيله في "بوابة العملاء" لتتبع حالة الطلب والتسعير مباشرة.' },
  'contact.form.required': { en: 'This field is required', ar: 'هذا الحقل مطلوب' },
  'contact.form.invalidEmail': { en: 'Please enter a valid email address', ar: 'يرجى إدخال بريد إلكتروني صحيح' },
  'contact.form.invalidPhone': { en: 'Phone must be a valid 8-digit Qatar mobile/landline number', ar: 'يجب أن يكون الهاتف في قطر مكوّناً من 8 أرقام' },
  
  // Quote Estimator
  'contact.calc.title': { en: 'Instant Quote Estimator ⚡', ar: 'مخمن الأسعار الفوري ⚡' },
  'contact.calc.desc': { en: 'Select your scope, material standard, and dimensions to get an immediate provisional budget estimate.', ar: 'اختر نوع الخدمة، معايير المواد، والأبعاد للحصول على تقدير ميزانية تقريبي مسبق وفوري.' },
  'contact.calc.material': { en: 'Material & Craft Standard', ar: 'معيار المواد والتشطيب' },
  'contact.calc.mat.economy': { en: 'Standard / Budget-Friendly', ar: 'اقتصادي / معايير أساسية' },
  'contact.calc.mat.premium': { en: 'Premium Industrial Grade', ar: 'ممتاز / مستويات صناعية متفوقة' },
  'contact.calc.mat.luxury': { en: 'Luxury / Bespoke Elite', ar: 'فاخر حصري / تفصيل حسب الطلب' },
  'contact.calc.result.title': { en: 'Provisional Dynamic Estimate', ar: 'التقدير المالي التقريبي الفوري' },
  'contact.calc.result.sub': { en: '*Note: This is a system-generated provisional estimate. Final rates are determined following site surveys.', ar: '*تنبيه: هذا تقدير آلي أولي. الأسعار النهائية تُعتمد بعد معاينة الموقع الفنية ووضع المظاريف.' },
  'contact.calc.result.btn': { en: 'Apply for Real Site Survey', ar: 'تقديم طلب معاينة موقع معتمدة' },

  // Map & Info
  'contact.info.title': { en: 'Headquarters Office', ar: 'المكتب الرئيسي للشركة' },
  'contact.info.address': { en: 'Al Mana Tower, Suhaim Bin Hamad St, C-Ring Road, Doha, Qatar', ar: 'برج المانع، شارع سحيم بن حمد، الطريق الدائري الثالث، الدوحة، دولة قطر' },
  'contact.info.working': { en: 'Working Hours', ar: 'ساعات العمل الرسمية' },
  'contact.info.working.time': { en: 'Saturday - Thursday: 8:00 AM - 6:00 PM', ar: 'السبت - الخميس: 8:00 صباحاً - 6:00 مساءً' },
  'contact.info.working.friday': { en: 'Friday: Emergency Maintenance Support Only (24/7)', ar: 'الجمعة: صيانة الطوارئ فقط على مدار الساعة' },

  // Brand Info
  'brand.slogan': { en: 'On time. Done right.', ar: 'في الوقت المحدد. على أكمل وجه.' },
  'brand.description': { en: 'DutyFix is Qatar\'s leading civil works, premium interior fit-outs, building maintenance, and skilled workforce supply partner.', ar: 'دوتي فيكس هي الشريك الرائد في دولة قطر لأعمال البناء والتشييد، والتجهيز الداخلي الفاخر، وصيانة المباني، وتوريد الكوادر العمالية المتخصصة.' },

  // General UI labels
  'ui.backToTop': { en: 'Back to Top', ar: 'العودة للأعلى' },
  'ui.secureSsl': { en: 'SSL Encrypted & Secure connection', ar: 'اتصال آمن ومشفر بالكامل SSL' },
  'ui.whatsappChat': { en: 'Chat with us on WhatsApp', ar: 'تواصل معنا عبر واتساب' },
  'ui.seoKeywords': { en: 'Engineering Doha Construction Renovation Services Maintenance Manpower Supply Qatar', ar: 'مقاولات الدوحة صيانة بناء توريد عمالة تشطيبات هندسة ديكور قطر' },

  // Dashboard Section
  'dash.badge': { en: 'CUSTOMER POWERED', ar: 'بوابة الخدمات الرقمية' },
  'dash.title': { en: 'Interactive Project Management Portal', ar: 'لوحة التحكم والطلبات التفاعلية للعملاء' },
  'dash.subtitle': { en: 'Access your transparent project tracking. View real-time milestones, pending tasks, assigned resource count, and direct budget tallies instantly.', ar: 'تابع تقدم أعمالك وطلباتك بكل شفافية. اطلع على مراحل الإنجاز والمخطط الزمني، العمالة المخصصة، والميزانية.' },
  'dash.tab.myProjects': { en: 'My Active Projects', ar: 'مشاريعي القائمة' },
  'dash.tab.newInquiry': { en: 'Incoming Quotes & Reviews', ar: 'الطلبات والتقديرات الواردة' },
  'dash.card.progress': { en: 'Overall Progress', ar: 'مستوى الإنجاز العام' },
  'dash.card.manager': { en: 'Supervising Engineer', ar: 'المهندس المشرف' },
  'dash.card.workers': { en: 'Assigned Manpower', ar: 'العمالة المخصصة حالياً' },
  'dash.card.budget': { en: 'Approved Budget', ar: 'الميزانية المعتمدة للعقد' },
  'dash.section.milestones': { en: 'Project Timeline Milestones', ar: 'مراحل ومخطط سير المشروع' },
  'dash.section.discussion': { en: 'Direct Client-Engineer Communications', ar: 'التواصل المباشر مع المهندس المشرف' },
  'dash.disc.placeholder': { en: 'Send a feedback, query, or material override to your project manager...', ar: 'اكتب استفساراً، ملاحظة أو تعديلاً على المواد لتبليغ مدير مشروعك مباشرة...' },
  'dash.disc.send': { en: 'Send Update', ar: 'إرسال الإفادة' },
  'dash.disc.noted': { en: 'Engineer response logged in history panel.', ar: 'تم تدوين رد المشرف وإرساله بنجاح.' },
  'dash.inquiry.noData': { en: 'No pending quotes found. Submit a quote via our Contact section to see it track on this dashboard in real-time!', ar: 'لا توجد تسعيرات قيد المراجعة حالياً. أرسل طلب تسعيرة في قسم التواصل ليتم تتبع حالته والموافقة عليه مباشرة في لوحة التحكم هذه!' },
  'dash.inquiry.status': { en: 'Tracking Status', ar: 'حالة المراجعة' },
  'dash.inquiry.received': { en: 'Enquiry Received', ar: 'تم استقبال الطلب' },
  'dash.inquiry.estimating': { en: 'Estimating & Survey Prep', ar: 'تجهيز المظروف والمعاينة' },
  'dash.inquiry.approved': { en: 'Approved & Moving to Contract', ar: 'معتمد وجاري إعداد العقد' },
  'dash.inquiry.viewLive': { en: 'Spawn as Active Project Tracker', ar: 'تفعيل وتدشين كــمشروع نشط' },

  // Careers section (Footer Link Trigger/Modal)
  'careers.title': { en: 'Build Your Career with DutyFix', ar: 'ابنِ مستقبلك المهني مع دوتي فيكس' },
  'careers.desc': { en: 'We are constantly seeking brilliant engineers, skilled construction specialists, draftsmen, and project coordinators to join Doha\'s elite contracting team.', ar: 'نبحث باستمرار عن مهندسين مبدعين، فنيين متميزين، رسامين معماريين، ومنسقي مشاريع للانضمام لفريق المقاولات الأفضل في الدوحة.' },
  'careers.applyNow': { en: 'Send CV to recruitment@dutyfix.qa', ar: 'أرسل سيرتك الذاتية إلى: recruitment@dutyfix.qa' }
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('dutyfix_lang');
    if (saved === 'en' || saved === 'ar') return saved;
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('dutyfix_lang', lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const isRtl = language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    if (isRtl) {
      document.documentElement.classList.add('font-arabic');
    } else {
      document.documentElement.classList.remove('font-arabic');
    }
  }, [language, isRtl]);

  const t = (key: string): string => {
    const term = translations[key];
    if (!term) return key;
    return term[language] || term['en'] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage, t, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
