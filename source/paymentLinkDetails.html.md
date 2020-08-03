---
title: Procedimentos para a integração com o Link de Pagamento
toc_footers:
  - <a href="index.html">Voltar para a página inicial</a>
includes: []
search: true
highlight_theme: ir-black
headingLevel: 2
---
# Procedimentos para integração com Link de Pagamento

A API pode ser integrada com o sistema do parceiro para que ele possa gerar os links de pagamento e ele possa ter seu próprio controle dos mesmo. Dessa forma, também fica a encargo do parceiro fazer o envio do link para que o portador do cartão possa efetuar o pagamento.

Abaixo, estão alguns exemplos de caso de uso que poderá ser realizado com a nossa API usando como link de pagamento.

Para detalhes técnicos, acesse o <a id="learnMoreLink" href="reference.html"> Guia de Referência</a>

## 1. Consultar as opções de pagamento disponíveis para o estabelecimento
> **Consultar opções de pagamento**

> Requisição
```shell
curl -X GET \
  'https://sandbox.evoluservices.com/api/payment-methods?paymentMethods.amount=100.00&paymentMethods.merchantCode=A1B2C3' \
  -H 'Authorization: Basic e3t1c2VybmFtZX19Ont7cGFzc3dvcmR9fQ==' \
  -H 'cache-control: no-cache'
```
> Respostas

> 200: Successo
``` json
{
  "paymentMethods": [
    {
      "type": "CREDIT",
      "options": {
        "maxInstallments": "12",
        "paymentBrands": {
          "value": [
            "VISA", 
            "MASTER",
            "ELO"
          ]
        }
      }
    }
  ]
}
```

