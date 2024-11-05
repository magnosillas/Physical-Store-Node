// src/seeder.ts

import sequelize from './config/database';
import Store from './models/store';
import logger from './config/winston';
import axios from 'axios';

// Interface para definir a estrutura dos dados da loja
interface StoreData {
  name: string;
  contact: string;
  cep: string;
  number: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
}

// Lista de CEPs para popular as lojas
const ceps: string[] = [
  "01001000",
  "05424020",
  "04252010",
  "04002002",
  "04001000",
  "20010010",
  "10010010",
  "20020010",
  "05001000",
  "40020010",
  "06003000",
  "60010010",
  "08002000",
  "09001000",
  "50010010",
  "55040000", 
  "55050000",
  // Adicione mais CEPs conforme necessário
];

// Função para gerar um número de loja único por CEP
const generateStoreNumber = (index: number): string => {
  // Exemplo simples: número baseado no índice
  return (100 + index).toString();
};

// Função para gerar um nome de loja baseado no CEP
const generateStoreName = (cep: string): string => {
  return `Loja ${cep}`;
};

// Função para gerar um contato fictício
const generateContact = (): string => {
  const randomNumber = Math.floor(100000000 + Math.random() * 900000000);
  return `(11) ${randomNumber.toString().substring(0,5)}-${randomNumber.toString().substring(5)}`;
};

// Função principal do seeder
const seedStores = async () => {
  try {
    // Sincronizar o modelo com o banco de dados sem forçar (não deletar tabelas)
    await sequelize.sync();

    for (let i = 0; i < ceps.length; i++) {
      const originalCep = ceps[i];
      
      // Sanitizar o CEP: remover espaços e caracteres não numéricos
      const sanitizedCep = originalCep.replace(/\D/g, '');

      // Validar o formato do CEP: exatamente 8 dígitos
      const cepRegex = /^\d{8}$/;
      if (!cepRegex.test(sanitizedCep)) {
        logger.warn(`Formato de CEP inválido: ${originalCep}. Pulando...`);
        continue; // Pular para o próximo CEP
      }

      // Gerar número e nome da loja
      const storeNumber = generateStoreNumber(i);
      const storeName = generateStoreName(sanitizedCep);
      const contact = generateContact();

      // Verificar se já existe uma loja com o mesmo CEP e número
      const existingStore = await Store.findOne({ where: { cep: sanitizedCep, number: storeNumber } });
      if (existingStore) {
        logger.warn(`Loja já existente com CEP ${sanitizedCep} e número ${storeNumber}. Pulando...`);
        continue; // Pular para o próximo CEP
      }

      // Obter detalhes do endereço via ViaCEP
      const viaCepResponse = await axios.get(`https://viacep.com.br/ws/${sanitizedCep}/json/`);
      const addressData = viaCepResponse.data;

      if (addressData.erro) {
        logger.warn(`CEP inválido fornecido: ${sanitizedCep}. Pulando...`);
        continue; // Pular para o próximo CEP
      }

      const { logradouro, bairro, localidade, uf } = addressData;

      // Obter coordenadas via AwesomeAPI
      const awesomeApiResponse = await axios.get(`https://cep.awesomeapi.com.br/json/${sanitizedCep}`);
      const locationData = awesomeApiResponse.data;

      logger.info(`Dados recebidos da AwesomeAPI para CEP ${sanitizedCep}: ${JSON.stringify(locationData)}`);

      if (!locationData.lat || !locationData.lng) {
        logger.warn(`Coordenadas não encontradas para o CEP fornecido: ${sanitizedCep}. Pulando...`);
        continue; // Pular para o próximo CEP
      }

      const latitude = parseFloat(locationData.lat);
      const longitude = parseFloat(locationData.lng);

      // Criar a loja no banco de dados
      const store = await Store.create({
        name: storeName,
        contact: contact,
        cep: sanitizedCep,
        number: storeNumber,
        street: logradouro,
        neighborhood: bairro,
        city: localidade,
        state: uf,
        latitude: latitude,
        longitude: longitude,
      });

      logger.info(`Loja criada com sucesso: ${store.name} (CEP: ${sanitizedCep}, Número: ${storeNumber})`);
    }

    logger.info('Seeding concluído com sucesso.');
  } catch (error: any) {
    logger.error(`Erro durante o seeding: ${error.message}`);
  } finally {
    // Fechar a conexão com o banco de dados
    await sequelize.close();
  }
};

// Executar o seeder
seedStores();
