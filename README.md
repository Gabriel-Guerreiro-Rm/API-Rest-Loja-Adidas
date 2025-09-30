# API Loja Adidas

## Sobre o Projeto

 A API simula o backend de uma loja da Adidas, gerenciando produtos e suas respectivas categorias.

## Tecnologias Utilizadas

* Node.js
* Express.js
* PostgreSQL
* Prisma

## Como Executar o Projeto Localmente

1.  **Clone o repositório:**
    ```bash
    git clone [URL_DO_SEU_REPOSITORIO_AQUI]
    ```
2.  **Navegue até a pasta do projeto:**
    ```bash
    cd nome-da-pasta-do-projeto
    ```
3.  **Instale as dependências:**
    ```bash
    npm install
    ```
4.  **Configure o ambiente:**
    * Crie um arquivo `.env` na raiz do projeto, copiando o conteúdo do arquivo `.env.example` (se você tiver um) ou usando a seguinte variável:
        ```env
        DATABASE_URL="postgresql://adidas_user:adidas_password@localhost:5432/adidas_db?schema=public"
        ```
    * Garanta que você tenha o Docker instalado e rodando.
    * Suba o container do banco de dados com: `docker-compose up -d`
5.  **Execute as migrations do banco:**
    ```bash
    npx prisma migrate dev
    ```
6.  **Popule o banco com dados iniciais (Opcional):**
    ```bash
    npx prisma db seed
    ```
7.  **Inicie o servidor:**
    ```bash
    npm run dev
    ```
    A API estará disponível em `http://localhost:3000`.

## Endpoints da API

### Categorias

* **Listar todas as categorias**
    * **Método:** `GET`
    * **URL:** `/categorias`

* **Mostrar uma categoria**
    * **Método:** `GET`
    * **URL:** `/categorias/:id`

* **Criar uma categoria**
    * **Método:** `POST`
    * **URL:** `/categorias`
    * **Corpo (Body):**
        ```json
        {
          "nome": "Acessórios"
        }
        ```

* **Editar uma categoria**
    * **Método:** `PUT`
    * **URL:** `/categorias/:id`
    * **Corpo (Body):**
        ```json
        {
          "nome": "Calçados Esportivos"
        }
        ```

* **Deletar uma categoria**
    * **Método:** `DELETE`
    * **URL:** `/categorias/:id`

### Produtos

* **Listar todos os produtos**
    * **Método:** `GET`
    * **URL:** `/produtos`

* **Mostrar um produto**
    * **Método:** `GET`
    * **URL:** `/produtos/:id`

* **Criar um produto**
    * **Método:** `POST`
    * **URL:** `/produtos`
    * **Corpo (Body):**
        ```json
        {
          "nome": "Boné Trefoil",
          "descricao": "Boné clássico de algodão",
          "preco": 129.99,
          "estoque": 150,
          "categoriaId": 1
        }
        ```

* **Editar um produto**
    * **Método:** `PUT`
    * **URL:** `/produtos/:id`
    * **Corpo (Body):**
        ```json
        {
          "nome": "Boné Trefoil Clássico",
          "descricao": "Boné clássico de algodão com aba curva",
          "preco": 139.99,
          "estoque": 140,
          "categoriaId": 1
        }
        ```

* **Deletar um produto**
    * **Método:** `DELETE`
    * **URL:** `/produtos/:id`