import { Request, Response } from 'express';
import axios from 'axios';

export const findStoresByCep = async (req: Request, res: Response) => {
  const { cep } = req.params;

  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const userAddress = response.data;

    if (!userAddress || userAddress.erro) {
      return res.status(404).json({ message: 'CEP não encontrado.' });
    }

    // Exemplo simples de uma lista de lojas
    const stores = [
      { name: 'Loja 1', address: 'Rua A, 123', cep: '01001000' },
      { name: 'Loja 2', address: 'Rua B, 456', cep: '02002000' }
    ];

    // Retornar as lojas para o cliente
    return res.json({ lojasProximas: stores });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar CEP.', error });
  }
};
