"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findStoresByCep = void 0;
const axios_1 = __importDefault(require("axios"));
const findStoresByCep = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cep } = req.params;
    try {
        const response = yield axios_1.default.get(`https://viacep.com.br/ws/${cep}/json/`);
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
    }
    catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar CEP.', error });
    }
});
exports.findStoresByCep = findStoresByCep;
