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
const prisma_1 = __importDefault(require("./prisma")); // Import your Prisma client instance
const resolvers = {
    Query: {
        users: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield prisma_1.default.user.findMany();
        }),
        user: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield prisma_1.default.user.findUnique({ where: { id: args.id } });
        }),
        posts: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield prisma_1.default.post.findMany();
        }),
        post: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield prisma_1.default.post.findUnique({ where: { id: args.id } });
        }),
    },
    Mutation: {
        createUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield prisma_1.default.user.create({
                data: {
                    name: args.name,
                    email: args.email,
                },
            });
        }),
        updateUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield prisma_1.default.user.update({
                where: { id: args.id },
                data: {
                    name: args.name || undefined,
                    email: args.email || undefined,
                },
            });
        }),
        deleteUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield prisma_1.default.user.delete({
                where: { id: args.id },
            });
        }),
        createPost: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield prisma_1.default.post.create({
                data: {
                    title: args.title,
                    content: args.content,
                },
            });
        }),
    },
};
exports.default = resolvers;
