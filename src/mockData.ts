/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceCategory, Project, Testimonial, StatItem } from './types';

export const servicesData: ServiceCategory[] = [
  {
    id: 'construction',
    title: {
      en: 'Construction Services',
      ar: 'أعمال التشييد والبناء والخرسانات'
    },
    description: {
      en: 'Specialized structural, civil, and design-build contractors for modern residential and premium commercial architectures across Qatar.',
      ar: 'مقاولون متخصصون في الأعمال الإنشائية والمدنية والتصميم والبناء للمباني السكنية الحديثة والمشاريع التجارية الراقية في جميع أنحاء قطر.'
    },
    icon: 'Building2',
    services: {
      en: [
        'Residential Construction (Villas, Compounds)',
        'Commercial Construction (Offices, Retail Hubs)',
        'Civil Works (Subsurface, Retaining Systems)',
        'Structural Works (Reinforced Concrete, Steel Frames)'
      ],
      ar: [
        'البناء السكني الفاخر (فيلات، مجمعات سكنية)',
        'التشييد التجاري (أبراج مكاتب، مراكز تسوق)',
        'الأعمال المدنية الأساسية (تجهيز المواقع والأساسات)',
        'الأعمال الهيكلية (الخرسانة المسلحة، الهياكل الفولاذية)'
      ]
    }
  },
  {
    id: 'fitout',
    title: {
      en: 'Interior Fit-Out',
      ar: 'أعمال الديكور والتجهيز الداخلي'
    },
    description: {
      en: 'Turnkey aesthetic internal developments converting empty spaces into optimized, functional works of modern art.',
      ar: 'أعمال تطوير داخلية متكاملة تسلم على المفتاح، تحول المساحات الفارغة إلى بيئات عمل وحياة عصرية ومثالية.'
    },
    icon: 'Hammer',
    services: {
      en: [
        'Custom Office Fit-Out & Workspace Design',
        'Bespoke Retail Fit-Out (Shops, Malls, Showrooms)',
        'Premium Gypsum partitions & Decorative Ceilings',
        'Luxury Flooring Installation (Marble, Porcelain, Wood)'
      ],
      ar: [
        'تجهيز المكاتب وتصميم بيئات العمل الإدارية',
        'تشطيب المحلات التجارية المعارض والمراكز الاستهلاكية',
        'أعمال قواطع الجبس الفنية والأسقف المستعارة الحديثة',
        'تركيب الأرضيات الفاخرة (الرخام، البورسلين، الباركيه الخشبي)'
      ]
    }
  },
  {
    id: 'maintenance',
    title: {
      en: 'Maintenance Services',
      ar: 'أعمال الصيانة المتكاملة'
    },
    description: {
      en: 'Vigilant civil maintenance, preventative HVAC cycles, electrical diagnostics, and 24/7 technical emergency support.',
      ar: 'صيانة مدنية متميزة، معالجة وتوفير دورات صيانة وقائية للتكييف، فحص الدوائر الكهربائية، ودعم فني للحالات الطارئة طوال الأسبوع.'
    },
    icon: 'Wrench',
    services: {
      en: [
        'Preventative Building Maintenance Contracts',
        'Industrial Electrical Auditing & Maintenance',
        'Commercial Plumbing & Pipework Remediation',
        'Advanced HVAC Duct Cleaning & Compressor Maintenance',
        'Professional Exterior & Interior Repainting Packages'
      ],
      ar: [
        'عقود الصيانة الدورية والوقائية السنوية للمباني',
        'فحص وصيانة الشبكات واللوحات الكهربائية للمنشآت',
        'إصلاح وتمديد شبكات السباكة للمشاريع الكبرى',
        'تنظيف وتطهير قنوات التكييف وصيانة الضواغط والمكيفات المركزية',
        'باقات الطلاء والدهانات الفاخرة الداخلية والخارجية'
      ]
    }
  },
  {
    id: 'manpower',
    title: {
      en: 'Manpower Supply Solutions',
      ar: 'حلول توريد وتوفير الأيدي العاملة'
    },
    description: {
      en: 'Vetted, safe, and highly efficient workforce personnel complying with all Qatar Labor Law compliance and project standards.',
      ar: 'كوادر عمالية مؤهلة وملتزمة بأعلى معايير الأمن والسلامة ومطابقة لقوانين العمل القطرية ومعاير الجودة.'
    },
    icon: 'Users',
    services: {
      en: [
        'Skilled Workers (Electricians, Plumbers, Carpenters)',
        'Semi-Skilled Craft Assistants & Riggers',
        'High-Efficiency General Construction Labor',
        'Certified Technicians & Site Inspectors',
        'On-site Administrative & Documentation Staff'
      ],
      ar: [
        'العمالة الماهرة (فنيو كهرباء، سباكون، نجارون معتمدون)',
        'المساعدون والعمال نصف المهرة لمواقع الإنشاء',
        'العمالة العامة ذوي الكفاءة العالية لعمليات التشييد الكبرى',
        'الفنيون المعتمدون والمراقبون الفنيون الميدانيون',
        'الكوادر الإدارية وموثقو المستندات للمشاريع الميدانية'
      ]
    }
  }
];

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    name: {
      en: 'Marina Commercial Office Fit-Out',
      ar: 'تشطيب وتجهيز مكاتب مارينا التجارية'
    },
    location: {
      en: 'Lusail City, Qatar',
      ar: 'مدينة لوسيل، قطر'
    },
    scope: {
      en: 'Complete layout remodeling, custom acoustic partitions, architectural false ceilings, automated LED routing, and ergonomic premium carpeting.',
      ar: 'إعادة تصميم المخطط بالكامل، قواطع عزل صوتي مخصصة، أسقف معماريّة جبسية، تمديد إضاءات ذكية، وأرضيات موكيت فاخرة.'
    },
    status: 'completed',
    progress: 100,
    clientName: 'Al-Mana Holding',
    budget: 'QAR 1,250,000',
    startDate: '12-Jan-2025',
    manager: 'Eng. Tareq Al-Subaie',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'proj-2',
    name: {
      en: 'Luxury Villa Turnkey Structuring',
      ar: 'بناء فيلا فاخرة على المفتاح بالكامل'
    },
    location: {
      en: 'The Pearl-Qatar, Doha',
      ar: 'اللؤلؤة قطر، الدوحة'
    },
    scope: {
      en: 'High-end custom civil structural concrete works, bespoke facade tiling, smart HVAC climate zones, and structural curtain walls.',
      ar: 'الأعمال الإنشائية والخرسانية العظم، تكسية الواجهات الخارجية بالحجر الفاخر، تركيب نظام تكييف مركزي ذكي، وحوائط زجاجية.'
    },
    status: 'ongoing',
    progress: 78,
    clientName: 'Al-Khor Real Estate Group',
    budget: 'QAR 3,800,000',
    startDate: '05-Jul-2025',
    manager: 'Eng. Amjad Masoud',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'proj-3',
    name: {
      en: 'HVAC & Plumbing Comprehensive Overhaul',
      ar: 'تحديث كامل لأنظمة التكييف والسباكة'
    },
    location: {
      en: 'West Bay Diplomatic District, Doha',
      ar: 'منطقة الخليج الغربي الدبلوماسية، الدوحة'
    },
    scope: {
      en: 'Complex retrofitting of central industrial chillers, automated water distribution valves, and thermal leak verification audits.',
      ar: 'تحديث مجمع ومتقدم للمبردات الصناعية المركزية، استبدال الصمامات والتحكم بالشبكة، وتدقيق التسريب الحراري.'
    },
    status: 'completed',
    progress: 100,
    clientName: 'Qatar Embassy Quarter Towers',
    budget: 'QAR 850,000',
    startDate: '14-Sep-2024',
    manager: 'Eng. Youssef Al-Fakhro',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'proj-4',
    name: {
      en: 'Logistics Center Civil Structural Works',
      ar: 'الأعمال المدنية للمركز اللوجستي المتكامل'
    },
    location: {
      en: 'Industrial Area, Al Rayyan',
      ar: 'المنطقة الصناعية، الريان'
    },
    scope: {
      en: 'Excavation, grading, structural steel beam assemblies, reinforced loading bays, and civil safety barrier alignments.',
      ar: 'أعمال الحفر وتجهيز التربة، هيكل عوارض الفولاذ الإنشائية، منصات التحميل الخرسانية المسلحة، ومصدات السلامة المدنية.'
    },
    status: 'ongoing',
    progress: 45,
    clientName: 'Qatar National Logistical Services',
    budget: 'QAR 5,200,000',
    startDate: '15-Mar-2026',
    manager: 'Eng. Mohammed Khalid',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80'
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: 'test-1',
    name: { en: 'Suhail Al-Thani', ar: 'سهيل آل ثاني' },
    role: { en: 'Managing Director', ar: 'المدير التنفيذي لـ' },
    company: { en: 'Doha Prestige Properties', ar: 'الدوحة برستيج العقارية' },
    text: {
      en: 'DutyFix redefined our expectations when they tackled our office fit-out in Lusail. Real-time logging on their portal gave us complete transparency. They delivered on budget, safety-prioritized, and beautifully crafted.',
      ar: 'أعادت دوتي فيكس تعريف توقعاتنا عندما نفذت التجهيزات الداخلية لمكاتبنا في لوسيل. لوحة المتابعة منحتنا شفافية تامة. تم التسليم في حدود الميزانية وبمستوى رائع ومطابق للأمن والمحافظة على المواقع.'
    },
    rating: 5
  },
  {
    id: 'test-2',
    name: { en: 'Robert G. Jenkins', ar: 'روبرت ج. جينكينز' },
    role: { en: 'Chief Site Operations Officer', ar: 'رئيس عمليات المشاريع في' },
    company: { en: 'Gulf Base Petrochemical', ar: 'شركة بتروكيماويات الخليج الأساسية' },
    text: {
      en: 'The skilled manpower supplied by DutyFix on our Industrial Area expansion was exceptional. Highly vetted, fully legal and site-inducted workers who understood rigorous industrial safety protocols perfectly.',
      ar: 'الأيدي العاملة المتخصصة الموردة من دوتي فيكس لمشروع توسعة منطقتنا الصناعية كانت استثنائية. عمال مؤهلون، ملتزمون بالقواعد والاجراءات القانونية، ولديهم تدريب تام ببروتوكولات السلامة الصارمة.'
    },
    rating: 5
  },
  {
    id: 'test-3',
    name: { en: 'Fatma Al-Hafidh', ar: 'فاطمة الحافظ' },
    role: { en: 'Facility Estate Manager', ar: 'مديرة إدارة الأصول والمرافق لـ' },
    company: { en: 'The Pearl Residential Block A', ar: 'المجمع السكني (أ) اللؤلؤة' },
    text: {
      en: 'Having a reliable team for preventive maintenance is crucial. DutyFix takes care of all our HVAC and plumbing needs with precision scheduling. Their customer-focused dashboard is an absolute game-changer.',
      ar: 'وجود فريق صيانة وقائية موثوق يمثل ركيزة هامة لنا. دوتي فيكس تهتم بمتطلبات التكييف والسباكة مع تنظيم مواقيت الفحص بدقة متناهية. بوابة التحكم والطلبات الخاصة بهم فريدة ومريحة للغاية.'
    },
    rating: 5
  }
];

export const statisticsData: StatItem[] = [
  {
    id: 'stat-projects',
    count: '100+',
    label: { en: 'Projects Completed', ar: 'مشروعاً منجزاً بنجاح' },
    icon: 'Briefcase'
  },
  {
    id: 'stat-workers',
    count: '50+',
    label: { en: 'Skilled Workers', ar: 'فنياً وعاملاً ماهراً' },
    icon: 'HardHat'
  },
  {
    id: 'stat-clients',
    count: '25+',
    label: { en: 'Corporate Clients', ar: 'عميلاً وهيكلاً تجارياً' },
    icon: 'Building'
  },
  {
    id: 'stat-years',
    count: '5+',
    label: { en: 'Years of Experience', ar: 'سنة من الخبرة الممتازة' },
    icon: 'Award'
  }
];
