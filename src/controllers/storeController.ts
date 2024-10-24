// src/controllers/storeController.ts

import { Request, Response } from 'express';
import axios from 'axios';
import { getDistanceFromLatLonInKm } from '../utils/geolocation';
import stores from '../data/stores.json'; // Importando as lojas
import { Store, StoreWithDistance } from '../models/store';

export async function findNearbyStores(req: Request, res: Response) {
  const { cep } = req.body;

  try {
    // Obter endereço do CEP
    const viaCepResponse = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const userAddress = viaCepResponse.data;

    // Obter coordenadas do endereço do usuário
    const userFullAddress = `${userAddress.logradouro}, ${userAddress.localidade}, ${userAddress.uf}`;
    const userCoordinatesResponse = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: userFullAddress,
        format: 'json',
        limit: 1
      },
      headers: {
        'User-Agent': 'YourAppName'
      }
    });
    const userCoordinates = userCoordinatesResponse.data[0];

    if (!userCoordinates) {
      return res.status(400).json({ message: 'Não foi possível obter as coordenadas do CEP informado.' });
    }

    const userLat = parseFloat(userCoordinates.lat);
    const userLon = parseFloat(userCoordinates.lon);

    // Calcular distância para cada loja
    const nearbyStores = (stores as Store[])
      .map((store: Store): StoreWithDistance => {
        const distance = getDistanceFromLatLonInKm(
          userLat,
          userLon,
          store.coordinates.latitude,
          store.coordinates.longitude
        );
        return { ...store, distance };
      })
      .filter((store: StoreWithDistance) => store.distance <= 100)
      .sort((a: StoreWithDistance, b: StoreWithDistance) => a.distance - b.distance);

    if (nearbyStores.length === 0) {
      return res.status(200).json({ message: 'Nenhuma loja encontrada em um raio de 100 km.' });
    }

    return res.status(200).json(nearbyStores);
  } catch (error) {
    // Logar o erro
    console.error(error);
    return res.status(500).json({ message: 'Erro ao processar a requisição.' });
  }
}
