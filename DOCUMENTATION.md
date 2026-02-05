# Documentação Técnica - Portfolio João Baptista Adriano

## 📋 Visão Geral

Sistema de portfólio dinâmico com CMS integrado, desenvolvido com Next.js 16 + App Router, Three.js para gráficos 3D, e Supabase para backend.

---

## 🎯 Requisitos Implementados

### ✅ Tech Stack
- [x] Next.js 16+ com App Router
- [x] TypeScript
- [x] Tailwind CSS v3
- [x] React Three Fiber + Drei
- [x] Framer Motion
- [x] Supabase (configuração pronta)
- [x] Zustand para state management

### ✅ Localização (i18n)
- [x] Detecção automática por locale do browser
- [x] Middleware para routing com prefixo de idioma
- [x] Suporte PT (Portugal, Brasil, Angola)
- [x] Suporte EN (Global)
- [x] Toggle manual de idioma na navbar
- [x] Persistência em cookie

### ✅ Features Públicas
- [x] Hero Section com 3D background
- [x] About Me (Bio + Títulos profissionais)
- [x] Skills Graph (Gráfico interativo de habilidades)
- [x] Portfolio Grid (Cards de projetos)
- [x] CV Section (estrutura pronta)
- [x] Navbar responsiva com navegação

### ✅ Admin Dashboard
- [x] Login page (estrutura)
- [x] CRUD Projects (Add, Edit, Delete)
- [x] CRUD Profile (estrutura)
- [x] LocalStorage para persistência demo
- [x] Formulários validados

---

## 📂 Estrutura de Pastas Detalhada

```
src/
│
├── app/
│   ├── (public)/              # Route group para páginas públicas
│   │   ├── layout.tsx         # Wraps navbar + language detection
│   │   └── page.tsx           # Home: todas as seções
│   │
│   ├── admin/
│   │   ├── page.tsx           # Login
│   │   └── dashboard/
│   │       └── page.tsx       # CRUD interface
│   │
│   ├── api/                   # API routes (para futuro)
│   │
│   ├── layout.tsx             # Root layout
│   ├── globals.css            # Estilos globais + Tailwind
│   └── error.tsx              # Error boundary
│
├── components/
│   ├── three/
│   │   └── Clockwork.tsx      # 3D Gears component
│   │
│   ├── sections/              # Seções reutilizáveis
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   └── PortfolioSection.tsx
│   │
│   └── Navbar.tsx             # Navegação + language toggle
│
├── lib/
│   ├── i18n/
│   │   ├── translations.ts    # Dicionário PT/EN
│   │   └── utils.ts           # Helpers: detectBrowserLanguage, getTranslation
│   │
│   ├── db/
│   │   ├── schema.ts          # Tipos TypeScript + SQL schema
│   │   └── supabase.ts        # Cliente Supabase inicializado
│   │
│   └── store/
│       └── languageStore.ts   # Zustand: estado global de idioma
│
├── middleware.ts              # i18n routing + language detection
└── public/                    # Assets estáticos
```

---

## 🔌 Middleware (middleware.ts)

Implementa o roteamento de idioma com base em:

1. **Cookie Persistido**: Se usuário já escolheu idioma
2. **Accept-Language Header**: Header HTTP do browser
3. **Fallback**: English (EN)

**Lógica:**
```
Requisição → Verifica cookie NEXT_LOCALE
            → Se não existe, lê Accept-Language
            → Mapeia locale para PT ou EN
            → Redireciona para /pt/* ou /en/*
            → Define cookie
```

---

## 🎮 3D Clockwork Component

### Arquivo: `src/components/three/Clockwork.tsx`

Usa React Three Fiber para renderizar:

- **6 Engrenagens** com rotação independente
- **Diferentes tamanhos**: simula acoplamento real
- **Material metálico**: metalness=0.8, roughness=0.2
- **Iluminação**: Ambient + 2 Point lights (uma azul)
- **Auto-rotação**: OrbitControls com autoRotate

### Props da Engrenagem:
```typescript
position: [x, y, z]     // Posição no espaço
radius: number          // Raio em unidades
thickness: number       // Profundidade
teeth: number          // Número de dentes
rotation: [x, y, z]    // Rotação inicial
speed: number          // Velocidade angular
```

---

## 🌍 i18n Implementation

### Arquivo: `src/lib/i18n/translations.ts`

