# Desafio FrontEnd

O desafio consiste em criar uma listagem com as issues do repositório https://github.com/reactjs/reactjs.org/issues e contempla as seguinte funcionalidades:
- Listagem de todas as issues;
- Filtros para status (aberto/fechado);
- Filtros para labels;
- Destaque para issues de número ímpar;
- Paginação.

## Principais tecnologias, bibliotecas e frameworks utilizados

- **create-react-app** - para start do projeto
- **MaterialUI** - para construção da tabela com a listagem
- **react-router-dom** - para controle de rotas;
- **styled-components** - para estilização de componentes;
- **redux** - para gerenciar estados;
- **axios** - para consumo de api;

## Resumo técnico e funcionalidades do projeto

### Resumo técnico
Para apresentar todas as issues, foi necessário criar uma interação para fazer várias requisições, visto que o limite de retorno de dados é de no máximo 100 itens por requisição.

Existe também uma limitação de requisições que um ip pode fazer. Sendo assim, os dados são salvos em localstorage para que o usuário consiga manipular as informações sem precisar fazer requisições descenessárias e mesmo que o limite tenha sido ultrapassado.

### Funcionalidades
Quando o aplicativo é acessado pela primeira vez, ele demora um pouco para carregar os dados por conta das requisições citadas anteriormente.

Assim que o dados são carregados, um tabela com a listagem das issues é apresentada.

Na tabela é possível navegar entre as páginas que apresentam por padrão 10 itens por página.

As issues de número ímpar são destacadas pela por uma cor com tonalidade verde.

É possível filtrar as issues pelo status e pela label simultaneamente. Esse filtros se encontrarm no canto superior esquerdo, clicando no ícone que representa a filtro.

Toda a manipulação desses filtros é feita com os dados salvos em localstorage.

Para atualizar os dados, basta clicar no botão que se encontrar na parte superior da tela. Ao lado é apresentada a data e hora da última atualização.

## Publicação
O projeto foi publicado no Netlify e integrado com o github para build contínuo.

Disponível em: https://listarissues.netlify.app/
