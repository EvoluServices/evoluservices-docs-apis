# **evoluservices-docs-apis**
Projeto que gera portal de documentações das APIs da Evoluservices

# Começando

As instruções a seguir permitirão que a documentação seja executada localmente.

## Pré-requisitos

Para ver como a documentação será mostrada no Github Pages, é necessário instalar o framework _jekyll_. Os procedimentos para instalação está neste [link](https://jekyllrb.com/docs/installation/). Para instalar os componentes necessários dentro do projeto, execute o comando
```
bundle install
```

## Renderizar a página

As documentações são modificadas através dos arquivos html.md existentes na pasta `source` e depois é renderizada para html para gerar as páginas. Para atualizar o html, execute o comando `
```
npm run render
```

## Abrir navegador com a página atualizada

É possível e renderizar e olhar no navegador como ficou a documentação. Para isso, utilize o comando 
```
npm run launch
```

## Ver preview da documentação no Github Pages

O Github Pages utiliza o framework chamado _jekyll_ para gerar website através do projeto do Github. Após instalar o framework como dito no tópico de [Pré-requisitos](#Pré-requisitos), execute o comando
```
npm start
```
Abra o navegador e acesse `localhost:4000` para ver a documentação.

