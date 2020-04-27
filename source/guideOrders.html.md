---
title: Evoluservices Orders API Guide
toc_footers:
  - <a href="index.html">Voltar para o portal</a>
includes: []
search: true
highlight_theme: ir-black
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

# Guia para Evoluservices Orders API v2.0.0

# Introdução

## Nossos produtos

O link de pagamento é um dos nossos produtos que permite o pagamento de produtos e serviços adquiridos. Após a compra do produto e/ou serviço, é possível criar um link de pagamento para ser enviado ao pagador com informações pré-definidas como por exemplo, valor e limite de parcelamento. O pagador receberá esse link e poderá realizar a transação com seu cartão de crédito. Os detalhes desta transação ficarão disponíveis para consulta, sendo possível visualizar detalhes como a forma de parcelamento escolhida, o cartão escolhido e a data prevista de pagamento do valor referente a esta transação.

## Suporte

Disponibilizamos uma equipe de suporte especializada que está pronta para entrar em contato com o estabelecimento caso seja necessário alguma ajuda.

Caso ainda não seja um cliente nosso, entre em contato com o nosso setor comercial para saber mais sobre os nossos produtos preenchendo o [formulário de contato com um consultor](https://bit.ly/395RKpP).

Caso já seja um cliente e está com dúvidas com relação à integração, entre em contato pelo [formulário de dúvida técnicas](https://bit.ly/396FwNF).

Caso seja necessário, pode entrar em contato pelos seguintes meios de comunicação:
* Email: integracoes@evoluservices.com
* [WhatsApp](https://api.whatsapp.com/send?phone=5511933679024)

# API

## Nossa API

A nossa API é [RESTful](https://en.wikipedia.org/wiki/Representational_state_transfer) e seguimos um padrão para todos os endpoints para deixar a integração mais fácil.

Através de nossa API, é possível verificar as formas de pagamento disponíveis para um determinado valor e após isso, criar links de pagamento. Esse link de pagamento pode ser enviado para o cliente final da maneira que o estabelecimento preferir, para que a transação seja realizada.

Não só criar links de pagamento, mas API também permite que seja consultado status desses links, e caso aprovados, é possível realizar um controle dos pagamentos referentes à essas transações.

Além disso, é utilizado o padrão OpenApi 3.0 e disponibilizamos o [JSON com a especificação](https://www.evoluservices.com/resources/docs/orders-api-docs.json).

## Como integrar

Cada parceiro poderá criar a sua plataforma para fazer chamadas ao nosso API. O diagrama sequencial abaixo mostra quais são os passos para realizar uma transação com o link de pagamento.

![Diagrama sequencial](/source/images/diagram.png)

## Postman

O Postman é uma ferramenta cujo objetivo é testar e desenvolver APIs que utilizam requisições HTTP para extrair, inserir, postar e deletar dados (RESTful APIs). Além disso, ele analisa as respostas da API e as exibe de forma clara e agradável, o Postman também permite a configuração de testes para as Interface de Programação de Aplicações.

Para saber mais informações sobre o Postman, acesse o site do [Postman](https://www.postman.com/) que será possível encontrar diversos conteúdos e diversas formas de se utilizar o mesmo.

No Postman, é possível importar Collections que são um conjunto de exemplos de requisições que podem ser utilizadas para fins de teste. Para importá-la clique no botão abaixo:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/d006ac77c92afa942f3a)

# Termos fundamentais

Alguns termos são fundamentais o entendimento para poder acompanhar com mais qualidade o processo de integração com a Order API.

## PCI Compliance

PCI Compliance ou PCI DSS (Payment Card Industry Data Security Standard) é a principal certificação de segurança digital e todas as empresas que lidam com transações envolvendo o processamento, armazenamento e transmissão de informações sigilosas, como por exemplo os dados de cartão de crédito, precisam dessa certificação.  Ela foi criada pela PCI Security Standards Council, uma entidade formada pelas empresas Visa, Mastercard, American Express, Discover e JCB International.

Para conseguir essa certificação e obter maior eficácia na segurança dos dados dos consumidores a empresa precisa estar em conforme com doze principais requisitos:
1. Instalar e manter uma rede de firewall segura;
2. Alterar as senhas padrão dadas por fornecedores, visando reduzir os riscos de invasão;
3. Usar criptografia de dados;
4. Codificar a transmissão de dados do usuário e informações confidenciais em redes públicas;
5. Usar e atualizar frequentemente o antivírus;
6. Desenvolver e manter aplicativos seguros;
7. Restringir acesso aos dados por parte das empresas;
8. Atribuir uma identificação única para cada usuário;
9. Limitar o acesso físico aos dados de cada usuário;
10. Monitorar os dados dos usuários com regularidade;
11. Aplicar testes de segurança aos recursos tecnológicos;
12. Desenvolver e manter uma política de segurança da informação.

Essas regras objetivam proteger os estabelecimentos e consumidores de fraudes que envolvam o compartilhamento de dados de cartão a terceiros. As empresas que não se enquadram aos requisitos estabelecidos estão sujeitas ao descredenciamento por parte das operadoras dos cartões de crédito, entre outras medidas cabíveis.

A Evoluservices é certificada anualmente pelo PCI DSS.

## Transação

Uma transação financeira é uma ocasião envolvendo de modo geral duas personas, sendo que uma, o vendedor, oferece um produto ou serviço para a segunda, o comprador, que para aquisição do produto/serviço realiza um pagamento em dinheiro em espécie, cheque, cartão de débito/crédito ou qualquer outra forma de pagamento.

No nosso sistema, o link de pagamento se trata de uma transação com um cartão de crédito. 

## Pagamento

Dada uma transação que foi realizada com sucesso utilizando algum de nossos produtos, o pagamento é o valor que o estabelecimento irá receber referente a essa transação.

O valor desse pagamento se dará de acordo com o plano que o estabelecimento tem acordado conosco.

## Order

Uma order é um link de pagamento. Ela pode iniciar uma transação de crédito ou uma recorrência de transações. O link de pagamento terá um valor definido no momento de sua criação e deve ser enviado ao pagador para realizar a transação de fato.

# Ciclo de vida de uma order

Abaixo, estão alguns exemplos de caso de uso que poderá ser realizado com a nossa API.

## 1. Realizar uma transação parcelada com o link de pagamento

Antes de criar o link de pagamento, é necessário conferir os métodos possíveis para criar o link de pagamento de acordo com o valor desejado através do endpoint [/api/paymentMethods](./reference.html#paymentmethods).

Os métodos possíveis se referem às opções de crédito e recorrente (`type`). Além disso, mostrará informações como as bandeiras disponíveis para realizar a transação (`paymentBrands`) e a quantidade máxima de parcelas possível para aquele valor (`maxInstallments`). No caso, a quantidade máxima de parcelas se refere apenas para a transação de crédito.

Tendo o conhecimento dos métodos disponíveis para criar o link de pagamento, basta utilizar o endpoint [/api/orders](./reference.html#createorders) com o body devidamente preenchido. Como desejamos criar um link de pagamento para uma transação de crédito,  o campo `recurrent` deve ter o valor `false` e os campos `recurrentType`, 
`quantityCharges` e `frequency` não serão considerados.

A resposta dessa requisição será o [ClientOrderOutpuDto](./reference.html#tocs_clientsorderoutputdto), onde será possível encontrar a `payUrl` que deve ser enviada ao pagador para que o link de pagamento seja pago. Neste momento pós criação do link de pagamento, o status estará como `PENDING` enquanto aguarda o link ser pago.

É possível consultar o status do link de pagamento utilizando o endpoint [/api/orders/{uuid}](./reference.html#consultorder). Enquanto o link não for pago, ele terá como status `PENDING`. Após o pagamento ser feito, ele terá o status `APPROVED` e mostrará uma lista com os detalhes das tentativas de aprovação da transação. Tendo a transação aprovada, será possível encontrar os detalhes de seus pagamento. 

## 2. Realizar uma transação recorrente com o link de pagamento

Da mesma forma que no caso anterior, conferir os métodos possíveis para criar o link de pagamento de acordo com o valor desejado através do endpoint [/api/paymentMethods](./reference.html#paymentmethods).

Sabendo que é possível criar um link de pagamento para uma transação recorrente, basta preencher o body no [/api/orders](./reference.html#createorders) com as informações corretas. Neste caso, o que será diferente do caso anterior será que o campo `recurrent` agora será `true` e consequentemente alguns campos serão obrigatórios, como  
`recurrentType`, `quantityCharges` e `frequency`. 

Como o campo `recurrent` será `true`, o campo `maxInstallments` será desconsiderado.

Com relação ao campo `recurrentType`, ele pode ter como valor `MONTHLY` ou  
`FLEXIBLE`. No caso de ser escolhido a opção `MONTHLY`, o que estiver no campo  
`frequency` não será considerado. E caso a opção `FLEXIBLE` seja escolhida, o campo  `frequency` deve ser preenchido com o número de dias em que as transações serão intervaladas. E por último, o campo `quantityCharges` se refere à quantidade de vezes em que essa recorrência de transação ocorrerá.

A partir daqui, a sequência será a mesma do caso de um link de pagamento de uma transação de crédito. Será recebido como resposta o [ClientOrderOutpuDto](./reference.html#tocs_clientsorderoutputdto) com as informações do link de pagamento em questão.

Para realizar a consulta deste link de pagamento em específico, basta utilizar o endpoint [/api/orders/{uuid}](./reference.html#consultorder) com a `uuid` do mesmo. É importante saber que apenas aparecerá as informações da primeira transação dessa recorrência de transações. Para ter mais detalhes das outras transações geradas a partir dessa recorrência, é necessário acessar a [área do estabelecimento](https://www.evoluservices.com/login).


## 3. Realizar uma consulta de uma order específica

Como comentado, é possível realizar consultas a links de pagamento específicos a qualquer momento. Para realizar tal operação, basta utilizar o [/api/orders/{uuid}](./reference.html#consultorder) com o uuid do link desejado.

Caso o link de pagamento ainda esteja com o pagamento pendente, a resposta será a [ClientOrderOutpuDto](./reference.html#tocs_clientsordertransactionsdto) com `status` como `PENDING`. 

Caso tenha ocorrido alguma tentativa da transação ser realizada, cada tentativa irá gerar um [ClientTransactionOutpuDto](./reference.html#tocs_clientstransactiondto) com o `status` adequado referente a cada tentativa dentro da resposta. Na transação que for de fato aprovada,  
`payments` estará preenchido com as informações dos pagamentos referente à liquidação dessa transação. O campo `payDate` se refere ao dia do pagamento, sendo que se o pagamento já tiver sido realizado, a data será a do dia da liquidação, e se ele ainda não foi realizado, é a data prevista de pagamento. 

# Guidelines

Para que possamos evoluir a API do melhor modo possível, seguimos algumas guidelines. São elas:
* Evitaremos ao máximo remover ou renomear parâmetros e requisições;
* Caso adicionarmos algum parâmetro a mais para ter acesso a novos recursos, ele será opcional e não prejudicará o funcionamento da API. 

# Processo homologatório

Para realizar a integração com a Orders API, é necessário passar pelo processo homologatório. Esse processo é realizado da seguinte forma, considerando que já houve o contato com o setor comercial:
1. Entrar em contato com o nosso suporte especializado através do [formulário](https://bit.ly/396FwNF);
2. O nosso suporte irá entrar em contato para realizar as orientações iniciais com relação ao sistema, assim como da integração em si e enviar e-mail com as credenciais para o uso em nosso ambiente de testes (como o `merchantCode`). Caso seja desejado, pode ser feito um acesso remoto para explicar como pode ser realizados os testes via Postman;
3. Após a integração com a API implementada, entrar em contato novamente com nosso suporte especializado para realização de testes de requisição;
4. Realização dos testes homologatórios de fato.
Após o processo homologatório ser feito, é possível que as conversas sejam por um grupo de [WhatsApp](https://api.whatsapp.com/send?phone=5511933679024) com nossos desenvolvedores e todos os envolvidos na integração para melhor auxiliá-los.
