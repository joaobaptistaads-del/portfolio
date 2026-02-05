# 🚀 Deploy: GitHub + Vercel

## ✅ PASSO 1: Criar Repositório no GitHub

1. **Acesse GitHub**
   - Vá para https://github.com/new
   - Faça login com sua conta

2. **Configure o novo repositório**
   - Nome: `portfolio` (ou outro nome que quiser)
   - Descrição: "Portfólio pessoal - Next.js 16 + 3D + Admin Dashboard"
   - Visibilidade: **Public** (para Vercel conseguir acessar)
   - **NÃO** inicialize com README, .gitignore ou license (já temos)
   - Clique em "Create repository"

3. **Copie o comando que aparecerá**
   Você receberá um código como:
   ```bash
   git remote add origin https://github.com/SEU_USUARIO/portfolio.git
   git branch -M main
   git push -u origin main
   ```

## ✅ PASSO 2: Fazer Push para GitHub

Execute no terminal do seu projeto:

```bash
cd c:\Users\joaob\Portifolio

# Adicione o repositório remoto
git remote add origin https://github.com/SEU_USUARIO/portfolio.git

# Renomeie branch para main (se necessário)
git branch -M main

# Faça push
git push -u origin main
```

**Substitua `SEU_USUARIO` pelo seu nome de usuário no GitHub!**

## ✅ PASSO 3: Deploy no Vercel

### Opção A: Via Interface Vercel (Mais fácil)

1. **Acesse Vercel**
   - Vá para https://vercel.com
   - Faça login com GitHub

2. **Importe o projeto**
   - Clique em "Add New..." → "Project"
   - Selecione seu repositório `portfolio`
   - Vercel detectará Next.js automaticamente

3. **Configure as variáveis de ambiente** (se necessário)
   - Se usar Supabase, adicione:
     ```
     NEXT_PUBLIC_SUPABASE_URL=seu_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave
     ```

4. **Deploy**
   - Clique em "Deploy"
   - Aguarde ~2-3 minutos
   - Vercel dará um URL público tipo: `seu-portfolio.vercel.app`

### Opção B: Via CLI Vercel (Mais rápido)

Se preferir terminal:

```bash
npm install -g vercel
vercel login
vercel
```

Responda as perguntas e será deployado automaticamente!

## 📋 Checklist Final

- [ ] Repositório criado no GitHub
- [ ] Push feito para GitHub
- [ ] Projeto importado no Vercel
- [ ] Deploy concluído
- [ ] URL pública funcionando
- [ ] Acessível em seu domínio (vercel.app ou custom)

## 🎉 Resultado

Depois disso seu portfólio estará:
- ✅ Versionado no GitHub
- ✅ Deployado automaticamente na Vercel
- ✅ Acessível pelo mundo todo
- ✅ Com HTTPS grátis
- ✅ Com CI/CD automático (push = deploy automático)

---

**Qualquer dúvida nos passos, me avise!** 🚀
