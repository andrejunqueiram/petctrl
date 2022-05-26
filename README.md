# Documentação da API

## Tabela de Conteúdos

- [Visão Geral](#1-visão-geral)
- [Diagrama ER](#2-diagrama-er)
- [Início Rápido](#3-início-rápido)
  - [Instalando Dependências](#31-instalando-dependências)
  - [Variáveis de Ambiente](#32-variáveis-de-ambiente)
  - [Migrations](#33-migrations)
- [Autenticação](#4-autenticação)
- [Endpoints](#5-endpoints)
- [Erro no Teste](#6-erro-no-teste)

---

## 1. Visão Geral

Visão geral do projeto, um pouco das tecnologias usadas.

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Yup](https://www.npmjs.com/package/yup)

A URL base da aplicação:
https://petctrl.herokuapp.com/

---

## 2. Diagrama ER

[ Voltar para o topo ](#tabela-de-conteúdos)

Diagrama ER da API definindo bem as relações entre as tabelas do banco de dados.

![DER](DER.png)

---

## 3. Início Rápido

[ Voltar para o topo ](#tabela-de-conteúdos)

### 3.1. Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```shell
yarn
```

### 3.2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:

```
cp .env.example .env
```

Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.

### 3.3. Migrations

Execute as migrations com o comando:

```
yarn runMig
```

---

## 4. Autenticação

[ Voltar para o topo ](#tabela-de-conteúdos)

Nas rotas estão especificados os tipos tipos de autenticação necessárias. Para todas é necessário estar logado (no login, um token JWT será disponibilizado para o usuário), porém em outras rotas, também é necessário ter condição de Administrador.

---

## 5. Endpoints

[ Voltar para o topo ](#tabela-de-conteúdos)

### Índice

- [Owners](#1-users)
  - [POST - /owners](#11-criação-de-usuário)
  - [GET - /owners](#12-listando-usuários)
  - [PATCH - /owners/:id](#13-alterar-usuário-por-id)
  - [DELETE - /owners/:id](#14-deletar-usuário-por-id)
- [Pets](#2-pets)
  - [POST - /pets](#21-criação-de-pet)
  - [GET - /pets](#22-listando-pet)
  - [GET - /pets/:id](#22-listando-pet-id)
  - [PATCH- /pets/:id](#23-atualizando-pet-por-id)
  - [DELETE - /pets/:id](#24-deletar-pet-por-id)
- [Reports](#3-reports)
  - [POST - /reports](#11-criação-de-laudo)
  - [GET - /reports](#12-listando-laudos)
  - [PATCH- /reports/:id](#23-latualizar-laudo-por-id)
  - [DELETE - /reports/:id](#23-deletar-laudo-por-id)
- [Services](#4-services)
  - [POST - /services](#11-criação-de-servico)
  - [GET - /services](#12-listando-servicos)
  - [PATCH- /services/:id](#23-atualizar-servico-por-id)
  - [DELETE - /services/:id](#23-deletar-servico-por-id)
- [Sessions](#5-sessions)
  - [POST - /session](#11-login)
- [Users](#5-users)
  - [POST - /users](#11-criação-de-usuário)
  - [GET - /users](#12-listando-usuários)
  - [PATCH- /users/:id](#23-atualizar-usuário-por-id)
  - [DELETE - /users/:id](#23-deletar-usuário-por-id)
- [ServiceList](#4-services)
  - [POST - /pets/servicelist](#11-criação-de-lista)
  - [DELETE - /pets/servicelist/:id](#23-deletar-lista-por-id)

---

## 1. **Owners**

[ Voltar para os Endpoints ](#5-endpoints)

O objeto Owners é definido como:

| Campo        | Tipo   | Descrição                     |
| ------------ | ------ | ----------------------------- |
| id           | string | Identificador único do tutor. |
| name         | string | O nome do tutor.              |
| email        | string | O e-mail do tutor.            |
| address      | string | Endereço do tutor             |
| phone_number | string | Telefone do tutor             |
| pets         | string | relaçao de pets do tutor      |

### Endpoints

| Método | Rota        | Descrição                                               |
| ------ | ----------- | ------------------------------------------------------- |
| POST   | /owners     | Criação de um tutor.                                    |
| GET    | /owners     | Lista todos os tutores.                                 |
| PATCH  | /owners/:id | Altera o dado de um tutor usando seu ID como parâmetro  |
| DELETE | /owners/:id | Deleta a conta de um tutor usando seu ID como parâmetro |

---

### 1.1. **Criação de Owner**

[ Voltar para os Endpoints ](#5-endpoints)

### `/owners`

### Exemplo de Request:

```
POST /owners
Host: https://petctrl.herokuapp.com/
Authorization: Token
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "name": "Tutor1",
  "email": "owner@email.com",
  "address": "Rua 1 numero 2",
  "phone_number": "31999999999"
}
```

### Exemplo de Response:

```
201 Created
```

```json
{
  "id": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
  "name": "Tutor1",
  "email": "tutor@email.com",
  "address": "Rua 1 numero 2",
  "phone_number": "31999999999"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                           |
| ---------------- | ----------------------------------- |
| 409 Conflict     | Tutor ja cadastrado com esse email. |
| 404 Not Found    | Token de autenticação inexistente.  |
| 401 Unauthorized | Token inválido.                     |

---

### 1.2. **Listando Owners**

[ Voltar aos Endpoints ](#5-endpoints)

### `/owners`

### Exemplo de Request:

```
GET /owners
Host: https://petctrl.herokuapp.com/
Authorization: Token
Content-type: application/json
```

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
[
  {
    "id": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
    "name": "Tutor1",
    "email": "tutor@email.com",
    "address": "Rua 1 numero 2",
    "phone_number": "31999999999",
    "pets": []
  }
]
```

### Possíveis Erros:

| Código do Erro   | Descrição                          |
| ---------------- | ---------------------------------- |
| 404 Not Found    | Token de autenticação inexistente. |
| 401 Unauthorized | Token inválido.                    |

---

### 1.3. **Atualizando dados de Owners**

[ Voltar aos Endpoints ](#5-endpoints)

### `/owners/:id`

### Exemplo de Request:

```
PATCH /owners/:id
Host: https://petctrl.herokuapp.com/
Authorization: Token
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "name": "Tutor2",
  "email": "owner@email.com",
  "adress": "Rua 1 numero 22",
  "phone_number": "31999999999"
}
```

### Exemplo de Response:

```
200 OK
```

```json
[
  {
    "id": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
    "name": "Tutor2",
    "email": "tutor@email.com",
    "adress": "Rua 1 numero 22",
    "phone_number": "31999999999",
    "pets": []
  }
]
```

### Possíveis Erros:

| Código do Erro   | Descrição                          |
| ---------------- | ---------------------------------- |
| 404 Not Found    | Tutor não encontrado.              |
| 404 Not Found    | Token de autenticação inexistente. |
| 401 Unauthorized | Token inválido.                    |

---

### 1.4. **Deletando Owners**

[ Voltar aos Endpoints ](#5-endpoints)

### `/owners/:id`

### Exemplo de Request:

```
DELETE /owners/:id
Host: https://petctrl.herokuapp.com/
Authorization: Token
Content-type: application/json
```

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
204 No content.
```

```json

```

### Possíveis Erros:

| Código do Erro   | Descrição                          |
| ---------------- | ---------------------------------- |
| 404 not found    | Tutor não encontrado.              |
| 404 not found    | Token de autenticação inexistente. |
| 401 unauthorized | Token inválido.                    |

---

## 2. **Pets**

[ Voltar para os Endpoints ](#5-endpoints)

O objeto Pets é definido como:

| Campo        | Tipo   | Descrição                    |
| ------------ | ------ | ---------------------------- |
| id           | string | Identificador único do pet.  |
| name         | string | O nome do pet.               |
| breed        | string | A raça do pet.               |
| type         | string | A especie do animal.         |
| birthday     | date   | data de nascimento do pet.   |
| ownerId      | string | Tutor responsavel pelo pet.  |
| reports      | string | Laudos relacionados ao pet.  |
| service_list | string | Serviços prestados aos pets. |

### Endpoints

| Método | Rota      | Descrição                                             |
| ------ | --------- | ----------------------------------------------------- |
| POST   | /pets     | Criação de um usuario pet.                            |
| GET    | /pets     | Lista todos os pets.                                  |
| PATCH  | /pets/:id | Lista um pet especifico usando seu ID como parâmetro  |
| DELETE | /pets/:id | Deleta a conta de um pet usando seu ID como parâmetro |

---

### 2.1. **Criação de Pet**

[ Voltar para os Endpoints ](#5-endpoints)

### `/pets`

### Exemplo de Request:

```
POST /pets
Host: https://petctrl.herokuapp.com/
Authorization: Token
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "name": "Pet 1",
  "breed": "srd",
  "type": "cachorro",
  "birthday": "01/01/2010",
  "ownerId": "9cda28c9-e540-4b2c-bf0c-c90006d37893"
}
```

### Exemplo de Response:

```
201 Created
```

```json
{
  "id": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
  "name": "Pet 1",
  "breed": "srd",
  "type": "cachorro",
  "birthday": "2010-01-01T00:00:00.000Z",
  "ownerId": "9cda28c9-e540-4b2c-bf0c-c90006d37893"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                          |
| ---------------- | ---------------------------------- |
| 404 not found    | Tutor não encontrado.              |
| 404 not found    | Token de autenticação inexistente. |
| 401 unauthorized | Token inválido.                    |

---

### 2.2. **Listando pets**

[ Voltar aos Endpoints ](#5-endpoints)

### `/pets`

### Exemplo de Request:

```
GET /owners
Host: https://petctrl.herokuapp.com/
Authorization: Token
Content-type: application/json
```

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
[
  {
    "id": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
    "name": "Tutor1",
    "breed": "srd",
    "type": "cachorro",
    "birthday": "01/01/2010",
    "ownerId": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
    "service_list": [],
    "reports": []
  }
]
```

### Possíveis Erros:

| Código do Erro   | Descrição                          |
| ---------------- | ---------------------------------- |
| 404 Not Found    | Token de autenticação inexistente. |
| 401 Unauthorized | Token inválido.                    |

---

### 2.3. **Listando pets por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/pets/:id`

### Exemplo de Request:

```
GET /pets/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: https://petctrl.herokuapp.com/
Authorization: Token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                         |
| --------- | ------ | --------------------------------- |
| pet_id    | string | Identificador único do pet (User) |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
[
  {
    "id": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
    "name": "Tutor1",
    "breed": "srd",
    "type": "cachorro",
    "birthday": "01/01/2010",
    "ownerId": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
    "service_list": [],
    "reports": []
  }
]
```

### Possíveis Erros:

| Código do Erro | Descrição       |
| -------------- | --------------- |
| 404 Not Found  | User not found. |

### 2.4. **Atualizando dados de pets**

[ Voltar aos Endpoints ](#5-endpoints)

### `/pets/:id`

### Exemplo de Request:

```
PATCH /pets/:id
Host: https://petctrl.herokuapp.com/
Authorization: Token
Content-type: application/json
```

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
  "name": "Tutor1",
  "breed": "srd",
  "type": "cachorro",
  "birthday": "01/01/2010",
  "ownerId": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
  "service_list": [],
  "reports": []
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                          |
| ---------------- | ---------------------------------- |
| 404 Not Found    | Id nao encontrado.                 |
| 404 Not Found    | Token de autenticação inexistente. |
| 401 Unauthorized | Token inválido.                    |

---

### 2.5. **Deletando pets**

[ Voltar aos Endpoints ](#5-endpoints)

### `/pets/:id`

### Exemplo de Request:

```
DELETE /pets/:id
Host: https://petctrl.herokuapp.com/
Authorization: Token
Content-type: application/json
```

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
 204 No content

```

```json

```

### Possíveis Erros:

| Código do Erro   | Descrição                          |
| ---------------- | ---------------------------------- |
| 404 Not Found    | Id nao encontrado.                 |
| 404 Not Found    | Token de autenticação inexistente. |
| 401 Unauthorized | Token inválido.                    |

---

## 3. **Reports**

[ Voltar para os Endpoints ](#5-endpoints)

O objeto Reports é definido como:

| Campo   | Tipo   | Descrição                      |
| ------- | ------ | ------------------------------ |
| id      | string | Identificador único do laudo.  |
| reports | string | A descrição completa do laudo. |
| pet_id  | string | relaçao de pets com o laudo    |

### Endpoints

| Método | Rota         | Descrição                                              |
| ------ | ------------ | ------------------------------------------------------ |
| POST   | /reports     | Criação de um laudo.                                   |
| GET    | /reports     | Lista todos os laudos.                                 |
| PATCH  | /reports/:id | Altera o dado de um laudo usando seu ID como parâmetro |
| DELETE | /reports/:id | Deleta o laudo usando seu ID como parâmetro            |

---

### 3.1. **Criação de Reports**

[ Voltar para os Endpoints ](#5-endpoints)

### `/reports`

### Exemplo de Request:

```
POST /reports
Host: https://petctrl.herokuapp.com/
Authorization: Token & Adm
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "reports": "Consulta de rotina",
  "pet_id": "25"
}
```

### Exemplo de Response:

```
201 Created
```

```json
{
  "id": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
  "reports": "Consulta de rotina"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                                             |
| ---------------- | ----------------------------------------------------- |
| 404 Not Found    | Pet nao encontrado.                                   |
| 404 Not Found    | Token de autenticação inexistente.                    |
| 401 Unauthorized | Token inválido.                                       |
| 401 Unauthorized | Acesso negado (condição de Administrador necessária). |

---

### 3.2. **Listando Reports**

[ Voltar aos Endpoints ](#5-endpoints)

### `/reports`

### Exemplo de Request:

```
GET /reports
Host: https://petctrl.herokuapp.com/
Authorization: Token & Adm
Content-type: application/json
```

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
[
  {
    "id": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
    "reports": "Consulta de rotina",
    "pet": {}
  }
]
```

### Possíveis Erros:

| Código do Erro   | Descrição                                             |
| ---------------- | ----------------------------------------------------- |
| 404 Not Found    | Token de autenticação inexistente.                    |
| 401 Unauthorized | Token inválido.                                       |
| 401 Unauthorized | Acesso negado (condição de Administrador necessária). |

### 3.3. **Atualizando dados de laudos**

[ Voltar aos Endpoints ](#5-endpoints)

### `/reports/:id`

### Exemplo de Request:

```
PATCH /reports/:id
Host: https://petctrl.herokuapp.com/
Authorization: Token & Adm
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "reports": "Consulta de rotina, animal volta semana que vem pro retorno de vacina"
}
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
  "reports": "Consulta de rotina, animal volta semana que vem pro retorno de vacina"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                                             |
| ---------------- | ----------------------------------------------------- |
| 404 Not Found    | Nenhum relatório com esse id.                         |
| 404 Not Found    | Token de autenticação inexistente.                    |
| 401 Unauthorized | Token inválido.                                       |
| 401 Unauthorized | Acesso negado (condição de Administrador necessária). |

---

### 3.4. **Deletando laudos**

[ Voltar aos Endpoints ](#5-endpoints)

### `/reports/:id`

### Exemplo de Request:

```
DELETE /reports/:id
Host: https://petctrl.herokuapp.com/
Authorization: Token & Adm
Content-type: application/json
```

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
204 no content
```

```json

```

### Possíveis Erros:

| Código do Erro   | Descrição                                             |
| ---------------- | ----------------------------------------------------- |
| 404 Not Found    | Nenhum relatório com esse id.                         |
| 404 Not Found    | Token de autenticação inexistente.                    |
| 401 Unauthorized | Token inválido.                                       |
| 401 Unauthorized | Acesso negado (condição de Administrador necessária). |

---

## 4. **Services**

[ Voltar para os Endpoints ](#5-endpoints)

O objeto Services é definido como:

| Campo    | Tipo   | Descrição                       |
| -------- | ------ | ------------------------------- |
| id       | string | Identificador único do serviço. |
| name     | string | O nome do serviço prestado.     |
| price    | number | Valor do serviço.               |
| category | string | Categoria de serviço.           |

### Endpoints

| Método | Rota          | Descrição                                                |
| ------ | ------------- | -------------------------------------------------------- |
| POST   | /services     | Criação de um serviço.                                   |
| GET    | /services     | Lista todos os serviços.                                 |
| PATCH  | /services/:id | Altera o dado de um serviço usando seu ID como parâmetro |
| DELETE | /services/:id | Deleta o serviço usando seu ID como parâmetro            |

---

### 4.1. **Criação de Services**

[ Voltar para os Endpoints ](#5-endpoints)

### `/services`

### Exemplo de Request:

```
POST /services
Host: https://petctrl.herokuapp.com/
Authorization: Token
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "name": "Banho",
  "price": 25.0,
  "category": "Estetica"
}
```

### Exemplo de Response:

```
201 Created
```

```json
{
  "id": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
  "name": "Banho",
  "price": 25.0,
  "category": "Estetica"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                          |
| ---------------- | ---------------------------------- |
| 400 bad request  | Serviço ja cadastrado.             |
| 404 Not Found    | Token de autenticação inexistente. |
| 401 Unauthorized | Token inválido.                    |

---

### 4.2. **Listando Services**

[ Voltar aos Endpoints ](#5-endpoints)

### `/services`

### Exemplo de Request:

```
GET /services
Host: https://petctrl.herokuapp.com/
Authorization: Token
Content-type: application/json
```

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
[
  {
    "id": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
    "name": "Banho",
    "price": 25.0,
    "category": "Estetica"
  }
]
```

### Possíveis Erros:

| Código do Erro   | Descrição                          |
| ---------------- | ---------------------------------- |
| 404 Not Found    | Token de autenticação inexistente. |
| 401 Unauthorized | Token inválido.                    |

---

### 4.3. **Atualizando services**

[ Voltar aos Endpoints ](#5-endpoints)

### `/services/:id`

### Exemplo de Request:

```
PATCH /services/:id
Host: https://petctrl.herokuapp.com/
Authorization: Token
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "name": "Tosa",
  "price": 25.0,
  "category": "Estetica"
}
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
  "name": "Tosa",
  "price": 25.0,
  "category": "Estetica"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                          |
| ---------------- | ---------------------------------- |
| 400 bad request  | Serviço ja cadastrado.             |
| 404 Not Found    | Token de autenticação inexistente. |
| 401 Unauthorized | Token inválido.                    |

---

### 4.4. **Deletando services**

[ Voltar aos Endpoints ](#5-endpoints)

### `/services/:id`

### Exemplo de Request:

```
DELETE /services/:id
Host: https://petctrl.herokuapp.com/
Authorization: Token
Content-type: application/json
```

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
204 No content
```

### Possíveis Erros:

| Código do Erro   | Descrição                          |
| ---------------- | ---------------------------------- |
| 404 not found    | Serviço nao existente.             |
| 404 Not Found    | Token de autenticação inexistente. |
| 401 Unauthorized | Token inválido.                    |

---

### Endpoints

| Método | Rota      | Descrição |
| ------ | --------- | --------- |
| POST   | /sessions | Login.    |

---

## 5. **Sessions**

[ Voltar para os Endpoints ](#5-endpoints)

O objeto Sessions é definido como:

| Campo    | Tipo   | Descrição         |
| -------- | ------ | ----------------- |
| name     | string | Nome de usuario.  |
| password | string | Senha do usuario. |

### 5.1. **Criação de Sessions**

[ Voltar para os Endpoints ](#5-endpoints)

### `/sessions`

### Exemplo de Request:

```
POST /sessions
Host: https://petctrl.herokuapp.com/
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "name": "Artur",
  "password": "123456"
}
```

### Exemplo de Response:

```
200 Ok
```

```json
{
  "user": {
    "id": "a8bc48e2-1782-49ae-b7db-450ec18e1b71",
    "name": "Artur",
    "password": "$2a$08$F52af92YO3ja25XWB8Ap7e0EU7nTGdqRzP0MPy.2xg9Ihvx223H4K",
    "isAdm": false
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTMzMTI5ODQsImV4cCI6MTY1MzM5OTM4NCwic3ViIjoiYThiYzQ4ZTItMTc4Mi00OWFlLWI3ZGItNDUwZWMxOGUxYjcxIn0.u1DhE-SBBHwO4CtFn_vCX7EEKHGITeVsi_6Np4yzmu0"
}
```

### Possíveis Erros:

| Código do Erro  | Descrição                   |
| --------------- | --------------------------- |
| 400 bad request | Usuario ou senha invalidos. |

---

## 6. **Users**

[ Voltar para os Endpoints ](#5-endpoints)

O objeto Services é definido como:

| Campo    | Tipo    | Descrição                       |
| -------- | ------- | ------------------------------- |
| id       | string  | Identificador único de usuario. |
| name     | string  | O nome do usuario.              |
| password | string  | Senha do usuario.               |
| isAdm    | boolean | Verificacao de adm.             |

### Endpoints

| Método | Rota          | Descrição                                                |
| ------ | ------------- | -------------------------------------------------------- |
| POST   | /services     | Criação de um usuario.                                   |
| GET    | /services     | Lista todos os usuarios.                                 |
| PATCH  | /services/:id | Altera o dado de um usuario usando seu ID como parâmetro |
| DELETE | /services/:id | Deleta o usuario usando seu ID como parâmetro            |

---

### 6.1. **Criação de Users**

[ Voltar para os Endpoints ](#5-endpoints)

### `/users`

### Exemplo de Request:

```
POST /users
Host: https://petctrl.herokuapp.com/
Authorization: Token & Adm
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "name": "Artur",
  "password": "12345",
  "isAdm": "false"
}
```

### Exemplo de Response:

```
201 Created
```

```json
{
  "id": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
  "name": "Artur",
  "password": "12345",
  "isAdm": "false"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                                             |
| ---------------- | ----------------------------------------------------- |
| 409 conflict     | Usuario ja existe.                                    |
| 404 Not Found    | Token de autenticação inexistente.                    |
| 401 Unauthorized | Token inválido.                                       |
| 401 Unauthorized | Acesso negado (condição de Administrador necessária). |

---

### 6.2. **Listando Users**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users`

### Exemplo de Request:

```
GET /users
Host: https://petctrl.herokuapp.com/
Authorization: Token & Adm
Content-type: application/json
```

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
[
  {
    "id": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
    "name": "Artur",
    "password": "12345",
    "isAdm": "false"
  }
]
```

### Possíveis Erros:

| Código do Erro   | Descrição                                             |
| ---------------- | ----------------------------------------------------- |
| 404 Not Found    | Token de autenticação inexistente.                    |
| 401 Unauthorized | Token inválido.                                       |
| 401 Unauthorized | Acesso negado (condição de Administrador necessária). |

---

### 6.3. **Atualizando Users**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users/:id`

### Exemplo de Request:

```
PATCH /users/:id
Host: https://petctrl.herokuapp.com/
Authorization: Token & Adm
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "name": "Artur",
  "password": "1234",
  "isAdm": "false"
}
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
  "name": "Artur",
  "password": "1234",
  "isAdm": "false"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                                             |
| ---------------- | ----------------------------------------------------- |
| 404 not found    | Usuario nao encontrado                                |
| 404 Not Found    | Token de autenticação inexistente.                    |
| 401 Unauthorized | Token inválido.                                       |
| 401 Unauthorized | Acesso negado (condição de Administrador necessária). |

---

### 6.4. **Deletando users**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users/:id`

### Exemplo de Request:

```
DELETE /users/:id
Host: https://petctrl.herokuapp.com/
Authorization: Token & Adm
Content-type: application/json
```

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
204 No content
```

### Possíveis Erros:

| Código do Erro   | Descrição                                             |
| ---------------- | ----------------------------------------------------- |
| 404 not found    | Usuario nao encontrado.                               |
| 404 Not Found    | Token de autenticação inexistente.                    |
| 401 Unauthorized | Token inválido.                                       |
| 401 Unauthorized | Acesso negado (condição de Administrador necessária). |

---

## 7. **Service_list\***

[ Voltar para os Endpoints ](#5-endpoints)

O objeto Service_list é definido como:

| Campo        | Tipo   | Descrição                        |
| ------------ | ------ | -------------------------------- |
| id           | string | Identificador único do serviço.  |
| pet_id       | string | O id do pet relacionado a lista. |
| pet_services | string | Array de serviços.               |

### Endpoints

| Método | Rota                  | Descrição                                     |
| ------ | --------------------- | --------------------------------------------- |
| POST   | /pets/servicelist     | Criação de um serviço.                        |
| DELETE | /pets/servicelist/:id | Deleta o serviço usando seu ID como parâmetro |

---

### 7.1. **Criação de Services_list**

[ Voltar para os Endpoints ](#5-endpoints)

### `/pets/servicelist`

### Exemplo de Request:

```
POST /pets/servicelist
Host: https://petctrl.herokuapp.com/
Authorization: Token
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "pet_id": "76fdb192-f4f7-4443-8285-34ec526a7f88",
  "pet_services": [
    "7604b882-c8c7-423f-bc53-b859c1ab9459",
    "1341bd79-e2b3-4084-9908-6d4e60e70994"
  ]
}
```

### Exemplo de Response:

```
201 Created
```

```json
{
  "pet": {
    "id": "76fdb192-f4f7-4443-8285-34ec526a7f88",
    "name": "Billy",
    "breed": "SRD",
    "type": "Cachorro",
    "birthday": "2018-05-03T00:00:00.000Z",
    "ownerId": "54973e17-ee4e-406a-9e73-49f9396008e3",
    "service_list": [],
    "reports": []
  },
  "id": "d7818706-cf7f-4d1a-ab60-19284480a204",
  "service_date": "2022-05-23T13:42:15.820Z"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                          |
| ---------------- | ---------------------------------- |
| 404 Not Found    | Pet nao encontrado.                |
| 404 Not Found    | Lista de serviços nao encontrado.  |
| 404 Not Found    | Token de autenticação inexistente. |
| 401 Unauthorized | Token inválido.                    |

---

### 6.2. **Deletando service_list**

[ Voltar aos Endpoints ](#5-endpoints)

### `/pets/servicelist/:id`

### Exemplo de Request:

```
DELETE /services/:id
Host: https://petctrl.herokuapp.com/
Authorization: Token
Content-type: application/json
```

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
204 No content
```

### Possíveis Erros:

| Código do Erro   | Descrição                          |
| ---------------- | ---------------------------------- |
| 404 not found    | Lista nao existente.               |
| 404 Not Found    | Token de autenticação inexistente. |
| 401 Unauthorized | Token inválido.                    |

---

## 6. Erro no teste

Todas as rotas foram testadas com testes de integração, porém na rota de service_list, um bug conhecido do SQLite3 impede que as tabelas se conectem, gerando um erro em cascata apenas naquela rota. Portanto, optamos por tirar o teste dessa rota em específico, mas nosso time de Quality Assurance testou as rotas manualmente via Insomnia, garantindo que está funcionando conforme o esperado.
