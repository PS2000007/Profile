/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║          PORTFOLIO CONFIG — EDIT EVERYTHING HERE         ║
 * ║   All sections, skills, projects, colors — one file.     ║
 * ╚══════════════════════════════════════════════════════════╝
 */

const CONFIG = {

  /* ── NOTIFICATIONS ──────────────────────────────────────────
   |
   |  WHATSAPP (CallMeBot — free, personal use):
   |   1. Save +34 644 59 78 32 in your contacts as "CallMeBot"
   |   2. Send this WhatsApp message to that number:
   |        I allow callmebot to send me messages
   |   3. You'll receive your apikey in reply.
   |   4. Paste your phone (intl format, no +) and apikey below.
   |
   |  EMAIL (EmailJS — free up to 200 emails/month):
   |   1. Create free account at https://www.emailjs.com
   |   2. Add an Email Service (Gmail recommended) → copy Service ID
   |   3. Create an Email Template with variables:
   |        {{from_name}}, {{from_email}}, {{subject}}, {{message}}
   |      → copy Template ID
   |   4. Go to Account → copy your Public Key
   |   5. Paste all three below.
   |
   ─────────────────────────────────────────────────────────── */
  notifications: {

    whatsapp: {
      enabled:  true,
      phone:    '91XXXXXXXXXX',       // your number WITHOUT + e.g. 919876543210
      apiKey:   'XXXXXXX',            // key you receive from CallMeBot
    },

    email: {
      enabled:    true,
      serviceId:  'service_XXXXXXX',  // EmailJS Service ID
      templateId: 'template_XXXXXXX', // EmailJS Template ID
      publicKey:  'XXXXXXXXXXXX',     // EmailJS Public Key
      toEmail:    'suryavanshiprasad007@gmail.com', // where to receive
    },

  },

  /* ── THEME ─────────────────────────────────────────────── */
  theme: {
    defaultMode: 'dark',          // 'dark' | 'light'
    accentColor:  '#7c3aed',      // primary purple
    accentColor2: '#06b6d4',      // secondary cyan
    accentColor3: '#f59e0b',      // highlight amber
    particleCount: 80,            // background particles (lower = better perf)
    enableCursor:  true,          // custom animated cursor
    enableParticles: true,        // particle network background
    enableTilt: true,             // 3D card tilt on hover
  },

  /* ── PERSONAL INFO ──────────────────────────────────────── */
  personal: {
    name:       'Surya Vanshi Prasad',
    nameShort:  'SVP',
    title:      'Full Stack Developer',
    tagline:    'Building the future, one commit at a time.',
    bio: [
      'I\'m a passionate <strong>Full Stack Developer</strong> specialising in the Microsoft ecosystem — crafting robust APIs with <strong>ASP.NET Core</strong>, reactive frontends with <strong>Angular</strong>, and deploying to <strong>Azure</strong>.',
      'My workflow bridges <strong>clean architecture</strong> (CQRS, DDD) on the backend with component-driven design and RxJS-powered reactive flows on the frontend.',
      'When I\'m not shipping features, I\'m exploring cloud-native patterns, contributing to open source, and staying on the cutting edge of the .NET and Angular ecosystems.',
    ],
    // Rotating typewriter roles
    roles: [
      '.NET Full Stack Developer',
      'Angular Frontend Architect',
      'Azure Cloud Engineer',
      'Clean Code Advocate',
      'API Design Specialist',
      'Microservices Builder',
    ],
    // Contact & social
    email:    'suryavanshiprasad007@gmail.com',
    phone:    '+91 XXXXX XXXXX',
    location: 'India — Open to Remote',
    linkedin: 'https://linkedin.com/in/suryavanshiprasad',
    github:   'https://github.com/suryavanshiprasad007',
    twitter:  '',               // leave blank to hide
    website:  '',               // leave blank to hide
    resume:   '#',              // link to downloadable CV
    // Avatar: use a URL to a photo, or leave '' for the SVG placeholder
    avatar:   '',
  },

  /* ── STATS (hero counters) ──────────────────────────────── */
  stats: [
    { label: 'Years Exp.',  value: 5  },
    { label: 'Projects',    value: 30 },
    { label: 'Clients',     value: 15 },
    { label: 'Coffees ☕',  value: 2847 },
  ],

  /* ── SKILLS ─────────────────────────────────────────────── */
  /* level: 0-100  |  color: any CSS color or 'accent' / 'accent2' */
  skillCategories: [
    {
      icon:  '🔷',
      title: 'Backend',
      skills: [
        { name: 'ASP.NET Core',        level: 95, color: 'accent'  },
        { name: 'C# / .NET 8',         level: 92, color: 'accent'  },
        { name: 'Entity Framework',    level: 88, color: 'accent'  },
        { name: 'Web API / REST',       level: 90, color: 'accent'  },
        { name: 'SignalR / gRPC',      level: 80, color: 'accent'  },
        { name: 'MediatR / CQRS',      level: 85, color: 'accent'  },
      ],
    },
    {
      icon:  '🅰️',
      title: 'Frontend',
      skills: [
        { name: 'Angular 17+',         level: 93, color: '#f87171' },
        { name: 'TypeScript',          level: 90, color: '#f87171' },
        { name: 'RxJS',                level: 87, color: '#f87171' },
        { name: 'NgRx / Signals',      level: 82, color: '#f87171' },
        { name: 'HTML5 / SCSS',        level: 88, color: '#f87171' },
        { name: 'Angular Material',    level: 85, color: '#f87171' },
      ],
    },
    {
      icon:  '🗄️',
      title: 'Database',
      skills: [
        { name: 'SQL Server / T-SQL',  level: 92, color: '#34d399' },
        { name: 'PostgreSQL',          level: 80, color: '#34d399' },
        { name: 'Redis',               level: 75, color: '#34d399' },
        { name: 'MongoDB',             level: 70, color: '#34d399' },
        { name: 'Dapper',              level: 85, color: '#34d399' },
      ],
    },
    {
      icon:  '☁️',
      title: 'Cloud & DevOps',
      skills: [
        { name: 'Microsoft Azure',     level: 87, color: 'accent2' },
        { name: 'Docker / Kubernetes', level: 80, color: 'accent2' },
        { name: 'Azure DevOps CI/CD',  level: 83, color: 'accent2' },
        { name: 'GitHub Actions',      level: 78, color: 'accent2' },
        { name: 'Terraform',           level: 65, color: 'accent2' },
      ],
    },
    {
      icon:  '🔬',
      title: 'Architecture & Patterns',
      skills: [
        { name: 'Clean Architecture',  level: 88, color: '#f59e0b' },
        { name: 'Microservices',       level: 82, color: '#f59e0b' },
        { name: 'DDD',                 level: 78, color: '#f59e0b' },
        { name: 'Event Sourcing',      level: 72, color: '#f59e0b' },
        { name: 'SOLID Principles',    level: 92, color: '#f59e0b' },
      ],
    },
    {
      icon:  '🧪',
      title: 'Testing & Quality',
      skills: [
        { name: 'xUnit / NUnit',       level: 85, color: '#a78bfa' },
        { name: 'Jasmine / Karma',     level: 80, color: '#a78bfa' },
        { name: 'Playwright / E2E',    level: 70, color: '#a78bfa' },
        { name: 'SonarQube',           level: 75, color: '#a78bfa' },
      ],
    },
  ],

  /* ── TECH BADGES (pill row) ─────────────────────────────── */
  techBadges: [
    '.NET 8', 'Angular 17', 'Azure', 'Docker', 'Kubernetes',
    'SQL Server', 'TypeScript', 'CQRS', 'Microservices', 'RxJS',
    'SignalR', 'Redis', 'GraphQL', 'gRPC', 'Swagger / OpenAPI',
    'xUnit', 'Jasmine', 'Dapper', 'MediatR', 'AutoMapper',
    'IdentityServer', 'OAuth 2.0', 'Git', 'GitHub Actions',
  ],

  /* ── EXPERIENCE ─────────────────────────────────────────── */
  experience: [
    {
      role:    'Senior Full Stack Developer',
      company: 'Tech Solutions Pvt. Ltd.',
      period:  '2022 — Present',
      type:    'Full-time',
      logo:    '',   // URL to company logo (optional)
      highlights: [
        'Architected multi-tenant SaaS platform (ASP.NET Core 8 + Angular 17) serving 10,000+ users',
        'Implemented CQRS with MediatR & Event Sourcing, reducing API latency by 40%',
        'Led migration from monolith to microservices on Azure AKS — zero-downtime cutover',
        'Established code review culture & mentored 5 junior developers',
        'Designed real-time notification system via SignalR handling 50k concurrent connections',
      ],
      tags: ['.NET 8', 'Angular', 'Azure', 'Docker', 'CQRS', 'SignalR'],
    },
    {
      role:    'Full Stack Developer',
      company: 'Digital Innovations Ltd.',
      period:  '2020 — 2022',
      type:    'Full-time',
      logo:    '',
      highlights: [
        'Built enterprise ERP modules with ASP.NET Core Web API + Angular frontend',
        'Designed normalised SQL Server schemas and optimised slow queries by 60%',
        'Integrated Azure Service Bus for async order processing pipeline',
        'Implemented JWT + Azure AD authentication across 8 distributed services',
      ],
      tags: ['.NET Core', 'Angular', 'SQL Server', 'Azure AD', 'Service Bus'],
    },
    {
      role:    '.NET Developer',
      company: 'StartUp Hub',
      period:  '2019 — 2020',
      type:    'Full-time',
      logo:    '',
      highlights: [
        'Developed REST APIs for mobile and web clients using ASP.NET Core',
        'Built reusable Angular component library shared across 3 projects',
        'Configured CI/CD pipelines with Azure DevOps — deploys from hours → minutes',
      ],
      tags: ['ASP.NET', 'Angular', 'CI/CD', 'Azure DevOps'],
    },
  ],

  /* ── PROJECTS ───────────────────────────────────────────── */
  /* color: any CSS gradient or hex  |  github/live: '' to hide button */
  projects: [
    {
      icon:    '🛒',
      title:   'Enterprise E-Commerce Platform',
      desc:    'Full B2B e-commerce with multi-tenant architecture, real-time inventory, Stripe payments, role-based dashboards, and advanced analytics.',
      tags:    ['.NET 8', 'Angular 17', 'SQL Server', 'Redis', 'Azure', 'Stripe'],
      color:   'linear-gradient(135deg,#7c3aed,#6366f1)',
      github:  '#',
      live:    '#',
      featured: true,
    },
    {
      icon:    '🏥',
      title:   'Healthcare Management System',
      desc:    'HIPAA-compliant patient portal with real-time appointment scheduling, telemedicine via SignalR, HL7 FHIR integration, and audit logging.',
      tags:    ['.NET Core', 'Angular', 'SignalR', 'PostgreSQL', 'FHIR'],
      color:   'linear-gradient(135deg,#06b6d4,#0ea5e9)',
      github:  '#',
      live:    '#',
      featured: true,
    },
    {
      icon:    '📊',
      title:   'Real-Time Analytics Dashboard',
      desc:    'Live BI dashboard with streaming data via SignalR, interactive Chart.js visuals, and role-based access powered by Azure AD.',
      tags:    ['ASP.NET', 'Angular', 'SignalR', 'Azure AD', 'Chart.js'],
      color:   'linear-gradient(135deg,#f59e0b,#f97316)',
      github:  '#',
      live:    '#',
      featured: true,
    },
    {
      icon:    '🔐',
      title:   'Identity & Access Management API',
      desc:    'Centralised OAuth 2.0 / OpenID Connect identity server on .NET with Angular admin portal for user, role, and permission management.',
      tags:    ['.NET 8', 'IdentityServer', 'Angular', 'SQL Server', 'OAuth 2.0'],
      color:   'linear-gradient(135deg,#10b981,#059669)',
      github:  '#',
      live:    '#',
      featured: false,
    },
    {
      icon:    '🤖',
      title:   'AI Document Intelligence',
      desc:    'Azure AI-powered document processing pipeline that extracts, classifies, and indexes documents with a .NET backend and Angular review UI.',
      tags:    ['.NET 8', 'Azure AI', 'Angular', 'Blob Storage', 'Cognitive Services'],
      color:   'linear-gradient(135deg,#ec4899,#a855f7)',
      github:  '#',
      live:    '#',
      featured: false,
    },
    {
      icon:    '🚀',
      title:   'Microservices Orchestrator',
      desc:    'Event-driven microservices platform using MassTransit, RabbitMQ, and Azure Service Bus with an Ocelot API gateway and distributed tracing.',
      tags:    ['.NET 8', 'MassTransit', 'RabbitMQ', 'Ocelot', 'Docker', 'K8s'],
      color:   'linear-gradient(135deg,#f43f5e,#e11d48)',
      github:  '#',
      live:    '#',
      featured: false,
    },
  ],

  /* ── CERTIFICATIONS ─────────────────────────────────────── */
  certifications: [
    {
      badge: '🏅',
      code:  'AZ-204',
      title: 'Developing Solutions for Microsoft Azure',
      org:   'Microsoft',
      year:  '2023',
      color: '#0078d4',
    },
    {
      badge: '🏅',
      code:  'AZ-900',
      title: 'Azure Fundamentals',
      org:   'Microsoft',
      year:  '2022',
      color: '#0078d4',
    },
    {
      badge: '🏅',
      code:  'AZ-305',
      title: 'Azure Solutions Architect Expert',
      org:   'Microsoft',
      year:  '2024',
      color: '#0078d4',
    },
    {
      badge: '🏅',
      code:  '.NET Dev',
      title: 'Professional .NET Developer',
      org:   'Microsoft',
      year:  '2022',
      color: '#512bd4',
    },
  ],

  /* ── ABOUT TAGS ─────────────────────────────────────────── */
  aboutTags: [
    'Clean Architecture', 'CQRS', 'Microservices', 'DDD',
    'REST & GraphQL', 'CI/CD', 'TDD / BDD', 'Event Sourcing',
    'Azure Cloud', 'Docker', 'Agile / Scrum',
  ],

  /* ── NAV LINKS ──────────────────────────────────────────── */
  navLinks: [
    { label: 'About',    href: '#about'    },
    { label: 'Skills',   href: '#skills'   },
    { label: 'Work',     href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certs',    href: '#certifications' },
    { label: 'Contact',  href: '#contact'  },
  ],

};
