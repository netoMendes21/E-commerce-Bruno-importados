<<<<<<< HEAD
# 👕 E-commerce de Camisas de Futebol

Loja virtual de camisas, kits e roupas de treino de times. O site apresenta um catálogo esportivo com busca, filtros, seleção de tamanho, carrinho de compras e uma etapa de checkout demonstrativa.

## 🧰 Tecnologias

- **HTML5** — estrutura semântica das páginas.
- **CSS3** — layout com Grid, Flexbox e media queries para diferentes tamanhos de tela.
- **JavaScript (ES6+)** — catálogo, filtros, carrinho, temas e validação do checkout.
- **localStorage** — persistência do carrinho e da preferência de tema no navegador.
- **Google Fonts** — fonte Inter.

## 🛍️ Funcionalidades

- Catálogo de produtos carregado dinamicamente a partir de um array JavaScript.
- Busca instantânea por time, nome ou tipo de produto.
- Filtros por camisas, kits e roupas de treino.
- Seleção de tamanho antes de adicionar um produto ao carrinho.
- Contador de produtos no ícone do carrinho.
- Controles para aumentar e diminuir quantidades; ao chegar a zero, o item é removido.
- Atualização automática do total e salvamento do carrinho após recarregar a página.
- Mensagens para carrinho vazio e pesquisa sem resultados.
- Alternância entre tema claro e escuro, com preferência salva no navegador.
- Página de checkout com resumo do pedido, validação dos campos e confirmação demonstrativa.
- Escolha entre Pix e cartão de crédito, com simulação de parcelamento em até 12 vezes para cartão.
- Layout responsivo para desktop, tablet e celular.

## 🗂️ Estrutura do projeto

```text
e-commerce/
├── index.html                  # Página inicial e catálogo
├── checkout.html               # Carrinho e checkout demonstrativo
├── README.md                   # Documentação do projeto
├── css/
│   └── style.css               # Estilos, temas e responsividade
├── js/
│   ├── main.js                 # Catálogo, busca, filtros e tema
│   ├── products.js             # Dados dos produtos
│   ├── cart.js                 # Carrinho e persistência no localStorage
│   └── checkout.js             # Resumo, validação e confirmação
=======
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
>>>>>>> 354542fd9c76701107b8f5bc63a59e3e214bd308
└── assets/
    ├── camisas/                # Imagens dos produtos
    ├── banner-bruno-importados.svg
    ├── logoDark.png
    ├── logoLight.png
    ├── icon-dark.png
    ├── icon-light.png
    └── lupe.png
```

<<<<<<< HEAD
## 📥 Como clonar o repositório

Com o Git instalado, abra um terminal na pasta onde deseja salvar o projeto e escolha uma das opções abaixo.

### HTTPS

```bash
git clone https://github.com/netoMendes21/E-commerce-Bruno-importados.git
```

### SSH

```bash
git clone git@github.com:netoMendes21/E-commerce-Bruno-importados.git
```

Para clonar por SSH, configure uma chave SSH na sua conta do GitHub. Após clonar, entre na pasta e abra o projeto no VS Code:

```bash
cd E-commerce-Bruno-importados
```

Abra essa pasta no VS Code e siga as instruções da seção **Como executar**.

## 🚀 Como executar

1. Abra a pasta do projeto no VS Code.
2. Inicie `index.html` com a extensão **Live Server**.
3. Navegue pelo catálogo e use o ícone do carrinho para acessar seus itens e o checkout.

O projeto não requer instalação de dependências.

## 🔗 Projeto

- **Repositório:** [E-commerce de Camisas de Futebol](https://github.com/netoMendes21/E-commerce-Bruno-importados)
- **Site:** adicione o link após publicar o projeto.
=======
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
>>>>>>> 354542fd9c76701107b8f5bc63a59e3e214bd308
