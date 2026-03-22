// ============================================================
// Dados centralizados do portfólio — edite aqui facilmente
// ============================================================

export const personal = {
  name: 'Guilherme Moreli',
  role: 'Desenvolvedor Python & C#',
  tagline: 'Construindo soluções elegantes para problemas complexos.',
  bio: `Estudante do primeiro ano do Ensino Médio e aluno do SENAI, onde curso
Desenvolvimento de Sistemas com foco em Python com frameworks e C# fullstack —
incluindo bancos de dados, Git e diversas tecnologias do ecossistema .NET.
Apaixonado por código limpo e por transformar ideias em soluções reais.`,
  email: 'es.guilhermemoreli@proton.me',
  github: 'https://github.com/guilhermemorelidev',
  linkedin: 'https://www.linkedin.com/in/guilherme-moreli-1841b9363/',
  image: '/img.jpeg',
};

export type Skill = { name: string; level: number };
export type SkillCategory = { category: string; icon: string; items: Skill[] };

export const skills: SkillCategory[] = [
  {
    category: 'Backend',
    icon: '⚙️',
    items: [
      { name: 'C#', level: 90 },
      { name: 'Python', level: 78 },
      { name: 'APIs REST', level: 80 },
      { name: 'FastAPI', level: 50 },
      { name: '.NET', level: 78 },
      { name: 'SQL', level: 80 },
    ],
  },
  {
    category: 'Frontend',
    icon: '🎨',
    items: [
      { name: 'Svelte', level: 64 },
      { name: 'TypeScript', level: 75 },
      { name: 'HTML/CSS', level: 85 },
      { name: 'Tailwind CSS', level: 80 },
    ],
  },
  {
    category: 'Tools & DevOps',
    icon: '🛠️',
    items: [
      { name: 'Git & GitHub', level: 88 },
      { name: 'Linux', level: 90 },
      { name: 'PostgreSQL', level: 50 },
      { name: 'VS Code', level: 95 },
    ],
  },
];

export type Project = {
  title: string;
  description: string;
  techs: string[];
  link: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: 'Gerenciador de Tarefas CLI',
    description:
      'App de linha de comando para criar, listar e concluir tarefas. Dados salvos em SQLite, com filtros por status e prazo. Projeto feito para aprender estrutura de dados e persistência.',
    techs: ['Python', 'SQLite', 'Click', 'Git'],
    link: 'https://github.com/guilhermemorelidev',
    featured: true,
  },
  {
    title: 'API de Cadastro com C#',
    description:
      'CRUD completo de usuários com ASP.NET Core e Entity Framework. Inclui autenticação JWT, validação de dados e documentação Swagger — projeto do curso SENAI.',
    techs: ['C#', 'ASP.NET Core', 'EF Core', 'JWT'],
    link: 'https://github.com/guilhermemorelidev',
    featured: true,
  },
  {
    title: 'Bot de Cotações',
    description:
      'Script Python que busca cotações de dólar e criptomoedas em APIs públicas e envia um resumo diário por email de forma automática.',
    techs: ['Python', 'Requests', 'smtplib', 'Cron'],
    link: 'https://github.com/guilhermemorelidev',
  },
  {
    title: 'Portfólio Pessoal',
    description:
      'Este site! Desenvolvido com Svelte e Tailwind CSS, com animações CSS, design responsivo e fundo em canvas animado.',
    techs: ['Svelte', 'TypeScript', 'Tailwind', 'Vite'],
    link: 'https://github.com/guilhermemorelidev',
  },
];

export type Education = {
  title: string;
  institution: string;
  period: string;
  description: string;
};

export const education: Education[] = [
  {
    title: 'Python com Framework',
    institution: 'SENAI — Em andamento',
    period: '2026 - Atual',
    description: 'Curso técnico com foco em Python fullstack com frameworks',
  },
  {
    title: 'Curso C# Avançado',
    institution: 'SENAI — Em andamento',
    period: '2026 - Atual',
    description: 'Curso técnico com foco em C# fullstack, bancos de dados relacionais, Git e versionamento de código.',
  },
  {
    title: 'Curso Front-end Completo',
    institution: 'Origamid',
    period: '2025',
    description: 'Curso completo de html, css tailwind e javascript para front-end com frameworks como Vuejs, React',
  },
  {
    title: 'Lógica de Programação & Python',
    institution: 'Cursos Online',
    period: '2024',
    description: 'Estudo independente de fundamentos de programação, estruturas de dados, algoritmos e primeiros projetos práticos em Python.',
  },
];
