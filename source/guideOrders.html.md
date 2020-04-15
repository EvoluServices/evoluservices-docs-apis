---
title: Evoluservices Orders API Guide
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
toc_footers:
  - <a href="https:www.evoluservices.com">Veja nosso site</a>
includes: []
search: true
highlight_theme: ir-black
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="order-api">Order API</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

 You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).  For this sample, you can use the api key `special-key` to test the authorization filters.

Base URLs:

* <a href="http://petstore.swagger.io/v2">http://petstore.swagger.io/v2</a>

<a href="http://swagger.io/terms/">Terms of service</a>
Email: <a href="mailto:apiteam@swagger.io">Support</a>
License: <a href="http://www.apache.org/licenses/LICENSE-2.0.html">Apache 2.0</a>

# Overview

Se isso ficar mto dificil para vc entender, talvez seja melhor voltar para o nosso [portal](./portal.html#apis).

- Introdução à API da Evoluservices

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

    - Flow: implicit
    - Authorization URL = [http://petstore.swagger.io/oauth/dialog](http://petstore.swagger.io/oauth/dialog)

|usuário|senha|
|---|---|
|usuario 1|senha1|
|usuario 2|senha2|

* API Key (api_key)
    - Parameter Name: **api_key**, in: header.

##Introdução

- Nossos produtos

Temos maravilhosas API que uma delas é o link de pagamento e a outra é a de transação remota.

Fabulosa, magnífica, vão atrás pra entender tbm. Faça splits de pagamento automático para quem vc quiser.

E a outra fantástica é o de link de pagamento para colocar no seu site e aumentar a produtividade e facilitar o recebimento de seus produtos e serviços.

- Suporte

Caso tenha alguma dificuldade, crítica, dúvida, sugestão ou só um coração partido, fique a vontade para ligar para a nossa usper treinada equipe de suporte que está disposta a te ajudar a resolver no que for preciso.

Whatsapp pq somos modernos: (11) xxxx-xxxx

Mas caso tenha dificuldade com tecnologia, pode ligar tbm pelo número: (11) xxxx-xxxx


## API

<a id="api"></a>

- O que é uma API RESTful?

nterface de Programação de Aplicações (pt) ou Interface de Programação de Aplicação (pt-BR)), cuja sigla API provém do Inglês Application Programming Interface, é um conjunto de rotinas e padrões estabelecidos por um software para a utilização das suas funcionalidades por aplicativos que não pretendem envolver-se em detalhes da implementação do software, mas apenas usar seus serviços.

De modo geral, a API é composta por uma série de funções acessíveis somente por programação, e que permitem utilizar características do software menos evidentes ao utilizador tradicional.

- O que é RESTful?

A API RESTful tem como base a tecnologia REST (representational state transfer), um tipo de arquitetura e comunicação muito utilizado no desenvolvimento de serviços web.

 O REST utilizado pelos browsers de internet pode ser imaginado como a linguagem da internet. Com o aumento da utilização da nuvem, o REST é uma escolha lógica para a construção de APIs que permitem ao usuário conectar e interagir com aplicações na nuvem. APIs RESTful são usadas por sites como Google, Amazon, LinkedIn e Twitter.
 
 - Como usar o postman?
 
 Isso é só pra encher linguiça por enquanto. Vi uns tutoriais de como começar a integrar explicando como usar o Postmand de forma mto boa e interessante.
 
 With over 4 million users nowadays, Postman has become a tool of choice for the following reasons:
 
 1. Accessibility - To use Postman, one would just need to log-in to their own accounts making it easy to access files anytime, anywhere as long as a Postman application is installed on the computer.
 2. Use of Collections - Postman lets users create collections for their API calls. Each collection can create subfolders and multiple requests. This helps in organizing your test suites.
 3. Collaboration - Collections and environments can be imported or exported making it easy to share files. A direct link can also be used to share collections.
 4. Creating Environments - Having multiple environments aids in less repetition of tests as one can use the same collection but for a different environment. This is where parameterization will take place which we will discuss in further lessons.
 5. Creation of Tests - Test checkpoints such as verifying for successful HTTP response status can be added to each API calls which help ensure test coverage.
 6. Automation Testing - Through the use of the Collection Runner or Newman, tests can be run in multiple iterations saving time for repetitive tests.
 7. Debugging - Postman console helps to check what data has been retrieved making it easy to debug tests.
 8. Continuous Integration - With its ability to support continuous integration, development practices are maintained.

#Termos fundamentais

<a id="termos_fundamentais"></a>
Alguns termos são fundamentais o entendimento para poder acompanhar com mais qualidade o processo de integração com a Order API.
##Transação

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

##PCI Compliance

O PCI Compliance ou “PCI DSS”, é uma das maiores certificações de segurança do mundo. Mas o que é na prática, o PCI Compliance?

Explicando melhor, o “PCI DSS” é o Padrão de Segurança de Dados para a Indústria de Cartões de Pagamento. Isso significa que essa certificação é necessária para todas empresas que processam, armazenam e transmitem dados de cartões pela internet e é exigida para garantir a segurança desses dados. É uma certificação extremamente importante para quem quer vender através de pagamento on-line.

##Order

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

##Pagamento

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

#Ciclo de vida de uma order
<a id="ciclo-vida-order"></a>


What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Why do we use it?
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

Vou colocar uma tabela pra mostrar que dá pra fazer algumas coisas:

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[Pet](#schemapet)|true|Pet object that needs to be added to the store|

#Guidelines

Nós não somos várzeas, sendo assim, temos algumas linhas de desenvolvimento que são importantes para não deixá-los surpresos quando alguma mudança ocorrer.
1. Evitaremos eliminar algum tipo de parâmetro
2. Procuraremos adicionar parâmetros que serão opcionais
3. Evitaremos renomear qualquer elemento, seja parâmetro, requisição, etc

#Processo homologatório

Divido em fases, mas não faço ideia de como deve ser:
1. Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
2. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
3. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
4. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
5. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
