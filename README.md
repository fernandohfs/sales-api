# Sales API

É uma API RESTFul desenvolvida em NodeJS com Hapi.js que supre as necessidades de uma plataforma de vendas menos sofisticada.
Foi realizada como trabalho de conclusão do módulo de Desenvolvimento Web/Rest com Node, da Pós-Graduação.

## Conteúdo

- [Demo - Heroku](#demo)
- [Instalação](#instalação)
- [Documentação](#documentação)
- [Banco de Dados](#banco-de-dados)
- [Modo de uso](#modo-de-uso)
- [Permissões - Level Up](#level-up)
- [Filtros](#filtros)
- [Teste](#teste)

## Demo

Foi feito deploy da API no heroku para demonstração:

- API: [https://sales-api1.herokuapp.com/](https://sales-api1.herokuapp.com/)
- Documentação: [https://sales-api1.herokuapp.com/documentation](https://sales-api1.herokuapp.com/documentation)

Usuários demo:

```
tipo: Cliente
email: joao@gmail.com
senha: 123456
```

```
tipo: Operador
email: admin@gmail.com
senha: 123456
```

## Instalação

### Requisitos

- [NodeJS](https://nodejs.org/pt-br/)
- [Yarn](https://yarnpkg.com/pt-BR/)
- [MySQL](https://www.mysql.com/downloads/)

### Clone

Clone este repositório em sua máquina local usando `https://github.com/fernandohfs/sales-api.git`

### Configuração

Dentro da pasta raiz do projeto execute o comando abaixo para instalar as dependências:

```
$ yarn
```

### Variáveis de ambiente

Crie um arquivo na pasta raiz do projeto chamado `.env`, copie os dados de exemplo contidos no arquivo `.env.example` e preencha com as informações corretas, como, por exemplo, nome, host, username do banco de dados, etc.

## Documentação

Para saber sobre os recursos e rotas disponiveis é quais parâmetros e dados passar, você pode olhar na documentação da API, é só ir no endereço [http://localhost:3333/documentation](http://localhost:3333/documentation)

## Banco de Dados

### Migrations

Após instalar as dependências e atualizar as variáveis de ambiente com os dados de banco de dados corretos, rode as `migrations` executando o comando abaixo:

```
$ yarn sequelize db:migrate
```

## Modo de uso

Após seguir os passos de [instalação](#instalação) e [banco de dados](#banco-de-dados), execute o projeto em ambiente de desenvolvimento usando o comando abaixo na pasta raiz do projeto:

```
$ yarn dev
```

Após isso, a API estará rodando no endereço [http://localhost:3333](http://localhost:3333).

## Level Up

Foi criado dois tipos de usuários no sistema (1 - Cliente, 2 - Operador), com o propósito de restringir que o usuário do tipo cliente cadastre produtos e coisas do tipo, sendo restrito somente ao operador, mas quando se instala e configura a API, somente é possivel criar um usuário do tipo cliente, porque só um usuário do tipo operador pode criar outro usuário operador, então cadastre um usuário comum, e com o script criado pode elevar um usuário como operador, para isso use o comando abaixo na pasta raiz do projeto:

```
$ yarn levelup
```

**_Observações:_** Se já tiver um usuário operador, pode usar ele pada cadastrar outros usuários operadores na rota de cadastro de usuário, mas para isso será necessário passar o token de login.

## Filtros

Nas rotas de busca "GET", foram criados diversos parâmetros para buscar o conteúdo, por exemplo:

##### Paginação:

```
?limit=5&offset=10
```

##### Filtrar atributos do objeto

```
?fields=id,name
```

##### Ordenação

```
Cresente: ?sort=name
Decresente: ?sort=name-
Em conjunto: ?sort=id-,name
```

##### Filtrar campos do objeto

```
_contains: ?name_contains=Fulano
_in: ?id_in=1,2,3
```

## Teste

Para rodar os testes primeiramente certifique se o ambiente de banco de dados foi criado, crie o banco de teste e depois configure o arquivo .env com as configurações de acesso ao banco, então use o comando abaixo para criar a estrutura do banco:

```
$ yarn sequelize db:migrate --env test
```

Agora crie um arquivo .env.test, caminho (pasta raiz)/test/, nesse caminho vai ter um arquivo .env.test.example, preencha todas as configurações que tiver nele como base para o arquivo .env.test.

Por último, execute o comando abaixo na pasta raiz do projeto:

```
$ yarn test
```
