# OBDIIFront

Este projeto consiste em um servidor API em Node.js e uma aplicação front-end em React que fornecem monitoramento em tempo real de dados veiculares coletados de um dispositivo OBD-II.

## Sumário

- [Arquitetura](#arquitetura)
- [Recursos](#recursos)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Executando as Aplicações](#executando-as-aplicações)
- [Endpoints da API](#endpoints-da-api)
- [Uso do Front-End](#uso-do-front-end)

## Arquitetura

- **Fluxo de Dados**

  - Dados veiculares são coletados via aplicativo Android e enviados para o AWS DynamoDB.
  - O servidor API em Node.js recupera os dados do DynamoDB.
  - A aplicação front-end em React consome a API e exibe os dados ao usuário.

## Recursos

- **Servidor API**

  - Fornece endpoints RESTful para acessar dados do veículo.
  - Recupera dados do AWS DynamoDB.
  - Suporta múltiplos veículos.

- **Aplicação Front-End**

  - Dashboard exibindo métricas veiculares em tempo real.
  - Mapa mostrando a localização atual do veículo usando a API do Google Maps.
  - Página de problemas listando quaisquer questões detectadas com o veículo.
  - Design responsivo usando Material-UI.

## Pré-requisitos

- **Node.js** v12.x ou superior
- **npm** v6.x ou superior
- **Conta AWS**

  - Tabela DynamoDB configurada com os dados do veículo.
  - Credenciais AWS com acesso ao DynamoDB.

- **Chave da API do Google Maps** (para a aplicação front-end)

## Instalação

## Clonando o Repositório

cd vehicle-monitoring-app
Configuração do Servidor API
bash
Copiar código
cd api-server
npm install
Configuração da Aplicação Front-End
bash
Copiar código
cd ../front-end
npm install
Configuração
Configuração do Servidor API
Credenciais AWS

Certifique-se de que suas credenciais AWS estão configuradas de uma das seguintes formas:

Variáveis de ambiente AWS_ACCESS_KEY_ID e AWS_SECRET_ACCESS_KEY.
Arquivo de credenciais AWS (~/.aws/credentials).
Região AWS

Defina a região AWS em dbProvider.js:

javascript
Copiar código
AWS.config.update({
  region: 'sua-regiao-aws',
});
Nome da Tabela DynamoDB

Atualize o nome da tabela em dbProvider.js:

javascript
Copiar código
const tableName = 'SeuNomeDaTabelaDynamoDB';
Configuração do Front-End
URL Base da API

Em src/api.js, defina a URL base para o seu servidor API:

javascript
Copiar código
const api = axios.create({
  baseURL: 'http://localhost:5000', // Atualize se for diferente
});
Chave da API do Google Maps

Em src/pages/MapPage.jsx, substitua 'YOUR_GOOGLE_MAPS_API_KEY' pela sua chave real:

jsx
Copiar código
const { isLoaded } = useJsApiLoader({
  googleMapsApiKey: 'SUA_CHAVE_API_GOOGLE_MAPS',
});

## Executando as Aplicações
Iniciando o Servidor API
bash
Copiar código
cd api-server
node server.js
O servidor API estará em execução em http://localhost:5000.
Iniciando a Aplicação Front-End
bash
Copiar código
cd ../front-end
npm start
A aplicação front-end estará em execução em http://localhost:3000.

## Endpoints da API
GET /data

Recupera os dados mais recentes do veículo.

Parâmetros de Query:

vehicleId (opcional): O ID do veículo. Padrão é 'vehicleOnix'.
GET /position

Recupera a posição atual do veículo.
GET /problems

Recupera uma lista de problemas detectados com o veículo.
GET /data/history

Recupera dados históricos do veículo dentro de um intervalo de tempo.

Parâmetros de Query:

vehicleId: O ID do veículo.
startTime: Timestamp inicial.
endTime: Timestamp final.
POST /data

Salva novos dados do veículo no banco de dados.

Corpo da Requisição:

Objeto JSON contendo os dados do veículo.
## Uso do Front-End
Dashboard

Exibe métricas em tempo real como RPM, velocidade, temperatura e nível de combustível.
Página do Mapa

Mostra a localização atual do veículo em um mapa.
Página de Problemas

Lista quaisquer problemas detectados com o veículo.
