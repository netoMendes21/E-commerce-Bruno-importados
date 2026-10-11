# Bruno Importados — loja de camisas

Projeto front-end de uma loja virtual demonstrativa de camisas, kits e roupas de treino de times. A interface foi desenvolvida como uma adaptação do desafio de e-commerce do Notion, usando HTML semântico, CSS e JavaScript puro.

## Objetivo

Apresentar um catálogo de produtos esportivos e praticar a construção de uma experiência de compra: pesquisa e filtros, seleção de tamanho, carrinho persistente, alternância de tema e uma etapa demonstrativa de checkout.

## Tecnologias

- HTML5 semântico
- CSS3, incluindo Grid, Flexbox e media queries para telas menores
- JavaScript puro (ES6+)
- `localStorage` para manter o carrinho e a preferência de tema no navegador

## Funcionalidades

- Catálogo de produtos renderizado a partir de um array JavaScript.
- Pesquisa instantânea por time, nome ou tipo de produto.
- Filtros por camisas, kits e peças de treino.
- Seleção de tamanho e inclusão de produtos no carrinho.
- Contador de itens no ícone do carrinho.
- Alteração de quantidade pelos botões de mais e menos; ao chegar a zero, o produto é removido.
- Cálculo atualizado do total e persistência do carrinho ao recarregar a página.
- Mensagem de carrinho vazio.
- Tema escuro/claro, com preferência salva no navegador.
- Página `checkout.html` com resumo do pedido e validação de nome, e-mail e método de pagamento.
- Tela de confirmação após o envio válido do pedido demonstrativo.
- Layout responsivo para desktop, tablet e celular.

## Identidade visual

A interface usa uma paleta inspirada em futebol e em uma estética rústica:

| Uso | Cor |
| --- | --- |
| Fundo do tema escuro | Verde-petróleo profundo (`#111b20`) |
| Superfícies escuras | Verde-petróleo (`#1a292e`) |
| Texto no tema escuro | Creme (`#f0e6ca`) |
| Cor de destaque | Ferrugem (`#bd4b2e`) |
| Fundo do tema claro | Bege claro (`#f2ead7`) |
| Texto no tema claro | Verde escuro (`#1d302c`) |

A fonte principal é Inter, carregada do Google Fonts, com fontes do sistema como alternativa.

## Estrutura do projeto

```text
e-commerce/
├── index.html                 # Página inicial e vitrine
├── checkout.html              # Carrinho e checkout demonstrativo
├── README.md                  # Documentação do projeto
├── css/
│   └── style.css               # Estilos, temas e responsividade
├── js/
│   ├── main.js                 # Tema, filtros, busca e vitrine
│   ├── products.js             # Dados dos produtos
│   ├── cart.js                 # Carrinho e persistência no localStorage
│   └── checkout.js             # Resumo, validação e confirmação demonstrativa
└── assets/
    ├── camisas/                # Imagens dos produtos
    ├── banner-bruno-importados.svg
    ├── logoDark.png
    ├── logoLight.png
    ├── icon-dark.png
    ├── icon-light.png
    └── lupe.png
```

## Como executar localmente

1. Abra a pasta do projeto no VS Code.
2. Inicie a página com a extensão **Live Server**: clique com o botão direito em `index.html` e escolha **Open with Live Server**.
3. Navegue pelo catálogo, adicione produtos e abra o carrinho pelo ícone no cabeçalho.

O projeto não precisa de instalação de dependências nem de servidor de aplicação. O Live Server é recomendado para que o navegador sirva as páginas e os recursos de forma consistente.

## Dados e personalização

- Edite `js/products.js` para alterar nomes, categorias, imagens, tamanhos e preços.
- Coloque as imagens dos produtos em `assets/camisas/` e atualize o caminho no array.
- Os preços que estão no array são valores ilustrativos. Troque-os pelos preços reais antes de apresentar a loja como uma vitrine de vendas.
- As imagens de produto disponíveis atualmente representam clubes. Para anunciar camisas de seleções, inclua fotos correspondentes.
- Revise as mensagens de frete, troca e desconto no Pix para que correspondam às condições reais da loja.

## Limitações do protótipo

O checkout é apenas uma simulação para demonstrar formulário, validação e fluxo de confirmação. Não envia dados, cria pedidos em um servidor nem processa pagamentos. O carrinho fica salvo apenas no navegador em que foi usado.

## Entrega

- Repositório GitHub: **adicione aqui o link do repositório**
- Projeto publicado: **adicione aqui o link do site**
