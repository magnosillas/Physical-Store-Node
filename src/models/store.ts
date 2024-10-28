// src/models/store.ts

export interface Store {
    name: string;
    address: {
      cep: string;
      street: string;
      number: string;
      city: string;
      state: string;
    };
    coordinates: {
      latitude: number;
      longitude: number;
    };
  }

  // src/models/store.ts (continuação)

export interface StoreWithDistance extends Store {
    distance: number;
  }
  
  