# Portfolio - João Baptista Adriano

Portfólio profissional dinâmico com painel administrativo, construído com Next.js 16, Three.js e Supabase.

## 🎨 Features

✅ **3D Background** - Componente Three.js com engrenagens animadas (Clockwork)
✅ **Internationalization (i18n)** - Detecção automática de idioma + seletor manual (PT/EN)
✅ **Responsive Design** - Mobile-first com Tailwind CSS v3
✅ **Animações Suaves** - Framer Motion para transições elegantes
✅ **Admin Dashboard** - CRUD de projetos e perfil (protegido)
✅ **Seções Públicas** - Hero, About, Skills, Portfolio, CV

## 🚀 Tecnologias

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| [Next.js](https://nextjs.org/) | ^16 | Framework React/SSR |
| [TypeScript](https://www.typescriptlang.org/) | ^5 | Tipagem estática |
| [Tailwind CSS](https://tailwindcss.com/) | ^3.4 | Styling |
| [Framer Motion](https://www.framer.com/motion/) | ^10 | Animações |
| [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/) | ^8 | React + Three.js |
| [@react-three/drei](https://github.com/pmndrs/drei) | ^9 | Utilidades 3D |
| [Zustand](https://github.com/pmndrs/zustand) | ^4 | State management |
| [Supabase](https://supabase.com/) | ^2 | Backend/Auth/DB |

## 📦 Instalação

### 1. Clone e Instale Dependências

```bash
npm install
```

### 2. Configure Variáveis de Ambiente

Crie um arquivo `.env.local` baseado em `.env.example`:

```bash
cp .env.example .env.local
```

Preencha com suas credenciais do Supabase:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Setup do Banco de Dados (Supabase)

Acesse seu projeto Supabase e execute as queries SQL em `src/lib/db/schema.ts` para criar as tabelas.

## 🛠️ Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3001](http://localhost:3001) (a porta pode variar se 3000 estiver em uso)

## 🏗️ Build & Deploy

```bash
# Build de produção
npm run build

# Iniciar servidor de produção
npm start
```

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── (public)/           # Rotas públicas
│   │   ├── layout.tsx      # Layout com navbar
│   │   └── page.tsx        # Home (seções)
│   ├── admin/
│   │   ├── page.tsx        # Login page
│   │   └── dashboard/
│   │       └── page.tsx    # Dashboard CRUD
│   ├── api/                # API routes (futuro)
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Estilos globais
├── components/
│   ├── three/
│   │   └── Clockwork.tsx   # 3D gear animation
│   ├── sections/           # Seções da página
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   └── PortfolioSection.tsx
│   └── Navbar.tsx
├── lib/
│   ├── i18n/
│   │   ├── translations.ts # Strings i18n
│   │   └── utils.ts        # Funções de idioma
│   ├── db/
│   │   ├── schema.ts       # Tipos TS + SQL
│   │   └── supabase.ts     # Cliente Supabase
│   └── store/
│       └── languageStore.ts # Zustand language store
└── middleware.ts           # i18n middleware
```

## 🌐 Localização (i18n)

A detecção automática funciona assim:

- **Portugal, Brasil, Angola** → Portuguese (PT)
- **Resto do mundo** → English (EN)

Botão para alternar manualmente no canto superior direito da navbar.

## 🔐 Admin Dashboard

### Acessar

[http://localhost:3001/admin](http://localhost:3001/admin)

### Features

- ✅ Add/Edit/Delete Projetos
- ✅ Update Perfil (em desenvolvimento)
- ✅ LocalStorage para demo (trocar por Supabase em produção)

## 📋 Roadmap

- [ ] Integração completa com Supabase Auth
- [ ] Seção de CV com download PDF
- [ ] Blog/Artigos
- [ ] Formulário de contato
- [ ] Analytics (Google Analytics/Vercel)
- [ ] Dark mode persistente

## 📝 Licença

Propriedade de João Baptista Adriano - 2026
