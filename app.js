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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const prisma = new client_1.PrismaClient();
// Middleware for logging requests
app.use((req, res, next) => {
    console.log(`Received ${req.method} request at ${req.url}`);
    next();
});
app.use(body_parser_1.default.json());
// Welcome message for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the REST API!');
});
// Get all users
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany();
        res.json(users);
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Get a user by ID
app.get('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield prisma.user.findUnique({ where: { id: Number(id) } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Create a new user
app.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    try {
        const newUser = yield prisma.user.create({
            data: {
                name,
                email,
            },
        });
        res.json(newUser);
    }
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Update a user by ID
app.put('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const updatedUser = yield prisma.user.update({
            where: { id: Number(id) },
            data: {
                name,
                email,
            },
        });
        res.json(updatedUser);
    }
    catch (error) {
        console.error('Error updating user by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Delete a user by ID
app.delete('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prisma.user.delete({
            where: { id: Number(id) },
        });
        res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting user by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Start the Express server
app.listen(port, () => {
    console.log(`REST API is running on port ${port}`);
});
