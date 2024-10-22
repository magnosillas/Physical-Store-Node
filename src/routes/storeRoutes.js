"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const storeController_1 = require("../controllers/storeController");
const router = (0, express_1.Router)();
// Define a rota usando o handler correto
router.get('/:cep', storeController_1.findStoresByCep);
exports.default = router;
