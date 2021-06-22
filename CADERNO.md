## Tipos de request

GET    => Buscar/Listar informações
POST   => Inserir informações
PUT    => Alterar informações
DELETE => Deletar informações
PATCH  => Alterar informação especifica

## Request e Response

Request  => Entrada 
Response => Saida

## Tipos de parâmetros

### Routes params  
Pode ser usado para manipulação (busca, alteração, deletar) de algum dado
Eles são encontrado na rota e são parâmetros obrigatorios, exemplo: http://localhost:3333/produtos/212313321 <== O Número é o param. No express fica assim:

```ts
app.get('/produtos/{id}', (request: Request, response: Response) => {
  return response.send(request.params.id);
});
```

### Query Params
Podem ser usados para filtrar produtos e são parâmetros não obrigatórios, descrever várias caracteriscas de um determinado produto, por exemplo: http://localhost:3333/produtos?produto=teclado&descricao=tecladomuitobom.
No express fica assim:

```ts
app.get('/test', (request: Request, response: Response) => {
  return response.send(request.query.produto);
});
```

### Body Params
Esses são usados para eviar dados importantes, são enviados no corpo da requisição e geralmente usando JSON, por exemplo: <br/>

```json
{
  "name": "João Victor Ramalho Alves",
  "age": 17,
  "message": "Para quem está lendo: tenha um ótimo dia! 😉"
}
```

## Banco de dados
Existem algumas formas de se utilizar um banco de dados na aplicação, a primeira é usar o próprio driver do banco, ou seja, baixar a biblioteca oficial do banco de dados e rodar o SQL na "unha", existem alguns **problemas** utilizar o driver direto, pois em uma aplicação que vai migrar do PostegreSQL para o Mysql, vai ter algumas diferenças na escrita do código, então em uma migração que poderia ser simples, na verdade vai acontecer uma mudaça em vários lugares da aplicação<br/>

Outra forma de se utilizar é com os Queries Builders, esses já nos ajudam a misturar JavaScript com SQL, um exemplo é o Knex, o lado bom de ser utilizar o Knex é que ele tem um escopo de bancos muito grande e mesmo com várias funções JS para SQL ainda continua muito próximo do SQL e por mais "mão na roda" que é o Knex, ainda tem abstrações que em alguns casos vai se sair melhor do que o Knex. <br/>

E por fim os ORM's, são eles frameworks para fazer um abstração maior, então Sequelize, TypeORM, Prisma e entre outros... Vão ajudar a usar funções JS para representar os códigos SQL, classes para tabelas em SQL e objetos para entidades. Então o ORM é um "tradutor".
