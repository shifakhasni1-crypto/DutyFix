/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { Project, QuoteInquiry } from '../types';
import { 
  BarChart, Users, Star, DollarSign, Calendar, Landmark, 
  Clock, ShieldAlert, BadgeCheck, MessageSquare, Send, Zap, PlusCircle
} from 'lucide-react';

interface DashboardProps {
  projects: Project[];
  inquiries: QuoteInquiry[];
  onActivateInquiry: (inquiryId: string) => void;
  onAddProjectMessage: (projectId: string, message: { text: string; sender: 'client' | 'engineer'; timestamp: string }) => void;
  projectMessages: Record<string, Array<{ text: string; sender: 'client' | 'engineer'; timestamp: string }>>;
}

export default function Dashboard({ 
  projects, 
  inquiries, 
  onActivateInquiry,
  onAddProjectMessage,
  projectMessages
}: DashboardProps) {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'active' | 'quotes'>('active');
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || 'proj-2');
  const [messageInput, setMessageInput] = useState('');

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedProject) return;
    
    // Add client reply
    onAddProjectMessage(selectedProject.id, {
      text: messageInput,
      sender: 'client',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    const typedMsg = messageInput;
    setMessageInput('');

    // Trigger realistic automated responsive feedback from the specific Project Manager!
    setTimeout(() => {
      let engineerFeedback = '';
      if (typedMsg.toLowerCase().includes('status') || typedMsg.includes('متى') || typedMsg.includes('انجاز')) {
        engineerFeedback = language === 'en' 
          ? `Noted. Our milestone status is currently at ${selectedProject.progress}% and we are fully on track code-wise.` 
          : `تم الاستلام. مستوى الإنجاز الحالي للمرحلة هو ${selectedProject.progress}% ونحن ملتزمون بالخطة المعتمدة ونعمل على إكمالها.`;
      } else if (typedMsg.toLowerCase().includes('change') || typedMsg.includes('تعديل') || typedMsg.includes('تغيير')) {
        engineerFeedback = language === 'en'
          ? `Acknowledged. I have flagged this design change request with our procurement team for review. I will update you soon.`
          : `مفهوم. لقد وضعت طلب التعديل هذا في الحسبان وجاري مراجعته مع فريق المشتريات والمكتب الفني لتنسيقه.`;
      } else {
        engineerFeedback = language === 'en'
          ? `Thank you for your update. I have reviewed this and aligned our field crew. Feel free to contact me for any details!`
          : `شكرًا لإفادتنا. لقد اطلعت على التفاصيل وأبلغت طاقم المعاينة والعمل في الميدان. لا تتردد في مراسلتي!`;
      }

      onAddProjectMessage(selectedProject.id, {
        text: engineerFeedback,
        sender: 'engineer',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }, 1200);
  };

  const getMilestones = (project: Project) => {
    const isCompleted = project.status === 'completed';
    return [
      { id: 'm1', label: { en: 'Site Survey & Soil Mechanics', ar: 'المعاينة الفنية وفحص التربة والأساسات' }, done: true },
      { id: 'm2', label: { en: 'Architectural Layout Approvals', ar: 'مراجعة المخططات المعمارية والبلدية الحضرية' }, done: true },
      { id: 'm3', label: { en: 'Structural Framing & MEP Core Routing', ar: 'الهيكل الإنشائي أو التجهيزات الفنية الأساسية' }, done: project.progress >= 50 || isCompleted },
      { id: 'm4', label: { en: 'Internal Fit-Out & Gypsum Detailing', ar: 'أعمال الديكور الداخلي والجبس والطلاء' }, done: project.progress >= 75 || isCompleted },
      { id: 'm5', label: { en: 'Final Inspection & Civil Handover', ar: 'التدقيق النهائي والاستلام ومطابقة وزارة العمل' }, done: isCompleted },
    ];
  };

  return (
    <section id="dashboard" className="py-20 md:py-28 bg-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading Block */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-bold text-brand-orange tracking-widest uppercase block border-b-2 border-brand-orange/20 w-max pb-1 mx-auto">
            {t('dash.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight leading-tight">
            {t('dash.title')}
          </h2>
          <p className="text-sm sm:text-base text-brand-gray font-light">
            {t('dash.subtitle')}
          </p>
        </div>

        {/* Dashboard Frame Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xl overflow-hidden">
          
          {/* Dashboard Hub Header */}
          <div className="bg-brand-navy text-white px-6 py-5 flex flex-col sm:flex-row items-center justify-between border-b border-brand-blue/60 gap-4">
            <div className="flex items-center space-x-3.5 rtl:space-x-reverse">
              <div className="bg-brand-orange p-2.5 rounded-xl text-white shadow shadow-brand-orange/30">
                <Landmark className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-brand-orange font-bold">
                  {language === 'en' ? 'Client Central Hub' : 'مركز العملاء الرقمي الموحد'}
                </span>
                <h3 className="text-lg font-extrabold leading-tight">
                  {language === 'en' ? 'DutyFix Operational Portal' : 'منصة دوتي فيكس الإلكترونية للمتابعة'}
                </h3>
              </div>
            </div>

            {/* Selector Tab Pills */}
            <div className="flex bg-white/10 p-1.5 rounded-xl border border-white/10 text-xs font-semibold">
              <button
                id="dash-tab-active"
                onClick={() => setActiveTab('active')}
                className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'active' 
                    ? 'bg-brand-orange text-white shadow-md' 
                    : 'text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                {t('dash.tab.myProjects')} ({projects.length})
              </button>
              <button
                id="dash-tab-quotes"
                onClick={() => setActiveTab('quotes')}
                className={`px-4 py-2 rounded-lg transition-all cursor-pointer relative ${
                  activeTab === 'quotes' 
                    ? 'bg-brand-orange text-white shadow-md' 
                    : 'text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                {t('dash.tab.newInquiry')}
                {inquiries.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 h-4 w-4 bg-brand-orange text-white text-[9px] rounded-full flex items-center justify-center font-bold outline outline-2 outline-white">
                    {inquiries.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Active Projects Core Frame */}
          {activeTab === 'active' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
              
              {/* Left Project Sidebar (Select Project) */}
              <div className="lg:col-span-4 border-r border-slate-100 bg-slate-50/50 p-4 space-y-3 max-h-[550px] overflow-y-auto">
                <span className="text-[10px] font-bold text-slate-400 tracking-wider block px-1.5 uppercase mb-2">
                  {language === 'en' ? 'Select Project Tracker' : 'اختر المشروع المُراد تتبعه'}
                </span>
                {projects.map((proj) => {
                  const isActive = selectedProjectId === proj.id;
                  return (
                    <button
                      key={proj.id}
                      id={`dash-proj-select-${proj.id}`}
                      onClick={() => setSelectedProjectId(proj.id)}
                      className={`w-full text-left rtl:text-right p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isActive
                          ? 'bg-white border-brand-orange/40 shadow-md ring-1 ring-brand-orange/20'
                          : 'bg-transparent border-transparent hover:bg-slate-100 text-brand-navy'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <span className="text-xs font-extrabold text-brand-orange block tracking-wider font-mono">
                          {proj.id.toUpperCase()}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-brand-navy block truncate mt-0.5">
                          {proj.name[language] || proj.name}
                        </span>
                        <span className="text-[11px] text-slate-400 block truncate font-light mt-0.5">
                          {proj.location[language] || proj.location}
                        </span>
                      </div>
                      <span className={`h-2 w-2 rounded-full shrink-0 ${
                        proj.status === 'completed' ? 'bg-emerald-500' : 'bg-brand-orange'
                      }`}></span>
                    </button>
                  );
                })}
              </div>

              {/* Right Details Panel */}
              <div className="lg:col-span-8 p-6 sm:p-8 space-y-8 max-h-[550px] overflow-y-auto">
                {selectedProject ? (
                  <div className="space-y-8 animate-fade-in">
                    
                    {/* Project Header block */}
                    <div className="flex flex-col sm:flex-row items-baseline sm:items-center justify-between gap-2">
                      <div>
                        <h4 className="text-xl sm:text-2xl font-extrabold text-brand-navy">
                          {selectedProject.name[language] || selectedProject.name}
                        </h4>
                        <span className="text-xs text-brand-gray mt-1 block">
                          {t('projects.location')}: {selectedProject.location[language] || selectedProject.location}
                        </span>
                      </div>
                      <span className={`px-3 py-1 rounded text-xs font-bold leading-none ${
                        selectedProject.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-800'
                      }`}>
                        {selectedProject.status === 'completed' ? t('projects.status.completed') : t('projects.status.ongoing')}
                      </span>
                    </div>

                    {/* Overall KPI statistics */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      
                      <div className="p-4 bg-brand-light rounded-xl border border-slate-200/50">
                        <span className="text-[10px] text-slate-400 font-bold block uppercase leading-none mb-2">
                          {t('dash.card.progress')}
                        </span>
                        <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
                          <Zap className="w-4 h-4 text-brand-orange" />
                          <span className="text-lg font-bold text-brand-navy">{selectedProject.progress}%</span>
                        </div>
                      </div>

                      <div className="p-4 bg-brand-light rounded-xl border border-slate-200/50">
                        <span className="text-[10px] text-slate-400 font-bold block uppercase leading-none mb-2">
                          {t('dash.card.manager')}
                        </span>
                        <div className="flex items-center space-x-1.5 rtl:space-x-reverse truncate">
                          <BadgeCheck className="w-4 h-4 text-brand-orange shrink-0" />
                          <span className="text-xs font-bold text-brand-navy truncate">{selectedProject.manager.split(' ').pop()}</span>
                        </div>
                      </div>

                      <div className="p-4 bg-brand-light rounded-xl border border-slate-200/50">
                        <span className="text-[10px] text-slate-400 font-bold block uppercase leading-none mb-2">
                          {t('dash.card.workers')}
                        </span>
                        <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
                          <Users className="w-4 h-4 text-brand-orange" />
                          <span className="text-lg font-bold text-brand-navy">{selectedProject.status === 'completed' ? '0' : '12'}</span>
                        </div>
                      </div>

                      <div className="p-4 bg-brand-light rounded-xl border border-slate-200/50">
                        <span className="text-[10px] text-slate-400 font-bold block uppercase leading-none mb-2">
                          {t('dash.card.budget')}
                        </span>
                        <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
                          <DollarSign className="w-4 h-4 text-brand-orange" />
                          <span className="text-sm font-bold text-brand-navy">{selectedProject.budget}</span>
                        </div>
                      </div>

                    </div>

                    {/* Timeline Tracker */}
                    <div className="space-y-4">
                      <h5 className="text-xs font-bold text-brand-navy uppercase tracking-wider flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-brand-orange" />
                        {t('dash.section.milestones')}
                      </h5>

                      {/* Milestones stepper */}
                      <div className="relative border-l-2 border-slate-200 pl-4 space-y-6 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-4">
                        {getMilestones(selectedProject).map((m, idx) => (
                          <div key={m.id} className="relative">
                            {/* Bullet circle */}
                            <span className={`absolute -left-[23px] rtl:-right-[23px] top-1 h-3 w-3 rounded-full border-2 bg-white transition-all ${
                              m.done ? 'border-brand-orange bg-brand-orange' : 'border-slate-300'
                            }`}></span>
                            <div className="space-y-1">
                              <span className={`text-xs font-bold leading-none ${m.done ? 'text-brand-navy' : 'text-slate-400'}`}>
                                {language === 'en' ? `Phase ${idx+1}` : `المرحلة ${idx+1}`}
                              </span>
                              <p className={`text-xs sm:text-sm font-semibold block ${m.done ? 'text-brand-navy' : 'text-slate-400'}`}>
                                {m.label[language]}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Live discussion feed panel */}
                    <div className="pt-6 border-t border-slate-100 space-y-4">
                      <h5 className="text-xs font-bold text-brand-navy uppercase tracking-wider flex items-center gap-1.5">
                        <MessageSquare className="w-4 h-4 text-brand-orange" />
                        {t('dash.section.discussion')}
                      </h5>

                      <div className="bg-brand-light rounded-xl p-4 border border-slate-200/50 space-y-4 max-h-[220px] overflow-y-auto">
                        {(projectMessages[selectedProject.id] || [
                          { text: language === 'en' ? "Welcome! Vetted engineer is reviewing specifications daily." : "أهلاً بك. المهندس المشرف يتابع تحديثات جدول الأعمال والمواد ميدانياً.", sender: 'engineer', timestamp: '08:00 AM' }
                        ]).map((msg, idx) => {
                          const isClient = msg.sender === 'client';
                          return (
                            <div 
                              key={idx} 
                              className={`flex flex-col max-w-[85%] ${isClient ? 'ms-auto items-end' : 'items-start'}`}
                            >
                              <div className={`p-2.5 rounded-lg text-xs font-medium ${
                                isClient ? 'bg-brand-orange text-white rounded-tr-none' : 'bg-white text-brand-navy border border-slate-200/80 rounded-tl-none'
                              }`}>
                                {msg.text}
                              </div>
                              <span className="text-[9px] text-slate-400 mt-1 font-mono">{msg.timestamp}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Chat Input */}
                      <div className="flex gap-2">
                        <input
                          id="dash-chat-input"
                          type="text"
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder={t('dash.disc.placeholder')}
                          className="flex-1 bg-brand-light border border-slate-200 rounded-lg px-3 py-2 text-xs text-brand-navy"
                        />
                        <button
                          id="dash-chat-send-btn"
                          onClick={handleSendMessage}
                          className="p-2.5 bg-brand-navy hover:bg-brand-orange text-white rounded-lg transition-all cursor-pointer"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>
                ) : (
                  <div className="text-center py-10 text-brand-gray text-sm">
                    {language === 'en' ? 'No projects are assigned yet' : 'لم يتم ربط أي مشاريع تتبع نشطة'}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* Quotes Inbound Reviews Section */}
          {activeTab === 'quotes' && (
            <div className="p-6 sm:p-8 space-y-6 min-h-[400px]">
              {inquiries.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-16 space-y-4 animate-fade-in">
                  <div className="p-3 bg-brand-light rounded-2xl text-slate-400">
                    <ShieldAlert className="w-12 h-12" />
                  </div>
                  <p className="text-brand-gray text-xs sm:text-sm max-w-md font-light">
                    {t('dash.inquiry.noData')}
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider block uppercase">
                    {language === 'en' ? 'Vetting Submitted Quotations' : 'الطلبات المقدمة قيد المراجعة الفنية'}
                  </span>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {inquiries.map((inq) => (
                      <div 
                        key={inq.id}
                        id={`quote-card-${inq.id}`}
                        className="bg-brand-light rounded-2xl border border-slate-200/80 p-5 space-y-4 hover:border-brand-orange/40 shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] font-bold text-brand-orange font-mono uppercase">
                              #{inq.id.split('-').shift()?.toUpperCase()}
                            </span>
                            <h4 className="font-bold text-brand-navy text-sm sm:text-base mt-0.5">
                              {inq.name}
                            </h4>
                          </div>
                          
                          {/* Badge Status */}
                          <div className="flex flex-col items-end">
                            <span className="text-[10px] text-slate-400 block mb-1 uppercase tracking-tight">{t('dash.inquiry.status')}</span>
                            <span className="bg-yellow-100 text-yellow-800 px-2.5 py-0.5 rounded text-[10px] font-bold">
                              {language === 'en' ? inq.status : 'قيد المراجعة والتخمين'}
                            </span>
                          </div>
                        </div>

                        {/* Metas info */}
                        <div className="grid grid-cols-2 gap-3 text-xs border-y border-slate-200/50 py-3 text-brand-navy font-semibold">
                          <div>
                            <span className="text-[9px] text-slate-400 block">{language === 'en' ? 'Category' : 'الخدمة'}</span>
                            <span>{inq.serviceCategory.toUpperCase()}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-slate-400 block">{language === 'en' ? 'Municipality' : 'البلدية والموقع'}</span>
                            <span className="truncate block">{inq.location}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-slate-400 block">{language === 'en' ? 'Area Size' : 'المساحة المقدرة'}</span>
                            <span>{inq.projectSize} sqm</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-slate-400 block">{language === 'en' ? 'Initial Estimate' : 'التقدير المالي'}</span>
                            <span className="text-brand-orange font-bold font-mono">{inq.estimatedCost}</span>
                          </div>
                        </div>

                        <div className="text-xs font-light text-brand-gray">
                          <span className="font-bold text-brand-navy block mb-1">{language === 'en' ? 'Scope Narrative:' : 'تفاصيل ومواصفات الطلب:'}</span>
                          <p>{inq.details}</p>
                        </div>

                        {/* Activator Quick Spawn Button */}
                        <button
                          id={`dash-spawn-btn-${inq.id}`}
                          onClick={() => onActivateInquiry(inq.id)}
                          className="w-full bg-brand-orange hover:bg-brand-navy text-white text-xs font-bold py-2.5 px-4 rounded-md transition-all flex items-center justify-center space-x-2 rtl:space-x-reverse cursor-pointer"
                        >
                          <PlusCircle className="w-4 h-4" />
                          <span>{t('dash.inquiry.viewLive')}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
