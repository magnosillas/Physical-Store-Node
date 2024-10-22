"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const storeRoutes_1 = __importDefault(require("./routes/storeRoutes"));
const winston_1 = __importDefault(require("winston"));
const app = (0, express_1.default)();
const port = 3000;
// Configuração do Logger
const logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.json(),
    transports: [
        new winston_1.default.transports.File({ filename: 'logfile.json' })
    ]
});
app.use(express_1.default.json());
app.use('/stores', storeRoutes_1.default);
app.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`);
});
