# 🚀 Gas Fácil API

API desenvolvida em **NestJS** com **TypeScript** para fornecer suporte ao aplicativo **Gas Fácil**, facilitando a conexão entre clientes e fornecedores de gás de cozinha.

## 📌 Sobre o Projeto

A **Gas Fácil API** é responsável por gerenciar usuários, produtos e endereços de entrega, garantindo uma experiência fluida e segura para os consumidores.

## 🛠️ Tecnologias Utilizadas

- ⚡ **NestJS** - Framework progressivo para Node.js
- 🛡️ **TypeScript** - Tipagem estática para maior segurança no código
- 🗄️ **MongoDB** - Banco de dados NoSQL para armazenamento eficiente
- 🔍 **Zod** - Validação de dados robusta
- 🔐 **Autenticação JWT** (em breve) - Proteção de endpoints sensíveis

## ✨ Funcionalidades Disponíveis

A API oferece diversas funcionalidades essenciais para o funcionamento do **Gas Fácil App**:

### 🏠 Endereços (`/address`)

✅ **Criar endereço** de entrega  
✅ **Buscar endereço** por `session_id`  
✅ **Atualizar endereço** de entrega

### 🛒 Produtos (`/product`)

✅ **Cadastrar produtos** (protegido por autenticação)  
✅ **Listar produtos disponíveis**  
✅ **Atualizar informações** de um produto

### 👤 Usuários (`/user`)

✅ **Criar usuário** com `session_id`  
✅ **Buscar usuário** por `session_id`  
✅ **Gerenciar favoritos** (adicionar/remover produtos favoritos)

## 📦 Instalação

Siga os passos abaixo para rodar a API localmente:

```bash
# Clone o repositório
git clone https://github.com/ygorevaldt/gas-facil-api.git

# Acesse a pasta do projeto
cd gas-facil-api

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Inicie o servidor
npm run start:dev
```

## 🔥 Como Usar

A API segue uma estrutura RESTful. Aqui estão os endpoints disponíveis:

### 🏠 Endereços: `/address`

### - Criar um endereço

**POST** `/address`  
Content-Type: application/json

```json
{
  "user_id": "123",
  "session_id": "123",
  "city": "São Paulo",
  "street": "Av. Paulista",
  "number": 100,
  "cep": 12345678,
  "latitude": -23.563099,
  "longitude": -46.654321
}
```

### - Buscar endereço por session_id

**GET** `/address/{session_id}`

### - Atualizar um endereço

PUT `/address`<br/>
Content-Type: application/json

```json
{
  "user_id": "123", // - required
  "session_id": "123", // - required
  "city": "Rio de Janeiro",
  "street": "Rua das Flores",
  "number": 200,
  "cep": 87654321,
  "latitude": -22.90278,
  "longitude": -43.2075
}
```

---

### 🛒 Produtos: `/product`

### - Criar um produto (Autênticado)

POST `/product`<br/>
Content-Type: application/json

```json
{
  "name": "Botijão de gás",
  "price": 120.99,
  "seller": {
    "name": "Distribuidora XYZ",
    "phone": "+55 99999-9999",
    "opening_hours": {
      "start": "08:00",
      "end": "18:00"
    }
  }
}
```

### - Listar produtos disponíveis

GET `/product`

### - Atualizar produto

PUT `/product`<br/>
Content-Type: application/json

```json
{
  "id": "id_produto", // - required
  "name": "Botijão de gás",
  "price": 120.99,
  "seller": {
    "name": "Distribuidora XYZ",
    "phone": "+55 99999-9999",
    "opening_hours": {
      "start": "08:00",
      "end": "18:00"
    }
  }
}
```

---

### 👤 Usuários: `/user`

### - Criar usuário

POST `/user`<br/>
Content-Type: application/json

```json
{
  "session_id": "123"
}
```

### - Buscar usuário por session_id

GET `/user/{session_id}`

### - Buscar produtos favoritos do usuário

GET `/user/bookmarks/{user_id}`

### - Atualizar produtos favoritos do usuário

PATCH `/user/bookmarks`<br/>
Content-Type: application/json

```json
{
  "user_id": "123",
  "bookmarks": ["produto1", "produto2", "produto3"]
}
```
