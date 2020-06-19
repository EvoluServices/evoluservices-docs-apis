---
title: Evoluservices Orders API v2.0.0
language_tabs:
  - java: Java
  - javascript: Javascript
  - python: Python
  - javascript--nodejs: NodeJs
toc_footers:
  - <a href="index.html">Voltar para o portal</a>
includes: []
search: true
highlight_theme: ir-black
headingLevel: 3

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="evoluservices-orders-api">Evoluservices Orders API v2.0.0</h1>

> Role abaixo para códigos e exemplos de requisições e respostas. Selecione a linguagem para exemplos de código através das abas acima ou pelo menu de navegação do celular.

A API Evoluservices Orders facilita a criação de links de pagamento para  clientes pagarem os estabelecimentos por serviços ou produtos adquiridos  digitalmente. Ela também permite a consulta dos status dos pagamentos, a data estipulada para a liquidação das transações realizadas e os métodos de pagamento disponíveis. Para demonstração, use as credenciais `orders:123mudar` para testar os filtros de autorização.

Base URLs:

* <a href="https://sandbox.evoluservices.com">https://sandbox.evoluservices.com</a>

# Começando a integrar

## Autenticação
A API utiliza o modo de autenticação basicAuth, mais comum no protocolo HTTP. A autenticação é feita através de um credencial na codificação base 64 e uma senha no formato `credencial:senha` inserido no campo Authorization do Header.

Além disso, é necessário merchantCode que é um código único para cada estabelecimento cadastrado no API.

