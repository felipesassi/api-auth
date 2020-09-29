# API-AUTH

Para criar o banco de dados:

`yarn sequelize db:create`

Para criar as tabelas:

`yarn sequelize db:migrate`

Para criar o primeiro user:

`node src/writedb.js`

OBS.: As informações sobre o banco de dados estão no arquivo **database.js**.

As rotas são as seguinte:

- /create/user: Cria um novo usuário;
- /create/client: Cria um novo cliente e gera uma API key para esse cliente;
- /login: Loga no sistema e recebe o JWT.