Dicionário estruturado:
```typescript
translations = {
  pt: {
    nav: { about: "Sobre Mim", ... },
    hero: { greeting: "Olá", ... },
    ...
  },
  en: {
    nav: { about: "About", ... },
    ...
  }
}
```

### Detecção de Idioma

**Países que ativam PT:**
- 🇧🇷 Brasil (pt-BR)
- 🇵🇹 Portugal (pt-PT)
- 🇦🇴 Angola (pt-AO)

**Resto:** English

---

## 💾 Database Schema (Supabase)

### Tabela: `projects`
```sql
id (UUID)              -- Primary key
title (VARCHAR)        -- Título do projeto
description (TEXT)     -- Descrição longa
image (VARCHAR)        -- URL da imagem
link (VARCHAR)         -- URL do projeto
technologies (TEXT[])  -- Array de techs
featured (BOOLEAN)     -- Destaque na home
order (INTEGER)        -- Ordem de exibição
created_at (TIMESTAMP) -- Data criação
updated_at (TIMESTAMP) -- Data atualização
```

### Tabela: `profile`
```sql
id (UUID)
name (VARCHAR)         -- Nome completo
professional_name (VARCHAR)
bio (TEXT)
email (VARCHAR)
phone (VARCHAR)
avatar_url (VARCHAR)
titles (TEXT[])        -- Array de títulos
updated_at (TIMESTAMP)
```

### Tabela: `users`
```sql
id (UUID)
email (VARCHAR UNIQUE)
password_hash (VARCHAR)
role (VARCHAR)         -- 'admin' | 'viewer'
created_at (TIMESTAMP)
```

---

## 🔐 Admin Features

### Login Page (`/admin`)
- Email + Senha
- Validação básica
- Placeholder para Supabase Auth

### Dashboard (`/admin/dashboard`)

#### Aba Projects
- **Add**: Formulário para novo projeto
- **Edit**: Carrega dados do projeto selecionado
- **Delete**: Remove projeto com confirmação
- **Persistência**: LocalStorage (trocar por Supabase)

#### Aba Profile
- Estrutura pronta
- Campos: bio, email, phone, avatar

---

## 🎨 Componentes Públicos

### HeroSection
- Integra Clockwork 3D background
- Headline + CTA button
- Animações Framer Motion
- Gradiente overlay

### AboutSection
- Bio do usuário
- 3 Títulos profissionais em cards
- Animação staggered

### SkillsSection
- **Tech Skills**: Grid 2x6 de tags
- **Language Skills**: 4 idiomas com progress bars
- Animações ao scroll

### PortfolioSection
- Grid responsivo (1-3 colunas)
- ProjectCard com imagem, techs, link
- Hover effects

### Navbar
- Logo "JA"
- Links de navegação (hidden em mobile)
- Language toggle (PT/EN)
- Link para admin

---

## 🔧 State Management (Zustand)

### `useLanguageStore`
```typescript
interface LanguageStore {
  language: "pt" | "en"
  setLanguage: (lang: Language) => void
}
```

Usado em todos os componentes que precisam de tradução:
```typescript
const language = useLanguageStore(state => state.language)
const t = getTranslation(language)
```

---

## 🚀 Deploy

### Vercel (Recomendado)
1. Push para GitHub
2. Conectar repo em vercel.com
3. Adicionar variáveis de ambiente
4. Deploy automático

### Variáveis Necessárias:
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY (server-side)
```

---

## 📝 Next Steps

1. **Supabase Setup**
   - Criar projeto em supabase.com
   - Executar SQL do schema.ts
   - Habilitar Auth
   - Gerar chaves API

2. **Autenticação Admin**
   - Implementar Supabase Auth.signInWithPassword()
   - Adicionar middleware de proteção de rota
   - JWT refresh tokens

3. **CV Section**
   - Integrar PDF download
   - Fetch currículo do Supabase

4. **Contato**
   - Formulário com validation
   - Integrar com Resend/SendGrid

5. **Blog**
   - Tabela articles no DB
   - Markdown rendering

---

## 🐛 Troubleshooting

### Erro: "Cannot find module '@react-three/fiber'"
```bash
npm install --legacy-peer-deps
```

### Porta 3000 ocupada?
Next.js automaticamente usa 3001

### Imagens não carregam no admin?
Usar URLs completas (https://...) em vez de caminhos relativos

---

## 📞 Contato

Desenvolvido por: João Baptista Adriano
Data: Fevereiro 2026
