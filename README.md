# API Controle de Sonda

## Instalação

    npm install

## Execução

Testar:

    npm run test

Iniciar servidor:

    npm run start
    
## DEMO
Disponível no Heroku:
[https://teste-sonda.herokuapp.com/probe](https://teste-sonda.herokuapp.com/probe)
    
## Atenção

A sonda "vive" na sessão, que é controlada através de um `cookie`, então é necessário salvar e transmitir esse cookie para o funcionamento correto da API. Recomendo a realização dos testes utilizando o Postman, inclui as coleções de teste local e no servidor.

## API

### Iniciar sonda

Inicia uma sonda na posição (0,0) virada para a direita. Você pode passar o tipo da sonda como `type`, só foi implementado o `Standard` que é o default.

`POST /probe`


Exemplo:
```json
{"type": "Standard"}
```
Retorno:
```json
{
    "probe": {
        "x": 0,
        "y": 0,
        "face": "D"
    },
    "id": 0,
    "type": "Standard"
}
```

### Destruir sonda

Destroi a sonda

`DELETE /probe`

Retorno:
```json
{
    "probe": {
        "x": 0,
        "y": 0,
        "face": "D"
    },
    "deleted": true
}
```

### Pegar posição da sonda

Retorna as coordenadas `x` e `y` e a direção na qual a sonda está (`face`).

`GET /probe`

Retorno:
```json
{
    "x": 0,
    "y": 0,
    "face": "D"
}
```

### Executar comandos

Executa uma lista de comandos. Espera um array no corpo da requisição com o nome `movementos`. 
Caso a sonda saia dos limites (posição negativa ou `>=` a 5 para qualquer coordenada), a execução dos comandos para e é retornado um erro.

Comandos disponíveis: `M`, `GE`, `GD`.

Os comandos foram criados usando o `command pattern` com capacidade de rollback, é simples adicionar novos comandos. Um historico da execução dos comandos é armazenado.

`PUT /probe`

Exemplo:
```json
{"movementos": ["M", "M"]}
```
Retorno:
```json
{"x": 2, "y": 0}
```
### Desfazer último comando

Desfaz o último comando realizado. Pode ser executado enquando existir comandos no historico. Retorna um erro se não houver comando para ser desfeito.

`PUT /probe/undo`

Retorno:
```json
{"x": 1, "y": 0}
```
