# 🃏 Cartaroo - Marketplace de Troca de Cartas

Aplicação web front-end desenvolvida como um marketplace para usuários trocarem cartas colecionáveis. A plataforma permite que usuários gerenciem suas coleções e criem ofertas de troca públicas para a comunidade.

## 📚 Tecnologias Utilizadas

| Categoria | Tecnologia |
| :--- | :--- |
| **Framework** | Vue 3 (Composition API com `<script setup>`) |
| **Linguagem** | TypeScript |
| **Build Tool** | Vite |
| **Estilização** | Tailwind CSS |
| **Roteamento** | Vue Router |
| **Gerenciamento de Estado** | Pinia |
| **Requisições HTTP** | Axios |
| **Notificações** | Vue Toastification |

## 📋 Pré-requisitos

- Node.js (v20 ou superior)
- NPM ou Yarn

## 🚀 Setup e Execução

Siga os passos abaixo para configurar e rodar o projeto localmente.

### 1. Clonar o Repositório

```bash
git clone https://github.com/wilian-moraes/cartaroo.git
cd cartaroo
```

### 2. Instalação das Dependências

Execute o comando abaixo para instalar todas as bibliotecas e pacotes necessários para o projeto.
```bash
npm install
```

### 3. Configuração do Ambiente

Este projeto se conecta a uma API externa. Crie um arquivo de ambiente na raiz do projeto para configurar a URL da API.

```bash
# Crie seu arquivo .env a partir do exemplo
cp .env.example .env
```
O arquivo `.env` já virá preenchido com a URL da API de produção. Você não precisa alterá-lo para rodar o projeto.

### 4. Rodando a Aplicação

Com tudo instalado e configurado, inicie o servidor de desenvolvimento.
```bash
npm run dev
```
A aplicação estará disponível em **http://localhost:5173** (ou outra porta indicada no seu terminal).

---
## 💡 Scripts Disponíveis

No `package.json`, você encontrará outros scripts úteis:

- **`npm run build`**: Compila e otimiza a aplicação para produção.
- **`npm run preview`**: Inicia um servidor local para visualizar a versão de produção.
- **`npm run lint`**: Analisa o código em busca de erros de padrão e os corrige.
- **`npm run format`**: Formata todo o código com o Prettier para manter a consistência.

## 👤 Autor

Desenvolvido por [Wilian Moraes](https://github.com/wilian-moraes)