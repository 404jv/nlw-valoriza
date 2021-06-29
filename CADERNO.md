## Milhas extra
- [x] Classe para erros customizável
- [x] Enviar email para o usuário que recebeu um elogio
- [ ] Adicionar middleware para verificação dos dados
- [ ] Colocar em produção
- [ ] Aplicar uma arquitetura
- [ ] Criar o frontend

## Pesquisar
[x] - Eu posso passar uma string contendo nome do tipo do objeto ou só pode fuma função anônima fazer isso: (Não pode)
```ts
@JoinColumn({ name: 'user_sender' })
@ManyToOne(() => User) // Posso passar "'User'" ao invés de "() => User"
userSender: User;
```

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

## Migrations
As migrations são resonsáveis por gerenciar as tabelas, então cada migration representa uma tabela e essa migration vai criar ou deletar a tabla no banco de dados.

## Services vs Controllers
Os controllers são responsáveis por fazer algums verificações nos dados, então seu o usuário fez uma request sem um campo obrigatório, se os tipos dos campos estão corretos. Depois dessa verficação os controllers chamam os services que são responsáveis pela regra de negócio e são os services que se comunicam com as camadas mais baixas, tipo o banco de dados.

## middlewares
Eles ficam no "meio" de uma request e reponse, são funções/metódos com uma tarefa bem especifica, pode ser tanto para tratar errors, como para permitir o uso do Json, que nem nesse caso:

```ts
app.use(express.json());
```
