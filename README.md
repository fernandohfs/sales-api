# Sales API

É uma API RESTFul desenvolvida em NodeJS com Hapi.js que supre as necessidades de uma plataforma de vendas menos sofisticada.
Foi realizada como trabalho de conclusão do módulo de Desenvolvimento Web/Rest com Node, da Pós-Graduação.

## Conteúdo

- [Instalação](#instalação)
- [Modo de uso](#modo-de-uso)

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

## Modo de uso

Após seguir os passos de [instalação](#instalação), execute o projeto em ambiente de desenvolvimento usando o comando abaixo na pasta raiz do projeto:

```
$ yarn dev
```

Após isso, a API estará rodando no endereço [http://localhost:3333](http://localhost:3333).