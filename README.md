# rocket-food-api

Este é o banco de dados, para ver o resto da aplicação clique aqui: https://github.com/Luiz-Felipe-Castro-dev/rocket_food 

Neste banco de dados foi usado sqlite. 
Este banco de dados recebe requisições http, processa a requisição, interage com o banco de dados e retorna uma resposta apropriada.
Para autenticação é usado o bearer token, o usuario pode também cadastrar imagens para pratos e ingredientes.

Para testar este back end em development use o comando npm migrate, depois use npm run dev. Para usar no ambiente de produção configure o arquivo .env, 
e use o comando npm start

tecnologias usadas:
- node
- sqlite
- express
- multer
- knex
- pm2
- cors
- heroku
