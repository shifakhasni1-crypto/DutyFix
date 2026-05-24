/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { Menu, X, Globe, Phone, ShieldCheck, LayoutDashboard } from 'lucide-react';

interface NavbarProps {
  onQuoteOpen: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export default function Navbar({ onQuoteOpen, activeSection, setActiveSection }: NavbarProps) {
  const { language, toggleLanguage, t, isRtl } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        isScrolled || setIsScrolled(true);
      } else {
        !isScrolled || setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  const navLinks = [
    { id: 'home', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'services', label: t('nav.services') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'dashboard', label: t('nav.dashboard') },
    { id: 'contact', label: t('nav.contact') },
  ];

  const handleScrollTo = (id: string) => {
    setIsOpen(false);
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed navbar
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

  return (
    <header 
      id="app-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-brand-navy/95 backdrop-blur-md shadow-lg border-b border-brand-blue/30 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      {/* Top micro-bar for trust & contact (Hidden on scrolled mobile to save space) */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2 flex justify-between items-center text-xs text-brand-light/75 transition-all duration-300 ${
        isScrolled ? 'h-0 opacity-0 overflow-hidden mb-0' : 'h-6 opacity-100'
      }`}>
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="flex items-center space-x-1.5 rtl:space-x-reverse shrink-0">
            <Phone className="w-3.5 h-3.5 text-brand-orange shrink-0" />
            <a href="tel:+97455006677" className="hover:text-brand-orange transition-colors whitespace-nowrap shrink-0">+974 5500 6677</a>
          </div>
          <div className="hidden sm:flex items-center space-x-1.5 rtl:space-x-reverse">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-orange" />
            <span>CR No: 128492 | Doha, Qatar</span>
          </div>
        </div>
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="bg-brand-orange/20 text-brand-orange text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-semibold border border-brand-orange/30">
            {t('ui.secureSsl')}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand Panel */}
          <button 
            onClick={() => handleScrollTo('home')}
            className="flex items-center space-x-2.5 rtl:space-x-reverse cursor-pointer text-left focus:outline-none focus:ring-0"
            id="nav-logo-btn"
          >
            {/* Visual Custom SVGs - House outline with Orange elements referencing logo attachment */}
            <div className="relative w-10 h-10 bg-brand-orange rounded-lg flex items-center justify-center shadow-md shadow-brand-orange/20 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange to-amber-500 opacity-90"></div>
              {/* Construction helmet styled house roof */}
              <svg className="w-6 h-6 text-white relative z-10 transform group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div>
              <div className="flex items-baseline space-x-0.5 rtl:space-x-reverse">
                <span className="font-extrabold text-2xl tracking-tight text-white uppercase sm:text-2xl">
                  DUTY<span className="text-brand-orange">FIX</span>
                </span>
              </div>
              <p className="text-[10px] text-brand-light/60 tracking-widest font-mono uppercase leading-none mt-0.5">
                {language === 'en' ? 'ON TIME. DONE RIGHT.' : 'في الوقت المحدد. على أكمل وجه.'}
              </p>
            </div>
          </button>

          {/* Desktop Navigation Link bar */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-3 rtl:space-x-reverse">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleScrollTo(link.id)}
                id={`nav-link-${link.id}`}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
                  activeSection === link.id
                    ? 'text-brand-orange bg-white/5 font-semibold'
                    : 'text-brand-light/80 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden lg:flex items-center space-x-3 rtl:space-x-reverse">
            {/* Language Switcher Button */}
            <button
              id="lang-toggle-btn"
              onClick={toggleLanguage}
              className="flex items-center space-x-1.5 rtl:space-x-reverse text-brand-light/95 hover:text-brand-orange px-3 py-1.5 rounded-full border border-brand-light/20 hover:border-brand-orange transition-all text-xs font-semibold cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'العربية' : 'English'}</span>
            </button>

            {/* Portal Highlight Quick Launch */}
            <button
              id="quick-portal-btn"
              onClick={() => handleScrollTo('dashboard')}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-brand-blue/60 text-brand-light border border-brand-blue hover:text-brand-orange hover:bg-brand-blue/80 transition-all cursor-pointer"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-brand-orange" />
              <span>{t('nav.dashboard')}</span>
            </button>

            {/* Request free Quote Action */}
            <button
              id="navbar-quote-btn"
              onClick={onQuoteOpen}
              className="bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold text-xs py-2 px-4 shadow-md rounded-md transform active:scale-95 transition-all text-center tracking-normal cursor-pointer"
            >
              {t('nav.requestQuote')}
            </button>
          </div>

          {/* Mobile responsive toggle and actions */}
          <div className="lg:hidden flex items-center space-x-2 rtl:space-x-reverse">
            {/* Language Selection Quick Icon */}
            <button
              id="lang-toggle-btn-m"
              onClick={toggleLanguage}
              className="p-1.5 text-brand-light/80 hover:text-brand-orange rounded-full border border-white/10 hover:border-brand-orange"
              title="Toggle Language"
            >
              <Globe className="w-4 h-4" />
            </button>

            {/* Mobile Burger Menu Button */}
            <button
              id="mobile-drawer-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-brand-light hover:text-brand-orange hover:bg-white/5 rounded-md focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile drawer slider block */}
      <div 
        id="mobile-menu-drawer"
        className={`lg:hidden fixed inset-x-0 bg-brand-navy shadow-xl border-b border-brand-blue/30 transition-all duration-300 ease-in-out z-40 ${
          isOpen ? 'top-[72px] opacity-100 max-h-screen py-5' : 'top-[-400px] opacity-0 max-h-0 overflow-hidden'
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleScrollTo(link.id)}
              id={`nav-link-m-${link.id}`}
              className={`block w-full text-left rtl:text-right px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeSection === link.id
                  ? 'bg-brand-orange/10 text-brand-orange'
                  : 'text-brand-light/80 hover:bg-white/5 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-4 border-t border-brand-light/10 flex flex-col space-y-2.5 px-4">
            <button
              id="portal-toggle-m"
              onClick={() => handleScrollTo('dashboard')}
              className="flex items-center justify-center space-x-2 rtl:space-x-reverse w-full bg-brand-blue/60 hover:bg-brand-blue/80 border border-brand-blue py-2.5 rounded-lg text-sm text-white font-medium cursor-pointer"
            >
              <LayoutDashboard className="w-4 h-4 text-brand-orange" />
              <span>{t('nav.dashboard')}</span>
            </button>
            <button
              id="quote-portal-m"
              onClick={() => {
                setIsOpen(false);
                onQuoteOpen();
              }}
              className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white py-2.5 rounded-lg text-sm font-bold text-center cursor-pointer shadow-md"
            >
              {t('nav.requestQuote')}
            </button>
            <div className="flex justify-center text-xs text-brand-light/60 mt-3 font-mono">
              <span>{t('ui.secureSsl')}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
