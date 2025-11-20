# 🚀 Gas Fácil API

API desenvolvida em **NestJS** com **TypeScript** para fornecer suporte ao aplicativo **Gas Fácil**, facilitando a conexão entre clientes e fornecedores de gás de cozinha.

## 📌 Sobre o Projeto

A **Gas Fácil API** é responsável por gerenciar usuários, produtos e endereços de entrega, garantindo uma experiência fluida e segura para os consumidores.

## ✨ Deploy

A Gas Fácil API está atualmente hospedada no render.com (plano gratuito). Devido a isso, é necessário acessar [https://gas-facil-api.onrender.com](https://gas-facil-api.onrender.com) e aguardar cerca de 2 minutos para que a API esteja ativa e você consiga utilizar os demais endpoints.

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

### 👤 Vendedor (`/seller`)

✅ **Criar vendedor** com `session_id`  
✅ **Atualizar dados do vendedor** por `session_id`  

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

### 🔐 Autenticação: `/auth`

### - Validar sessão
**POST** `/auth/validate`  
Requer Header `Authorization: Bearer <token>`

### - Login
**POST** `/auth/login`  
Content-Type: application/json
```json
{
  "email": "email@exemplo.com",
  "password": "senha"
}
```

### - Logout
**POST** `/auth/logout`

---

### 🏠 Endereços: `/address`

### - Criar um endereço
**POST** `/address`  
Content-Type: application/json
```json
{
  "user_id": "string",
  "session_id": "string",
  "city": "string",
  "street": "string",
  "number": 123,
  "cep": 12345678,
  "latitude": -23.550520,
  "longitude": -46.633308,
  "district": "string",
  "complement": "string",
  "reference": "string",
  "type": "Home | Work | Other"
}
```

### - Buscar endereço por session_id
**GET** `/address/{session_id}`

### - Atualizar um endereço
**PUT** `/address`  
Content-Type: application/json
```json
{
  "session_id": "string",
  "user_id": "string",
  "city": "string",
  "street": "string",
  "number": 123,
  "cep": 12345678,
  "latitude": -23.550520,
  "longitude": -46.633308
}
```

---

### 🛒 Produtos: `/product`

### - Criar um produto (Autenticado)
**POST** `/product`  
Content-Type: application/json
```json
{
  "name": "Nome do Produto",
  "description": "Descrição do produto",
  "price": 100.00,
  "note": 5,
  "amount_notes": 1,
  "sum_note": 5
}
```

### - Listar todos produtos
**GET** `/product`

### - Listar produtos do vendedor (Autenticado)
**GET** `/product/seller`

### - Atualizar produto (Autenticado)
**PUT** `/product`  
Content-Type: application/json
```json
{
  "id": "product_id",
  "name": "Novo Nome",
  "price": 150.00
}
```

### - Avaliar produto
**PUT** `/product/evaluate`  
Content-Type: application/json
```json
{
  "id": "product_id",
  "note": 4
}
```

### - Deletar produto (Autenticado)
**DELETE** `/product/{product_id}`

---

### 🏪 Vendedores: `/seller`

### - Criar vendedor
**POST** `/seller`  
Content-Type: application/json
```json
{
  "full_name": "Nome Completo",
  "phone": "11999999999",
  "email": "email@exemplo.com",
  "password": "senha_segura",
  "street": "Rua Exemplo",
  "number": 123,
  "neighborhood": "Bairro",
  "city": "Cidade",
  "state": "UF",
  "zip_code": "12345678",
  "opening_hours": {
    "start": "08:00",
    "end": "18:00"
  }
}
```

### - Buscar vendedor
**GET** `/seller/{seller_id}`

### - Atualizar vendedor
**PUT** `/seller`  
Content-Type: application/json
```json
{
  "id": "seller_id",
  "full_name": "Novo Nome",
  "phone": "11888888888"
}
```

---

### 👤 Usuários: `/user`

### - Criar usuário
**POST** `/user`  
Content-Type: application/json
```json
{
  "session_id": "string"
}
```

### - Buscar usuário por session_id
**GET** `/user/{session_id}`

### - Buscar favoritos
**GET** `/user/bookmarks/{user_id}`

### - Atualizar favoritos
**PATCH** `/user/bookmarks`  
Content-Type: application/json
```json
{
  "user_id": "string",
  "bookmarks": ["product_id_1", "product_id_2"]
}
```

## Licença

Este projeto está licenciado sob a licença [Creative Commons Attribution-NonCommercial 4.0 International](http://creativecommons.org/licenses/by-nc/4.0/).
