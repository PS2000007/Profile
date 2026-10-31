/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║          PORTFOLIO CONFIG — EDIT EVERYTHING HERE         ║
 * ║   All sections, skills, projects, colors — one file.     ║
 * ║   Content sourced from Prasad Suryavanshi's résumé.      ║
 * ╚══════════════════════════════════════════════════════════╝
 */

const CONFIG = {

  /* ── CONTACT DELIVERY ───────────────────────────────────────
   |  The contact form lets the visitor send their message via
   |  WhatsApp or Email — no API keys or accounts required.
   |    • WhatsApp goes to  personal.phone   (below)
   |    • Email goes to      personal.email   (below)
   |  Change those two values to redirect where messages land.
   ─────────────────────────────────────────────────────────── */

  /* ── THEME ─────────────────────────────────────────────── */
  theme: {
    defaultMode: 'dark',          // 'dark' | 'light'
    accentColor:  '#7c3aed',      // primary violet
    accentColor2: '#06b6d4',      // secondary cyan
    accentColor3: '#f59e0b',      // highlight amber
    particleCount: 80,            // background particles (lower = better perf)
    enableCursor:  true,          // custom animated cursor
    enableParticles: true,        // particle network background
    enableTilt: true,             // 3D card tilt on hover
  },

  /* ── PERSONAL INFO ──────────────────────────────────────── */
  personal: {
    name:       'Prasad Suryavanshi',
    nameShort:  'PS',
    title:      'Full Stack Developer · .NET · Azure · Angular',
    tagline:    'Full Stack Developer with 4.6+ years building secure RESTful APIs, responsive Angular SPAs, and event-driven Azure cloud services for enterprise insurance-claims platforms.',
    bio: [
      'I\'m a <strong>Full Stack Developer</strong> with <strong>4.6+ years</strong> of professional experience designing, developing, and deploying enterprise web applications using <strong>C#, .NET, Angular, SQL Server</strong>, and <strong>Microsoft Azure</strong>.',
      'I build secure <strong>RESTful Web APIs</strong>, responsive single-page applications, and <strong>event-driven cloud services</strong> with Azure Functions and Service Bus — following <strong>SOLID principles</strong>, design patterns, and clean, layered architecture. My toolkit spans Entity Framework Core, Dapper, Azure Blob Storage, JWT/RBAC security, and SQL performance tuning.',
      'I work across the full delivery lifecycle — <strong>requirement analysis, development, code review, unit testing, deployment</strong>, and <strong>production support</strong> — and use <strong>AI-assisted development</strong> (GitHub Copilot, Claude, ChatGPT) for refactoring and test scaffolding.',
    ],
    // Rotating typewriter roles
    roles: [
      'Full Stack .NET Developer',
      'ASP.NET Core Web API Engineer',
      'Azure Cloud Developer',
      'Angular Frontend Developer',
      'SQL Server Performance Tuner',
      'Clean Architecture Advocate',
    ],
    // Contact & social
    email:    'suryavanshiprasad007@gmail.com',
    phone:    '+91 89756 74089',
    location: 'Pune, Maharashtra, India',
    linkedin: 'https://linkedin.com/in/prasad-suryavanshi007',
    github:   'https://github.com/PS2000007',
    twitter:  '',               // leave blank to hide
    website:  'https://ps2000007.github.io/Profile',
    resume:   'Prasad_Suryavanshi_Resume.pdf',  // drop the PDF in this folder to enable download
    // Avatar: use a URL to a photo, or leave '' for the SVG placeholder
    avatar:   '',
  },

  /* ── STATS (hero counters) ──────────────────────────────── */
  /* value may be a decimal; suffix is appended after the count-up.
     value 'auto' on Technologies = number of entries in techBadges below */
  stats: [
    { label: 'Years Experience',   value: 4.6,    suffix: '+' },
    { label: 'Projects Shipped',   value: 3,      suffix: ''  },
    { label: 'Technologies',       value: 'auto', suffix: ''  },
    { label: 'Insurance Integrations', value: 3,  suffix: ''  },
  ],

  /* ── SKILLS ─────────────────────────────────────────────── */
  /* level: 0-100  |  color: any CSS color or 'accent' / 'accent2' */
  skillCategories: [
    {
      icon:  '🔷',
      title: 'Backend · .NET',
      skills: [
        { name: 'C# / OOP / SOLID',          level: 92, color: '#60a5fa' },
        { name: 'ASP.NET Core Web API',      level: 92, color: '#60a5fa' },
        { name: 'ASP.NET Web API · .NET Framework', level: 88, color: '#60a5fa' },
        { name: 'Entity Framework Core',     level: 88, color: '#60a5fa' },
        { name: 'Dapper · LINQ',             level: 87, color: '#60a5fa' },
        { name: 'DI · Middleware · async/await', level: 86, color: '#60a5fa' },
      ],
    },
    {
      icon:  '🅰️',
      title: 'Frontend · Angular',
      skills: [
        { name: 'Angular',                   level: 88, color: '#f87171' },
        { name: 'TypeScript',                level: 87, color: '#f87171' },
        { name: 'RxJS · Observables',        level: 84, color: '#f87171' },
        { name: 'Reactive Forms',            level: 85, color: '#f87171' },
        { name: 'HTML · CSS · SCSS',         level: 86, color: '#f87171' },
      ],
    },
    {
      icon:  '☁️',
      title: 'Cloud · Microsoft Azure',
      skills: [
        { name: 'Azure Functions (HTTP · Timer · Service Bus)', level: 87, color: 'accent2' },
        { name: 'Azure Service Bus',         level: 85, color: 'accent2' },
        { name: 'Azure Blob Storage',        level: 88, color: 'accent2' },
        { name: 'Azure App Service',         level: 80, color: 'accent2' },
        { name: 'Microsoft Graph API',       level: 76, color: 'accent2' },
      ],
    },
    {
      icon:  '🗄️',
      title: 'Database & Reporting',
      skills: [
        { name: 'SQL Server / T-SQL',        level: 90, color: '#34d399' },
        { name: 'Stored Procedures',         level: 88, color: '#34d399' },
        { name: 'Execution Plans & Indexing', level: 84, color: '#34d399' },
        { name: 'EF Core Migrations',        level: 86, color: '#34d399' },
        { name: 'iText 7 · ABCpdf · Telerik', level: 82, color: '#34d399' },
      ],
    },
    {
      icon:  '🏛️',
      title: 'Architecture & Security',
      skills: [
        { name: 'Clean / N-Tier Architecture', level: 87, color: '#f59e0b' },
        { name: 'Repository & Unit of Work', level: 88, color: '#f59e0b' },
        { name: 'Microservices · Modular Monolith', level: 78, color: '#f59e0b' },
        { name: 'JWT · RBAC',                level: 88, color: '#f59e0b' },
        { name: 'OAuth 2.0',                 level: 76, color: '#f59e0b' },
      ],
    },
    {
      icon:  '🛠️',
      title: 'Tools, Testing & DevOps',
      skills: [
        { name: 'Git · GitHub · SourceTree',  level: 88, color: 'accent' },
        { name: 'Postman · Swagger',          level: 88, color: 'accent' },
        { name: 'Debugging & Root Cause Analysis', level: 88, color: 'accent' },
        { name: 'Unit & Regression Testing',  level: 80, color: 'accent' },
        { name: 'Azure DevOps · CI/CD · Docker', level: 70, color: 'accent' },
      ],
    },
  ],

  /* ── TECH BADGES (pill row) ─────────────────────────────── */
  techBadges: [
    'C#', '.NET', '.NET Framework', 'ASP.NET Core Web API', 'ASP.NET Web API', 'EF Core', 'Dapper', 'LINQ',
    'Angular', 'TypeScript', 'RxJS', 'HTML', 'CSS', 'SCSS',
    'SQL Server', 'T-SQL', 'Azure Functions', 'Azure Service Bus', 'Azure Blob Storage',
    'Azure App Service', 'Microsoft Graph API', 'Azure Form Recognizer',
    'JWT', 'RBAC', 'OAuth 2.0', 'Clean Architecture', 'Microservices', 'Repository Pattern',
    'iText 7', 'ABCpdf', 'Telerik Reporting', 'Git', 'GitHub', 'Azure DevOps', 'Docker',
    'Visual Studio', 'VS Code', 'Source Tree', 'Postman', 'Swagger', 'SSMS', 'JIRA', 'Service Bus Explorer',
    'GitHub Copilot', 'Claude', 'ChatGPT',
  ],

  /* ── EXPERIENCE ─────────────────────────────────────────── */
  /* highlights: shown as bullets; projects: optional per-project bullet groups */
  experience: [
    {
      role:    'Programmer Analyst — Full Stack Developer',
      company: 'Rheal Software',
      period:  'May 2022 — Present',
      type:    'Pune, India · Full-time',
      logo:    '',   // URL to company logo (optional)
      highlights: [],
      projects: [
        {
          name: 'Clear Point Claims — Claims Management System (CMS)',
          stack: 'ASP.NET Web API 2 · Angular 6 · .NET Framework 4.7.2 · Dapper · SQL Server · Azure',
          highlights: [
            'Developed end-to-end claim-processing workflows and RESTful APIs for claim intake, notes, tasks, documents, inspections, invoicing, administration, and reporting — with DTOs and Swagger documentation.',
            'Implemented event-driven background processing with <strong>Azure Functions</strong> and <strong>Azure Service Bus</strong> for claim imports, integration messages, report generation, and email/SMS notifications.',
            'Integrated external insurance platforms — <strong>XactAnalysis, Xactimate, and Symbility</strong> — for claim/FNOL imports, estimates, status updates, notes, and documents.',
            'Built retry and message-redelivery workflows with persisted retry attempts and audit logging, using Azure Blob Storage for payloads and logs to support reprocessing of failed integrations.',
            'Implemented <strong>JWT authentication</strong> and <strong>tenant-aware RBAC</strong> across user and administrator operations.',
            'Optimized SQL Server stored procedures using execution plans and indexing for high-volume claim grids, filtering, sorting, and pagination; investigated and fixed production issues across the stack.',
          ],
        },
        {
          name: 'Grip — Claim Inspection & Document Management Platform',
          stack: 'ASP.NET Core Web API (.NET 10) · Angular 21 · EF Core · SQL Server · Azure',
          highlights: [
            'Built claim, inspection, document management, and invoicing modules with scalable RESTful APIs and reusable Angular components, reactive forms, and RxJS data flows.',
            'Designed the data-access layer with <strong>EF Core Code First</strong> — entities, relationships, constraints, and migrations.',
            'Engineered high-performance <strong>Azure Functions</strong> that stream large inspection photo collections from Blob Storage into ZIP archives via the Azure SDK, significantly reducing memory consumption.',
            'Automated inspection report and photo-sheet PDFs with <strong>iText 7 and ABCpdf</strong>, plus invoice generation from inspection and estimate data — eliminating manual document preparation.',
            'Optimized EF Core LINQ queries and API payloads to handle large claim records and extensive photo collections efficiently.',
          ],
        },
        {
          name: 'Party Space Management System — Venue Booking & Event Scheduling',
          stack: 'ASP.NET Core Web API · EF Core · Angular · SQL Server',
          highlights: [
            'Delivered RESTful APIs for booking management, real-time availability checking, user registration, and payment history.',
            'Applied <strong>Repository and Unit of Work</strong> patterns with DI; managed migrations, data seeding, and transactions for data consistency.',
            'Improved API response times by tuning EF Core change tracking and loading strategies (AsNoTracking, eager vs. lazy loading).',
          ],
        },
      ],
      tags: ['C#', '.NET 10', 'ASP.NET Core', 'Web API 2', 'Angular', 'Azure Functions', 'Service Bus', 'Blob Storage', 'EF Core', 'Dapper', 'SQL Server', 'JWT / RBAC', 'iText 7'],
    },
  ],

  /* ── PROJECTS ───────────────────────────────────────────── */
  /* color: any CSS gradient or hex  |  github/live: '' to hide button */
  projects: [
    {
      icon:    '📋',
      title:   'Clear Point Claims — CMS',
      desc:    'Enterprise claims management system covering intake, notes, tasks, documents, inspections, invoicing, and reporting. Event-driven Azure Functions + Service Bus processing, integrations with XactAnalysis, Xactimate, and Symbility, retry/redelivery with audit logging, and tenant-aware JWT + RBAC security.',
      tags:    ['ASP.NET Web API 2', 'Angular', 'Dapper', 'SQL Server', 'Azure Functions', 'Service Bus'],
      color:   'linear-gradient(135deg,#7c3aed,#6366f1)',
      github:  '',
      live:    '',
      featured: true,
    },
    {
      icon:    '🔍',
      title:   'Grip — Claim Inspection & Document Platform',
      desc:    'Inspection, document management, and invoicing platform on .NET 10 and Angular 21. EF Core Code-First data layer, streaming Azure Functions that build ZIP archives of large photo sets straight from Blob Storage, and automated PDF reports and photo sheets with iText 7 and ABCpdf.',
      tags:    ['.NET 10', 'Angular 21', 'EF Core', 'Azure Blob', 'Azure Functions', 'iText 7'],
      color:   'linear-gradient(135deg,#06b6d4,#0ea5e9)',
      github:  '',
      live:    '',
      featured: true,
    },
    {
      icon:    '🎉',
      title:   'Party Space Management System',
      desc:    'Venue booking and event scheduling platform with real-time availability checks, user registration, and payment history. Repository and Unit of Work patterns with DI, EF Core migrations, seeding, and transactions; faster API responses through AsNoTracking and tuned loading strategies.',
      tags:    ['ASP.NET Core', 'Angular', 'EF Core', 'SQL Server', 'Repository / UoW', 'LINQ'],
      color:   'linear-gradient(135deg,#f59e0b,#f97316)',
      github:  '',
      live:    '',
      featured: true,
    },
    {
      icon:    '📈',
      title:   'Logger Platform',
      desc:    'Centralized logging platform that captures system logs, tracks exceptions, monitors application errors, and helps find solutions.',
      tags:    ['.NET', 'SQL Server', 'Logging'],
      color:   'linear-gradient(135deg,#8b5cf6,#6366f1)',
      github:  'https://github.com/PS2000007',
      live:    '',
      featured: false,
    },
    {
      icon:    '🏗️',
      title:   'Construction Management System',
      desc:    'Web-based project tracking and resource management application built with ASP.NET and SQL Server.',
      tags:    ['ASP.NET', 'SQL Server', 'C#'],
      color:   'linear-gradient(135deg,#10b981,#059669)',
      github:  'https://github.com/PS2000007',
      live:    '',
      featured: false,
    },
    {
      icon:    '⌨️',
      title:   'Typing Institute Management System',
      desc:    'Student enrolment, batch scheduling, and progress tracking system with role-based access.',
      tags:    ['.NET', 'SQL Server', 'RBAC'],
      color:   'linear-gradient(135deg,#ec4899,#a855f7)',
      github:  'https://github.com/PS2000007',
      live:    '',
      featured: false,
    },
    {
      icon:    '📇',
      title:   'Contacts Management System',
      desc:    'CRUD-based contact organizer with search, filtering, and categorization.',
      tags:    ['C#', '.NET', 'CRUD'],
      color:   'linear-gradient(135deg,#f43f5e,#e11d48)',
      github:  'https://github.com/PS2000007',
      live:    '',
      featured: false,
    },
  ],

  /* ── EDUCATION ──────────────────────────────────────────── */
  education: [
    {
      icon:    '🎓',
      degree:  'Master of Computer Applications (MCA)',
      school:  'Sinhgad Institute of Management and Computer Application · Savitribai Phule Pune University',
      place:   'Pune, India',
      period:  'June 2021 — June 2023',
      score:   'GPA 8.06 / 10',
    },
    {
      icon:    '📘',
      degree:  'BBA — Computer Application (BBA-CA)',
      school:  'Dada Patil College · Savitribai Phule Pune University',
      place:   'Karjat, India',
      period:  'June 2018 — June 2021',
      score:   'GPA 8.70 / 10',
    },
  ],

  /* ── CERTIFICATIONS ─────────────────────────────────────── */
  certifications: [
    {
      badge: '☁️',
      code:  'AZ-900',
      title: 'Microsoft Certified — Azure Fundamentals',
      org:   'Microsoft',
      year:  'In Progress',
      color: '#06b6d4',
    },
    {
      badge: '🏅',
      code:  'GCC-TBC',
      title: 'Computer Typing — English, 30 & 40 WPM',
      org:   'Govt. of Maharashtra',
      year:  'Certified',
      color: '#7c3aed',
    },
    {
      badge: '🏅',
      code:  'GCC-TBC',
      title: 'Computer Typing — Marathi, 30 & 40 WPM',
      org:   'Govt. of Maharashtra',
      year:  'Certified',
      color: '#f59e0b',
    },
  ],

  /* ── ABOUT TAGS ─────────────────────────────────────────── */
  aboutTags: [
    'RESTful APIs', 'Event-Driven Architecture', 'Clean Architecture',
    'SOLID & Design Patterns', 'Repository & UoW', 'JWT & RBAC',
    'Azure Functions', 'Service Bus', 'Blob Storage', 'EF Core', 'Dapper',
    'SQL Performance Tuning', 'Third-Party Integrations', 'Production Support',
    'Agile / Scrum', 'AI-Assisted Dev',
  ],

  /* ── NAV LINKS ──────────────────────────────────────────── */
  navLinks: [
    { label: 'About',     href: '#about'    },
    { label: 'Skills',    href: '#skills'   },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects',  href: '#projects' },
    { label: 'Education', href: '#education' },
    { label: 'Certs',     href: '#certifications' },
    { label: 'Contact',   href: '#contact'  },
  ],

};

// Keep the Technologies counter in sync with the tech badge list
CONFIG.stats.forEach(s => { if (s.value === 'auto') s.value = CONFIG.techBadges.length; });
