# 🐷 Cofrinho API/BACKEND

API RESTful do **Cofrinho**, uma plataforma para organização e controle de despesas compartilhadas entre grupos, com integração ao Open Finance. Desenvolvido em Node.js com Express e Sequelize, seguindo os princípios da Clean Architecture.

> 🔗 O frontend do projeto está disponível em: [github.com/Cofrinho/mobile](https://github.com/Cofrinho/mobile.git)

---

## 🚀 Funcionalidades

- 👤 Gerenciamento de usuários (registro, login, atualização, reativação)
- 🔐 Autenticação com JWT (access + refresh tokens)
- ✅ Verificação de e-mail e recuperação de senha com código
- 💳 Integração com instituições via Open Finance (saldo, recarga, contas)
- 👥 Criação e gerenciamento de grupos e participantes
- 💰 Lançamento e divisão de despesas entre membros
- 📲 Notificações internas
- 📘 Documentação Swagger interativa

---

## 🔧 Requisitos

- **Node.js** – versão **20.18.0**
  Baixe em: https://nodejs.org/en

- **NPM** – versão **10.8.2** (já vem com o Node.js)

- **Docker** – para rodar o banco de dados PostgreSQL em ambiente isolado
  Baixe em: https://www.docker.com/products/docker-desktop/

- **Git** – para clonar o repositório
  Baixe em: https://git-scm.com/

> 💡 *Alternativamente ao Docker, você pode ter o PostgreSQL instalado localmente (versão 17+ recomendada).*

---

## 🛠️ Tecnologias

### **Back-end**
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/) + PostgreSQL
- [JWT](https://jwt.io/) para autenticação
- [Zod](https://zod.dev/) para validações
- [Axios](https://axios-http.com/) para integrações externas
- [Nodemailer](https://nodemailer.com/) para envio de e-mails

### **Documentação**
- [Swagger UI](https://swagger.io/tools/swagger-ui/)
- `swagger-jsdoc` para geração automática dos endpoints

### **Dev Tools**
- ESLint e Prettier para padronização de código
- Nodemon para hot-reload

---

## 📁 Estrutura de Pastas

```
.
├── docker-compose.yml
├── src/
│   ├── application/
│   │   ├── dtos/          # Objetos de Transferência de Dados
│   │   └── services/      # Lógica de negócio
│   ├── domain/
│   │   ├── models/        # Modelos de entidades
│   │   └── repositories/  # Acesso a dados
│   ├── http/
│   │   ├── controllers/   # Manipulação de requisições
│   │   ├── middlewares/   # Middlewares (ex: autenticação)
│   │   ├── routes/        # Definição de rotas
│   │   └── validations/   # Validações de entrada
│   ├── infra/
│   │   ├── db/            # Migrações e seeders do banco
│   │   └── external/      # Integrações externas
│   ├── shared/
│   │   ├── config/        # Configurações
│   │   ├── errors/        # Erros personalizados
│   │   └── utils/         # Utilitários (JWT, hash, etc)
│   ├── swagger/           # Documentação da API
│   ├── server.js          # Ponto de entrada
│   └── app.js
├── .env.example
└── package.json
```

## ⚙️ Como Executar o Projeto

Siga estes passos para configurar e executar a aplicação:

1. **Clonar o repositório e acessar a pasta:**
```bash
git clone https://github.com/Cofrinho/backend.git
cd backend/
```

2. **Configurar variáveis de ambiente:**
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações (banco de dados, etc)
```

3. **Iniciar o banco de dados (PostgreSQL):**
```bash
# Usando Docker:
docker-compose up -d

# Ou usando Podman:
podman-compose up -d
```

4. **Instalar dependências:**
```bash
npm install
```

5. **Executar migrações e seeders do banco:**
```bash
npm run migrate
npm run seed
```

6. **Iniciar o servidor de desenvolvimento:**
```bash
npm run dev
```

O servidor estará disponível em: `http://localhost:3000`

Documentação Swagger: `http://localhost:3000/api-docs`

---
## 📌 Sobre o Projeto

O Cofrinho foi desenvolvido como **projeto final do estágio na Compass UOL**, com o objetivo de aplicar conceitos de clean architecture, segurança e integração via **Open Finance**. O **Cofrinho** é uma plataforma pensada para facilitar o controle de despesas compartilhadas entre grupos, permitindo a conexão com **múltiplas instituições financeiras** por meio do ecossistema aberto do Open Finance.

O projeto demonstra na prática como é possível unir **organização financeira colaborativa** com **tecnologias modernas de integração bancária**, oferecendo uma base sólida para soluções financeiras inovadoras.
