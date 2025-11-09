// local Database Module

import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';
import { createTables } from './createTables.js';
import { insertData } from './insertData.js';
import { getAllCards } from './selectData.js';
import { addCard } from './insertData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'cheat_sheets.db');

let db;

// Отваряме базата данни
async function openDB() {
    const connection = await open({
        filename: dbPath,
        driver: sqlite3.Database
    });
    return connection;
}

export async function initializeDatabase() {
    if (!db) db = await openDB();
    console.log('✅ Свързан с базата cheat_sheets.db');
    await createTables(db); // Създаваме таблиците, ако не съществуват
    // Добавяме примерни данни, ако базата е празна
    await insertData(db);
    return db;
}

export async function fetchAllCards() {
    if (!db) db = await openDB();
    const cards = await getAllCards(db);
    return cards;
    // console.log("Ok im here");
}

export async function addNewCard(title, description, topics) {
    return addCard(db, title, description, topics);
}

export default db;

