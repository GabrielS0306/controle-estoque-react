# EstoquePro

> Uma aplicação web para gerenciamento de produtos e acompanhamento de estoque.

O **EstoquePro** é um dashboard responsivo desenvolvido para centralizar o cadastro e a visualização de produtos. Ele oferece indicadores do inventário, filtros de consulta e alertas para identificar rapidamente itens abaixo do estoque mínimo.

## Visão geral

O projeto foi construído como uma aplicação front-end moderna, com uma interface simples e objetiva para operações básicas de estoque. Nesta primeira versão, os dados são armazenados localmente no navegador, permitindo que a aplicação funcione sem uma API.

> **Status:** em desenvolvimento — versão front-end funcional.

## Funcionalidades

- Cadastro de produtos com nome, categoria, SKU, quantidade, estoque mínimo e preço
- Edição e exclusão de itens cadastrados
- Busca por nome ou código do produto
- Filtro por categoria
- Visualização exclusiva de produtos com estoque baixo
- Cards com indicadores de catálogo, unidades, valor estimado e alertas
- Destaque visual para produtos que precisam de reposição
- Persistência local dos dados com `localStorage`
- Interface adaptada para desktop e dispositivos móveis

## Tecnologias

| Tecnologia | Uso |
| --- | --- |
| [React](https://react.dev/) | Construção da interface |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem e segurança no desenvolvimento |
| [Vite](https://vite.dev/) | Ambiente de desenvolvimento e build |
| CSS puro | Estilização e responsividade |
| localStorage | Persistência local temporária dos dados |

## Estrutura do projeto

```text
src/
├── components/           # Componentes reutilizáveis da interface
│   ├── Header.tsx
│   ├── Metrics.tsx
│   ├── ProductModal.tsx
│   └── ProductsTable.tsx
├── data/                 # Dados iniciais e funções auxiliares
├── pages/                # Telas da aplicação
│   └── Dashboard.tsx
├── types/                # Tipos e contratos TypeScript
├── App.tsx               # Componente raiz
├── App.css               # Estilos principais
└── main.tsx              # Ponto de entrada
```

## Como executar localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- npm

### Instalação

```bash
# Clone o repositório
git clone <URL_DO_REPOSITORIO>

# Entre na pasta do projeto
cd controle_produtos

# Instale as dependências
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Acesse a URL exibida no terminal, normalmente `http://localhost:5173`.

### Produção

```bash
# Valida o código
npm run lint

# Gera os arquivos otimizados em dist/
npm run build

# Visualiza a build localmente
npm run preview
```

## Persistência dos dados

Atualmente os produtos são salvos no `localStorage` do navegador. Isso permite manter as informações entre atualizações de página no mesmo dispositivo e navegador.

Como dados locais podem ser removidos ao limpar o navegador, a próxima evolução planejada é integrar uma API e um banco de dados para oferecer persistência centralizada, backups e acesso por diferentes dispositivos.

## Próximos passos

- [ ] Criar uma API REST
- [ ] Integrar PostgreSQL para persistência permanente
- [ ] Adicionar autenticação e controle de usuários
- [ ] Registrar entradas e saídas de produtos
- [ ] Implementar relatórios e exportação de dados
- [ ] Adicionar testes automatizados

## Licença

Projeto criado para fins de estudo e portfólio.
