# Boas-vindas ao projeto do desafio SHARENERGY-01/2023!

📺️ [Video explicativo do projeto](https://youtu.be/Tfo4oaZ0sBo)

<details>
<summary><strong>👨‍💻 Descrição do projeto</strong></summary><br />

O projeto consiste uma aplicação web (frontend e backend) capaz de realizar a comunicação com APIs distintas, além de um CRUD.
</details>

<details>
<summary><strong>📝 Detalhes do desenvolvimento</strong></summary><br />

Nesse projeto foi utilizado **Node.js** com **Express** para o desenvolvimento da API, para o banco de dados foi utilizado o **MongoDB** junto com o ODM **Mongoose**, para criar hash de senha foi utilizado **bcrypt** e **JTW** para geração de tokens. No front-end foi utilizado **React.js** com **TypeScript** para o desenvolvimento e Tailwind com Material UI para estilização.

Requisitos desenvolvidos no back-end:
- Criado o endpoint POST `/login` onde é possível realizar o login e obter o token de autenticação;
- Criado o endpoint POST `/clients` onde é possível realizar o cadastro de um client;
- Criado o endpoint GET `/clients` onde é possível realizar a busca dos clientes cadastrados;
- Criado o endpoint GET `/clients/id` onde é possível realizar a busca de um cliente específico;
- Criado o endpoint PUT `/clients/id` onde é possível realizar a atualização de um cliente cadastrado;
- Criado o endpoint DELETE `/clients/id` onde é possível realizar a exclusão de um cliente específico;
- Criado o endpoint GET `/users/page/{nº da página}` onde é possível realizar a busca de usuários por páginas;
- Criado o endpoint GET `/clients/search?q={Nome do usuário}` onde é possível realizar a busca de um usuário pelo nome, email ou username;

Requisitos desenvolvidos no front-end:
- Criado uma tela de login na rota `/login` onde é possível realizar o login de um usuário cadastrado;
- Criado a tela main na rota `/main` onde é possivel visualizar a lista de usuários cadastrados;
- Criado a tela clients na rota `/clients` onde é possível visualizar, cadastrar, editar e excluir um cliente cadastrado;
- Criado a tela cat-images na rota `/cat-images` onde é possível visualizar e buscar uma imagem de gato pela pesquisa de um status HTTP;
- Criado a tela dog-images na rota `/dog-images` onde é possível visualizar imagens de cachorros;
</details>
  
# Instruções para rodar o projeto

<details>
<summary><strong>🏠️ Rodando local</strong></summary><br />

- Para rodar o projeto é necessário ter o node.js(v.16 +) e o mongoDB instalados.

- Na raiz do projeto abra o terminal de comando.

Acesse o diretório de frontend:

```bash
  cd frontend/
```

Instale as dependências:

```bash
  npm install
```

Inicie a aplicação front-end:

```bash
  npm start
```

Retorne ao diretório raiz:

```bash
  cd ..
```

Acesse o diretório de backend:

```bash
  cd backend/
```

Instale as dependências:

```bash
  npm install
```

Execute o script para inserir dados fictícios para visualização na aplicação:

```bash
  npm run seeders
```

Inicie o servidor:

```bash
  npm run dev
```

Acesse o navegador na seguinte url:

```bash
  http://localhost:3000
```

- Faça o login com os seguintes dados:

Nome de usuário:
```bash
desafiosharenergy
```

Senha:
```bash
sh@r3n3rgy
```
</details>

# Demais detalhes
<details>
<summary><strong>🚀 Próximas implementações</strong></summary><br />

- Implementar testes para cobrir 100% da aplicação, tanto no front-end quanto no back-end.
- Criar a documentação do back-end utilizando swagger e do front utilizando storyBook. 
- Inserir tratativas nos dados para exibição no front-end.
- Alterar componentes para melhorar a responsividade.
- Deckerizar a aplicação;
</details>

# Autor

🖋️ [@Willian Bomfim](https://www.linkedin.com/in/willianbomfim/)
