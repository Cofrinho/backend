# API Backend do App Cofrinho

## Como Executar o Projeto

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

## Estrutura de Pastas

```
.
├── docker-compose.yml
├── src/
│   ├── app.js
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
│   ├── server.js          # Ponto de entrada
│   ├── shared/
│   │   ├── config/        # Configurações
│   │   ├── errors/        # Erros personalizados
│   │   └── utils/         # Utilitários (JWT, hash, etc)
│   └── swagger/           # Documentação da API
├── .env.example
└── package.json
```
