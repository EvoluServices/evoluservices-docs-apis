---
title: Sobre Nossa API
toc_footers:
  - <a href="index.html">Voltar para a página inicial</a>
includes: []
search: true
highlight_theme: ir-black
headingLevel: 2
---

# Sobre nossa API

Orders Client API é [RESTful](https://en.wikipedia.org/wiki/Representational_state_transfer) e seguimos um padrão para todos os endpoints para deixar a integração mais fácil.

Através de nossa API, é possível verificar as formas de pagamento disponíveis para um determinado valor e após isso, criar links de pagamento. Esse link de pagamento pode ser enviado para o cliente final da maneira que o estabelecimento preferir, para que a transação seja realizada.

Não só criar links de pagamento, mas API também permite que seja consultado status desses links, e caso aprovados, é possível realizar um controle dos pagamentos referentes à essas transações.

Além disso, é utilizado o padrão OpenApi 3.0 e disponibilizamos o [JSON com a especificação](https://www.evoluservices.com/resources/docs/orders-api-docs.json).


## Como funciona

Cada parceiro poderá criar a sua plataforma para fazer chamadas ao nosso API. O diagrama abaixo mostra quais são os passos para realizar uma transação com o link de pagamento.

![Diagrama sequencial](source/images/diagram.png)

## Postman

O Postman é uma ferramenta cujo objetivo é testar e desenvolver APIs que utilizam requisições HTTP para extrair, inserir, postar e deletar dados (RESTful APIs). Além disso, ele analisa as respostas da API e as exibe de forma clara e agradável, o Postman também permite a configuração de testes para as Interface de Programação de Aplicações.

Para saber mais informações sobre o Postman, acesse o site do [Postman](https://www.postman.com/) que será possível encontrar diversos conteúdos e diversas formas de se utilizar o mesmo.

No Postman, é possível importar Collections que são um conjunto de exemplos de requisições que podem ser utilizadas para fins de teste. Para importá-la clique no botão abaixo:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/5da5c26a20c0e076c7c2)

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

# Guidelines

Para que possamos evoluir a API do melhor modo possível, seguimos algumas guidelines. São elas:
* Evitaremos ao máximo remover ou renomear parâmetros e requisições;
* Caso adicionarmos algum parâmetro a mais para ter acesso a novos recursos, ele será opcional e não prejudicará o funcionamento da API. 