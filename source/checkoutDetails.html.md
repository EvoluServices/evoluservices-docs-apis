---
title: Procedimentos para a integração com o Evoluservices Checkout
toc_footers:
  - <a href="index.html">Voltar para a página inicial</a>
includes: []
search: true
highlight_theme: ir-black
headingLevel: 2
---
# Procedimentos para integração com EvoluServices Checkout

É possível utilizar a API para que seja usada como checkout. Ou seja, dentro do site ecommerce do parceiro, após o cliente final ter selecionado a ação de pagar, ele será redirecionado para a tela do link de pagamento e após a operação ter sido aprovada, ele será redirecionado para a tela que o parceiro definir.

Abaixo, estão alguns exemplos de caso de uso que poderá ser realizado com a nossa API usando como EvoluServices Checkout.

Para detalhes técnicos, acesse o <a id="learnMoreLink" href="reference.html"> Guia de Referência</a>

# 1. Consultar as opções de pagamento disponíveis para o estabelecimento

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

Antes de fazer o checkout, é possível conferir os métodos possíveis para criar o link de pagamento de acordo com o valor desejado através do endpoint [/api/paymentMethods](./reference.html#paymentmethods).

Os métodos possíveis se referem as opções de crédito e recorrente (`type`). Além disso, mostrará informações como as bandeiras disponíveis para realizar a transação (`paymentBrands`) e a quantidade máxima de parcelas possível para aquele valor (`maxInstallments`). No caso, a quantidade máxima de parcelas se refere apenas para a transação de crédito.


# 2. Realizar uma transação parcelada com Evoluservices Checkout

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

> 200: Retorno com UUID para checkout
``` json
{
  "uuid": "e2ba235d-0b30-4edc-981d-e2c222763aee",
  "payUrl": "sandbox.evoluservices.com/api/orders/e2ba235d-0b30-4edc-981d-e2c222763aee/pay",
  "reference": "123CLIENTS",
  "status": "PENDING"
}
```

> **Fazer Checkout**
```shell
Com seu navegador, acesse
'https://sandbox.evoluservices.com/orders/e2ba235d-0b30-4edc-981d-e2c222763aee/pay'
```

Tendo o conhecimento dos métodos disponíveis para fazer o checkout, basta utilizar o endpoint [/api/orders](./reference.html#createorders) com o body devidamente preenchido. Como desejamos fazer um checkout para uma transação de crédito,  o campo `recurrent` deve ter o valor `false` e os campos `recurrentType`, `quantityCharges` e `frequency` não serão considerados.

A resposta dessa requisição será o [ClientOrderOutpuDto](./reference.html#tocs_clientsorderoutputdto), onde será possível encontrar a `uuid` que deve ser redirecionado ao pagador para que a página seja redirecionada através da URL `https://sandbox.evoluservices.com/orders/{uuid}/pay`.

Após o pagamento ser aprovado, o pagador será redirecionado para o endereço que for definido no campo `redirectUrl`. 

# 3. Realizar uma transação recorrente com Evoluservices Checkout

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

> 200: Retorno com UUID para checkout
``` json
{
  "uuid": "e2ba235d-0b30-4edc-981d-e2c222763aee",
  "payUrl": "sandbox.evoluservices.com/api/orders/e2ba235d-0b30-4edc-981d-e2c222763aee/pay",
  "reference": "123CLIENTS",
  "status": "PENDING"
}
```

> **Fazer Checkout**
```shell
Com seu navegador, acesse
'https://sandbox.evoluservices.com/orders/e2ba235d-0b30-4edc-981d-e2c222763aee/pay'
```

Para fazer o checkout para uma transação recorrente, basta preencher o body no [/api/orders](./reference.html#createorders) com as informações corretas. Neste caso, o que será diferente do caso anterior será que o campo `recurrent` agora será `true` e consequentemente alguns campos serão obrigatórios, como  
`recurrentType`, `quantityCharges` e `frequency`.  

Como o campo `recurrent` será `true`, o campo `maxInstallments` será desconsiderado.

Com relação ao campo `recurrentType`, ele pode ter como valor `MONTHLY` ou `FLEXIBLE`. No caso de ser escolhido a opção `MONTHLY`, o que estiver no campo `frequency` não será considerado. E caso a opção `FLEXIBLE` seja escolhida, o campo `frequency` deve ser preenchido com o número de dias em que as transações serão intervaladas. E por último, o campo `quantityCharges` se refere à quantidade de vezes em que essa recorrência de transação ocorrerá.

A partir daqui, a sequência será a mesmo do caso de um link de pagamento de uma transação de crédito. Será recebido como resposta o [ClientOrderOutpuDto](./reference.html#tocs_clientsorderoutputdto) com as informações do checkout em questão, inclusive a `uuid` e poderá fazer o redirecionamento de página através da URL `sandbox.evoluservices.com/orders/{uuid}/pay`. 

# 4. Realizar uma consulta de uma order específica

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

Como comentado, é possível realizar consultas de checkout específicos a qualquer momento. Para realizar tal operação, basta utilizar o [/api/orders/{uuid}](./reference.html#consultorder) com o uuid do checkout desejado.

Caso a transação de chekcout ainda esteja com o pagamento pendente, a resposta será a [ClientOrderOutpuDto](./reference.html#tocs_clientsordertransactionsdto) com `status` como `PENDING`. 

Caso tenha ocorrido alguma tentativa da transação ser realizada, cada tentativa irá gerar um [ClientTransactionOutpuDto](./reference.html#tocs_clientstransactiondto) com o `status` adequado referente a cada tentativa dentro da resposta. Na transação que for de fato aprovada, `payments` estará preenchido com as informações dos pagamentos referente à liquidação dessa transação. O campo `payDate` se refere ao dia do pagamento, sendo que se o pagamento já tiver sido realizado, a data será a do dia da liquidação, e se ele ainda não foi realizado, é a data prevista de pagamento.

# 5. Cancelar uma order específica

> **Cancelar uma order específica**

> Requisição

```shell
curl -X DELETE \
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