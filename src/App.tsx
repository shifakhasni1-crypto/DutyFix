/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './components/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Dashboard from './components/Dashboard';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Project, QuoteInquiry } from './types';
import { initialProjects } from './mockData';
import { MessageSquare, Calendar, Phone, CheckCircle, FileCheck, ShieldAlert, X } from 'lucide-react';

function AppContent() {
  const { t, language } = useLanguage();
  const [activeSection, setActiveSection] = useState('home');
  const [selectedServiceCategory, setSelectedServiceCategory] = useState('');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  // Quote State
  const [inquiries, setInquiries] = useState<QuoteInquiry[]>([]);

  // Project List State
  const [projectsList, setProjectsList] = useState<Project[]>(initialProjects);

  // Dialog / Chat messages state for each project
  const [projectMessages, setProjectMessages] = useState<Record<string, Array<{ text: string; sender: 'client' | 'engineer'; timestamp: string }>>>({
    'proj-1': [
      { text: language === 'en' ? "Welcome to Al Mana office workspace tracker! We have just finalized structural ceilings." : "مرحبًا بكم في نظام تتبع مكاتب المانع الاستشارية. انتهينا للتو من أعمال الأسقف المعلقة الفنية.", sender: 'engineer', timestamp: '09:12 AM' },
      { text: language === 'en' ? "Excellent. Please ensure LED wiring is tested before flooring starts." : "ممتاز جداً. يرجى التأكد من معاينة تمديدات الإضاءة الذكية أولاً قبل البدء بتكسية الأرضيات الرخام.", sender: 'client', timestamp: '10:05 AM' },
      { text: language === 'en' ? "Understood. Quality safety audit completed this afternoon and matches standards." : "مفهوم وتّم في الحسبان. تم إجراء تدقيق الجودة والأمان ظهر اليوم ويطابق كود البناء تماماً.", sender: 'engineer', timestamp: '02:30 PM' }
    ],
    'proj-2': [
      { text: language === 'en' ? "Villa site survey complete. We are starting marble work this week." : "معاينة أساسات الفيلا باللؤلؤة اكتملت. سنباشر في تكسيات الرخام الفاخر هذا الأسبوع.", sender: 'engineer', timestamp: 'Yesterday' },
      { text: language === 'en' ? "Please confirm if marble has safety anti-slippage sealant." : "الرجاء تأكيد ما إذا كان الرخام مغلفًا بمادة حماية تمنع الانزلاق وامتصاص السوائل.", sender: 'client', timestamp: 'Yesterday' }
    ]
  });

  const handleAddProjectMessage = (projectId: string, message: { text: string; sender: 'client' | 'engineer'; timestamp: string }) => {
    setProjectMessages((prev) => ({
      ...prev,
      [projectId]: [...(prev[projectId] || []), message]
    }));
  };

  const handleNewInquiry = (inquiry: QuoteInquiry) => {
    setInquiries((prev) => [inquiry, ...prev]);

    // Optional Autoscroll to dashboard to preview incoming quote validation
    setTimeout(() => {
      const dbElement = document.getElementById('dashboard');
      if (dbElement) {
        dbElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 1500);
  };

  // Convert a user submitted quote directly into a dynamic project card trackable inside local state!
  const handleActivateInquiry = (inquiryId: string) => {
    const inquiry = inquiries.find((inq) => inq.id === inquiryId);
    if (!inquiry) return;

    const newProj: Project = {
      id: `active-${Math.random().toString(36).substr(2, 5)}`,
      name: {
        en: `${inquiry.serviceCategory.toUpperCase()} - Vetted Client Project`,
        ar: `الأعمال الفنية لـ - ${inquiry.name}`
      },
      location: {
        en: `${inquiry.location}, Qatar`,
        ar: `${inquiry.location}، دولة قطر`
      },
      scope: {
        en: inquiry.details,
        ar: inquiry.details
      },
      status: 'ongoing',
      progress: 15,
      clientName: inquiry.name,
      budget: inquiry.estimatedCost,
      startDate: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      manager: 'Eng. Amjad Masoud',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'
    };

    setProjectsList((prev) => [newProj, ...prev]);
    
    // Remote original inquiry
    setInquiries((prev) => prev.filter((inq) => inq.id !== inquiryId));

    // Scroll to dashboard top and notify
    const dbElement = document.getElementById('dashboard');
    if (dbElement) {
      dbElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleServiceSelected = (categoryName: string) => {
    setSelectedServiceCategory(categoryName);
    handleScrollToId('contact');
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between">
      
      {/* Scrollable Indicator Frame for Accessibility */}
      <Navbar 
        onQuoteOpen={() => setIsQuoteModalOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Sections */}
      <main id="main-content" className="flex-grow">
        <Hero 
          onQuoteOpen={() => setIsQuoteModalOpen(true)}
          onContactClick={() => handleScrollToId('contact')}
          onAboutClick={() => handleScrollToId('about')}
        />

        <About />

        <Services onServiceSelect={handleServiceSelected} />

        <Projects customProjects={projectsList.filter((p) => p.id.startsWith('active-'))} />

        <Dashboard 
          projects={projectsList}
          inquiries={inquiries}
          onActivateInquiry={handleActivateInquiry}
          onAddProjectMessage={handleAddProjectMessage}
          projectMessages={projectMessages}
        />

        <Contact 
          onSubmitInquiry={handleNewInquiry}
          selectedCategoryFromServices={selectedServiceCategory}
        />
      </main>

      <Footer onScrollTo={handleScrollToId} />

      {/* Persistent Floating WhatsApp widget */}
      <div 
        id="whatsapp-floating-ball"
        className="fixed bottom-6 right-6 ltr:right-6 rtl:left-6 rtl:right-auto z-40 group text-center"
      >
        <div className="absolute right-0 rtl:left-0 rtl:right-auto bottom-14 opacity-0 group-hover:opacity-100 bg-brand-navy border border-brand-blue/80 text-white text-[10px] py-1.5 px-3 rounded-lg shadow-xl w-44 transition-opacity duration-300 pointer-events-none font-bold leading-tight">
          {language === 'en' ? 'Direct WhatsApp Response' : 'تواصل معنا مباشرة هنا'}
        </div>
        <a
          href="https://wa.me/97455006677?text=Hello%20DutyFix%20Qatar%21%20I%27d%20like%20to%20discuss%20a%20project%20site%20survey."
          target="_blank"
          rel="noopener noreferrer"
          className="h-14 w-14 bg-emerald-600 hover:bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-2xl transform active:scale-95 transition-all outline outline-4 outline-emerald-600/20 active:outline-none"
          title="Direct WhatsApp Helpline"
          id="whatsapp-floating-link"
        >
          <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.277l-.76 2.769 2.84-.744a5.71 5.71 0 002.668.665h.001c3.181 0 5.768-2.586 5.768-5.766-.001-3.18-2.587-5.767-5.768-5.767zm3.42 8.169c-.105-.157-.384-.253-.801-.462-.418-.21-.439-.253-.544-.421c-.105-.168-.523-.674-.641-.8-.118-.126-.145-.168-.266-.316c-.11-.137-.037-.168.042-.253.079-.084.189-.21.284-.316.095-.105.158-.232.095-.442c-.063-.21-.421-1.011-.577-1.389-.153-.369-.323-.332-.442-.332-.115 0-.253-.021-.384-.021s-.347.042-.526.232c-.179.189-.684.674-.684 1.642s.705 1.905.811 2.042c.105.137 1.389 2.115 3.369 2.968 1.98.853 1.98.568 2.342.537.362-.031 1.187-.484 1.355-.953s.168-.868.118-.953c-.053-.084-.19-.137-.401-.253zM12 0C5.373 0 0 5.373 0 12c0 2.124.553 4.12 1.524 5.857L.085 24l6.299-1.654C8.017 23.368 9.945 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.85 0-3.61-.486-5.141-1.332l-.369-.202-3.818 1.002.973-3.541-.232-.387C2.559 16.035 2 14.07 2 12c0-5.514 4.486-10 10-10V22z" fill="currentColor"/>
          </svg>
        </a>
      </div>

      {/* Easy Access Quote Application Modal Overlay */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white text-brand-navy rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-slate-200 shadow-2xl relative space-y-6 max-h-[92vh] overflow-y-auto">
            
            {/* Close */}
            <button
              id="modal-close-btn"
              onClick={() => setIsQuoteModalOpen(false)}
              className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-1.5 text-slate-400 hover:text-brand-orange hover:bg-slate-100 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3.5 rtl:space-x-reverse border-b border-slate-100 pb-3">
              <MessageSquare className="w-6 h-6 text-brand-orange" />
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-brand-navy">
                  {t('nav.requestQuote')}
                </h3>
                <p className="text-xs text-brand-gray">
                  {language === 'en' ? 'Submit specifications directly for immediate response.' : 'أدخل مواصفات ومتطلبات مشروعك للحصول على عرض أسعار فني مسبق.'}
                </p>
              </div>
            </div>

            {/* Render full contact form inside modal */}
            <Contact 
              onSubmitInquiry={(inq) => {
                handleNewInquiry(inq);
                setIsQuoteModalOpen(false);
              }}
              selectedCategoryFromServices={selectedServiceCategory}
            />

          </div>
        </div>
      )}

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
