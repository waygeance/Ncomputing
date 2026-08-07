// prisma.js — single shared Prisma client instance

const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();

module.exports = db;