O credencial, a senha e o merchantCode são adquiridos no [processo homologatório](./guideOrders.html#processo-homologat-rio).

## Ambiente de testes
Para uma boa integração, disponibilizamos um ambiente de testes encontrado pela seguinte url: https://sandbox.evoluservices.com.

Para ter acesso a esse ambiente de teste, será recebido um e-mail com as credenciais de acesso no endereço de e-mail cadastrado assim que o [processo homologatório](./guideOrders.html#processo-homologat-rio) for iniciado.
 

### Cartões de teste

Para ser possível realizar testes, seguimos um conjunto de regras definidas pelos adquirentes. São elas:

|Status da transação|Final do cartão|
|-------------------|---------------|
|Autorizado|1 e 4|
|Não autorizado|2, 3, 5, 6, 7 e 8|
|Autorização aleatória|9|

É possível encontrar geradores de cartão de crédito de teste na internet para auxiliar, 
pois é conferido se o número do cartão respeita o algoritmo de Luhn. A 
data de vencimento do cartão deve ser futura, ou seja, caso inserido datas passadas, será considerado 
como falha de transação. O código de segurança não será verificado para fins de testes.

Para aprovar transações com cartão Hiper e HiperCard, deve ser usado especificamente 
os seguintes números:

|         |                |
|---------|----------------|
|Hipercard|6062825624254001|
|Hiper|6370950847866501|

Para simular erros com esses dois últimos cartões, basta realizar transações com o valor `amount` de R$103,00 ou R$104,00.

# Requisições e respostas

<h2 id="evoluservices-orders-api-payment-methods">payment-methods</h2>

Obtém os métodos de pagamento disponíveis para estabelecimentos específicos conforme o valor desejado.

### paymentMethods

<a id="opIdpaymentMethods"></a>

> Code samples

```java
URL obj = new URL("https://sandbox.evoluservices.com/api/payment-methods");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('https://sandbox.evoluservices.com/api/payment-methods',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://sandbox.evoluservices.com/api/payment-methods', headers = headers)

print(r.json())

```

```javascript--nodejs
const fetch = require('node-fetch');

const headers = {
  'Accept':'application/json'
};

fetch('https://sandbox.evoluservices.com/api/payment-methods',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/payment-methods`

*Possui as formas de pagamento disponíveis ao estabelecimento dado o valor pré-definido.*

<h3 id="paymentmethods-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|paymentMethods.amount|query|string|false|Valor do pagamento|
|paymentMethods.merchantCode|query|string|false|Código de identificação do estabelecimento|

> Example responses

> 200 Response

```json
{
  "paymentMethods": [
    {
      "type": "CREDIT",
      "options": {
        "maxInstallments": "12",
        "paymentBrands": {
          "value": [
            "VISA"
          ]
        }
      }
    }
  ]
}
```

<h3 id="paymentmethods-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[PaymentMethodsOutputDto](#schemapaymentmethodsoutputdto)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Exceção de validação|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Não autorizado|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Estabelecimento não encontrado|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Erro de integração|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erro interno no servidor|None|

<aside class="warning">
Para executar esta operação, você deve estar autenticado através do método:
BasicAuth
</aside>

<h2 id="evoluservices-orders-api-orders">orders</h2>

Operação para criar novos pedidos e verificar os já existentes.

### createOrders

<a id="opIdcreateOrders"></a>

> Code samples

```java
URL obj = new URL("https://sandbox.evoluservices.com/api/orders");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{
  "order": {
    "reference": "123CLIENTS",
    "redirectUrl": "https://example.com/callback",
    "amount": "10000.00",
    "maxInstallments": "2",
    "merchantCode": "A1B2C3",
    "customerName": "Rodrigo",
    "customerDocument": "01234567890",
    "recurrent": true,
    "recurrenceType": "MONTHLY",
    "quantityCharges": "10",
    "frequency": "30",
    "description": "Venda de equipamento efetuada na data 13/05/2020"
  }
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('https://sandbox.evoluservices.com/api/orders',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('https://sandbox.evoluservices.com/api/orders', headers = headers)

print(r.json())

```

```javascript--nodejs
const fetch = require('node-fetch');
const inputBody = {
  "order": {
    "reference": "123CLIENTS",
    "redirectUrl": "https://example.com/callback",
    "amount": "10000.00",
    "maxInstallments": "2",
    "merchantCode": "A1B2C3",
    "customerName": "Rodrigo",
    "customerDocument": "01234567890",
    "recurrent": true,
    "recurrenceType": "MONTHLY",
    "quantityCharges": "10",
    "frequency": "30",
    "description": "Venda de equipamento efetuada na data 13/05/2020"
  }
};
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('https://sandbox.evoluservices.com/api/orders',
{
  method: 'POST',
  body: JSON.stringify(inputBody),
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/orders`

*Cria novo link de pagamento e retorna url para o pagamento ser realizado.*

> Body parameter

```json
{
  "order": {
    "reference": "123CLIENTS",
    "redirectUrl": "https://example.com/callback",
    "amount": "10000.00",
    "maxInstallments": "2",
    "merchantCode": "A1B2C3",
    "customerName": "Rodrigo",
    "customerDocument": "01234567890",
    "recurrent": true,
    "recurrenceType": "MONTHLY",
    "quantityCharges": "10",
    "frequency": "30",
    "description": "Venda de equipamento efetuada na data 13/05/2020"
  }
}
```

<h3 id="createorders-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[ClientsOrderInputDto](#schemaclientsorderinputdto)|true|Objeto contendo as informações para criar o link de pagamento.|
|» order|body|object|false|none|
|»» reference|body|string|false|Identificação referenciando o order|
|»» redirectUrl|body|string|false|Redireciona a URL depois do pagamento do pedido. Faça um retorno de chamada 'POST' com o formato 'x-www-form-urlencoded' e com os parâmetros 'uuid' e 'transactionNumber'|
|»» amount|body|string|false|Valor do order, em formato decimal (XXXX.XX)|
|»» maxInstallments|body|number|false|Número máximo de parcelas permitidos pelo order|
|»» merchantCode|body|string|false|Código do estabelecimento referente ao order|
|»» customerName|body|string|false|Nome do cliente do order|
|»» customerDocument|body|string|false|Documento do cliente do order|
|»» recurrent|body|boolean|false|Indica se o pagamento do order é do tipo recorrente ou não|
|»» recurrenceType|body|string|false|Tipo de recorrência do pagamento do order podendo ser mensal ou flexível  (por período fixo determinado). O preenchimento do campo é Obrigatório caso o campo `recurrent` seja definido como `true`.|
|»» quantityCharges|body|number|false|Quantidade de recorrências que serão cobradas no order O preenchimento do campo é Obrigatório caso o campo `recurrent` seja definido como `true`.|
|»» frequency|body|number|false|Período fixo entre as cobranças da recorrência, em dias. O preenchimento do campo é Obrigatório caso o campo `recurrent` seja definido como `true`.|
|»» description|body|string|false|Descrição mais detalhada referente à order.|

#### Enumerated Values

|Parameter|Value|
|---|---|
|»» recurrenceType|MONTHLY|
|»» recurrenceType|FLEXIBLE|

> Example responses

> 200 Response

```json
{
  "uuid": "e2ba235d-0b30-4edc-981d-e2c222763aee",
  "payUrl": "api.evoluservices.com/orders/pay",
  "reference": "123CLIENTS",
  "status": "APPROVED"
}
```

<h3 id="createorders-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ClientsOrderOutputDto](#schemaclientsorderoutputdto)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Exceção de validação|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Não autorizado|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Estabelecimento não encontrado|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Erro de integração|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erro interno no servidor|None|

<aside class="warning">
Para executar esta operação, você deve estar autenticado através do método:
BasicAuth
</aside>

### consultOrder

<a id="opIdconsultOrder"></a>

> Code samples

```java
URL obj = new URL("https://sandbox.evoluservices.com/api/orders/{uuid}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('https://sandbox.evoluservices.com/api/orders/{uuid}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://sandbox.evoluservices.com/api/orders/{uuid}', headers = headers)

print(r.json())

```

```javascript--nodejs
const fetch = require('node-fetch');

const headers = {
  'Accept':'application/json'
};

fetch('https://sandbox.evoluservices.com/api/orders/{uuid}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/orders/{uuid}`

*Consulta o Link de Pagamento de acordo com o uuid.*

<h3 id="consultorder-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|uuid|path|string|true|Uuid do Link de Pagamento|

> Example responses

> 200 Response

```json
{
  "uuid": "e2ba235d-0b30-4edc-981d-e2c222763aee",
  "reference": "123CLIENTS",
  "status": "APPROVED",
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

<h3 id="consultorder-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ClientsOrderTransactionsDto](#schemaclientsordertransactionsdto)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Exceção de validação|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Não autorizado|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Pedido não encontrado|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Erro de integração|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erro interno no servidor|None|

<aside class="warning">
Para executar esta operação, você deve estar autenticado através do método:
BasicAuth
</aside>

# Estruturas

<h2 id="tocS_PaymentMethodsInputDto">PaymentMethodsInputDto</h2>
<!-- backwards compatibility -->
<a id="schemapaymentmethodsinputdto"></a>
<a id="schema_PaymentMethodsInputDto"></a>
<a id="tocSpaymentmethodsinputdto"></a>
<a id="tocspaymentmethodsinputdto"></a>

```json
{
  "amount": "10000.00",
  "merchantCode": "AVD242AN"
}

```

Objeto para a busca de formas de pagamento disponíveis ao estabelecimento conforme valor desejado.

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|amount|string|false|none|Valor do pagamento|
|merchantCode|string|false|none|Código do estabelecimento|

<h2 id="tocS_PaymentMethodsOutputDto">PaymentMethodsOutputDto</h2>
<!-- backwards compatibility -->
<a id="schemapaymentmethodsoutputdto"></a>
<a id="schema_PaymentMethodsOutputDto"></a>
<a id="tocSpaymentmethodsoutputdto"></a>
<a id="tocspaymentmethodsoutputdto"></a>

```json
{
  "paymentMethods": [
    {
      "type": "CREDIT",
      "options": {
        "maxInstallments": "12",
        "paymentBrands": {
          "value": [
            "VISA"
          ]
        }
      }
    }
  ]
}

```

Objeto de retorno contendo as informações sobre as formas de pagamento disponíveis. 

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|paymentMethods|[[PaymentMethod](#schemapaymentmethod)]|false|none|[Objeto contendo as informações de pagamento do estabelecimento.]|

<h2 id="tocS_PaymentMethod">PaymentMethod</h2>
<!-- backwards compatibility -->
<a id="schemapaymentmethod"></a>
<a id="schema_PaymentMethod"></a>
<a id="tocSpaymentmethod"></a>
<a id="tocspaymentmethod"></a>

```json
{
  "type": "CREDIT",
  "options": {
    "maxInstallments": "12",
    "paymentBrands": {
      "value": [
        "VISA"
      ]
    }
  }
}

```

Objeto contendo as informações de pagamento do estabelecimento.

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|false|none|Determina o método de pagamento, podendo ser crédito ou recorrente|
|options|[PaymentOption](#schemapaymentoption)|false|none|Opção para o tipo de pagamento do estabelecimento|

#### Enumerated Values

|Property|Value|
|---|---|
|type|CREDIT|
|type|RECURRENT|

<h2 id="tocS_PaymentOption">PaymentOption</h2>
<!-- backwards compatibility -->
<a id="schemapaymentoption"></a>
<a id="schema_PaymentOption"></a>
<a id="tocSpaymentoption"></a>
<a id="tocspaymentoption"></a>

```json
{
  "maxInstallments": "12",
  "paymentBrands": {
    "value": [
      "VISA"
    ]
  }
}

```

Opção para o tipo de pagamento do estabelecimento

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|maxInstallments|number|false|none|Número máximo de parcelas permitido para a opção|
|paymentBrands|object|false|none|Bandeiras disponíveis para a opção|
|» value|[string]|false|none|none|

<h2 id="tocS_ClientsOrderInputDto">ClientsOrderInputDto</h2>
<!-- backwards compatibility -->
<a id="schemaclientsorderinputdto"></a>
<a id="schema_ClientsOrderInputDto"></a>
<a id="tocSclientsorderinputdto"></a>
<a id="tocsclientsorderinputdto"></a>

```json
{
  "order": {
    "reference": "123CLIENTS",
    "redirectUrl": "https://example.com/callback",
    "amount": "10000.00",
    "maxInstallments": "2",
    "merchantCode": "A1B2C3",
    "customerName": "Rodrigo",
    "customerDocument": "01234567890",
    "recurrent": true,
    "recurrenceType": "MONTHLY",
    "quantityCharges": "10",
    "frequency": "30",
    "description": "Venda de equipamento efetuada na data 13/05/2020"
  }
}

```

Objeto contendo informações para a solicitação de uma nova transação.

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|order|object|false|none|none|
|» reference|string|false|none|Identificação referenciando o order|
|» redirectUrl|string|false|none|Redireciona a URL depois do pagamento do pedido. Faça um retorno de chamada 'POST' com o formato 'x-www-form-urlencoded' e com os parâmetros 'uuid' e 'transactionNumber'|
|» amount|string|false|none|Valor do order, em formato decimal (XXXX.XX)|
|» maxInstallments|number|false|none|Número máximo de parcelas permitidos pelo order|
|» merchantCode|string|false|none|Código do estabelecimento referente ao order|
|» customerName|string|false|none|Nome do cliente do order|
|» customerDocument|string|false|none|Documento do cliente do order|
|» recurrent|boolean|false|none|Indica se o pagamento do order é do tipo recorrente ou não|
|» recurrenceType|string|false|none|Tipo de recorrência do pagamento do order podendo ser mensal ou flexível  (por período fixo determinado). O preenchimento do campo é Obrigatório caso o campo `recurrent` seja definido como `true`.|
|» quantityCharges|number|false|none|Quantidade de recorrências que serão cobradas no order O preenchimento do campo é Obrigatório caso o campo `recurrent` seja definido como `true`.|
|» frequency|number|false|none|Período fixo entre as cobranças da recorrência, em dias. O preenchimento do campo é Obrigatório caso o campo `recurrent` seja definido como `true`.|
|» description|string|false|none|Descrição mais detalhada referente à order.|

#### Enumerated Values

|Property|Value|
|---|---|
|recurrenceType|MONTHLY|
|recurrenceType|FLEXIBLE|

<h2 id="tocS_ClientsOrderOutputDto">ClientsOrderOutputDto</h2>
<!-- backwards compatibility -->
<a id="schemaclientsorderoutputdto"></a>
<a id="schema_ClientsOrderOutputDto"></a>
<a id="tocSclientsorderoutputdto"></a>
<a id="tocsclientsorderoutputdto"></a>

```json
{
  "uuid": "e2ba235d-0b30-4edc-981d-e2c222763aee",
  "payUrl": "api.evoluservices.com/orders/pay",
  "reference": "123CLIENTS",
  "status": "APPROVED"
}

```

Objeto de retorno contendo informações sobre o link de pagamento gerado pelo order.

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|uuid|string|false|none|UUID do link de pagamento gerado pelo order|
|payUrl|string|false|none|URL do link de pagamento para tal order|
|reference|string|false|none|Identificação referenciando o order|
|status|string|false|none|Status do order|

#### Enumerated Values

|Property|Value|
|---|---|
|status|APPROVED|
|status|CANCELED|
|status|PENDING|

<h2 id="tocS_ClientsOrderTransactionsDto">ClientsOrderTransactionsDto</h2>
<!-- backwards compatibility -->
<a id="schemaclientsordertransactionsdto"></a>
<a id="schema_ClientsOrderTransactionsDto"></a>
<a id="tocSclientsordertransactionsdto"></a>
<a id="tocsclientsordertransactionsdto"></a>

```json
{
  "uuid": "e2ba235d-0b30-4edc-981d-e2c222763aee",
  "reference": "123CLIENTS",
  "status": "APPROVED",
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

Objeto de retorno contendo informações sobre a transação efetuada por um link de pagamento  de acordo com o UUID buscado.

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|uuid|string|false|none|UUID do link de pagamento|
|reference|string|false|none|Identificação referenciando o order da transação|
|status|string|false|none|Status da transação|
|transactionList|[[ClientsTransactionDto](#schemaclientstransactiondto)]|false|none|Transações efetuadas pelo link de pagamento.|

#### Enumerated Values

|Property|Value|
|---|---|
|status|APPROVED|
|status|CANCELED|
|status|PENDING|

<h2 id="tocS_ClientsTransactionDto">ClientsTransactionDto</h2>
<!-- backwards compatibility -->
<a id="schemaclientstransactiondto"></a>
<a id="schema_ClientsTransactionDto"></a>
<a id="tocSclientstransactiondto"></a>
<a id="tocsclientstransactiondto"></a>

```json
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

```

Objeto contendo as informações sobre as transações efetuadas pelo link de pagamento.

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|number|number|false|none|Número da transação|
|status|string|false|none|Além dos valores abaixo, temos algumas outras possibilidades de status para controle interno, por exemplo: COMPLETE, INCOMPLETE, CANCEL_REQUESTED, etc, mas eles não devem ser considerados como valores esperados porque são extremamente voláteis|
|amount|number|false|none|Valor da transação no formato decimal (XXXX.XX)|
|installments|number|false|none|Número de parcelas efetuadas na transação|
|paymentBrand|string|false|none|Bandeira com a qual a transação foi efetuada|
|paymentQuantity|number|false|none|Quantidades de pagamentos existentes na transação|
|nsu|string|false|none|NSU da transação|
|authorizationNumber|string|false|none|Número de autorização da transação|
|customer|[SubjectIdentifierDto](#schemasubjectidentifierdto)|false|none|Objeto contendo informações do cliente que efetuou a transação com link de pagamento.|
|payments|[[ClientsTransactionPaymentDto](#schemaclientstransactionpaymentdto)]|false|none|[Objeto contendo informações sobre o pagamento da transação feita pelo link de pagamento.]|

#### Enumerated Values

|Property|Value|
|---|---|
|status|APPROVED|
|status|CANCELLED|
|status|ABORTED|
|status|ABORTED_BY_MERCHANT|
|status|PARTIALLY_CANCELED|
|paymentBrand|VISA_CREDITO|
|paymentBrand|VISA_ELECTRON|
|paymentBrand|MASTERCARD|
|paymentBrand|MAESTRO|
|paymentBrand|AMEX|
|paymentBrand|DINERS|
|paymentBrand|HIPERCARD|
|paymentBrand|AURA|
|paymentBrand|SOROCRED|
|paymentBrand|BANRISUL|
|paymentBrand|ELO|
|paymentBrand|SICREDI|
|paymentBrand|ELO_DEBITO|
|paymentBrand|BRADESCO|
|paymentBrand|HIPER|
|paymentBrand|AGIPLAN|
|paymentBrand|BANESCARD|
|paymentBrand|CREDZ|
|paymentBrand|JCB|
|paymentBrand|CABAL|
|paymentBrand|MAIS|
|paymentBrand|CHEQUE_TELECHEQUE|
|paymentBrand|CHEQUE_CREDITALL|
|paymentBrand|BOLETO|
|paymentBrand|BANESCARD_DEBITO|
|paymentBrand|CABAL_DEBITO|
|paymentBrand|HIPER_DEBITO|
|paymentBrand|REDESHOP|

<h2 id="tocS_SubjectIdentifierDto">SubjectIdentifierDto</h2>
<!-- backwards compatibility -->
<a id="schemasubjectidentifierdto"></a>
<a id="schema_SubjectIdentifierDto"></a>
<a id="tocSsubjectidentifierdto"></a>
<a id="tocssubjectidentifierdto"></a>

```json
{
  "name": "Jose da Silva",
  "document": "123.456.789-09"
}

```

Objeto contendo informações do cliente que efetuou a transação com link de pagamento.

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|false|none|Nome do cliente|
|document|string|false|none|Documento do cliente|

<h2 id="tocS_ClientsTransactionPaymentDto">ClientsTransactionPaymentDto</h2>
<!-- backwards compatibility -->
<a id="schemaclientstransactionpaymentdto"></a>
<a id="schema_ClientsTransactionPaymentDto"></a>
<a id="tocSclientstransactionpaymentdto"></a>
<a id="tocsclientstransactionpaymentdto"></a>

```json
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

```

Objeto contendo informações sobre o pagamento da transação feita pelo link de pagamento.

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|number|number|false|none|Número do pagamento|
|amount|number|false|none|Valor do pagamento, em formato decimal|
|status|string|false|none|Status do pagamento da transação|
|payDate|string|false|none|Data em que o pagamento efetivamente foi feito ou, se ainda não foi pago, data esperada de pagamento|
|merchant|[SubjectIdentifierDto](#schemasubjectidentifierdto)|false|none|Objeto contendo informações do cliente que efetuou a transação com link de pagamento.|

#### Enumerated Values

|Property|Value|
|---|---|
|status|PAYED|
|status|UNPAID|
|status|ANTICIPATION_REQUESTED|
|status|ANTICIPATED|
|status|CANCEL_REQUESTED|
|status|CANCELLED|