Antes de criar o link de pagamento, é possível conferir os métodos possíveis para criar o link de pagamento de acordo com o valor desejado através do endpoint [/api/paymentMethods](./reference.html#paymentmethods).

Os métodos possíveis se referem as opções de crédito e recorrente (`type`). Além disso, mostrará informações como as bandeiras disponíveis para realizar a transação (`paymentBrands`) e a quantidade máxima de parcelas possível para aquele valor (`maxInstallments`). No caso, a quantidade máxima de parcelas se refere apenas para a transação de crédito.


## 2. Realizar uma transação parcelada com o link de pagamento

> **Criar link de pagamento**

> Requisição
```shell
curl -X POST \
  'https://sandbox.evoluservices.com/api/orders' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Basic b3JkZXJzOjEyM211ZGFy' \
  -H 'cache-control: no-cache' \
  -d '{
  "order":{
    "reference": "123CLIENTS",
    "redirectUrl": "https://example.com/callback",
    "amount": "10000.00",
    "maxInstallments": "2",
    "merchantCode": "A1B2C3",
    "customerName": "Rodrigo",
    "customerDocument": "01234567890",
    "recurrent": false,
    "description":  "Venda de equipamento efetuada na data 22/06/2020",
    "expirationDate": "2020-07-16"
  }
}'
```
> Respostas

> 200: Aguardando pagamento do link
``` json
{
  "uuid": "e2ba235d-0b30-4edc-981d-e2c222763aee",
  "payUrl": "sandbox.evoluservices.com/api/orders/e2ba235d-0b30-4edc-981d-e2c222763aee/pay",
  "reference": "123CLIENTS",
  "status": "PENDING"
}
```

Tendo o conhecimento dos métodos disponíveis para criar o link de pagamento, basta utilizar o endpoint [/api/orders](./reference.html#createorders) com o body devidamente preenchido. Como desejamos criar um link de pagamento para uma transação de crédito,  o campo `recurrent` deve ter o valor `false` e os campos `recurrentType`, `quantityCharges` e `frequency` não serão considerados.

A resposta dessa requisição será o [ClientOrderOutpuDto](./reference.html#tocs_clientsorderoutputdto), onde será possível encontrar a `payUrl` que deve ser enviado ao pagador para que o link de pagamento seja pago. Neste momento pós criação do link de pagamento, o status estará como `PENDING` enquanto aguarda o link ser pago.

É possível receber as informações das transações e seus recebimentos sempre que houver alguma atualização dos mesmos. Para isso, basta entrar em contato com o suporte para configurar qual url receberá a callback e ter mais informações.


## 3. Realizar uma transação recorrente com o link de pagamento

> **Realizar transação recorrente do link de pagamento**

> Requisição: Recorrência mensal
```shell
curl -X POST \
  'https://sandbox.evoluservices.com/api/orders' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Basic b3JkZXJzOjEyM211ZGFy' \
  -H 'cache-control: no-cache' \
  -d '{
  "order":{
    "reference": "123CLIENTS",
    "redirectUrl": "https://example.com/callback",
    "amount": "10000.00",
    "maxInstallments": "2",
    "merchantCode": "A1B2C3",
    "customerName": "Rodrigo",
    "customerDocument": "01234567890",
    "recurrent": true,
    "recurrenceType": "MONTHLY",
    "quantityCharges"10",
    "description":  "Venda de equipamento efetuada na data 22/06/2020",
    "expirationDate": "2020-07-16"
  }
}'
```
> Requisição: Recorrência flexível
```shell
curl -X POST \
  'https://sandbox.evoluservices.com/api/orders' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Basic b3JkZXJzOjEyM211ZGFy' \
  -H 'cache-control: no-cache' \
  -d '{
  "order":{
    "reference": "123CLIENTS",
    "redirectUrl": "https://example.com/callback",
    "amount": "10000.00",
    "maxInstallments": "2",
    "merchantCode": "A1B2C3",
    "customerName": "Rodrigo",
    "customerDocument": "01234567890",
    "recurrent": true,
    "recurrenceType": "FLEXIBLE",
    "quantityCharges: "10",
    "frequency": "21",
    "description":  "Venda de equipamento efetuada na data 22/06/2020",
    "expirationDate": "2020-07-16"
  }
}'
```

> Respostas
> 200: Aguardando pagamento do link
``` json
{
  "uuid": "e2ba235d-0b30-4edc-981d-e2c222763aee",
  "payUrl": "sandbox.evoluservices.com/api/orders/e2ba235d-0b30-4edc-981d-e2c222763aee/pay",
  "reference": "123CLIENTS",
  "status": "PENDING"
}
```

Sabendo que é possível criar um link de pagamento para uma transação recorrente, basta preencher o body no [/api/orders](./reference.html#createorders) com as informações corretas. Neste caso, o que será diferente do caso anterior será que o campo `recurrent` agora será `true` e consequentemente alguns campos serão obrigatórios, como `recurrentType`, `quantityCharges` e `frequency`. 

Como o campo `recurrent` será `true`, o campo `maxInstallments` será desconsidera.

Com relação ao campo `recurrentType`, ele pode ter como valor `MONTHLY` ou `FLEXIBLE`. No caso de ser escolhido a opção `MONTHLY`, o que estiver no campo `frequency` não será considerado. E caso a opção `FLEXIBLE` seja escolhida, o campo `frequency` deve ser preenchido com o número de dias em que as transações serão intervaladas. E por último, o campo `quantityCharges` se refere à quantidade de vezes em que essa recorrência de transação ocorrerá.

A partir daqui, a sequência será a mesmo do caso de um link de pagamento de uma transação de crédito. Será recebido como resposta o [ClientOrderOutpuDto](./reference.html#tocs_clientsorderoutputdto) com as informações do link de pagamento em questão.

Assim como no caso anterior, pode ser recebido callbacks com as informações da transação e seus recebimentos. Para configurar essa opção, é necessário enviar a url que será usada para o nosso suporte.



## 4. Realizar uma consulta de uma order específica

> **Consultar uma order específica**

> Requisição
```shell
curl -X GET \
  'http://sandbox.evoluservices.com/api/orders/e2ba235d-0b30-4edc-981d-e2c222763aee' \
  -H 'Authorization: Basic b3JkZXJzOjEyM211ZGFy' \
  -H 'cache-control: no-cache'
```

> Resposta

> 200: Transação aprovada
```json
{
  "uuid": "e2ba235d-0b30-4edc-981d-e2c222763aee",
  "reference": "123CLIENTS",
  "status": "APPROVED",
  "expirationDate": "2020-07-16",
  "transactionList": [
    {
      "number": "12345678909",
      "status": "APPROVED",
      "amount": "100.00",
      "installments": "2",
      "paymentBrand": "VISA_CREDITO",
      "paymentQuantity": "3",
      "nsu": "993485982",
      "authorizationNumber": "470216",
      "customer": {
        "name": "Jose da Silva",
        "document": "123.456.789-09"
      },
      "payments": [
        {
          "number": "12345678909",
          "amount": "100.00",
          "status": "PAYED",
          "payDate": "01/01/2001",
          "merchant": {
            "name": "Jose da Silva",
            "document": "123.456.789-09"
          }
        }
      ]
    }
  ]
}
```

> 200: Transação pendente
```json
{
  "uuid": "e2ba235d-0b30-4edc-981d-e2c222763aee",
  "reference": "123CLIENTS",
  "status": "PENDING",
  "transactionList": []
}
```

Como comentado, é possível realizar consultas a links de pagamento específicos a qualquer momento. Para realizar tal operação, basta utilizar o [/api/orders/{uuid}](./reference.html#consultorder) com o uuid do link desejado.

Caso o link de pagamento ainda esteja com o pagamento pendente, a resposta será a [ClientOrderTransactionsDto](./reference.html#tocs_clientsordertransactionsdto) com `status` como `PENDING`. 

Caso tenha ocorrido alguma tentativa da transação ser realizada, cada tentativa irá gerar um [ClientTransactionOutpuDto](./reference.html#tocs_clientstransactiondto) com o `status` adequado referente a cada tentativa dentro da resposta. Na transação que for de fato aprovada,  
`payments` estará preenchido com as informações dos pagamentos referente à liquidação dessa transação. O campo `payDate` se refere ao dia do pagamento, sendo que se o pagamento já tiver sido realizado, a data será a do dia da liquidação, e se ele ainda não foi realizado, é a data prevista de pagamento. 



## 5. Cancelar uma order específica

> **Cancelar uma order específica**

> Requisição

```shell
curl -L -X DELETE \
'https://sandbox.evoluservices.com/api/orders/e2ba235d-0b30-4edc-981d-e2c222763aee' \
-H 'Authorization: Basic b3JkZXJzOjEyM211ZGFy'
```

> Respostas

> 200: Cancelamento realizado com sucesso
```json
{
  "success": "true",
  "error": "OK_MSG"
}
```

> 500: Status da order inválido para cancelamento
```json
{
  "success": "false",
  "error": "ORDER_STATUS_INVALID_FOR_CANCELLATION"
}
```

> 404: Order não encontrada a partir do uuid fornecido
```json
{
  "success": "false",
  "error": "ORDER_NOT_FOUND"
}
```

Para efetuar o cancelamento de uma order e assim impossibilitar o pagamento e reenvio de notificações dela, utilize [/api/orders/{uuid}](./reference.html#cancelorder) com o uuid relacionado ao Link de Pagamento que deverá ser cancelado.

Caso o `status` atual da order seja `PENDING`, ele será alterado para `CANCELED` e o Link será cancelado.

Caso o `status` atual seja diferente de `PENDING` (já tenha `status` como `CANCELED` por exemplo), a order não sofrerá alterações.

Lembre-se que orders com `status` como `CANCELED` **não podem ser reativadas**, portanto uma nova order deverá ser criada, caso seja necessário.