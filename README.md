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
- Seleção de tamanho: P, M, G, GG e 2XL.
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
└── assets/
    ├── camisas/                # Imagens dos produtos
    ├── banner-bruno-importados.svg
    ├── logoDark.png
    ├── logoLight.png
    ├── icon-dark.png
    ├── icon-light.png
    └── lupe.png
```

## 📥 Como clonar o repositório

Com o Git instalado, abra um terminal na pasta onde deseja salvar o projeto e escolha uma das opções.

### HTTPS

```bash
git clone https://github.com/netoMendes21/E-commerce-Bruno-importados.git
```

### SSH

```bash
git clone git@github.com:netoMendes21/E-commerce-Bruno-importados.git
```

O clone por SSH requer uma chave SSH configurada na sua conta do GitHub. Depois de clonar, entre na pasta e abra o projeto no VS Code:

```bash
cd E-commerce-Bruno-importados
```

## 🚀 Como executar

1. Abra a pasta do projeto no VS Code.
2. Inicie `index.html` com a extensão **Live Server**.
3. Navegue pelo catálogo e use o ícone do carrinho para acessar seus itens e o checkout.

O projeto não requer instalação de dependências.

## 🔗 Projeto

- **Repositório:** [E-commerce de Camisas de Futebol](https://github.com/netoMendes21/E-commerce-Bruno-importados)
- **Site:** adicione o link após publicar o projeto.
