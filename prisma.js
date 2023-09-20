"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    // Add the following line to enable query logging
    log: ['query', 'info', 'warn'],
});
exports.default = prisma;
