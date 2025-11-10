
# Cubos Full Stack Application challenge

Uma aplicação completa construída com NestJS (Backend) e NextJS (Frontend), seguindo princípios de DDD (Domain-Driven Design), SOLID e Clean Architecture.
O objetivo é oferecer uma estrutura escalável, bem organizada e fácil de manter.

O ambiente de desenvolvimento pode ser facilmente iniciado com Docker, garantindo integração perfeita entre os serviços.

# 🧩 Padrões de Arquitetura

O projeto foi desenvolvido com foco em baixo acoplamento e alta coesão, utilizando:

- DDD (Domain-Driven Design) para separação clara de camadas (domain, application, infrastructure).
- Clean Architecture para facilitar testes e evolução do código.
- SOLID para promover reuso e flexibilidade.
- Prisma ORM como camada de persistência.
- AWS SES/S3 para envio de emails e armazenamento de arquivos.

## 🧱 Descrição do Backend
Backend em **Node.js** desenvolvido com o framework **NestJS**.

### ⚙️ Pré-requisitos
- **OpenSSL** – Para gerar as chaves pública e privada usadas no processo de autenticação  
- **Docker (opcional)** – Para iniciar o contêiner do banco de dados da aplicação  
- **Node.js**

### 🚀 Configuração do Projeto

```bash
# Instalar as dependências
$ npm install

# Prisma
$ npx prisma generate
$ npx prisma migrate dev
```

### 🔐 Etapas antes de iniciar a aplicação

#### Gerar chaves RSA
1. Crie a pasta `keys` se ela ainda não existir:
```bash
$ mkdir -p ./resources/keys
```
2. Gere a chave privada:
```bash
$ openssl genrsa -out ./resources/keys/private.pem 2048
```
3. Gere a chave pública:
```bash
$ openssl rsa -in ./resources/keys/private.pem -pubout -out ./resources/keys/public.pem
```

#### Iniciar o contêiner do banco de dados
```bash
$ docker-compose up -d
```

#### Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
DATABASE_URL=
DB_USER=
DB_PASSWORD=
DB_NAME=
CLIENT_URL=
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET=
SES_SENDER_EMAIL=
```

### ▶️ Compilar e executar o projeto

```bash
# Ambiente de desenvolvimento
$ npm run start

# Modo de observação (watch mode)
$ npm run start:dev

# Ambiente de produção
$ npm run start:prod
```

### 🧪 Executar testes

```bash
# Testes unitários
$ npm run test
```

---

## 💻 Descrição do Frontend
Frontend desenvolvido com **Next.js**.

### ⚙️ Pré-requisitos
- **Node.js**

### 🚀 Configuração do Projeto

```bash
npm install
```

### 🔧 Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
MOVIE_API_URL=
AWS_S3_BUCKET_NAME=
AWS_REGION=
```

### ▶️ Compilar e executar o projeto em desenvolvimento

```bash
npm run dev
```

### 🧪 Executar testes

```bash
npm run test:unit
```
